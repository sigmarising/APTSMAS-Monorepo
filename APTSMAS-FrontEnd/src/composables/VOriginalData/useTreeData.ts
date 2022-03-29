import { Ref, ref, watch, WritableComputedRef } from "vue";
import type { IAgesDetailItem, IPoetInfoData } from "./useApiData";
import type { TreeOption } from "naive-ui";

export interface IPoetInfoBasic {
  id: number;
  name: string;
  dynasty: string;
  lifeStart: number;
  lifeEnd: number;
  reference: string[];
  agesDetail: IAgesDetailItem[];
}

// convert IPoetInfoData 2 IPoetInfoBasic
export function convert2Basic(oldData: IPoetInfoData): IPoetInfoBasic {
  return {
    id: oldData.id,
    name: oldData.name,
    dynasty: oldData.dynasty,
    lifeStart: oldData.lifeStart,
    lifeEnd: oldData.lifeEnd,
    reference: oldData.reference,
    agesDetail: oldData.agesDetail,
  };
}

export function useTreeData(
  t: (s: string) => string,
  locale: WritableComputedRef<string>,
  poetInfoBasicList: Ref<IPoetInfoBasic[]>,
  updateTime: Ref<string>
): {
  treeData: Ref<TreeOption[]>;
} {
  // get the options list
  const getFlushedTreeData = (
    poetInfoBasicList: IPoetInfoBasic[]
  ): TreeOption[] => {
    const options: TreeOption[] = [];
    for (const item of poetInfoBasicList) {
      // name x
      const poetNode: TreeOption = {
        key: item.id,
        label: item.name,
        children: [],
      };

      // dynasty x-0
      poetNode.children?.push({
        key: "Dynasty" + item.id.toString(),
        label: t("vOriginalData.treeDynasty"),
        children: [
          {
            key: "DynastyDetail" + item.id.toString(),
            label: item.dynasty,
          },
        ],
      });

      // life duration x-1
      poetNode.children?.push({
        key: "Life" + item.id.toString(),
        label: t("vOriginalData.treeLife"),
        children: [
          {
            key: "LifeDetail" + item.id.toString(),
            label: item.lifeStart.toString() + "-" + item.lifeEnd.toString(),
          },
        ],
      });

      // books x-2
      const bookNode: TreeOption = {
        key: "Book" + item.id.toString(),
        label: t("vOriginalData.treeReference"),
        children: [],
      };
      let _bookIndex = 0;
      for (const book of item.reference) {
        bookNode.children?.push({
          key: "BookDetail" + item.id.toString() + _bookIndex.toString(),
          label: book,
        });
        _bookIndex += 1;
      }
      poetNode.children?.push(bookNode);

      // detail x-3
      const detailNode: TreeOption = {
        key: "Detail" + item.id.toString(),
        label: t("vOriginalData.treeDetail"),
        children: [],
      };
      let _apIndex = 0;
      for (const ap of item.agesDetail) {
        detailNode.children?.push({
          key:
            "Detail" +
            item.id.toString() +
            ap.agesDuration.toString() +
            _apIndex.toString(),
          label:
            ap.agesDuration[0].toString() + "-" + ap.agesDuration[1].toString(),
          children: [
            {
              key:
                "DetailPath" +
                item.id.toString() +
                ap.agesDuration.toString() +
                _apIndex.toString(),
              label: ap.correspondPath.join(" -> "),
            },
          ],
        });
        _apIndex += 1;
      }
      poetNode.children?.push(detailNode);

      // final
      options.push(poetNode);
    }
    return options;
  };

  // init the treeData
  const treeData = ref<TreeOption[]>([]);
  if (poetInfoBasicList.value?.length > 0) {
    treeData.value = getFlushedTreeData(poetInfoBasicList.value);
  } else {
    treeData.value = [
      {
        key: "ThisIsTheWaitThing",
        label: t("vOriginalData.treeWait"),
      },
    ];
  }

  // watch for locale change
  watch(locale, () => {
    if (treeData.value.length > 0)
      if (treeData.value[0].key === "ThisIsTheWaitThing") {
        treeData.value[0].label = t("vOriginalData.treeWait");
      } else {
        for (const item of treeData.value) {
          if (item.children) {
            item.children[0].label = t("vOriginalData.treeDynasty");
            item.children[1].label = t("vOriginalData.treeLife");
            item.children[2].label = t("vOriginalData.treeReference");
            item.children[3].label = t("vOriginalData.treeDetail");
          }
        }
      }
  });

  // watch for new data come
  watch(updateTime, () => {
    treeData.value = getFlushedTreeData(poetInfoBasicList.value);
  });

  return {
    treeData,
  };
}
