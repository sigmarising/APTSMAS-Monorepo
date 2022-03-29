<template>
  <layout-row :gutter="10">
    <!-- Hint Text -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <page-header
        header-i18n-route="vTimeVariant.pageHeaderText"
        desc-i18n-route="vTimeVariant.pageDescText"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- select area -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <select-area :is-loading="isLoading" @selected-type="handleData" />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts sort -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <chart
        :is-loading="isLoading"
        :update-time="updateTime"
        :chart-data="chartData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
  </layout-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PageHeader from "@/components/PageHeaderText.vue";
import SelectArea from "@/components/VTimeVariant/SelectCard.vue";
import Chart from "@/components/VTimeVariant/Chart.vue";

import { ElRow, ElCol } from "element-plus";
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";
import { ITimeVariantApiResponse } from "@/composables/VTimeVariant/IApiData";
import { useApiData } from "@/composables/VTimeVariant/useApiData";
import { useStore } from "@/store";
import { TimeVariantType } from "@/composables/VTimeVariant/useSelectCardOptions";
import { initData } from "@/composables/VTimeVariant/constants";
import { useDynamicIco } from "@/composables/useDynamicIco";

export default defineComponent({
  name: "VTimeVariant",
  components: {
    PageHeader,
    SelectArea,
    Chart,
    LayoutRow: ElRow,
    LayoutCol: ElCol,
  },
  setup() {
    useDynamicIco(3);
    const isLoading = ref(false);
    const updateTime = ref(Date());
    const chartData = ref<ITimeVariantApiResponse>(initData);
    const store = useStore();
    const { asyncGetTimeVariantResult } = useApiData(store);
    const handleData = async (payload: TimeVariantType) => {
      isLoading.value = true;

      const data = await asyncGetTimeVariantResult(payload);
      chartData.value = data;

      updateTime.value = Date();
      isLoading.value = false;
    };

    return { isLoading, updateTime, chartData, handleData };
  },
});
</script>
