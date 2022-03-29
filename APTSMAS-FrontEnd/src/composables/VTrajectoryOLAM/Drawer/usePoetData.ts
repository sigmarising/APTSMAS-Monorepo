import { SelectOption } from "naive-ui";
import {
  computed,
  ComputedRef,
  WritableComputedRef,
  ref,
  Ref,
  watch,
} from "vue";
import type { IState } from "@/store";
import { Store } from "@/store";

export function usePoetData(
  store: Store<IState>,
  t: (s: string) => string,
  drillDownSelectVM: Ref<string | number | null>,
  slicingSelectVM: Ref<string[] | number[] | null>,
  displayText: WritableComputedRef<string>
): {
  rollUpEnable: Ref<boolean>;
  drillDownEnable: ComputedRef<boolean>;
  drillDownHintText: ComputedRef<string>;
  drillDownOptions: Ref<SelectOption[]>;
  slicingOptions: Ref<SelectOption[]>;
  currentLevel: Ref<"tangPoet" | "songPoet" | "dynasty">;
  drillDownSelectEnable: ComputedRef<boolean>;
  slicingSelectEnable: ComputedRef<boolean>;
  handleRollUp: () => void;
  handleDrillDown: () => void;
} {
  // var statement
  const rollUpEnable = ref(false);
  const drillDownEnable = computed(() =>
    drillDownSelectVM.value !== null ? true : false
  );
  const drillDownOptions = ref<SelectOption[]>([]);
  const slicingOptions = ref<SelectOption[]>([]);
  const currentLevel = ref<"tangPoet" | "songPoet" | "dynasty">("dynasty");
  const drillDownHintText = computed(() =>
    drillDownOptions.value.length > 0
      ? t("vOLAM.drawerDrillDownEnable")
      : t("vOLAM.drawerDrillDownDisable")
  );
  const drillDownSelectEnable = computed(() =>
    drillDownOptions.value.length > 0 ? true : false
  );
  const slicingSelectEnable = computed(() =>
    slicingOptions.value.length > 0 ? true : false
  );

  // vuex data
  const storePoet2Id = store.state.poets.poet2Id;
  const storeId2Poet = store.state.poets.id2Poet;

  // form options for select
  const dynastyOptions: SelectOption[] = [
    {
      label: "唐",
      value: "tang",
    },
    {
      label: "宋",
      value: "song",
    },
  ];
  const tangOptions: SelectOption[] = [];
  const songOptions: SelectOption[] = [];

  for (const key in storePoet2Id) {
    const item = storePoet2Id[key];

    if (item.dynasty === "唐") {
      tangOptions.push({
        label: key,
        value: item.id,
      });
    } else if (item.dynasty === "宋") {
      songOptions.push({
        label: key,
        value: item.id,
      });
    }
  }

  const handleRollUp = () => {
    rollUpEnable.value = false;
    drillDownOptions.value = dynastyOptions;
    slicingOptions.value = dynastyOptions;
    currentLevel.value = "dynasty";
    drillDownSelectVM.value = null;
    slicingSelectVM.value = null;
  };

  const handleDrillDown = () => {
    if (drillDownSelectVM.value === "tang") {
      slicingOptions.value = tangOptions;
      currentLevel.value = "tangPoet";
    } else if (drillDownSelectVM.value === "song") {
      slicingOptions.value = songOptions;
      currentLevel.value = "songPoet";
    }
    rollUpEnable.value = true;
    drillDownOptions.value = [];
    drillDownSelectVM.value = null;
    slicingSelectVM.value = null;
  };

  // watch
  watch(slicingSelectVM, (val) => {
    if (val !== null) {
      if (val.length > 0) {
        if (val[0] === "tang" || val[0] === "song") {
          // handle dynasty
          const strList = [];
          for (const item of val) {
            if (item === "tang") strList.push("唐");
            else if (item === "song") strList.push("宋");
          }
          displayText.value = strList.join(", ");
        } else {
          // handle poets
          const strList = [];
          let count = 0;
          for (const item of val) {
            count += 1;
            if (count > 3) {
              strList.push("等");
              break;
            }
            strList.push(storeId2Poet[item].name);
          }
          displayText.value = strList.join(", ");
        }
      } else {
        displayText.value = "等待选择...";
      }
    } else {
      displayText.value = "等待选择...";
    }
  });

  // init value
  drillDownOptions.value = dynastyOptions;
  slicingOptions.value = dynastyOptions;

  return {
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
  };
}
