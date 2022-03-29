<template>
  <NSpin :show="resetLoading">
    <NCard style="margin-bottom: 7px" :content-style="contentStyle">
      <NSpace vertical>
        <NSpace>
          <NP style="margin-bottom: 7px; font-weight: bold">
            {{
              t("vSpaceScale.mapHeaderText") +
              " - " +
              t("vSpaceScale.mapCurrentYear")
            }}
          </NP>
          <NP style="font-weight: bolder; color: red">
            {{ currentYear }}
          </NP>
        </NSpace>
        <div ref="mapRef" style="width: 100%; height: 700px"></div>
        <NSpace justify="end">
          <NButton
            text
            :loading="resetLoading"
            :disabled="false"
            @click="handleTimeReset"
          >
            <template #icon>
              <NIcon>
                <ResetIcon />
              </NIcon>
            </template>
            {{ t("vSpaceScale.mapResetTime") }}
          </NButton>
        </NSpace>
      </NSpace>
    </NCard>
  </NSpin>
</template>

<script setup lang="ts">
/*global AMap*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEdgeContent, INodeContent } from "@/composables/VSpaceScale/IApiData";
import { NCard, NP, NSpin, NSpace, NButton, NIcon } from "naive-ui";
import { Reload as ResetIcon } from "@vicons/ionicons5";
import { onBeforeUnmount, onMounted, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { useAMap } from "@/composables/AMap/useAMap";
import { MIN_YEAR } from "@/composables/VSpaceScale/constants";
import { useApiData } from "@/composables/VSpaceScale/useApiData";
import {
  useLocaAnimate,
  USE_PULSE_LINE,
  USE_CUSTOM_MAP_STYLE,
} from "@/composables/VSpaceScale/useLocaAnimate";
import type { DynamicHandlerFuncProto } from "@/composables/VSpaceScale/useLocaAnimate";

const { t } = useI18n();
const store = useStore();
const { asyncLoadAMap } = useAMap(store);
const { asyncGetSpaceScaleResult } = useApiData(store);

const resetLoading = ref(false);
const currentYear = ref<number>(MIN_YEAR);
const currentInterval = ref<number | null>(null);

const edges = ref<IEdgeContent>({});
const nodes = ref<INodeContent>({});
const contentStyle = "padding: 7px";

let lineLayer = ref<any | null>(null);
let scatterLayer = ref<any | null>(null);

const mapRef = ref<HTMLDivElement>();
let map: AMap.Map | null = null;
let loca: any | null = null;
const dynamicHandler = ref<
  | ((
      previousInterval: number | null,
      currentInterval: Ref<number | null>,
      currentYear: Ref<number>,
      edges: IEdgeContent,
      nodes: INodeContent
    ) => void)
  | null
>(null);

onMounted(async () => {
  // async get data
  const edgeData = await asyncGetSpaceScaleResult("edges");
  const nodeData = await asyncGetSpaceScaleResult("points");
  edges.value = JSON.parse(edgeData.content);
  nodes.value = JSON.parse(nodeData.content);

  // async load AMap
  const AMap = await asyncLoadAMap();

  // if mapRef ready, load AMap
  if (mapRef.value) {
    map = new AMap.Map(mapRef.value, {
      zoom: 5.0,
      center: [109.595668, 35.447184],
      showLabel: true,
      viewMode: "3D",
      pitch: USE_PULSE_LINE ? 0 : 48,
      mapStyle: USE_CUSTOM_MAP_STYLE
        ? "amap://styles/dc7e95ef99e69e0e5205764847a82959"
        : "amap://styles/dark",
    });
  }

  // if loca ready, load loca
  if (window.Loca) {
    loca = new window.Loca.Container({ map });
    const things = useLocaAnimate(window.Loca, loca);
    dynamicHandler.value = things.dynamicHandler;
    lineLayer = things.lineLayer;
    scatterLayer = things.scatterLayer;

    dynamicHandler.value(
      currentInterval.value,
      currentInterval,
      currentYear,
      edges.value,
      nodes.value
    );
  }
});

onBeforeUnmount(() => {
  if (currentInterval.value) window.clearInterval(currentInterval.value);
  lineLayer.value?.destroy();
  scatterLayer.value?.destroy();
  loca?.destroy();
  map?.clearMap();

  // When the `map?.destroy` is called
  // the browser console will log `please implement destroy for LayerRender` msg
  // I really don't know why this would happen.
  // If you have interest, you can try to fix this thing.
  map?.destroy();
});

const handleTimeReset = () => {
  resetLoading.value = true;

  if (currentInterval.value) {
    window.clearInterval(currentInterval.value);
    currentYear.value = MIN_YEAR;
  }
  (dynamicHandler.value as DynamicHandlerFuncProto)(
    currentInterval.value,
    currentInterval,
    currentYear,
    edges.value,
    nodes.value
  );

  resetLoading.value = false;
};
</script>
