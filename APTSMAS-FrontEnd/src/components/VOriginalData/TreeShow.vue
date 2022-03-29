<template>
  <n-spin :show="isLoading">
    <n-card class="tree-card" :content-style="contentStyle">
      <n-p style="margin-bottom: 7px; font-weight: bold">
        {{ t("vOriginalData.treeCardHeader") }}
      </n-p>
      <n-tree block-line selectable :data="treeData" />
    </n-card>
  </n-spin>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { NCard, NTree, NSpin, NP } from "naive-ui";
import { useI18n } from "vue-i18n";
import {
  useTreeData,
  IPoetInfoBasic,
} from "@/composables/VOriginalData/useTreeData";

export default defineComponent({
  name: "VOriginalDataTreeView",
  components: { NCard, NTree, NSpin, NP },
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
    poetInfoBasicList: {
      type: Array as PropType<IPoetInfoBasic[]>,
      required: true,
      validator: (i: IPoetInfoBasic[]) => {
        return i !== undefined;
      },
      default: () => [],
    },
  },
  setup(props) {
    const { t, locale } = useI18n();
    const { updateTime, poetInfoBasicList } = toRefs(props);
    const { treeData } = useTreeData(t, locale, poetInfoBasicList, updateTime);

    return {
      t,
      treeData,
      contentStyle: "padding: 7px",
    };
  },
});
</script>
