interface IApi {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
}

export interface IModuleApi {
  getPoetInfoByPoetId: IApi;
  getPoetInfoListByLocationId: IApi;
  olamOperation: IApi;
  timeVariantSearch: IApi;
  embeddingResult: IApi;
  spaceScaleSearch: IApi;
}

export const moduleApi = {
  namespaced: true,
  state: (): IModuleApi => ({
    getPoetInfoByPoetId: {
      url: "/api/v1/poet/poetInfo",
      method: "get",
    },
    getPoetInfoListByLocationId: {
      url: "/api/v1/poet/poetInfoList",
      method: "get",
    },
    olamOperation: {
      url: "/api/v1/olam/search",
      method: "post",
    },
    timeVariantSearch: {
      url: "/api/v1/timeVariant/search",
      method: "get",
    },
    embeddingResult: {
      url: "/api/v1/emb/result",
      method: "get",
    },
    spaceScaleSearch: {
      url: "/api/v1/spaceScale/search",
      method: "get",
    },
  }),
  mutations: {},
  actions: {},
  getters: {},
};
