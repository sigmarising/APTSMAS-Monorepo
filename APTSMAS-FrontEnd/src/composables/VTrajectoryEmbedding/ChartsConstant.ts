import { Ref, ref } from "vue";
import {
  IChartDataOrigin,
  IEmbResult,
  PoetResultTrajectory,
  PoetResultTrajectoryRaw,
} from "./IApiData";

export function useChartsConstant(
  parseTrajectory: (traj: PoetResultTrajectoryRaw[]) => PoetResultTrajectory[]
): {
  mapsData: Ref<PoetResultTrajectory[]>;
  mapsColor: string[];
  mapsText: string[];
  chartsData: Ref<Array<IChartDataOrigin[]>>;
  chartsColor: Array<string[]>;
  chartsText: Array<string[]>;
  fillConstant: (data: IEmbResult) => void;
} {
  const mapsData = ref<PoetResultTrajectory[]>([]);
  const mapsColor: string[] = ["#2FE644", "#E62112"];
  const mapsText: string[] = [
    "vEmb.chartHeaderNormalMap",
    "vEmb.chartHeaderAbnormalMap",
  ];
  const chartsData = ref<Array<IChartDataOrigin[]>>([]);
  const chartsColor: Array<string[]> = [
    ["#5470c6", "#91cc75"],
    ["#fac858", "#ee6666"],
    ["#73c0de", "#3ba272"],
    ["#fc8452", "#9a60b4"],
    ["#ea7ccc", "#c12e34"],
    ["#e6b600", "#0098d9"],
    ["#2b821d", "#005eaa"],
    ["#339ca8", "#cda819"],
  ];
  const chartsText: Array<string[]> = [
    [
      "vEmb.chartHeaderNormalLocationInDegree",
      "vEmb.chartHeaderNormalLocationOutDegree",
    ],
    [
      "vEmb.chartHeaderAbnormalLocationInDegree",
      "vEmb.chartHeaderAbnormalLocationOutDegree",
    ],
    [
      "vEmb.chartHeaderNormalCityInDegree",
      "vEmb.chartHeaderNormalCityOutDegree",
    ],
    [
      "vEmb.chartHeaderAbnormalCityInDegree",
      "vEmb.chartHeaderAbnormalCityOutDegree",
    ],
    [
      "vEmb.chartHeaderNormalProvinceInDegree",
      "vEmb.chartHeaderNormalProvinceOutDegree",
    ],
    [
      "vEmb.chartHeaderAbnormalProvinceInDegree",
      "vEmb.chartHeaderAbnormalProvinceOutDegree",
    ],
    [
      "vEmb.chartHeaderNormalCountryInDegree",
      "vEmb.chartHeaderNormalCountryOutDegree",
    ],
    [
      "vEmb.chartHeaderAbnormalCountryInDegree",
      "vEmb.chartHeaderAbnormalCountryOutDegree",
    ],
  ];

  const fillConstant = (data: IEmbResult) => {
    mapsData.value = [];
    chartsData.value = [];

    mapsData.value = parseTrajectory(data.trajectories);

    chartsData.value.push([data.normalLocationIn, data.normalLocationOut]);
    chartsData.value.push([data.abnormalLocationIn, data.abnormalLocationOut]);

    chartsData.value.push([data.normalCityIn, data.normalCityOut]);
    chartsData.value.push([data.abnormalCityIn, data.abnormalCityOut]);

    chartsData.value.push([data.normalProvinceIn, data.normalProvinceOut]);
    chartsData.value.push([data.abnormalProvinceIn, data.abnormalProvinceOut]);

    chartsData.value.push([data.normalCountryIn, data.normalCountryOut]);
    chartsData.value.push([data.abnormalCountryIn, data.abnormalCountryOut]);
  };

  return {
    mapsData,
    mapsColor,
    mapsText,
    chartsData,
    chartsColor,
    chartsText,
    fillConstant,
  };
}
