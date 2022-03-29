<template>
  <n-card style="margin-bottom: 7px" :content-style="contentStyle">
    <n-p style="margin-bottom: 7px; font-weight: bold">
      {{ t("vOLAM.chartTitleTree") }}
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
  shallowRef,
  toRefs,
  watch,
} from "vue";
import * as echarts from "echarts/core";
import { TreeChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import { NCard, NP } from "naive-ui";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type { IVTree } from "@/composables/VTrajectoryOLAM/IApiData";
import { useStore } from "@/store";
import { useTreeOption } from "@/composables/VTrajectoryOLAM/Charts/useTreeOption";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "OLAMChartsTree",
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
      type: Object as PropType<IVTree>,
      required: false,
      default: () => null,
      validator: (thing: IVTree) => thing !== undefined,
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement>();
    const chart = shallowRef<echarts.ECharts>();
    echarts.use([
      TreeChart,
      TooltipComponent,
      GridComponent,
      LabelLayout,
      CanvasRenderer,
    ]);

    const { isLoading, updateTime, chartData } = toRefs(props);
    const store = useStore();
    const { t } = useI18n();
    const { handleOption, initOption } = useTreeOption(store);

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
      const option = handleOption(chartData.value);
      chart.value?.setOption(option, { replaceMerge: ["series"] });
    });

    onMounted(() => {
      chart.value = echarts.init(chartRef.value as HTMLDivElement);
      chart.value.setOption(initOption);

      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
      chart.value?.dispose();
    });

    return {
      t,
      chartRef,
      contentStyle: "padding: 7px",
    };
  },
});
</script>
