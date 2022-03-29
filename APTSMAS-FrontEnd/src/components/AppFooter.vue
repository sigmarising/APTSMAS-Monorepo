<template>
  <div id="footer-box">
    <n-p class="inner-text"> {{ t("homePage.footerTextLine1") }} </n-p>
    <n-p class="inner-text"> {{ t("homePage.footerTextLine2") }} </n-p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { NP } from "naive-ui";

export default defineComponent({
  components: {
    NP,
  },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style scoped>
#footer-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inner-text {
  margin: 0;
}
</style>
