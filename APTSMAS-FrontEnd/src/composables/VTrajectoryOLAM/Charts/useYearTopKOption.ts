import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import { IYearTopK } from "../IApiData";

export type YTKECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

export function useYearTopKOption(): {
  handleOption: (chartData: IYearTopK) => YTKECOption;
  initOption: YTKECOption;
} {
  const handleOption = (chartData: IYearTopK): YTKECOption => {
    const xAxis: string[] = [];
    const data: number[] = [];
    for (const item of chartData.items) {
      xAxis.push(item.name);
      data.push(item.value);
    }

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: xAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      dataZoom: [
        {
          type: "inside",
          orient: "horizontal",
        },
        {
          type: "slider",
          orient: "horizontal",
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          type: "bar",
          data: data,
          label: {
            show: true,
            position: "top",
          },
          itemStyle: {
            color: "#ea7ccc",
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
    };
  };

  const initData: IYearTopK = {
    k: 20,
    items: [
      {
        name: "756",
        value: 35,
      },
      {
        name: "759",
        value: 34,
      },
      {
        name: "739",
        value: 31,
      },
      {
        name: "754",
        value: 31,
      },
      {
        name: "755",
        value: 27,
      },
      {
        name: "745",
        value: 26,
      },
      {
        name: "757",
        value: 26,
      },
      {
        name: "758",
        value: 23,
      },
      {
        name: "815",
        value: 22,
      },
      {
        name: "876",
        value: 22,
      },
      {
        name: "883",
        value: 22,
      },
      {
        name: "749",
        value: 21,
      },
      {
        name: "744",
        value: 20,
      },
      {
        name: "866",
        value: 20,
      },
      {
        name: "805",
        value: 19,
      },
      {
        name: "817",
        value: 19,
      },
      {
        name: "871",
        value: 19,
      },
      {
        name: "731",
        value: 18,
      },
      {
        name: "761",
        value: 18,
      },
      {
        name: "868",
        value: 18,
      },
    ],
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
