<template>
  <layout-row :gutter="10">
    <!-- Hint Text -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <page-header
        header-i18n-route="vOriginalData.pageHeaderText"
        desc-i18n-route="vOriginalData.pageDescText"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- select tabs -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <select-tabs
        :is-loading="isLoading"
        @select-poet-id="handlePoetId"
        @select-location-id="handleLocationId"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- Map -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <map-comp
        :is-loading="isLoading"
        :update-time="updateTime"
        :selected-location-id="selectedLocationId"
        :poet-info-map-list="mapViewPropData"
        :show-type="mapViewType"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- TreeView -->
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <tree-show
        :is-loading="isLoading"
        :update-time="updateTime"
        :poet-info-basic-list="treeViewPropData"
      />
    </layout-col>
    <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
  </layout-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import MapComp from "@/components/VOriginalData/Map.vue";
import SelectTabs from "@/components/VOriginalData/SelectTabs.vue";
import PageHeader from "@/components/PageHeaderText.vue";
import TreeShow from "@/components/VOriginalData/TreeShow.vue";
import { useApiData } from "@/composables/VOriginalData/useApiData";
import {
  IPoetInfoBasic,
  convert2Basic,
} from "@/composables/VOriginalData/useTreeData";
import {
  IPoetInfoMap,
  convert2InfoMap,
} from "@/composables/VOriginalData/useMapData";

import { ElRow, ElCol } from "element-plus";
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";
import { useDynamicIco } from "@/composables/useDynamicIco";

export default defineComponent({
  name: "VOriginalData",
  components: {
    MapComp,
    PageHeader,
    SelectTabs,
    TreeShow,
    LayoutRow: ElRow,
    LayoutCol: ElCol,
  },
  setup() {
    useDynamicIco(1);
    const { t } = useI18n();
    const store = useStore();

    const isLoading = ref(false);
    const updateTime = ref(Date());
    const treeViewPropData = ref<IPoetInfoBasic[]>([]);
    const mapViewPropData = ref<IPoetInfoMap[]>([]);
    const selectedLocationId = ref<string>("");
    const mapViewType = ref<"People" | "Location">("People");

    const { asyncGetPoetInfoByPoetId, asyncGetPoetInfoListByLocationId } =
      useApiData(store);

    const handlePoetId = async (payload: number) => {
      isLoading.value = true;

      const data = await asyncGetPoetInfoByPoetId(payload);
      treeViewPropData.value = [convert2Basic(data)];
      mapViewPropData.value = [convert2InfoMap(data)];
      mapViewType.value = "People";

      updateTime.value = Date();
      isLoading.value = false;
    };

    const handleLocationId = async (payload: string) => {
      isLoading.value = true;

      const data = await asyncGetPoetInfoListByLocationId(payload);
      treeViewPropData.value = data.map((x) => convert2Basic(x));
      mapViewPropData.value = data.map((x) => convert2InfoMap(x));
      selectedLocationId.value = payload;
      mapViewType.value = "Location";

      updateTime.value = Date();
      isLoading.value = false;
    };

    return {
      t,
      isLoading,
      updateTime,
      treeViewPropData,
      mapViewPropData,
      selectedLocationId,
      mapViewType,
      handlePoetId,
      handleLocationId,
    };
  },
});
</script>
