<template>
  <n-drawer v-model:show="showDrawer" placement="bottom" height="300">
    <n-drawer-content :title="drawerHeaderText" closable>
      <layout-row :gutter="10">
        <!-- Text -->
        <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
        <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
          <n-h4 style="margin-bottom: 3px">
            {{
              t("vOLAM.drawerCurrentSelected") +
              ": " +
              currentLevel +
              " " +
              displayText
            }}
          </n-h4>
        </layout-col>
        <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

        <!-- Scale up Scale Down -->
        <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
        <layout-col
          style="margin-bottom: 6px"
          :xs="24"
          :sm="20"
          :md="9"
          :lg="8"
          :xl="7"
        >
          <n-button
            :loading="isLoading"
            :disabled="!scaleUpEnable"
            style="width: 100%"
            @click="handleScaleUp"
          >
            <template #icon>
              <n-icon>
                <roll-up-icon />
              </n-icon>
            </template>
            {{ t("vOLAM.drawerScaleUp") }}
          </n-button>
        </layout-col>
        <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
        <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
        <layout-col
          style="margin-bottom: 6px"
          :xs="24"
          :sm="20"
          :md="9"
          :lg="8"
          :xl="7"
        >
          <n-button
            :loading="isLoading"
            :disabled="!scaleDownEnable"
            style="width: 100%"
            @click="handleScaleDown"
          >
            <template #icon>
              <n-icon>
                <drill-down-icon />
              </n-icon>
            </template>
            {{ t("vOLAM.drawerScaleDown") }}
          </n-button>
        </layout-col>
        <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />

        <!-- Slice -->
        <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
        <layout-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
          <n-select
            multiple
            filterable
            clearable
            :fallback-option="false"
            :placeholder="slicingText"
            :loading="isLoading"
            :disabled="!slicingSelectEnable"
            :options="slicingOptions"
            max-tag-count="responsive"
            v-model:value="slicingVM"
          />
        </layout-col>
        <layout-col :xs="0" :sm="2" :md="3" :lg="4" :xl="5" />
      </layout-row>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
  watchEffect,
  PropType,
} from "vue";
import {
  NDrawer,
  NDrawerContent,
  NButton,
  NIcon,
  NSelect,
  NH4,
} from "naive-ui";
import {
  ArrowUp as RollUpIcon,
  ArrowDown as DrillDownIcon,
} from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import { useTimeData } from "@/composables/VTrajectoryOLAM/Drawer/useTimeData";

import { ElRow, ElCol } from "element-plus";
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";

export default defineComponent({
  name: "VOLAMTimeDrawer",
  components: {
    NDrawer,
    NDrawerContent,
    LayoutRow: ElRow,
    LayoutCol: ElCol,
    NButton,
    NIcon,
    NSelect,
    NH4,
    RollUpIcon,
    DrillDownIcon,
  },
  props: {
    openDrawer: {
      type: Boolean,
      required: true,
      default: false,
    },
    currentSelected: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
      validator: (thing: string[]) => thing !== undefined,
    },
    currentText: {
      type: String,
      required: true,
      default: "等待选择...",
    },
    currentSelectedLevel: {
      type: String,
      required: true,
      default: "",
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: {
    "update:openDrawer"(payload: boolean) {
      return payload !== undefined;
    },
    "update:currentSelected"(payload: string[]) {
      return payload !== undefined;
    },
    "update:currentSelectedLevel"(payload: string) {
      return payload !== undefined;
    },
    "update:currentText"(payload: string) {
      return payload !== undefined;
    },
  },

  setup(props, context) {
    const { t } = useI18n();

    const showDrawer = computed({
      get: () => props.openDrawer,
      set: (val) => {
        context.emit("update:openDrawer", val);
      },
    });
    const displayText = computed({
      get: () => props.currentText,
      set: (val) => {
        context.emit("update:currentText", val);
      },
    });
    const drawerHeaderText = computed(() => t("vOLAM.selectPoet"));
    const slicingText = computed(() => t("vOLAM.drawerSlicing"));

    const slicingVM = ref<string[] | null>(null);

    const {
      currentLevel,
      scaleUpEnable,
      scaleDownEnable,
      slicingOptions,
      slicingSelectEnable,
      handleScaleUp,
      handleScaleDown,
    } = useTimeData(slicingVM, displayText);

    watch(slicingVM, (val) => {
      context.emit("update:currentSelected", val);
    });
    watchEffect(() => {
      context.emit("update:currentSelectedLevel", currentLevel.value);
    });

    return {
      showDrawer,
      slicingText,
      drawerHeaderText,
      t,
      currentLevel,
      slicingVM,
      scaleUpEnable,
      scaleDownEnable,
      slicingOptions,
      displayText,
      slicingSelectEnable,
      handleScaleUp,
      handleScaleDown,
    };
  },
});
</script>
