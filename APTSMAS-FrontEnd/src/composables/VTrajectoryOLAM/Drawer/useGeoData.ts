import type { SelectOption } from "naive-ui";
import type { IState } from "@/store";
import { Store } from "@/store";
import {
  computed,
  WritableComputedRef,
  ref,
  Ref,
  ComputedRef,
  watch,
} from "vue";

export function useGeoData(
  store: Store<IState>,
  t: (s: string) => string,
  drillDownSelectVM: Ref<string | null>,
  slicingSelectVM: Ref<string[] | null>,
  displayText: WritableComputedRef<string>
): {
  rollUpEnable: ComputedRef<boolean>;
  drillDownEnable: ComputedRef<boolean>;
  drillDownHintText: ComputedRef<string>;
  drillDownOptions: Ref<SelectOption[]>;
  slicingOptions: Ref<SelectOption[]>;
  currentLevel: Ref<"country" | "province" | "city" | "location">;
  drillDownSelectEnable: ComputedRef<boolean>;
  slicingSelectEnable: ComputedRef<boolean>;
  handleRollUp: () => void;
  handleDrillDown: () => void;
} {
  // var statement
  const currentLevel = ref<"country" | "province" | "city" | "location">(
    "country"
  );
  const rollUpEnable = computed(() =>
    currentLevel.value === "country" ? false : true
  );
  const drillDownEnable = computed(() =>
    drillDownSelectVM.value !== null ? true : false
  );
  const drillDownOptions = ref<SelectOption[]>([]);
  const slicingOptions = ref<SelectOption[]>([]);
  const drillDownHintText = computed(() =>
    drillDownOptions.value.length > 0
      ? t("vOLAM.drawerDrillDownEnable")
      : t("vOLAM.drawerDrillDownDisable")
  );
  const drillDownSelectEnable = computed(() =>
    drillDownOptions.value.length > 0 ? true : false
  );
  const slicingSelectEnable = computed(() =>
    slicingOptions.value.length > 0 ? true : false
  );
  let selectedCountryId = "";
  let selectedProvinceId = "";
  let selectedCityId = "";

  // vuex data
  const storeGeo2Id = store.state.geo.geo2Id;
  const storeId2Geo = store.state.geo.id2Geo;

  // function: return the formed options
  // need to be called after the setter of:
  // currentLevel, selectedCountryId, selectedProvinceId, selectedCityId, selectedLocationId
  const formOptions = () => {
    const resultOptions: SelectOption[] = [];

    if (currentLevel.value === "country") {
      for (const key in storeGeo2Id) {
        resultOptions.push({
          label: key,
          value: storeGeo2Id[key]["id"],
        });
      }
    } else if (currentLevel.value === "province") {
      const countryName = storeId2Geo[selectedCountryId].name;
      const target = storeGeo2Id[countryName].content;
      for (const key in target) {
        resultOptions.push({
          label: key,
          value: target[key]["id"],
        });
      }
    } else if (currentLevel.value === "city") {
      const countryName = storeId2Geo[selectedCountryId].name;
      const provinceName = storeId2Geo[selectedProvinceId].name;
      const target = storeGeo2Id[countryName].content[provinceName].content;
      for (const key in target) {
        resultOptions.push({
          label: key,
          value: target[key]["id"],
        });
      }
    } else if (currentLevel.value === "location") {
      const countryName = storeId2Geo[selectedCountryId].name;
      const provinceName = storeId2Geo[selectedProvinceId].name;
      const cityName = storeId2Geo[selectedCityId].name;
      const target =
        storeGeo2Id[countryName].content[provinceName].content[cityName]
          .content;
      for (const key in target) {
        resultOptions.push({
          label: key,
          value: target[key]["id"],
        });
      }
    }

    return resultOptions;
  };

  // callback
  const handleRollUp = () => {
    if (currentLevel.value === "country") {
      return;
    } else if (currentLevel.value === "province") {
      currentLevel.value = "country";
    } else if (currentLevel.value === "city") {
      currentLevel.value = "province";
    } else if (currentLevel.value === "location") {
      currentLevel.value = "city";
    }
    slicingOptions.value = formOptions();
    drillDownOptions.value = slicingOptions.value;
    drillDownSelectVM.value = null;
    slicingSelectVM.value = null;
  };

  const handleDrillDown = () => {
    if (drillDownSelectVM.value !== null) {
      if (currentLevel.value === "country") {
        currentLevel.value = "province";

        selectedCountryId = drillDownSelectVM.value;
        slicingOptions.value = formOptions();
        drillDownOptions.value = slicingOptions.value;
      } else if (currentLevel.value === "province") {
        currentLevel.value = "city";

        selectedProvinceId = drillDownSelectVM.value;
        slicingOptions.value = formOptions();
        drillDownOptions.value = slicingOptions.value;
      } else if (currentLevel.value === "city") {
        currentLevel.value = "location";

        selectedCityId = drillDownSelectVM.value;
        slicingOptions.value = formOptions();
        drillDownOptions.value = [];
      } else if (currentLevel.value === "location") {
        return;
      }
      drillDownSelectVM.value = null;
      slicingSelectVM.value = null;
    }
  };

  // watch
  watch(slicingSelectVM, (val) => {
    if (val !== null) {
      const strList = [];
      let count = 0;
      for (const item of val) {
        count += 1;
        if (count > 3) {
          strList.push("等");
          break;
        }
        strList.push(storeId2Geo[item].name);
      }
      displayText.value = strList.join(", ");
    } else {
      displayText.value = "等待选择...";
    }
  });

  // init value
  slicingOptions.value = formOptions();
  drillDownOptions.value = slicingOptions.value;

  return {
    rollUpEnable,
    drillDownEnable,
    drillDownHintText,
    drillDownOptions,
    slicingOptions,
    currentLevel,
    drillDownSelectEnable,
    slicingSelectEnable,
    handleRollUp,
    handleDrillDown,
  };
}
