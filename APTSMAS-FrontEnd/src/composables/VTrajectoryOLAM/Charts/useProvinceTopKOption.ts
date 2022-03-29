import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { IProvincesTopK } from "../IApiData";

export type PTKECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

export function useProvinceTopKOption(store: Store<IState>): {
  handleOption: (chartData: IProvincesTopK) => PTKECOption;
  initOption: PTKECOption;
} {
  const storeId2Geo = store.state.geo.id2Geo;

  const handleOption = (chartData: IProvincesTopK): PTKECOption => {
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
            color: "#fac858",
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

  const initData: IProvincesTopK = {
    k: 20,
    items: [
      {
        name: "001005",
        value: 379,
      },
      {
        name: "001001",
        value: 304,
      },
      {
        name: "001010",
        value: 176,
      },
      {
        name: "001004",
        value: 152,
      },
      {
        name: "001008",
        value: 150,
      },
      {
        name: "001022",
        value: 110,
      },
      {
        name: "001009",
        value: 100,
      },
      {
        name: "001015",
        value: 92,
      },
      {
        name: "001011",
        value: 84,
      },
      {
        name: "001006",
        value: 54,
      },
      {
        name: "001003",
        value: 48,
      },
      {
        name: "001002",
        value: 36,
      },
      {
        name: "001014",
        value: 31,
      },
      {
        name: "001021",
        value: 29,
      },
      {
        name: "001023",
        value: 26,
      },
      {
        name: "001025",
        value: 25,
      },
      {
        name: "001017",
        value: 15,
      },
      {
        name: "001013",
        value: 7,
      },
      {
        name: "001007",
        value: 3,
      },
      {
        name: "001024",
        value: 3,
      },
    ],
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
