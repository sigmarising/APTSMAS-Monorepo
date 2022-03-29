<template>
  <n-card style="margin-bottom: 7px" :content-style="contentStyle">
    <n-p style="margin-bottom: 7px; font-weight: bold">
      {{ t("vOLAM.chartTitleLocationTopK") }}
    </n-p>
    <div ref="chartRef" style="width: 100%; height: 400px"></div>
  </n-card>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type { ILocationsTopK } from "@/composables/VTrajectoryOLAM/IApiData";
import { NCard, NP } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { useLocationTopKOption } from "@/composables/VTrajectoryOLAM/Charts/useLocationTopKOption";

export default defineComponent({
  name: "OLAMChartsLocationTopK",
  components: { NCard, NP },
  props: {
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
      type: Object as PropType<ILocationsTopK>,
      required: false,
      default: () => null,
      validator: (thing: ILocationsTopK) => thing !== undefined,
    },
  },

  setup(props) {
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

    const { isLoading, updateTime, chartData } = toRefs(props);
    const store = useStore();
    const { t } = useI18n();
    const { handleOption, initOption } = useLocationTopKOption(store);

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
      const option = handleOption(chartData.value);
      chart?.setOption(option, { replaceMerge: ["series", "xAxis"] });
    });

    onMounted(() => {
      chart = echarts.init(chartRef.value as HTMLDivElement);
      chart.setOption(initOption);

      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
      chart?.dispose();
    });

    return {
      t,
      chartRef,
      contentStyle: "padding: 7px",
    };
  },
});
</script>
