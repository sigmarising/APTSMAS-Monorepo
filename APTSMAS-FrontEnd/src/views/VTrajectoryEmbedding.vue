<template>
  <LayoutRow :gutter="10">
    <!-- Hint Text -->
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <LayoutCol :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <PageHeader
        header-i18n-route="vEmb.pageHeaderText"
        desc-i18n-route="vEmb.pageDescText"
      />
    </LayoutCol>
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- select area -->
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <LayoutCol :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <SelectArea :is-loading="isLoading" @select-things="handleData" />
    </LayoutCol>
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- Maps -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <TrajMap
        :is-loading="isLoading"
        :update-time="updateTime"
        :map-data="mapsData"
        :map-color="mapsColor"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- Tree View -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <TreeView
        :is-loading="isLoading"
        :update-time="updateTime"
        :map-data="mapsData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- Charts -->
    <template v-for="index in 8" :key="index">
      <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
      <LayoutCol :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
        <CDCharts
          :is-loading="isLoading"
          :update-time="updateTime"
          :chart-data="chartsData[index - 1][0]"
          :chart-color="chartsColor[index - 1][0]"
          :chart-trans-path="chartsText[index - 1][0]"
        />
      </LayoutCol>
      <LayoutCol :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
      <LayoutCol :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
      <LayoutCol :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
        <CDCharts
          :is-loading="isLoading"
          :update-time="updateTime"
          :chart-data="chartsData[index - 1][1]"
          :chart-color="chartsColor[index - 1][1]"
          :chart-trans-path="chartsText[index - 1][1]"
        />
      </LayoutCol>
      <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    </template>
  </LayoutRow>
</template>

<script lang="ts">
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";
</script>

<script setup lang="ts">
import { ref } from "vue";
import { ElRow as LayoutRow, ElCol as LayoutCol } from "element-plus";
import PageHeader from "@/components/PageHeaderText.vue";
import SelectArea from "@/components/VTrajectoryEmbedding/SelectCard.vue";
import { useDynamicIco } from "@/composables/useDynamicIco";
import { useStore } from "@/store";
import { useApiData } from "@/composables/VTrajectoryEmbedding/useApiData";
import { useChartsConstant } from "@/composables/VTrajectoryEmbedding/ChartsConstant";
import { initData } from "@/composables/VTrajectoryEmbedding/initData";
import CDCharts from "@/components/VTrajectoryEmbedding/CommonDegreeChart.vue";
import TrajMap from "@/components/VTrajectoryEmbedding/TrajectoryMap.vue";
import TreeView from "@/components/VTrajectoryEmbedding/TreeView.vue";

useDynamicIco(4);
const isLoading = ref(false);
const updateTime = ref(Date());
const store = useStore();
const { asyncGetEmbeddingResult, parseTrajectory } = useApiData(store);
const {
  mapsData,
  mapsColor,
  // mapsText,
  chartsData,
  chartsColor,
  chartsText,
  fillConstant,
} = useChartsConstant(parseTrajectory);

const handleData = async (payload: { kernelId: number; typeId: number }) => {
  isLoading.value = true;

  const data = await asyncGetEmbeddingResult(payload.kernelId, payload.typeId);
  fillConstant(data);

  updateTime.value = Date();
  isLoading.value = false;
};

fillConstant(initData);
</script>
