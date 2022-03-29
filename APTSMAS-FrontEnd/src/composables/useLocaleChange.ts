import { computed, WritableComputedRef, ComputedRef, watchEffect } from "vue";
import type { IState } from "@/store";
import { Store } from "@/store";

/**
 * interface of return types of useLocalChange
 * @property `localChangeDisplayText` the dispaly text for change locale btn
 * @property `changeLocal` the callback when click the changeLocal
 */
interface useLocalChangeReturn {
  localChangeDisplayText: ComputedRef<string>;
  changeLocal: () => void;
}

/**
 * hook for the i18n's local change
 * @param `t` the translate func
 * @param `locale` the Ref for locale
 * @param `store` the VueX store
 * @returns see the interface `useLocalChangeReturn`
 */
export function useLocalChange(
  t: (key: string | number) => string,
  locale: WritableComputedRef<string>,
  store: Store<IState>
): useLocalChangeReturn {
  // translated label
  const localChangeDisplayText = computed(() =>
    t("homePage.langChangeBtnText")
  );

  const localFromVueX = computed(() => store.state.i18n.local);
  locale.value = localFromVueX.value;

  // changeLocal btn click callback
  const changeLocal = () => {
    let targetLocal = "";
    switch (localFromVueX.value) {
      case "zhCN":
        targetLocal = "enUS";
        locale.value = targetLocal;
        store.commit("i18n/setLocal", targetLocal);
        break;
      case "enUS":
        targetLocal = "zhCN";
        locale.value = targetLocal;
        store.commit("i18n/setLocal", targetLocal);
        break;
      default:
        break;
    }
  };

  const computedTitle = computed(() => t("homePage.pageTitle"));
  watchEffect(() => {
    document.title = computedTitle.value;
  });

  return {
    localChangeDisplayText,
    changeLocal,
  };
}
