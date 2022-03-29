import { ref, Ref, watch } from "vue";
import type { IState } from "@/store";
import { Store } from "@/store";
import type { SelectOption, SelectGroupOption } from "naive-ui";

/**
 * hook to form the selects' data option
 * @param store vuex store
 * @param vmCountry v-model
 * @param vmProvince v-model
 * @param vmCity v-model
 * @param vmLocation v-model
 * @returns all needed options for naive ui select
 */
export function useSelectData(
  store: Store<IState>,
  vmCountry: Ref<string | null>,
  vmProvince: Ref<string | null>,
  vmCity: Ref<string | null>,
  vmLocation: Ref<string | null>
): {
  poetOption: SelectGroupOption[];
  countryOptions: SelectOption[];
  provinceOptions: Ref<SelectOption[]>;
  cityOptions: Ref<SelectOption[]>;
  locationOptions: Ref<SelectOption[]>;
} {
  // fetch from vuex
  const storePoet2Id = store.state.poets.poet2Id;
  const storeGeo2Id = store.state.geo.geo2Id;

  // define returns
  const poetOption: SelectGroupOption[] = [
    {
      type: "group",
      label: "唐",
      key: "tang",
      children: [],
    },
    {
      type: "group",
      label: "宋",
      key: "song",
      children: [],
    },
  ];
  const countryOptions: SelectOption[] = [];
  const provinceOptions = ref<SelectOption[]>([]);
  const cityOptions = ref<SelectOption[]>([]);
  const locationOptions = ref<SelectOption[]>([]);

  // form the optionPoet
  for (const key in storePoet2Id) {
    const item = storePoet2Id[key];

    let targetIndex = -1;
    if (item.dynasty === "唐") targetIndex = 0;
    else if (item.dynasty === "宋") targetIndex = 1;

    poetOption[targetIndex].children.push({
      label: key,
      value: item.id,
    });
  }

  // Method: Clear VmInst & optionsArr method
  const clearVmInst = (
    clearProvince = false,
    clearCity = false,
    clearLocation = false
  ) => {
    if (clearProvince) {
      vmProvince.value = null;
      provinceOptions.value = [];
    }
    if (clearCity) {
      vmCity.value = null;
      cityOptions.value = [];
    }
    if (clearLocation) {
      vmLocation.value = null;
      locationOptions.value = [];
    }
  };

  // form the countryOptions
  for (const country in storeGeo2Id)
    countryOptions.push({
      label: country,
      value: country,
    });

  // watch vmCountry and dynamic form provinceOptions
  watch(vmCountry, () => {
    clearVmInst(true, true, true);

    if (vmCountry.value) {
      for (const province in storeGeo2Id[vmCountry.value].content)
        provinceOptions.value?.push({
          label: province,
          value: province,
        });
    }
  });

  // watch vmProvince and dynamic form cityOptions
  watch(vmProvince, () => {
    clearVmInst(false, true, true);
    if (vmCountry.value && vmProvince.value) {
      for (const city in storeGeo2Id[vmCountry.value].content[vmProvince.value]
        .content)
        cityOptions.value?.push({
          label: city,
          value: city,
        });
    }
  });

  // watch vmCity and dynamic form locationOptions
  watch(vmCity, () => {
    clearVmInst(false, false, true);
    if (vmCountry.value && vmProvince.value && vmCity.value) {
      const item =
        storeGeo2Id[vmCountry.value].content[vmProvince.value].content[
          vmCity.value
        ].content;
      for (const location in item)
        locationOptions.value?.push({
          label: location,
          value: item[location].id,
        });
    }
  });

  return {
    poetOption,
    countryOptions,
    provinceOptions,
    cityOptions,
    locationOptions,
  };
}
