<template>
  <NSpin :show="showLoading">
    <NCard style="margin-bottom: 7px" :content-style="contentStyle">
      <NSpace vertical>
        <NP style="margin-bottom: 7px; font-weight: bold">
          {{ t("vEmb.mapHeader") }}
        </NP>
        <NSelect
          multiple
          filterable
          clearable
          :fallback-option="false"
          :placeholder="t('vEmb.poetSelectPlaceHolder')"
          :loading="showLoading"
          :options="poetsOption"
          v-model:value="vmPoets"
        />
        <NSpace justify="end">
          <NButton
            text
            :loading="showLoading"
            :disabled="disableShow"
            @click="handleUpdateMap"
          >
            <template #icon>
              <NIcon>
                <ConfirmIcon />
              </NIcon>
            </template>
            {{ t("vEmb.showBtnText") }}
          </NButton>
        </NSpace>
        <div ref="mapRef" style="width: 100%; height: 500px"></div>
      </NSpace>
    </NCard>
  </NSpin>
</template>

<script setup lang="ts">
/*global AMap*/
import { NCard, NP, NSpin, NSelect, NSpace, NButton, NIcon } from "naive-ui";
import { CodeSharp as ConfirmIcon } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";

import type { PoetResultTrajectory } from "@/composables/VTrajectoryEmbedding/IApiData";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  PropType,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import { useStore } from "@/store";
import { useAMap } from "@/composables/AMap/useAMap";
import {
  useMapData,
  USE_CUSTOM_MAP_STYLE,
} from "@/composables/VTrajectoryEmbedding/useMapData";
import { usePoetsSelectOptions } from "@/composables/VTrajectoryEmbedding/SelectOptionData";

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: false,
  },
  updateTime: {
    type: String,
    required: true,
    default: Date(),
  },
  mapColor: {
    type: Array as PropType<string[]>,
    required: true,
    validator: (i: string[]) => {
      return i != undefined;
    },
    default: () => ["#000000", "#000000"],
  },
  mapData: {
    type: Array as PropType<PoetResultTrajectory[]>,
    required: true,
    validator: (i: PoetResultTrajectory[]) => {
      return i != undefined;
    },
    default: () => [],
  },
});

const { t } = useI18n();
const store = useStore();
const { asyncLoadAMap } = useAMap(store);
const { isLoading, mapColor, mapData, updateTime } = toRefs(props);
const contentStyle = "padding: 7px";

const mapRef = ref<HTMLDivElement>();
let map: AMap.Map | null = null;

const vmPoets = ref<number[] | null>(null);
const { poetsOption } = usePoetsSelectOptions(store);
const isMapLoading = ref<boolean>(false);
const handleUpdateMap: Ref<(() => void) | undefined> = ref(undefined);
let linesList = ref<AMap.BezierCurve[]>([]);

onMounted(async () => {
  const AMap = await asyncLoadAMap();
  if (mapRef.value) {
    map = new AMap.Map(mapRef.value, {
      zoom: 5.0,
      center: [109.595668, 35.447184],
      mapStyle: USE_CUSTOM_MAP_STYLE
        ? "amap://styles/14e352c818d3b9d845f66beb9375fb7d"
        : "amap://styles/fresh",
      features: ["bg", "point", "road"],
      zooms: USE_CUSTOM_MAP_STYLE ? [2, 20] : [2, 8],
    });
  }
  const { updateMap, bezierLineList } = useMapData(
    vmPoets,
    mapData,
    mapColor.value,
    AMap,
    map
  );
  handleUpdateMap.value = () => {
    isMapLoading.value = true;
    updateMap();
    isMapLoading.value = false;
  };
  linesList = bezierLineList;
});

watch(updateTime, () => {
  map?.clearMap();

  for (const line of linesList.value) line?.destroy();
  linesList.value = [];

  vmPoets.value = null;
});

onBeforeUnmount(() => {
  for (const line of linesList.value) line.destroy();
  map?.destroy();
});

const disableShow = computed(() => {
  return (
    vmPoets.value === null ||
    vmPoets.value.length === 0 ||
    handleUpdateMap.value === undefined
  );
});
const showLoading = computed(() => {
  return isLoading.value || isMapLoading.value;
});
</script>
