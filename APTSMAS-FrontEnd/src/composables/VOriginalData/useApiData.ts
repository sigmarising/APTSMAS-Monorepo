import type { IState } from "@/store";
import { Store } from "@/store";
import axios from "axios";

type JsonStr = string;
interface IRawPoetInfoData {
  id: number;
  name: string;
  dynasty: string;
  lifeStart: number;
  lifeEnd: number;
  mapConfig: JsonStr;
  reference: JsonStr;
  agesDetail: JsonStr;
  travelDetail: JsonStr;
}

interface IMapConfig {
  center: {
    lat: number;
    lng: number;
  };
  scaleLevel: number;
}

export interface IAgesDetailItem {
  agesDuration: number[];
  correspondPath: string[];
}

export interface ITravelDetail {
  lines: {
    markers: {
      id: string;
      lat: number;
      lng: number;
      regionId: string;
      location: string;
      city: string;
      province: string;
      country: string;
      visitYear: number;
    }[];
  }[];
  markers: {
    lat: number;
    lng: number;
    id: string;
    regionId: string;
    location: string;
    city: string;
    province: string;
    country: string;
    visitTimes: number;
    visitYears: number[];
    detail: string[];
  }[];
}

export interface IPoetInfoData {
  id: number;
  name: string;
  dynasty: string;
  lifeStart: number;
  lifeEnd: number;
  mapConfig: IMapConfig;
  reference: string[];
  agesDetail: IAgesDetailItem[];
  travelDetail: ITravelDetail;
}

export function useApiData(store: Store<IState>): {
  asyncGetPoetInfoByPoetId: (poetId: number) => Promise<IPoetInfoData>;
  asyncGetPoetInfoListByLocationId: (
    locationId: string
  ) => Promise<IPoetInfoData[]>;
} {
  const parsePoetInfoData = (rawData: IRawPoetInfoData): IPoetInfoData => {
    return {
      id: rawData.id,
      name: rawData.name,
      dynasty: rawData.dynasty,
      lifeStart: rawData.lifeStart,
      lifeEnd: rawData.lifeEnd,
      mapConfig: JSON.parse(rawData.mapConfig),
      reference: JSON.parse(rawData.reference),
      agesDetail: JSON.parse(rawData.agesDetail),
      travelDetail: JSON.parse(rawData.travelDetail),
    };
  };

  const asyncGetPoetInfoByPoetId = async (
    poetId: number
  ): Promise<IPoetInfoData> => {
    const { data, status } = await axios.request({
      url: store.state.api.getPoetInfoByPoetId.url + "/" + poetId.toString(),
      method: store.state.api.getPoetInfoByPoetId.method,
    });

    if (status !== 200) throw new Error("GetPoetInfoByPoetId Failed");
    return parsePoetInfoData(data);
  };

  const asyncGetPoetInfoListByLocationId = async (
    locationId: string
  ): Promise<IPoetInfoData[]> => {
    const { data, status } = await axios.request({
      url: store.state.api.getPoetInfoListByLocationId.url,
      method: store.state.api.getPoetInfoListByLocationId.method,
      params: {
        locationId: locationId,
      },
    });

    if (status !== 200) throw new Error("GetPoetInfoByPoetId Failed");
    return (data as { poetList: IRawPoetInfoData[] }).poetList.map((rawData) =>
      parsePoetInfoData(rawData)
    );
  };

  return {
    asyncGetPoetInfoByPoetId,
    asyncGetPoetInfoListByLocationId,
  };
}
