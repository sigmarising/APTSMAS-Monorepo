<template>
  <LayoutRow :gutter="10">
    <!-- Hint Text -->
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <LayoutCol :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <PageHeader
        header-i18n-route="vSpaceScale.pageHeaderText"
        desc-i18n-route="vSpaceScale.pageDescText"
      />
    </LayoutCol>
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

    <!-- charts sort -->
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
    <LayoutCol :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <SSMap />
    </LayoutCol>
    <LayoutCol :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
  </LayoutRow>
</template>

<script lang="ts">
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";
</script>

<script setup lang="ts">
import { ElRow as LayoutRow, ElCol as LayoutCol } from "element-plus";
import { useDynamicIco } from "@/composables/useDynamicIco";
import PageHeader from "@/components/PageHeaderText.vue";
import SSMap from "@/components/VSpaceScale/VMap.vue";

useDynamicIco(5);
</script>
