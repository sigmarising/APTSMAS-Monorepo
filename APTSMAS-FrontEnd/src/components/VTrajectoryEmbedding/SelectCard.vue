<template>
  <NCard style="margin-bottom: 7px" :content-style="contentStyle">
    <NSpace vertical>
      <NSelect
        v-model:value="vmEmb"
        filterable
        clearable
        :placeholder="t('vEmb.embKernelSelectPlaceHolder')"
        :options="kernelOptions"
        :fallback-option="false"
        :loading="isLoading"
      />
      <NSelect
        v-model:value="vmAlgorithm"
        filterable
        clearable
        :placeholder="t('vEmb.algorithmSelectPlaceHolder')"
        :options="algorithmOptions"
        :fallback-option="false"
        :loading="isLoading"
      />
      <NSpace justify="end">
        <NButton
          text
          :loading="isLoading"
          :disabled="vmEmb === null || vmAlgorithm == null"
          @click="handleConfirm"
        >
          <template #icon>
            <NIcon>
              <ConfirmIcon />
            </NIcon>
          </template>
          {{ t("vEmb.selectConfirmBtnText") }}
        </NButton>
      </NSpace>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NSpace, NSelect, NButton, NIcon } from "naive-ui";
import { AnalyticsSharp as ConfirmIcon } from "@vicons/ionicons5";
import { useSelectsOptions } from "@/composables/VTrajectoryEmbedding/SelectOptionData";

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits({
  selectThings(payload: { kernelId: number; typeId: number }) {
    return payload.kernelId !== -1 && payload.typeId !== -1;
  },
});

const { t } = useI18n();
const { kernelOptions, algorithmOptions } = useSelectsOptions();
const vmEmb = ref<number | null>(null);
const vmAlgorithm = ref<number | null>(null);
const contentStyle = "padding: 7px 10px 3px 10px";

const handleConfirm = () => {
  emit("selectThings", {
    kernelId: vmEmb.value as number,
    typeId: vmAlgorithm.value as number,
  });
};
</script>
