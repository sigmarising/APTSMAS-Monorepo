import type {
  IEmbResult,
  ITrajectory,
  PoetResultTrajectory,
  PoetResultTrajectoryRaw,
} from "./IApiData";
import type { IState } from "@/store";
import { Store } from "@/store";
import axios from "axios";

export function useApiData(store: Store<IState>): {
  asyncGetEmbeddingResult: (
    kernelId: number,
    typeId: number
  ) => Promise<IEmbResult>;
  parseTrajectory: (traj: PoetResultTrajectoryRaw[]) => PoetResultTrajectory[];
} {
  const asyncGetEmbeddingResult: (
    kernelId: number,
    typeId: number
  ) => Promise<IEmbResult> = async (kernelId: number, typeId: number) => {
    const { data, status } = await axios.request({
      url: store.state.api.embeddingResult.url,
      method: store.state.api.embeddingResult.method,
      params: {
        kernelId,
        algorithmId: typeId,
      },
    });

    if (status !== 200) throw new Error("GetEmbeddingResult Failed!");
    return data as IEmbResult;
  };

  const parseTrajectory = (traj: PoetResultTrajectoryRaw[]) => {
    const result: PoetResultTrajectory[] = [];

    for (const item of traj) {
      result.push({
        id: item.id,
        normal: item.normal,
        trajectory: JSON.parse(item.trajectory) as ITrajectory,
      });
    }

    return result;
  };

  return {
    asyncGetEmbeddingResult,
    parseTrajectory,
  };
}
