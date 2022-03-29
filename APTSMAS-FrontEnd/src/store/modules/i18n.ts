export interface IModuleI18n {
  local: string;
}

export const moduleI18n = {
  namespaced: true,
  state: (): IModuleI18n => {
    const localStrFromLS = localStorage.getItem("vue-i18n-local");
    return {
      local: localStrFromLS !== null ? localStrFromLS : "zhCN",
    };
  },
  mutations: {
    /**
     * set the state.local with newLocal
     * @param state
     * @param newLocal
     */
    setLocal(state: IModuleI18n, newLocal: string): void {
      state.local = newLocal;
      localStorage.setItem("vue-i18n-local", newLocal);
    },
  },
  actions: {},
  getters: {},
};
