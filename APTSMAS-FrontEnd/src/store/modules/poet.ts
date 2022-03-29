import { poet2Id } from "./poet/Poet2Id";
import { IPoet2Id } from "./poet/IPoet2Id";
import { id2Poet } from "./poet/Id2Poet";
import { IId2Poet } from "./poet/IId2Poet";

export interface IModulePoet {
  poet2Id: IPoet2Id;
  id2Poet: IId2Poet;
}

export const modulePoet = {
  namespaced: true,
  state: (): IModulePoet => {
    return {
      poet2Id,
      id2Poet,
    };
  },
  mutations: {},
  actions: {},
  getters: {},
};
