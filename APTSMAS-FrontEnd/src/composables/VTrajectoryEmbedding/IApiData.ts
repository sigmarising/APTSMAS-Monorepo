export interface ITrajectoryPoint {
  lat: number;
  lng: number;
}

export type ITrajectory = ITrajectoryPoint[];

export interface PoetResultTrajectoryRaw {
  id: number;
  normal: boolean;
  trajectory: string;
}

export interface PoetResultTrajectory {
  id: number;
  normal: boolean;
  trajectory: ITrajectory;
}

interface IValItem {
  name: string;
  value: number;
}

export interface IChartDataOrigin {
  k: number;
  items: IValItem[];
}

export interface IEmbResult {
  trajectories: PoetResultTrajectoryRaw[];

  normalLocationIn: IChartDataOrigin;
  normalCityIn: IChartDataOrigin;
  normalProvinceIn: IChartDataOrigin;
  normalCountryIn: IChartDataOrigin;

  normalLocationOut: IChartDataOrigin;
  normalCityOut: IChartDataOrigin;
  normalProvinceOut: IChartDataOrigin;
  normalCountryOut: IChartDataOrigin;

  abnormalLocationIn: IChartDataOrigin;
  abnormalCityIn: IChartDataOrigin;
  abnormalProvinceIn: IChartDataOrigin;
  abnormalCountryIn: IChartDataOrigin;

  abnormalLocationOut: IChartDataOrigin;
  abnormalCityOut: IChartDataOrigin;
  abnormalProvinceOut: IChartDataOrigin;
  abnormalCountryOut: IChartDataOrigin;
}
