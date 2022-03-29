import { SelectGroupOption, SelectOption } from "naive-ui";
import type { IState } from "@/store";
import { Store } from "@/store";

export type KernelType = "UTATD" | "ATDRNN" | "ATDRNN-att";
export type AlgorithmType =
  | "LongShort-Based"
  | "Density-Based"
  | "Geo-Based"
  | "KMeans-Based";

const KERNEL_OPTIONS_INNER: KernelType[] = ["UTATD", "ATDRNN", "ATDRNN-att"];
const ALGORITHM_OPTIONS_INNER: AlgorithmType[] = [
  "LongShort-Based",
  "Density-Based",
  "Geo-Based",
];

export function useSelectsOptions(): {
  kernelOptions: SelectOption[];
  algorithmOptions: SelectOption[];
} {
  const kernelOptions: SelectOption[] = [];
  const algorithmOptions: SelectOption[] = [];

  for (let i = 0; i < KERNEL_OPTIONS_INNER.length; i++)
    kernelOptions.push({
      label: KERNEL_OPTIONS_INNER[i],
      value: i + 1,
    });
  for (let i = 0; i < ALGORITHM_OPTIONS_INNER.length; i++)
    algorithmOptions.push({
      label: ALGORITHM_OPTIONS_INNER[i],
      value: i + 1,
    });

  return {
    kernelOptions,
    algorithmOptions,
  };
}

export function algorithmOption2Id(option: AlgorithmType): number {
  return ALGORITHM_OPTIONS_INNER.indexOf(option);
}

export function usePoetsSelectOptions(store: Store<IState>): {
  poetsOption: SelectGroupOption[];
} {
  const storePoet2Id = store.state.poets.poet2Id;
  const poetsOption: SelectGroupOption[] = [
    {
      type: "group",
      label: "唐",
      key: "tang",
      children: [],
    },
    {
      type: "group",
      label: "宋",
      key: "song",
      children: [],
    },
  ];

  // form the optionPoet
  for (const key in storePoet2Id) {
    const item = storePoet2Id[key];

    let targetIndex = -1;
    if (item.dynasty === "唐") targetIndex = 0;
    else if (item.dynasty === "宋") targetIndex = 1;

    poetsOption[targetIndex].children.push({
      label: key,
      value: item.id,
    });
  }

  return { poetsOption };
}
