<template>
  <NCard style="margin-bottom: 7px" :content-style="contentStyle">
    <NP style="margin-bottom: 7px; font-weight: bold">
      {{ t("vEmb.chartHeaderTree") }}
    </NP>
    <div ref="chartRef" style="width: 100%; height: 400px"></div>
  </NCard>
</template>

<script setup lang="ts">
import { PoetResultTrajectory } from "@/composables/VTrajectoryEmbedding/IApiData";
import {
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  shallowRef,
  toRefs,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import * as echarts from "echarts/core";
import { TreeChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import { NCard, NP } from "naive-ui";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useStore } from "@/store";
import { useTreeOption } from "@/composables/VTrajectoryEmbedding/TreeCharts";

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
  mapData: {
    type: Array as PropType<PoetResultTrajectory[]>,
    required: true,
    validator: (i: PoetResultTrajectory[]) => {
      return i != undefined;
    },
    default: () => [],
  },
});

const chartRef = ref<HTMLDivElement>();
const chart = shallowRef<echarts.ECharts>();
echarts.use([
  TreeChart,
  TooltipComponent,
  GridComponent,
  LabelLayout,
  CanvasRenderer,
]);

const { isLoading, updateTime, mapData } = toRefs(props);
const { t } = useI18n();
const store = useStore();
const contentStyle = "padding: 7px";
const { handleOption } = useTreeOption(store);

const resizeHandler = () => {
  chart.value?.resize();
};

watch(isLoading, (val) => {
  if (val) {
    chart.value?.showLoading();
  } else {
    chart.value?.hideLoading();
  }
});
watch(updateTime, () => {
  const option = handleOption(mapData.value);
  chart.value?.setOption(option, { replaceMerge: ["series"] });
});

onMounted(() => {
  chart.value = echarts.init(chartRef.value as HTMLDivElement);
  chart.value.setOption(handleOption(mapData.value));

  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  chart.value?.dispose();
});
</script>
