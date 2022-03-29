import { ref, Ref, computed, watchEffect } from "vue";
import type { IState } from "@/store";
import { Store } from "@/store";
import { zhCN, dateZhCN, enUS, dateEnUS, NLocale, NDateLocale } from "naive-ui";

/**
 * useNuiLocaleChange returns
 * @property `nConfigLocale` locale
 * @property `nConfigDateLocale` dateLocale
 */
interface useNuiLocaleChangeReturn {
  nConfigLocale: Ref<NLocale | undefined>;
  nConfigDateLocale: Ref<NDateLocale | undefined>;
}

/**
 * Hook for the Naive UI locale Change
 * @param `store` the VueX store
 * @returns see `useNuiLocaleChangeReturn`
 */
export function useNuiLocaleChange(
  t: (s: string) => string,
  store: Store<IState>
): useNuiLocaleChangeReturn {
  const nConfigLocale = ref<NLocale>();
  const nConfigDateLocale = ref<NDateLocale>();

  const currentLocal = computed(() => store.state.i18n.local);

  watchEffect(() => {
    switch (currentLocal.value) {
      case "zhCN":
        nConfigLocale.value = zhCN;
        nConfigDateLocale.value = dateZhCN;
        break;
      case "enUS":
        nConfigLocale.value = enUS;
        nConfigDateLocale.value = dateEnUS;
        break;
      default:
        break;
    }
  });

  return {
    nConfigLocale,
    nConfigDateLocale,
  };
}
