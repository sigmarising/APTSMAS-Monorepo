import * as echarts from "echarts/core";
import { BarSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { IChartDataOrigin } from "./IApiData";

export type CDChartsOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

export function useCDChartOption(store: Store<IState>): {
  handleOption: (
    chartData: IChartDataOrigin,
    chartColor: string
  ) => CDChartsOption;
} {
  const storeId2Geo = store.state.geo.id2Geo;

  const handleOption = (
    chartData: IChartDataOrigin,
    chartColor: string
  ): CDChartsOption => {
    const xAxis: string[] = [];
    const data: number[] = [];
    // if (chartData !== null && chartData !== undefined)
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
            color: chartColor,
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

  return {
    handleOption,
  };
}
