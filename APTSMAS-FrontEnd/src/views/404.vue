<template>
  <div class="flex-container">
    <div>
      <p class="p1">{{ t("notFound.notFoundDisplay") }}</p>
      <p class="p2">{{ t("notFound.notFoundHint") }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useDynamicIco } from "@/composables/useDynamicIco";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NotFound",
  setup() {
    useDynamicIco(6);
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style scoped>
.flex-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p1 {
  text-align: center;
  font-size: xx-large;
  font-weight: bold;
  margin: 0 0 7px 0;
}

.p2 {
  text-align: center;
  font-size: medium;
  margin: 0;
}
</style>
