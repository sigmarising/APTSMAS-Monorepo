interface IValItem {
  name: string;
  value: number;
}

interface IVecItem {
  from: string;
  to: string;
  value: number;
}

interface ITreeItem {
  type: string;
  items: string[];
}

export interface IPoetsTopK {
  k: number;
  items: IValItem[];
}

export interface ILocationsTopK {
  k: number;
  items: IValItem[];
}

export interface IProvincesTopK {
  k: number;
  items: IValItem[];
}

export interface IFreqLocations {
  percent: number;
  items: IVecItem[];
}

export interface IFreqProvinces {
  percent: number;
  items: IVecItem[];
}

export interface IOutlierLocations {
  percent: number;
  items: IVecItem[];
}

export interface IOutlierProvinces {
  percent: number;
  items: IVecItem[];
}

export interface IYearTopK {
  k: number;
  items: IValItem[];
}

export interface IDecadeTopK {
  k: number;
  items: IValItem[];
}

export interface ICenturyTopK {
  k: number;
  items: IValItem[];
}

export interface IVTree {
  poet: ITreeItem;
  time: ITreeItem;
  location: ITreeItem;
}

export interface IOLAMResult {
  poetsTopK: IPoetsTopK;
  locationsTopK: ILocationsTopK;
  provincesTopK: IProvincesTopK;
  freqLocations: IFreqLocations;
  freqProvinces: IFreqProvinces;
  outlierLocations: IOutlierLocations;
  outlierProvinces: IOutlierProvinces;
  yearTopK: IYearTopK;
  decadeTopK: IDecadeTopK;
  centuryTopK: ICenturyTopK;
  vtree: IVTree;
}

export interface IOLAMPostBody {
  poet: {
    selectLevel: "poet" | "dynasty";
    selected: number[];
  };
  time: {
    selectLevel: "year" | "decade" | "century";
    selected: {
      from: number;
      to: number;
    }[];
  };
  location: {
    selectLevel: "country" | "province" | "city" | "location";
    selected: string[];
  };
}
