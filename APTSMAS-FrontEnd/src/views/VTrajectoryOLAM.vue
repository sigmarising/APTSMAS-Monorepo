<template>
  <layout-row :gutter="10">
    <!-- Hint Text -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <page-header
        header-i18n-route="vOLAM.pageHeaderText"
        desc-i18n-route="vOLAM.pageDescText"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- select area -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <select-area v-model:is-loading="isLoadingVM" @olam-data="olamHandler" />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts Tree -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-tree
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="treeData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <!-- charts PoetTopK -->
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-poet-top-k
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="poetTopKData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts LocationTopK -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-location-top-k
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="locationTopKData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <!-- charts ProvinceTopK -->
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-province-top-k
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="provinceTopKData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts FreqLocation -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-freq-location
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="freqLocationData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <!-- charts FreqProvince -->
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-freq-province
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="freqProvinceData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts OutlierLocation -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-outlier-location
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="outlierLocationData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <!-- charts OutlierProvince -->
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-outlier-province
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="outlierProvinceData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts YearTopK -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-year-top-k
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="yearTopKData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <!-- charts DecadeTopK -->
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-decade-top-k
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="decadeTopKData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts CenturyTopK -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="9" :lg="8" :xl="7">
      <chart-century-top-k
        :is-loading="isLoadingVM"
        :update-time="updateTime"
        :chart-data="centuryTopKData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
  </layout-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import PageHeader from "@/components/PageHeaderText.vue";
import SelectArea from "@/components/VTrajectoryOLAM/SelectArea.vue";

import { ElRow, ElCol } from "element-plus";
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";
import {
  ICenturyTopK,
  IDecadeTopK,
  IFreqLocations,
  IFreqProvinces,
  ILocationsTopK,
  IOLAMResult,
  IOutlierLocations,
  IOutlierProvinces,
  IPoetsTopK,
  IProvincesTopK,
  IVTree,
  IYearTopK,
} from "@/composables/VTrajectoryOLAM/IApiData";

import ChartTree from "@/components/VTrajectoryOLAM/Charts/Tree.vue";
import ChartPoetTopK from "@/components/VTrajectoryOLAM/Charts/PoetTopK.vue";
import ChartLocationTopK from "@/components/VTrajectoryOLAM/Charts/LocationTopK.vue";
import ChartProvinceTopK from "@/components/VTrajectoryOLAM/Charts/ProvinceTopK.vue";
import ChartFreqLocation from "@/components/VTrajectoryOLAM/Charts/FreqLocation.vue";
import ChartFreqProvince from "@/components/VTrajectoryOLAM/Charts/FreqProvince.vue";
import ChartOutlierLocation from "@/components/VTrajectoryOLAM/Charts/OutlierLocation.vue";
import ChartOutlierProvince from "@/components/VTrajectoryOLAM/Charts/OutlierProvince.vue";
import ChartYearTopK from "@/components/VTrajectoryOLAM/Charts/YearTopK.vue";
import ChartDecadeTopK from "@/components/VTrajectoryOLAM/Charts/DecadeTopK.vue";
import ChartCenturyTopK from "@/components/VTrajectoryOLAM/Charts/CenturyTopK.vue";
import { useDynamicIco } from "@/composables/useDynamicIco";

export default defineComponent({
  name: "VtrajectoryOLAM",
  components: {
    PageHeader,
    SelectArea,
    LayoutRow: ElRow,
    LayoutCol: ElCol,
    ChartTree,
    ChartPoetTopK,
    ChartLocationTopK,
    ChartProvinceTopK,
    ChartFreqLocation,
    ChartFreqProvince,
    ChartOutlierLocation,
    ChartOutlierProvince,
    ChartYearTopK,
    ChartDecadeTopK,
    ChartCenturyTopK,
  },
  setup() {
    useDynamicIco(2);
    const { t } = useI18n();

    const isLoadingVM = ref(false);
    const updateTime = ref(Date());
    const treeData = ref<IVTree>();
    const poetTopKData = ref<IPoetsTopK>();
    const locationTopKData = ref<ILocationsTopK>();
    const provinceTopKData = ref<IProvincesTopK>();
    const freqLocationData = ref<IFreqLocations>();
    const freqProvinceData = ref<IFreqProvinces>();
    const outlierLocationData = ref<IOutlierLocations>();
    const outlierProvinceData = ref<IOutlierProvinces>();
    const yearTopKData = ref<IYearTopK>();
    const decadeTopKData = ref<IDecadeTopK>();
    const centuryTopKData = ref<ICenturyTopK>();

    const olamHandler = (payload: IOLAMResult) => {
      treeData.value = payload.vtree;
      poetTopKData.value = payload.poetsTopK;
      locationTopKData.value = payload.locationsTopK;
      provinceTopKData.value = payload.provincesTopK;
      freqLocationData.value = payload.freqLocations;
      freqProvinceData.value = payload.freqProvinces;
      outlierLocationData.value = payload.outlierLocations;
      outlierProvinceData.value = payload.outlierProvinces;
      yearTopKData.value = payload.yearTopK;
      decadeTopKData.value = payload.decadeTopK;
      centuryTopKData.value = payload.centuryTopK;
      updateTime.value = Date();
    };

    return {
      t,
      isLoadingVM,
      olamHandler,
      updateTime,
      treeData,
      poetTopKData,
      locationTopKData,
      provinceTopKData,
      freqLocationData,
      freqProvinceData,
      outlierLocationData,
      outlierProvinceData,
      yearTopKData,
      decadeTopKData,
      centuryTopKData,
    };
  },
});
</script>
