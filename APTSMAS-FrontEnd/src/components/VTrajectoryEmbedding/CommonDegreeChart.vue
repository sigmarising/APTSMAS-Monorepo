<template>
  <NCard style="margin-bottom: 7px" :content-style="contentStyle">
    <NP style="margin-bottom: 7px; font-weight: bold">
      {{ t(chartTransPath) }}
    </NP>
    <div ref="chartRef" style="width: 100%; height: 400px"></div>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NP } from "naive-ui";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onBeforeUnmount, onMounted, PropType, ref, toRefs, watch } from "vue";
import { IChartDataOrigin } from "@/composables/VTrajectoryEmbedding/IApiData";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { useCDChartOption } from "@/composables/VTrajectoryEmbedding/useCDChartOption";

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
  chartData: {
    type: Object as PropType<IChartDataOrigin>,
    required: false,
    default: () => null,
    validator: (thing: IChartDataOrigin) => thing !== undefined,
  },
  chartColor: {
    type: String,
    required: true,
    default: "#000000",
  },
  chartTransPath: {
    type: String,
    required: true,
    default: "The Common Degree Chart",
  },
});

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | null = null;
echarts.use([
  BarChart,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LabelLayout,
  CanvasRenderer,
]);

const { isLoading, updateTime, chartData, chartColor, chartTransPath } =
  toRefs(props);
const store = useStore();
const { t } = useI18n();
const { handleOption } = useCDChartOption(store);
const contentStyle = "padding: 7px";

const resizeHandler = () => {
  chart?.resize();
};

watch(isLoading, (val) => {
  if (val) {
    chart?.showLoading();
  } else {
    chart?.hideLoading();
  }
});
watch(updateTime, () => {
  const option = handleOption(chartData.value, chartColor.value);
  chart?.setOption(option, { replaceMerge: ["series", "xAxis"] });
});

onMounted(() => {
  chart = echarts.init(chartRef.value as HTMLDivElement);
  chart.setOption(handleOption(chartData.value, chartColor.value));

  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  chart?.dispose();
});
</script>
