import * as echarts from "echarts/core";
import { TreeSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { IVTree } from "../IApiData";

export type TreeECOption = echarts.ComposeOption<
  TreeSeriesOption | TooltipComponentOption | GridComponentOption
>;

export function useTreeOption(store: Store<IState>): {
  handleOption: (chartData: IVTree) => TreeECOption;
  initOption: TreeECOption;
} {
  const storeId2Poet = store.state.poets.id2Poet;
  const storeId2Geo = store.state.geo.id2Geo;

  const handleOption = (chartData: IVTree): TreeECOption => {
    // poet
    const poetChildren: {
      name: string;
      value: string;
      children: { name: string; value: string }[];
    } = {
      name: chartData.poet.type,
      value: "选取级别",
      children: [],
    };
    if (chartData.poet.type === "dynasty") {
      for (const item of chartData.poet.items) {
        poetChildren.children.push({
          name: item,
          value: item,
        });
      }
    } else {
      for (const item of chartData.poet.items) {
        const acName = item === "等" ? item : storeId2Poet[item].name;
        poetChildren.children.push({
          name: acName,
          value: acName,
        });
      }
    }

    // time
    const timeChildren: {
      name: string;
      value: string;
      children: { name: string; value: string }[];
    } = {
      name: chartData.time.type,
      value: "选取级别",
      children: [],
    };
    for (const item of chartData.time.items)
      timeChildren.children.push({
        name: item,
        value: item,
      });

    // geo
    const geoChildren: {
      name: string;
      value: string;
      children: { name: string; value: string }[];
    } = {
      name: chartData.location.type,
      value: "选取级别",
      children: [],
    };
    for (const item of chartData.location.items) {
      const acName = storeId2Geo[item].name;
      geoChildren.children.push({
        name: acName,
        value: acName,
      });
    }

    // form
    const option: TreeECOption = {
      tooltip: {},
      series: [
        {
          type: "tree",
          data: [
            {
              name: "Cube",
              value: "维度立方体",
              children: [
                {
                  name: "Poet",
                  value: "诗人选取维度",
                  children: [poetChildren],
                },
                {
                  name: "Time",
                  value: "时间选取维度",
                  children: [timeChildren],
                },
                {
                  name: "Geo",
                  value: "地理选取维度",
                  children: [geoChildren],
                },
              ],
            },
          ],
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
          },
          labelLayout: {
            hideOverlap: true,
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
            label: {
              show: true,
              fontWeight: "bolder",
              fontSize: 14,
            },
            itemStyle: {
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, 0.7)",
              shadowBlur: 5,
            },
          },
          initialTreeDepth: 3,
          roam: true,
        },
      ],
    };
    return option;
  };

  const initData: IVTree = {
    poet: {
      type: "dynasty",
      items: ["唐"],
    },
    time: {
      type: "century",
      items: ["700-799", "800-899", "900-999", "等"],
    },
    location: {
      type: "country",
      items: ["001", "002"],
    },
  };
  const initOption = handleOption(initData);

  return {
    handleOption,
    initOption,
  };
}
