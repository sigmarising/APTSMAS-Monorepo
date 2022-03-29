import { IGeoData, moduleGeo } from "./modules/geo";
import { IModulePoet, modulePoet } from "./modules/poet";
import { IModuleAMap, moduleAMap } from "./modules/aMap";
import { IModuleI18n, moduleI18n } from "./modules/i18n";
import { IModuleApi, moduleApi } from "./modules/api";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface IState {
  geo: IGeoData;
  poets: IModulePoet;
  aMap: IModuleAMap;
  i18n: IModuleI18n;
  api: IModuleApi;
}

export const key: InjectionKey<Store<IState>> = Symbol();

export const store = createStore({
  modules: {
    geo: moduleGeo,
    poets: modulePoet,
    aMap: moduleAMap,
    i18n: moduleI18n,
    api: moduleApi,
  },
});

export function useStore(): Store<IState> {
  return baseUseStore(key);
}

export { Store };
