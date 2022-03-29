import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { ILocationsTopK } from "../IApiData";

export type LTKECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

export function useLocationTopKOption(store: Store<IState>): {
  handleOption: (chartData: ILocationsTopK) => LTKECOption;
  initOption: LTKECOption;
} {
  const storeId2Geo = store.state.geo.id2Geo;

  const handleOption = (chartData: ILocationsTopK): LTKECOption => {
    const xAxis: string[] = [];
    const data: number[] = [];
    for (const item of chartData.items) {
      xAxis.push(storeId2Geo[item.name].name);
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
            color: "#91cc75",
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

  const initData: ILocationsTopK = {
    k: 20,
    items: [
      {
        name: "00100500010005",
        value: 233,
      },
      {
        name: "00100100070008",
        value: 110,
      },
      {
        name: "00101000020003",
        value: 50,
      },
      {
        name: "00100400020006",
        value: 37,
      },
      {
        name: "00100800030005",
        value: 35,
      },
      {
        name: "00101000030005",
        value: 34,
      },
      {
        name: "00100800060002",
        value: 29,
      },
      {
        name: "00101100030001",
        value: 28,
      },
      {
        name: "00102200010008",
        value: 27,
      },
      {
        name: "00101000060006",
        value: 27,
      },
      {
        name: "00100100060002",
        value: 24,
      },
      {
        name: "00101000040002",
        value: 24,
      },
      {
        name: "00100900050003",
        value: 22,
      },
      {
        name: "00100900010004",
        value: 21,
      },
      {
        name: "00100800020003",
        value: 20,
      },
      {
        name: "00100300010004",
        value: 19,
      },
      {
        name: "00100500020002",
        value: 19,
      },
      {
        name: "00100100130006",
        value: 18,
      },
      {
        name: "00100100080001",
        value: 16,
      },
      {
        name: "00101500010002",
        value: 16,
      },
    ],
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
