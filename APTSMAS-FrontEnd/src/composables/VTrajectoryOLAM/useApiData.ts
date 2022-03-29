import type { IOLAMResult, IOLAMPostBody } from "./IApiData";
import type { IState } from "@/store";
import { Store } from "@/store";
import axios from "axios";

export function useApiData(store: Store<IState>): {
  formOLAMBody: (
    poetList: number[] | string[],
    timeList: string[],
    geoList: string[],
    poetLevel: string,
    timeLevel: string,
    geoLevel: string
  ) => IOLAMPostBody;
  asyncGetOLAMResult: (body: IOLAMPostBody) => Promise<IOLAMResult>;
} {
  const formOLAMBody = (
    poetList: number[] | string[],
    timeList: string[],
    geoList: string[],
    poetLevel: string,
    timeLevel: string,
    geoLevel: string
  ): IOLAMPostBody => {
    // form poetPostBody
    const poetPostBody: {
      selectLevel: "poet" | "dynasty";
      selected: number[];
    } = {
      selectLevel: "poet",
      selected: [],
    };
    if (poetLevel === "dynasty") {
      poetPostBody.selectLevel = "dynasty";
      for (const item of poetList) {
        if (item === "tang") poetPostBody.selected.push(1);
        else if (item === "song") poetPostBody.selected.push(2);
      }
    } else {
      poetPostBody.selectLevel = "poet";
      poetPostBody.selected = poetList as number[];
    }

    // form timePostBody
    const timePostBody: {
      selectLevel: "year" | "decade" | "century";
      selected: {
        from: number;
        to: number;
      }[];
    } = {
      selectLevel: timeLevel as "year" | "decade" | "century",
      selected: [],
    };
    for (const item of timeList) {
      const items = item.split("-");
      timePostBody.selected.push({
        from: Number(items[0]),
        to: Number(items[1]),
      });
    }

    // form locationPostBody
    const geoPostBody: {
      selectLevel: "country" | "province" | "city" | "location";
      selected: string[];
    } = {
      selectLevel: geoLevel as "country" | "province" | "city" | "location",
      selected: geoList,
    };

    // final
    return {
      poet: poetPostBody,
      time: timePostBody,
      location: geoPostBody,
    };
  };

  const asyncGetOLAMResult = async (
    body: IOLAMPostBody
  ): Promise<IOLAMResult> => {
    const { data, status } = await axios.request({
      url: store.state.api.olamOperation.url,
      method: store.state.api.olamOperation.method,
      data: body,
    });

    if (status !== 200) throw Error("OLAM Operation Failed!");
    return data;
  };

  return {
    formOLAMBody,
    asyncGetOLAMResult,
  };
}
