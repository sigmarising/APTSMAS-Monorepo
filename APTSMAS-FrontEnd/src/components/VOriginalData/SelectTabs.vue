<template>
  <n-card style="margin-bottom: 7px" :content-style="contentStyle">
    <n-tabs type="card">
      <!-- poet -->
      <n-tab-pane name="poet" :tab="textTabPoet">
        <n-space vertical>
          <n-select
            v-model:value="vmPoet"
            filterable
            clearable
            :placeholder="textSelectPoet"
            :options="poetOption"
            :fallback-option="false"
            :loading="isLoading"
          />
          <n-space justify="end">
            <n-button
              text
              :loading="isLoading"
              :disabled="disablePoetBtn"
              @click="handlePoetBtnClick"
            >
              <template #icon>
                <n-icon>
                  <search-icon />
                </n-icon>
              </template>
              {{ t("vOriginalData.selectConfirmBtnText") }}
            </n-button>
          </n-space>
        </n-space>
      </n-tab-pane>

      <!-- location -->
      <n-tab-pane name="location" :tab="textTabLocation">
        <n-space vertical>
          <n-select
            v-model:value="vmCountry"
            filterable
            clearable
            :placeholder="textSelectCountry"
            :options="countryOptions"
            :fallback-option="false"
            :loading="isLoading"
            :disabled="false"
          />
          <n-select
            v-model:value="vmProvince"
            filterable
            clearable
            :placeholder="textSelectProvince"
            :options="provinceOptions"
            :fallback-option="false"
            :loading="isLoading"
            :disabled="disableProvince"
          />
          <n-select
            v-model:value="vmCity"
            filterable
            clearable
            :placeholder="textSelectCity"
            :options="cityOptions"
            :fallback-option="false"
            :loading="isLoading"
            :disabled="disableCity"
          />
          <n-select
            v-model:value="vmLocation"
            filterable
            clearable
            :placeholder="textSelectLocation"
            :options="locationOptions"
            :fallback-option="false"
            :loading="isLoading"
            :disabled="disableLocation"
          />
          <n-space justify="end">
            <n-button
              text
              :loading="isLoading"
              :disabled="disableLocationBtn"
              @click="handleLocationBtnClick"
            >
              <template #icon>
                <n-icon>
                  <search-icon />
                </n-icon>
              </template>
              {{ t("vOriginalData.selectConfirmBtnText") }}
            </n-button>
          </n-space>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  NCard,
  NTabs,
  NTabPane,
  NSelect,
  NButton,
  NIcon,
  NSpace,
} from "naive-ui";
import { Search as SearchIcon } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import { useSelectData } from "@/composables/VOriginalData/useSelectData";
import { useStore } from "@/store";

export default defineComponent({
  name: "VOriginalDataSelectTabs",
  components: {
    NCard,
    NTabs,
    NTabPane,
    NSelect,
    NButton,
    NIcon,
    SearchIcon,
    NSpace,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: {
    selectPoetId(payload: number) {
      return payload >= 0;
    },
    selectLocationId(payload: string) {
      return payload !== "";
    },
  },
  setup(props, context) {
    // translate text
    const { t } = useI18n();
    const textTabPoet = computed(() => t("vOriginalData.selectPoetTabText"));
    const textTabLocation = computed(() =>
      t("vOriginalData.selectLocationTabText")
    );
    const textSelectPoet = computed(() =>
      t("vOriginalData.selectPoetTextHolder")
    );
    const textSelectCountry = computed(() => t("vOriginalData.selectCountry"));
    const textSelectProvince = computed(() =>
      t("vOriginalData.selectProvince")
    );
    const textSelectCity = computed(() => t("vOriginalData.selectCity"));
    const textSelectLocation = computed(() =>
      t("vOriginalData.selectLocation")
    );

    const disablePoetBtn = computed(() => {
      return vmPoet.value !== undefined && vmPoet.value >= 0 ? false : true;
    });
    const disableProvince = computed(() => {
      return provinceOptions.value?.length ? false : true;
    });
    const disableCity = computed(() => {
      return cityOptions.value?.length ? false : true;
    });
    const disableLocation = computed(() => {
      return locationOptions.value?.length ? false : true;
    });
    const disableLocationBtn = computed(() => {
      return vmLocation.value ? false : true;
    });

    // v-model ref
    const vmPoet = ref<number>();
    const vmCountry = ref<string | null>(null);
    const vmProvince = ref<string | null>(null);
    const vmCity = ref<string | null>(null);
    const vmLocation = ref<string | null>(null);

    // data option
    const store = useStore();
    const {
      poetOption,
      countryOptions,
      provinceOptions,
      cityOptions,
      locationOptions,
    } = useSelectData(store, vmCountry, vmProvince, vmCity, vmLocation);

    // event handle
    const handlePoetBtnClick = () => {
      if (vmPoet.value !== undefined && vmPoet.value >= 0)
        context.emit("selectPoetId", vmPoet.value);
    };
    //
    const handleLocationBtnClick = () => {
      if (vmLocation.value) context.emit("selectLocationId", vmLocation.value);
    };

    return {
      t,
      textTabPoet,
      textTabLocation,
      textSelectPoet,
      textSelectCountry,
      textSelectProvince,
      textSelectCity,
      textSelectLocation,

      vmPoet,
      vmCountry,
      vmProvince,
      vmCity,
      vmLocation,

      disablePoetBtn,
      disableProvince,
      disableCity,
      disableLocation,
      disableLocationBtn,

      poetOption,
      countryOptions,
      provinceOptions,
      cityOptions,
      locationOptions,

      handlePoetBtnClick,
      handleLocationBtnClick,

      contentStyle: "padding: 7px 10px 3px 10px",
    };
  },
});
</script>
