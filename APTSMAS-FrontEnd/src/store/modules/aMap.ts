export interface IModuleAMap {
  secretKey: string;
}

export const moduleAMap = {
  namespaced: true,
  state: (): IModuleAMap => {
    return {
      secretKey: "8aaffa75279c3bcc900235927c77f9d5",
    };
  },
  mutations: {},
  actions: {},
  getters: {},
};
