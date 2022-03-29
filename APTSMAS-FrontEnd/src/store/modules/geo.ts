import { geo2Id } from "./geo/Geo2Id";
import { IGeo2Id } from "./geo/IGeo2Id";
import { id2Geo } from "./geo/Id2Geo";
import { IId2Geo } from "./geo/IId2Geo";

export interface IGeoData {
  geo2Id: IGeo2Id;
  id2Geo: IId2Geo;
}

export const moduleGeo = {
  namespaced: true,
  state: (): IGeoData => {
    return {
      geo2Id,
      id2Geo,
    };
  },
  mutations: {},
  actions: {},
  getters: {},
};
