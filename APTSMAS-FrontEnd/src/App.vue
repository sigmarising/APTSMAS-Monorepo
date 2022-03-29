<template>
  <n-config-provider :locale="nConfigLocale" :date-locale="nConfigDateLocale">
    <!-- The Layout Container -->
    <n-layout id="app-n-container" position="absolute">
      <!-- Sticky Header -->
      <n-layout-header id="app-n-header" bordered>
        <app-header />
      </n-layout-header>

      <!-- Content -->
      <n-layout
        ref="backTopRef"
        id="app-n-body"
        position="absolute"
        :native-scrollbar="false"
      >
        <!-- app flex content -->
        <n-layout id="app-n-content">
          <n-layout-content id="app-n-content-inside">
            <router-view id="router-view" />
          </n-layout-content>
        </n-layout>

        <!-- app flex sticky footer -->
        <n-layout-footer id="app-n-footer" bordered>
          <app-footer />
        </n-layout-footer>

        <!-- back to top -->
        <n-back-top :listen-to="backTopRef" />
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NBackTop,
} from "naive-ui";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useStore } from "./store";
import { useNuiLocaleChange } from "@/composables/useNuiLocaleChange";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NBackTop,
    AppHeader,
    AppFooter,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const { nConfigLocale, nConfigDateLocale } = useNuiLocaleChange(t, store);
    const backTopRef = ref<HTMLElement>();

    return {
      nConfigLocale,
      nConfigDateLocale,

      backTopRef,
    };
  },
});
</script>

<style scoped>
#app-n-container {
  --height-header: 60px;
  --height-footer: 50px;
  --content-padding: 7px;
}

#app-n-header {
  height: var(--height-header);
  padding: 0;
}

#app-n-body {
  top: var(--height-header);
}

#app-n-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
}

#app-n-content-inside {
  flex: 1;
  padding: var(--content-padding);
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
}

#router-view {
  /* min-height: calc(
    100vh - var(--height-header) - var(--height-footer) - var(--content-padding) *
      2
  ); */
}

#app-n-footer {
  height: var(--height-footer);
  padding: 0;
}
</style>
