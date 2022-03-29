import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { IPoetsTopK } from "../IApiData";

export type PTKECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

export function usePoetTopKOption(store: Store<IState>): {
  handleOption: (chartData: IPoetsTopK) => PTKECOption;
  initOption: PTKECOption;
} {
  const storeId2Poet = store.state.poets.id2Poet;

  const handleOption = (chartData: IPoetsTopK): PTKECOption => {
    const xAxis: string[] = [];
    const data: number[] = [];
    for (const item of chartData.items) {
      xAxis.push(storeId2Poet[item.name].name);
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
            color: "#5470c6",
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

  const initData: IPoetsTopK = {
    k: 20,
    items: [
      {
        name: "12",
        value: 202,
      },
      {
        name: "40",
        value: 159,
      },
      {
        name: "13",
        value: 127,
      },
      {
        name: "15",
        value: 110,
      },
      {
        name: "45",
        value: 103,
      },
      {
        name: "22",
        value: 98,
      },
      {
        name: "39",
        value: 82,
      },
      {
        name: "10",
        value: 76,
      },
      {
        name: "6",
        value: 71,
      },
      {
        name: "19",
        value: 60,
      },
      {
        name: "3",
        value: 55,
      },
      {
        name: "9",
        value: 51,
      },
      {
        name: "41",
        value: 49,
      },
      {
        name: "5",
        value: 45,
      },
      {
        name: "11",
        value: 45,
      },
      {
        name: "16",
        value: 45,
      },
      {
        name: "30",
        value: 43,
      },
      {
        name: "29",
        value: 41,
      },
      {
        name: "21",
        value: 40,
      },
      {
        name: "18",
        value: 38,
      },
    ],
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
