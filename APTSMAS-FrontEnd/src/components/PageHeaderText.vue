<template>
  <div class="header-text-container">
    <n-h1 class="header-text-h1">
      {{ t(headerI18nRoute) }}
    </n-h1>
    <n-blockquote class="header-text-bq">
      <!-- {{ t(descI18nRoute) }} -->
      <p
        v-for="(item, index) in descList"
        :key="index"
        class="header-text-desc"
      >
        {{ item }}
      </p>
    </n-blockquote>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { NH1, NBlockquote } from "naive-ui";

export default defineComponent({
  name: "VOriginalDataHeaderText",
  components: {
    NH1,
    NBlockquote,
  },
  props: {
    headerI18nRoute: {
      type: String,
      required: true,
    },
    descI18nRoute: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { descI18nRoute } = toRefs(props);

    const descList = computed(() => {
      const trans = t(descI18nRoute.value);
      return trans.split("\n");
    });

    return {
      t,
      descList,
    };
  },
});
</script>

<style scoped>
.header-text-container {
  margin-bottom: 7px;
}

.header-text-h1 {
  margin-bottom: 0;
  font-weight: 700;
}

.header-text-bq {
  margin-top: 7px;
}

.header-text-desc {
  --header-text-desc-margin: 3px;
  margin-top: var(--header-text-desc-margin);
  margin-bottom: var(--header-text-desc-margin);
}
</style>
