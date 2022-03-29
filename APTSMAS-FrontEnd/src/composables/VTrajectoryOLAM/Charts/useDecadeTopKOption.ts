import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import { IDecadeTopK } from "../IApiData";

export type DTKECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

export function useDecadeTopKOption(): {
  handleOption: (chartData: IDecadeTopK) => DTKECOption;
  initOption: DTKECOption;
} {
  const handleOption = (chartData: IDecadeTopK): DTKECOption => {
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
            color: "#C1232B",
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

  const initData: IDecadeTopK = {
    k: 20,
    items: [
      {
        name: "750-759",
        value: 218,
      },
      {
        name: "740-749",
        value: 159,
      },
      {
        name: "870-879",
        value: 136,
      },
      {
        name: "730-739",
        value: 133,
      },
      {
        name: "860-869",
        value: 130,
      },
      {
        name: "880-889",
        value: 122,
      },
      {
        name: "810-819",
        value: 109,
      },
      {
        name: "760-769",
        value: 104,
      },
      {
        name: "800-809",
        value: 94,
      },
      {
        name: "790-799",
        value: 85,
      },
      {
        name: "720-729",
        value: 74,
      },
      {
        name: "830-839",
        value: 71,
      },
      {
        name: "820-829",
        value: 60,
      },
      {
        name: "850-859",
        value: 56,
      },
      {
        name: "700-709",
        value: 48,
      },
      {
        name: "890-899",
        value: 47,
      },
      {
        name: "780-789",
        value: 46,
      },
      {
        name: "710-719",
        value: 38,
      },
      {
        name: "840-849",
        value: 38,
      },
      {
        name: "770-779",
        value: 35,
      },
    ],
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
