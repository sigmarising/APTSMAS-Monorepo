import { SelectOption } from "naive-ui";
import {
  computed,
  ComputedRef,
  WritableComputedRef,
  ref,
  Ref,
  watch,
} from "vue";

export function useTimeData(
  slicingSelectVM: Ref<string[] | null>,
  displayText: WritableComputedRef<string>
): {
  currentLevel: Ref<"year" | "decade" | "century">;
  scaleUpEnable: ComputedRef<boolean>;
  scaleDownEnable: ComputedRef<boolean>;
  slicingOptions: Ref<SelectOption[]>;
  slicingSelectEnable: ComputedRef<boolean>;
  handleScaleUp: () => void;
  handleScaleDown: () => void;
} {
  // var statement
  const currentLevel = ref<"year" | "decade" | "century">("century");
  const scaleUpEnable = computed(() =>
    currentLevel.value !== "century" ? true : false
  );
  const scaleDownEnable = computed(() =>
    currentLevel.value !== "year" ? true : false
  );
  const slicingOptions = ref<SelectOption[]>([]);
  const slicingSelectEnable = computed(() =>
    slicingOptions.value.length > 0 ? true : false
  );

  // init data
  const minYear = 580;
  const maxYear = 1315;

  // form Options
  const yearOptions: SelectOption[] = [];
  const decadeOptions: SelectOption[] = [];
  const centuryOptions: SelectOption[] = [];

  for (let i = minYear; i <= maxYear; i++) {
    yearOptions.push({
      label: i.toString(),
      value: i.toString() + "-" + i.toString(),
    });
  }
  const x1 = Math.floor(minYear / 10) * 10;
  const x2 = Math.floor(maxYear / 10) * 10 + 10;
  for (let i = x1; i < x2; i += 10) {
    const text = i.toString() + "-" + (i + 9).toString();
    decadeOptions.push({
      label: text,
      value: text,
    });
  }
  const y1 = Math.floor(minYear / 100) * 100;
  const y2 = Math.floor(maxYear / 100) * 100 + 100;
  for (let i = y1; i < y2; i += 100) {
    const text = i.toString() + "-" + (i + 99).toString();
    centuryOptions.push({
      label: text,
      value: text,
    });
  }

  const handleScaleUp = () => {
    switch (currentLevel.value) {
      case "year":
        currentLevel.value = "decade";
        slicingOptions.value = decadeOptions;
        slicingSelectVM.value = null;
        break;
      case "decade":
        currentLevel.value = "century";
        slicingOptions.value = centuryOptions;
        slicingSelectVM.value = null;
        break;
      default:
        break;
    }
  };

  const handleScaleDown = () => {
    switch (currentLevel.value) {
      case "century":
        currentLevel.value = "decade";
        slicingOptions.value = decadeOptions;
        slicingSelectVM.value = null;
        break;
      case "decade":
        currentLevel.value = "year";
        slicingOptions.value = yearOptions;
        slicingSelectVM.value = null;
        break;
      default:
        break;
    }
  };

  // watch
  watch(slicingSelectVM, (val) => {
    if (val !== null) {
      const strList = [];
      let count = 0;
      for (const item of val) {
        count += 1;
        if (count > 3) {
          strList.push("等");
          break;
        }
        const itemsDetail = item.split("-");
        strList.push(itemsDetail[0] === itemsDetail[1] ? itemsDetail[0] : item);
      }
      displayText.value = strList.join(", ");
    } else {
      displayText.value = "等待选择...";
    }
  });

  // init
  slicingOptions.value = centuryOptions;

  return {
    currentLevel,
    scaleUpEnable,
    scaleDownEnable,
    slicingOptions,
    slicingSelectEnable,
    handleScaleUp,
    handleScaleDown,
  };
}
