<template>
  <n-card style="margin-bottom: 7px" :content-style="contentStyle">
    <n-space vertical>
      <n-space>
        <n-p style="margin-bottom: 7px; font-weight: bold">
          {{ headerText + " - " + t("vTimeVariant.chartCurrentYear") }}
        </n-p>
        <n-p style="font-weight: bolder; color: red">
          {{ currentYear }}
        </n-p>
      </n-space>
      <div ref="chartRef" style="width: 100%; height: 470px"></div>
      <n-space justify="end">
        <n-button
          text
          :loading="isLoading || resetLoading"
          :disabled="false"
          @click="handleTimeReset"
        >
          <template #icon>
            <n-icon>
              <reset-icon />
            </n-icon>
          </template>
          {{ t("vTimeVariant.chartResetTime") }}
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script lang="ts">
import {
  computed,
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
import { NCard, NP, NSpace, NButton, NIcon } from "naive-ui";
import { Reload as ResetIcon } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import { useTimeVariantOption } from "@/composables/VTimeVariant/useChartOptions";
import { ITimeVariantApiResponse } from "@/composables/VTimeVariant/IApiData";
import { MIN_YEAR } from "@/composables/VTimeVariant/constants";

export default defineComponent({
  name: "OLAMChartsPoetTopK",
  components: { NCard, NP, NSpace, NButton, NIcon, ResetIcon },
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
      type: Object as PropType<ITimeVariantApiResponse>,
      required: false,
      default: () => null,
      validator: (thing: ITimeVariantApiResponse) => thing !== undefined,
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

    const currentYear = ref<number>(MIN_YEAR);
    const currentInterval = ref<number | null>(null);
    const { isLoading, updateTime, chartData } = toRefs(props);
    const { t } = useI18n();
    const { dynamicHandler } = useTimeVariantOption();
    const resetLoading = ref(false);

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
      dynamicHandler(
        currentInterval.value,
        currentInterval,
        chart as echarts.ECharts,
        chartData.value,
        currentYear
      );
    });

    onMounted(() => {
      chart = echarts.init(chartRef.value as HTMLDivElement);
      dynamicHandler(
        currentInterval.value,
        currentInterval,
        chart as echarts.ECharts,
        chartData.value,
        currentYear
      );

      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      if (currentInterval.value) window.clearInterval(currentInterval.value);
      window.removeEventListener("resize", resizeHandler);
      chart?.dispose();
    });

    const handleTimeReset = () => {
      resetLoading.value = true;
      if (currentInterval.value) {
        currentYear.value = MIN_YEAR;
      } else {
        dynamicHandler(
          currentInterval.value,
          currentInterval,
          chart as echarts.ECharts,
          chartData.value,
          currentYear
        );
      }
      resetLoading.value = false;
    };

    return {
      t,
      headerText: computed(() => {
        let str = "";
        switch (chartData.value.type) {
          case "poetTravel":
            str = t("vTimeVariant.chartHeaderPoetTravel");
            break;
          case "locationTravel":
            str = t("vTimeVariant.chartLocationTravel");
            break;
          case "cityTravel":
            str = t("vTimeVariant.chartCityTravel");
            break;
          case "provinceTravel":
            str = t("vTimeVariant.chartProvinceTravel");
            break;
          case "yearTravel":
            str = t("vTimeVariant.chartYearTravel");
            break;
          case "decadeTravel":
            str = t("vTimeVariant.chartDecadeTravel");
            break;
          case "centuryTravel":
            str = t("vTimeVariant.chartCenturyTravel");
            break;
          case "routeLocationTravel":
            str = t("vTimeVariant.chartRouteLocationTravel");
            break;
          case "routeCityTravel":
            str = t("vTimeVariant.chartRouteCityTravel");
            break;
          case "routeProvinceTravel":
            str = t("vTimeVariant.chartRouteProvinceTravel");
            break;
        }
        return str;
      }),
      chartRef,
      resetLoading,
      handleTimeReset,
      currentYear,
      contentStyle: "padding: 7px",
    };
  },
});
</script>
