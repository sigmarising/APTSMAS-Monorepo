import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import { ITimeVariantApiResponse, ITimeVariantContent } from "./IApiData";
import { TimeVariantType } from "./useSelectCardOptions";
import {
  ANIMATE_SORT_TIME_MS,
  ANIMATE_UPDATE_TIME_MS,
  MIN_YEAR,
  MAX_YEAR,
  initData as constantData,
} from "./constants";
import { Ref } from "vue";

export type TVECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

const colors: string[] = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
  "#c1232b",
];
const types: TimeVariantType[] = [
  "poetTravel",
  "locationTravel",
  "cityTravel",
  "provinceTravel",
  "yearTravel",
  "decadeTravel",
  "centuryTravel",
  "routeLocationTravel",
  "routeCityTravel",
  "routeProvinceTravel",
];
function getColor(type: TimeVariantType): string {
  return colors[types.indexOf(type)];
}

export function useTimeVariantOption(): {
  handleOption: (
    chartData: ITimeVariantApiResponse,
    targetYear: number
  ) => TVECOption;
  dynamicHandler: (
    previousInterval: number | null,
    currentInterval: Ref<number | null>,
    chartObj: echarts.ECharts,
    chartData: ITimeVariantApiResponse,
    currentYear: Ref<number>
  ) => void;
  initData: ITimeVariantApiResponse;
} {
  const handleOption = (
    chartData: ITimeVariantApiResponse,
    targetYear: number
  ): TVECOption => {
    const type = chartData.type;
    const content: ITimeVariantContent = JSON.parse(chartData.content);
    const items = content[targetYear.toString()];

    const yAxis: string[] = [];
    const data: number[] = [];
    for (const item of items) {
      yAxis.push(item.name);
      data.push(item.value);
    }

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        max: "dataMax",
      },
      yAxis: {
        type: "category",
        data: yAxis,
        inverse: true,
        animationDuration: ANIMATE_SORT_TIME_MS,
        animationDurationUpdate: ANIMATE_SORT_TIME_MS,
        max: 29, // only the largest `max + 1` bars will be displayed
      },
      dataZoom: [
        {
          type: "inside",
          orient: "vertical",
        },
        {
          type: "slider",
          orient: "vertical",
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          type: "bar",
          realtimeSort: true,
          data: data,
          label: {
            show: true,
            position: "right",
            valueAnimation: true,
          },
          itemStyle: {
            color: getColor(type),
          },
          labelLayout: {
            hideOverlap: true,
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: "bolder",
              fontSize: 15,
            },
            itemStyle: {
              shadowColor: "rgba(0, 0, 0, 0.7)",
              shadowBlur: 10,
            },
          },
        },
      ],
      animationDuration: ANIMATE_UPDATE_TIME_MS,
      animationDurationUpdate: ANIMATE_UPDATE_TIME_MS,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
    };
  };

  const dynamicHandler = (
    previousInterval: number | null,
    currentInterval: Ref<number | null>,
    chartObj: echarts.ECharts,
    chartData: ITimeVariantApiResponse,
    currentYear: Ref<number>
  ) => {
    if (previousInterval !== null && previousInterval !== 0) {
      window.clearInterval(previousInterval);
    }
    currentYear.value = MIN_YEAR;

    currentInterval.value = window.setInterval(() => {
      if (MIN_YEAR <= currentYear.value && currentYear.value <= MAX_YEAR) {
        const option = handleOption(chartData, currentYear.value);
        // chartObj.setOption(option, { replaceMerge: ["series", "yAxis"] });
        chartObj.setOption(option);

        currentYear.value += 1;
      } else if (currentInterval.value) {
        window.clearInterval(currentInterval.value);
        currentInterval.value = null;
      }
    }, ANIMATE_UPDATE_TIME_MS);
  };

  const initData: ITimeVariantApiResponse = constantData;

  return {
    handleOption,
    dynamicHandler,
    initData,
  };
}
