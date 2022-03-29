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

        <!-- Roll up Drill Down -->
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
            :disabled="!rollUpEnable"
            style="width: 100%"
            @click="handleRollUp"
          >
            <template #icon>
              <n-icon>
                <roll-up-icon />
              </n-icon>
            </template>
            {{ t("vOLAM.drawerRollUp") }}
          </n-button>
        </layout-col>
        <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
        <layout-col :xs="0" :sm="2" :md="0" :lg="0" :xl="0" />
        <layout-col
          style="margin-bottom: 6px"
          :xs="24"
          :sm="13"
          :md="6"
          :lg="5"
          :xl="5"
        >
          <n-select
            filterable
            clearable
            :fallback-option="false"
            :placeholder="drillDownHintText"
            :loading="isLoading"
            :disabled="!drillDownSelectEnable"
            :options="drillDownOptions"
            v-model:value="drillDownVM"
          />
        </layout-col>
        <layout-col
          style="margin-bottom: 6px"
          :xs="24"
          :sm="7"
          :md="3"
          :lg="3"
          :xl="2"
        >
          <n-button
            :loading="isLoading"
            :disabled="!drillDownEnable"
            style="width: 100%"
            @click="handleDrillDown"
          >
            <template #icon>
              <n-icon>
                <drill-down-icon />
              </n-icon>
            </template>
            {{ t("vOLAM.drawerDrillDown") }}
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
            :placeholder="sliceingText"
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
import { useStore } from "@/store";
import { useGeoData } from "@/composables/VTrajectoryOLAM/Drawer/useGeoData";

import { ElRow, ElCol } from "element-plus";
import "element-plus/lib/components/row/style/css";
import "element-plus/lib/components/col/style/css";

export default defineComponent({
  name: "VOLAMGeoDrawer",
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
    const store = useStore();

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
    const drawerHeaderText = computed(() => t("vOLAM.selectGeo"));
    const slicingText = computed(() => t("vOLAM.drawerSlicing"));

    const drillDownVM = ref<string | null>(null);
    const slicingVM = ref<string[] | null>(null);

    const {
      rollUpEnable,
      drillDownEnable,
      drillDownHintText,
      drillDownOptions,
      slicingOptions,
      currentLevel,
      drillDownSelectEnable,
      slicingSelectEnable,
      handleRollUp,
      handleDrillDown,
    } = useGeoData(store, t, drillDownVM, slicingVM, displayText);

    watch(slicingVM, (val) => {
      context.emit("update:currentSelected", val);
    });
    watchEffect(() => {
      context.emit("update:currentSelectedLevel", currentLevel.value);
    });

    return {
      showDrawer,
      sliceingText: slicingText,
      drawerHeaderText,
      t,
      drillDownVM,
      slicingVM,
      rollUpEnable,
      drillDownEnable,
      drillDownHintText,
      drillDownOptions,
      slicingOptions,
      currentLevel,
      displayText,
      drillDownSelectEnable,
      slicingSelectEnable,
      handleRollUp,
      handleDrillDown,
    };
  },
});
</script>
