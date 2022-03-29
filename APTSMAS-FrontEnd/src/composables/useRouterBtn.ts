import { ref, Ref, watch, computed, ComputedRef } from "vue";
import { Router, RouteLocationNormalized } from "vue-router";

type tType = (key: string | number) => string;

/**
 * interface of return type of useRouterBtn
 * @property `routerBtnOptions` the options obj for show in btn popup
 * @property `btnShownText` the display text on the btn
 * @property `handleSelect` callback of popoup click, will replace the route url
 */
interface useRouterBtnReturn {
  routerBtnOptions: ComputedRef<
    {
      label: string;
      key: string;
    }[]
  >;
  btnShownText: Ref<string>;
  handleSelect: (key: string) => void;
}

/**
 * hook for useing the Router Btn
 * @param `t` translate function
 * @param `currentLocal` Ref of the currentLocal
 * @param `router` the Vue-Router
 * @param `route` the Vue-Route
 * @returns see the interface `useRouterBtnReturn`
 */
export function useRouterBtn(
  t: tType,
  currentLocal: Ref<string>,
  router: Router,
  route: RouteLocationNormalized
): useRouterBtnReturn {
  // translated label
  const labelOriginalData = computed(() =>
    t("homePage.routerBtnText.originalData")
  );
  const labelTrajectoryOLAM = computed(() =>
    t("homePage.routerBtnText.olamAnalysis")
  );
  const labelTimeVariant = computed(() =>
    t("homePage.routerBtnText.timeVariant")
  );
  const labelTrajectoryEmbedding = computed(() =>
    t("homePage.routerBtnText.trajEmbed")
  );
  const labelSpaceScaleVisualization = computed(() =>
    t("homePage.routerBtnText.spaceScale")
  );
  const options = computed(() => [
    {
      label: labelOriginalData.value,
      key: "OriginalData",
    },
    {
      label: labelTrajectoryOLAM.value,
      key: "TrajectoryOLAM",
    },
    {
      label: labelTimeVariant.value,
      key: "TimeVariant",
    },
    {
      label: labelTrajectoryEmbedding.value,
      key: "TrajectoryEmbedding",
    },
    {
      label: labelSpaceScaleVisualization.value,
      key: "SpaceScaleVisualization",
    },
  ]);

  // click btn callback
  const handleSelect = (key: string) => {
    router.push({ name: key });
  };

  // watch for the i18n locale change
  const btnShownText = ref("");
  watch([() => route.name, currentLocal], (newValues) => {
    for (const i of options.value)
      if (i.key === newValues[0]) {
        btnShownText.value = i.label;
        return;
      }
    btnShownText.value = "404";
  });

  return {
    routerBtnOptions: options,
    btnShownText,
    handleSelect,
  };
}
