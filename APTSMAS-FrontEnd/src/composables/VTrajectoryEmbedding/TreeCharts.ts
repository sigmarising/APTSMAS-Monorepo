import * as echarts from "echarts/core";
import { TreeSeriesOption } from "echarts/charts";
import {
  TooltipComponentOption,
  GridComponentOption,
} from "echarts/components";
import type { IState } from "@/store";
import { Store } from "@/store";
import { PoetResultTrajectory } from "./IApiData";

export type TVOption = echarts.ComposeOption<
  TreeSeriesOption | TooltipComponentOption | GridComponentOption
>;

type TreeDataOption = {
  name: string;
  value: string;
  children: {
    name: string;
    value: string;
    children: {
      name: string;
      value: string;
      children: { name: string; value?: string }[];
    }[];
  }[];
};

export function useTreeOption(store: Store<IState>): {
  handleOption: (chartData: PoetResultTrajectory[]) => TVOption;
} {
  const storeId2Poet = store.state.poets.id2Poet;

  const handleOption = (chartData: PoetResultTrajectory[]): TVOption => {
    const treeData: TreeDataOption = {
      name: "Trajectories",
      value: "轨迹",
      children: [
        {
          name: "Normal",
          value: "寻常",
          children: [
            {
              name: "唐朝",
              value: "NormalTang",
              children: [],
            },
            {
              name: "宋朝",
              value: "NormalSong",
              children: [],
            },
          ],
        },
        {
          name: "Abnormal",
          value: "离群",
          children: [
            {
              name: "唐朝",
              value: "AbnormalTang",
              children: [],
            },
            {
              name: "宋朝",
              value: "AbnormalSong",
              children: [],
            },
          ],
        },
      ],
    };
    for (const poet of chartData) {
      const poetInfo = storeId2Poet[poet.id];
      if (poet.normal) {
        if (poetInfo.dynasty === "唐") {
          treeData?.children[0].children[0].children.push({
            name: poetInfo.name,
            // value: poet.id.toString(),
          });
        } else if (poetInfo.dynasty === "宋") {
          treeData.children[0].children[1].children.push({
            name: poetInfo.name,
            // value: poet.id.toString(),
          });
        }
      } else {
        if (poetInfo.dynasty === "唐") {
          treeData.children[1].children[0].children.push({
            name: poetInfo.name,
            // value: poet.id.toString(),
          });
        } else if (poetInfo.dynasty === "宋") {
          treeData.children[1].children[1].children.push({
            name: poetInfo.name,
            // value: poet.id.toString(),
          });
        }
      }
    }

    return {
      tooltip: {},
      series: [
        {
          type: "tree",
          data: [treeData],
          orient: "vertical",
          label: {
            position: "top",
            rotate: -90,
            verticalAlign: "middle",
            align: "right",
          },
          labelLayout: {
            hideOverlap: true,
          },
          leaves: {
            label: {
              position: "bottom",
              rotate: -90,
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
          initialTreeDepth: 2,
          roam: true,
        },
      ],
    };
  };

  return { handleOption };
}
