<template>
  <div>
    <n-card style="margin-bottom: 7px" :content-style="contentStyle">
      <div class="select-item item-poet">
        <b>
          <i>{{ t("vOLAM.selectPoet") }}:</i>
        </b>
        &nbsp;{{ selectedPoetLevel + " " + selectedPoetText }}&nbsp;
        <n-button
          text
          size="small"
          :loading="isLoading"
          @click="handleChangePoet"
        >
          <template #icon>
            <n-icon>
              <people-icon />
            </n-icon>
          </template>
          {{ t("vOLAM.selectChangeBtnText") }}
        </n-button>
      </div>

      <div class="select-item item-time">
        <b>
          <i>{{ t("vOLAM.selectTime") }}:</i>
        </b>
        &nbsp;{{ selectedTimeLevel + " " + selectedTimeText }}&nbsp;
        <n-button
          text
          size="small"
          :loading="isLoading"
          @click="handleChangeTime"
        >
          <template #icon>
            <n-icon>
              <time-icon />
            </n-icon>
          </template>
          {{ t("vOLAM.selectChangeBtnText") }}
        </n-button>
      </div>

      <div class="select-item item-geo">
        <b>
          <i>{{ t("vOLAM.selectGeo") }}:</i>
        </b>
        &nbsp;{{ selectedGeoLevel + " " + selectedGeoText }}&nbsp;
        <n-button
          text
          size="small"
          :loading="isLoading"
          @click="handleChangeGeo"
        >
          <template #icon>
            <n-icon>
              <geo-icon />
            </n-icon>
          </template>
          {{ t("vOLAM.selectChangeBtnText") }}
        </n-button>
      </div>

      <n-divider style="margin: 3px" />
      <n-space justify="end">
        <n-button
          text
          :loading="isLoading"
          :disabled="disableAnalysis"
          @click="handleOLAMConfirm"
        >
          <template #icon>
            <n-icon>
              <an-icon />
            </n-icon>
          </template>
          {{ t("vOLAM.selectConfirmBtnText") }}
        </n-button>
      </n-space>
    </n-card>
    <poet-drawer
      v-model:open-drawer="openPoetDrawer"
      v-model:current-selected="selectedPoetList"
      v-model:current-text="selectedPoetText"
      v-model:current-selected-level="selectedPoetLevel"
      :is-loading="isLoading"
    />
    <time-drawer
      v-model:open-drawer="openTimeDrawer"
      v-model:current-selected="selectedTimeList"
      v-model:current-text="selectedTimeText"
      v-model:current-selected-level="selectedTimeLevel"
      :is-loading="isLoading"
    />
    <geo-drawer
      v-model:open-drawer="openGeoDrawer"
      v-model:current-selected="selectedGeoList"
      v-model:current-text="selectedGeoText"
      v-model:current-selected-level="selectedGeoLevel"
      :is-loading="isLoading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { NCard, NSpace, NButton, NIcon, NDivider } from "naive-ui";
import {
  PeopleOutline as PeopleIcon,
  TimeOutline as TimeIcon,
  MapOutline as GeoIcon,
  CubeOutline as AnIcon,
} from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import { useApiData } from "@/composables/VTrajectoryOLAM/useApiData";
import { useStore } from "@/store";
import PoetDrawer from "./Drawer/PoetDrawer.vue";
import TimeDrawer from "./Drawer/TimeDrawer.vue";
import GeoDrawer from "./Drawer/GeoDrawer.vue";
import type { IOLAMResult } from "@/composables/VTrajectoryOLAM/IApiData";

export default defineComponent({
  name: "VOLAMSelectArea",
  components: {
    NCard,
    NSpace,
    NButton,
    NIcon,
    NDivider,
    PeopleIcon,
    TimeIcon,
    GeoIcon,
    AnIcon,
    PoetDrawer,
    TimeDrawer,
    GeoDrawer,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: {
    "update:isLoading"(payload: boolean) {
      return payload !== undefined;
    },
    olamData(payload: IOLAMResult) {
      return payload !== undefined;
    },
  },
  setup(props, context) {
    const { t } = useI18n();

    const selectedPoetText = ref("等待选择...");
    const selectedTimeText = ref("等待选择...");
    const selectedGeoText = ref("等待选择...");

    const selectedPoetLevel = ref("");
    const selectedTimeLevel = ref("");
    const selectedGeoLevel = ref("");

    const selectedPoetList = ref<string[] | number[]>([]);
    const selectedTimeList = ref<string[]>([]);
    const selectedGeoList = ref<string[]>([]);

    const openPoetDrawer = ref(false);
    const openTimeDrawer = ref(false);
    const openGeoDrawer = ref(false);

    const isLoadingVM = computed({
      get: () => props.isLoading,
      set: (val) => {
        context.emit("update:isLoading", val);
      },
    });
    const disableAnalysis = computed(
      () =>
        !(
          selectedPoetList.value?.length > 0 &&
          selectedTimeList.value?.length > 0 &&
          selectedGeoList.value?.length > 0
        )
    );

    const store = useStore();
    const { formOLAMBody, asyncGetOLAMResult } = useApiData(store);

    const handleOLAMConfirm = async () => {
      isLoadingVM.value = true;

      const body = formOLAMBody(
        selectedPoetList.value,
        selectedTimeList.value,
        selectedGeoList.value,
        selectedPoetLevel.value,
        selectedTimeLevel.value,
        selectedGeoLevel.value
      );
      const data = await asyncGetOLAMResult(body);
      context.emit("olamData", data);

      isLoadingVM.value = false;
    };

    // init page with pre-configred data
    // onMounted(async () => {
    //   const body = formOLAMBody(
    //     ["tang"],
    //     ["700-799", "800-899", "900-999", "1000-1099"],
    //     ["001", "002"],
    //     "dynasty",
    //     "century",
    //     "country"
    //   );
    //   const data = await asyncGetOLAMResult(body);
    //   // context.emit("olamData", data);
    //   console.log(
    //     "The init data, which need to hardcode to each charts:",
    //     data
    //   );
    // });

    return {
      t,
      selectedPoetText,
      selectedTimeText,
      selectedGeoText,

      selectedPoetList,
      selectedTimeList,
      selectedGeoList,

      selectedPoetLevel,
      selectedTimeLevel,
      selectedGeoLevel,

      openPoetDrawer,
      openTimeDrawer,
      openGeoDrawer,

      disableAnalysis,

      handleChangePoet: () => {
        openPoetDrawer.value = true;
      },
      handleChangeTime: () => {
        openTimeDrawer.value = true;
      },
      handleChangeGeo: () => {
        openGeoDrawer.value = true;
      },
      handleOLAMConfirm,

      contentStyle: "padding: 7px 10px 3px 10px",
    };
  },
});
</script>

<style scoped>
.select-item {
  display: flex;
  align-items: center;
}
</style>
