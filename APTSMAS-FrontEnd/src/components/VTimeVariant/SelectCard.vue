<template>
  <n-card style="margin-bottom: 7px" :content-style="contentStyle">
    <n-space vertical>
      <n-select
        v-model:value="selectVM"
        filterable
        clearable
        :placeholder="t('vTimeVariant.selectPlaceHolder')"
        :options="options"
        :fallback-option="false"
        :loading="isLoading"
      />
      <n-space justify="end">
        <n-button
          text
          :loading="isLoading"
          :disabled="selectVM === null"
          @click="handleDisplayCilcked"
        >
          <template #icon>
            <n-icon>
              <display-icon />
            </n-icon>
          </template>
          {{ t("vTimeVariant.selectConfirmBtnText") }}
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NCard, NSpace, NSelect, NButton, NIcon } from "naive-ui";
import { ApertureOutline as DisplayIcon } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import type { TimeVariantType } from "@/composables/VTimeVariant/useSelectCardOptions";
import { useSelectCardOptions } from "@/composables/VTimeVariant/useSelectCardOptions";

export default defineComponent({
  name: "VTimeVariantSelect",
  components: {
    NCard,
    NSpace,
    NSelect,
    NButton,
    NIcon,
    DisplayIcon,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: {
    selectedType(payload: string) {
      return payload !== "";
    },
  },
  setup(props, context) {
    const { t } = useI18n();
    const { options } = useSelectCardOptions(t);

    const selectVM = ref<TimeVariantType | null>("poetTravel");

    const handleDisplayCilcked = () => {
      context.emit("selectedType", selectVM.value);
    };

    return {
      t,
      selectVM,
      options,
      contentStyle: "padding: 7px 10px 3px 10px",
      handleDisplayCilcked,
    };
  },
});
</script>
