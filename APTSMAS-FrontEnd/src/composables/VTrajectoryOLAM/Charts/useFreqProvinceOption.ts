import * as echarts from "echarts/core";
import { GraphSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { IFreqProvinces } from "../IApiData";
import { MAX_GRAPH_EDGE_NUMBER, GRAPH_SYMBOL_SIZE_RANGE } from "./constant";

export type FPECOption = echarts.ComposeOption<
  GraphSeriesOption | TooltipComponentOption | GridComponentOption
>;

export function useFreqProvince(store: Store<IState>): {
  handleOption: (chartData: IFreqProvinces) => FPECOption;
  initOption: FPECOption;
} {
  const storeId2Geo = store.state.geo.id2Geo;

  const handleOption = (chartData: IFreqProvinces): FPECOption => {
    const nodes: { name: string; value: number; symbolSize: number }[] = [];
    const edges: { source: string; target: string; value: number }[] = [];
    const nodesMap: { [property: string]: number } = {};

    // form almost
    for (const item of chartData.items) {
      const fromStr = storeId2Geo[item.from].name;
      const toStr = storeId2Geo[item.to].name;

      if (fromStr in nodesMap) {
        nodes[nodesMap[fromStr]].value += item.value;
      } else {
        nodes.push({
          name: fromStr,
          value: item.value,
          symbolSize: 0,
        });
        nodesMap[fromStr] = nodes.length - 1;
      }

      if (toStr in nodesMap) {
        nodes[nodesMap[toStr]].value += item.value;
      } else {
        nodes.push({
          name: toStr,
          value: item.value,
          symbolSize: 0,
        });
        nodesMap[toStr] = nodes.length - 1;
      }

      edges.push({ source: fromStr, target: toStr, value: item.value });
      if (edges.length >= MAX_GRAPH_EDGE_NUMBER) break;
    }

    // form items' size
    let maxV = Number.MIN_VALUE;
    let minV = Number.MAX_VALUE;
    for (const item of nodes) {
      const val = item.value;
      if (val > maxV) maxV = val;
      if (val < minV) minV = val;
    }
    const k =
      (GRAPH_SYMBOL_SIZE_RANGE[1] - GRAPH_SYMBOL_SIZE_RANGE[0]) / (maxV - minV);
    for (const item of nodes) {
      item.symbolSize = GRAPH_SYMBOL_SIZE_RANGE[0] + k * (item.value - minV);
    }

    // final
    return {
      tooltip: {},
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
          type: "graph",
          zoom: 1,
          roam: true,
          draggable: true,
          layout: "force",
          circular: {
            rotateLabel: true,
          },
          force: {
            initLayout: "circular",
            repulsion: [50, 100],
            gravity: 0.1,
            edgeLength: [70, 150],
          },
          label: {
            show: true,
            position: "right",
          },
          edgeLabel: {
            show: false,
          },
          edgeSymbol: ["none", "arrow"],
          edgeSymbolSize: 10,
          itemStyle: {
            color: "#3ba272",
          },
          lineStyle: {
            curveness: 0.2,
          },
          nodes: nodes,
          edges: edges,
          labelLayout: {
            hideOverlap: true,
          },
          emphasis: {
            focus: "adjacency",
            label: {
              show: true,
              fontWeight: "bolder",
              fontSize: 15,
            },
            edgeLabel: {
              show: true,
              fontWeight: "bolder",
              fontSize: 15,
              formatter: "value: {c}",
            },
            lineStyle: {
              width: 5,
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

  const initData: IFreqProvinces = {
    percent: 0.2,
    items: [
      {
        from: "001005",
        to: "001005",
        value: 167,
      },
      {
        from: "001001",
        to: "001001",
        value: 142,
      },
      {
        from: "001022",
        to: "001022",
        value: 87,
      },
      {
        from: "001005",
        to: "001001",
        value: 86,
      },
      {
        from: "001001",
        to: "001005",
        value: 82,
      },
      {
        from: "001010",
        to: "001010",
        value: 77,
      },
      {
        from: "001004",
        to: "001004",
        value: 73,
      },
      {
        from: "001008",
        to: "001008",
        value: 66,
      },
      {
        from: "001009",
        to: "001009",
        value: 59,
      },
      {
        from: "001015",
        to: "001015",
        value: 37,
      },
      {
        from: "001006",
        to: "001006",
        value: 36,
      },
      {
        from: "001010",
        to: "001004",
        value: 36,
      },
      {
        from: "001011",
        to: "001011",
        value: 31,
      },
      {
        from: "001004",
        to: "001010",
        value: 29,
      },
      {
        from: "001003",
        to: "001005",
        value: 24,
      },
      {
        from: "001005",
        to: "001008",
        value: 22,
      },
      {
        from: "001025",
        to: "001025",
        value: 22,
      },
      {
        from: "001008",
        to: "001009",
        value: 19,
      },
      {
        from: "001005",
        to: "001003",
        value: 19,
      },
      {
        from: "001015",
        to: "001010",
        value: 19,
      },
      {
        from: "001008",
        to: "001005",
        value: 18,
      },
      {
        from: "001010",
        to: "001005",
        value: 18,
      },
      {
        from: "001004",
        to: "001005",
        value: 17,
      },
      {
        from: "001002",
        to: "001002",
        value: 17,
      },
      {
        from: "001010",
        to: "001001",
        value: 17,
      },
      {
        from: "001021",
        to: "001021",
        value: 16,
      },
      {
        from: "001014",
        to: "001014",
        value: 16,
      },
      {
        from: "001001",
        to: "001010",
        value: 15,
      },
      {
        from: "001005",
        to: "001022",
        value: 14,
      },
      {
        from: "001001",
        to: "001008",
        value: 13,
      },
      {
        from: "001009",
        to: "001008",
        value: 13,
      },
      {
        from: "001010",
        to: "001015",
        value: 13,
      },
      {
        from: "001005",
        to: "001010",
        value: 13,
      },
      {
        from: "001003",
        to: "001003",
        value: 11,
      },
      {
        from: "001005",
        to: "001004",
        value: 11,
      },
    ],
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
