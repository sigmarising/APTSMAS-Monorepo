import { SelectOption } from "naive-ui";
import { computed, ComputedRef } from "vue";

export type TimeVariantType =
  | "poetTravel"
  | "locationTravel"
  | "cityTravel"
  | "provinceTravel"
  | "yearTravel"
  | "decadeTravel"
  | "centuryTravel"
  | "routeLocationTravel"
  | "routeCityTravel"
  | "routeProvinceTravel";

export function useSelectCardOptions(t: (s: string) => string): {
  options: ComputedRef<SelectOption[]>;
} {
  const options: ComputedRef<SelectOption[]> = computed(() => [
    {
      label: t("vTimeVariant.chartHeaderPoetTravel"),
      value: "poetTravel",
    },
    {
      label: t("vTimeVariant.chartLocationTravel"),
      value: "locationTravel",
    },
    {
      label: t("vTimeVariant.chartCityTravel"),
      value: "cityTravel",
    },
    {
      label: t("vTimeVariant.chartProvinceTravel"),
      value: "provinceTravel",
    },
    {
      label: t("vTimeVariant.chartYearTravel"),
      value: "yearTravel",
    },
    {
      label: t("vTimeVariant.chartDecadeTravel"),
      value: "decadeTravel",
    },
    {
      label: t("vTimeVariant.chartCenturyTravel"),
      value: "centuryTravel",
    },
    {
      label: t("vTimeVariant.chartRouteLocationTravel"),
      value: "routeLocationTravel",
    },
    {
      label: t("vTimeVariant.chartRouteCityTravel"),
      value: "routeCityTravel",
    },
    {
      label: t("vTimeVariant.chartRouteProvinceTravel"),
      value: "routeProvinceTravel",
    },
  ]);

  return {
    options,
  };
}
