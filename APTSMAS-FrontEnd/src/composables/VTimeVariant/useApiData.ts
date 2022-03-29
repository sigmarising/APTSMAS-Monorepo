import type { IState } from "@/store";
import { Store } from "@/store";
import axios from "axios";
import { ITimeVariantApiResponse } from "./IApiData";
import { TimeVariantType } from "./useSelectCardOptions";

export function useApiData(store: Store<IState>): {
  asyncGetTimeVariantResult: (
    searchType: TimeVariantType
  ) => Promise<ITimeVariantApiResponse>;
} {
  const asyncGetTimeVariantResult = async (searchType: TimeVariantType) => {
    const { data, status } = await axios.request({
      url: store.state.api.timeVariantSearch.url,
      method: store.state.api.timeVariantSearch.method,
      params: {
        searchType: searchType,
      },
    });

    if (status !== 200) throw new Error("GetTimeVariantResult Failed!");
    return data as ITimeVariantApiResponse;
  };

  return {
    asyncGetTimeVariantResult,
  };
}
