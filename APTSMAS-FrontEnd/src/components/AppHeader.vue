<template>
  <div class="header-container">
    <div class="header-left">
      <n-gradient-text type="info" class="header-left-flag">
        APTSMAS
      </n-gradient-text>
      <n-dropdown trigger="hover" @select="handleSelect" :options="options">
        <n-button :text="true">
          <template #icon>
            <n-icon>
              <at-icon />
            </n-icon>
          </template>
          {{ btnShownText }}
        </n-button>
      </n-dropdown>
    </div>
    <div class="header-right">
      <n-button size="small" @click="changeLocal">
        {{ localChangeDisplayText }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { NDropdown, NGradientText, NButton, NIcon } from "naive-ui";
import { At as AtIcon } from "@vicons/ionicons5";
import { useRouterBtn } from "@/composables/useRouterBtn";
import { useLocalChange } from "@/composables/useLocaleChange";

export default defineComponent({
  components: {
    NDropdown,
    NGradientText,
    NButton,
    NIcon,
    AtIcon,
  },
  setup() {
    const { t, locale } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const { localChangeDisplayText, changeLocal } = useLocalChange(
      t,
      locale,
      store
    );
    const { routerBtnOptions, handleSelect, btnShownText } = useRouterBtn(
      t,
      localChangeDisplayText,
      router,
      route
    );

    return {
      options: routerBtnOptions,
      btnShownText,
      localChangeDisplayText,
      handleSelect,
      changeLocal,
    };
  },
});
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.header-left {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.header-left-flag {
  font-size: x-large;
  font-weight: bolder;
  letter-spacing: -0.7px;
  margin-right: 10px;
}

.header-right {
  margin-right: 10px;
}
</style>
