import { IState } from "@/store";
import { Store } from "@/store";
import axios from "axios";
import { ISpaceScaleSearchResult } from "./IApiData";

export function useApiData(store: Store<IState>): {
  asyncGetSpaceScaleResult: (
    searchType: "edges" | "points"
  ) => Promise<ISpaceScaleSearchResult>;
} {
  const asyncGetSpaceScaleResult = async (searchType: "edges" | "points") => {
    const { data, status } = await axios.request({
      url: store.state.api.spaceScaleSearch.url,
      method: store.state.api.spaceScaleSearch.method,
      params: {
        searchType: searchType,
      },
    });

    if (status !== 200) throw new Error("GetSpaceScaleResult Failed!");
    return data as ISpaceScaleSearchResult;
  };

  return {
    asyncGetSpaceScaleResult,
  };
}
