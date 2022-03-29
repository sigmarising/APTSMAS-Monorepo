<template>
  <n-spin :show="isLoading">
    <n-card style="margin-bottom: 7px" :content-style="contentStyle">
      <n-p style="margin-bottom: 7px; font-weight: bold">
        {{ t("vOriginalData.mapCardHeader") }}
      </n-p>
      <div ref="mapRef" style="width: 100%; height: 500px"></div>
    </n-card>
  </n-spin>
</template>

<script lang="ts">
/*global AMap*/
/*eslint no-undef: "error"*/

import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  toRefs,
} from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import { NCard, NP, NSpin } from "naive-ui";
import { useAMap } from "@/composables/AMap/useAMap";
import {
  useMapData,
  USE_CUSTOM_MAP_STYLE,
} from "@/composables/VOriginalData/useMapData";
import { IPoetInfoMap } from "@/composables/VOriginalData/useMapData";

export default defineComponent({
  name: "VOriginalDataMap",
  components: {
    NCard,
    NP,
    NSpin,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
    showType: {
      type: String as PropType<"People" | "Location">,
      required: true,
      validator: (i: "People" | "Location") => {
        return i != undefined;
      },
      default: () => "People",
    },
    updateTime: {
      type: String,
      required: true,
      default: Date(),
    },
    selectedLocationId: {
      type: String,
      required: true,
      default: "-1",
    },
    poetInfoMapList: {
      type: Array as PropType<IPoetInfoMap[]>,
      required: true,
      validator: (i: IPoetInfoMap[]) => {
        return i != undefined;
      },
      default: () => [],
    },
  },
  setup(props) {
    const { t } = useI18n();
    const store = useStore();
    const { asyncLoadAMap } = useAMap(store);

    const { updateTime, selectedLocationId, poetInfoMapList, showType } =
      toRefs(props);

    const mapRef = ref<HTMLDivElement>();
    let map: AMap.Map | null = null;
    let labelsLayer = ref<AMap.LabelsLayer | null>(null);
    let bezierLines = ref<AMap.BezierCurve | null>(null);

    // mount the map instance
    // the map instance can resize itself
    onMounted(async () => {
      const AMap = await asyncLoadAMap();
      if (mapRef.value) {
        map = new AMap.Map(mapRef.value, {
          zoom: 5.0,
          center: [109.595668, 35.447184],
          mapStyle: USE_CUSTOM_MAP_STYLE
            ? "amap://styles/14e352c818d3b9d845f66beb9375fb7d"
            : "amap://styles/fresh",
          features: ["bg", "point", "road"],
          zooms: USE_CUSTOM_MAP_STYLE ? /*[2, 20]*/ [2, 12] : [2, 8],
        });
        ({ labelsLayer, bezierLines } = useMapData(
          updateTime,
          selectedLocationId,
          poetInfoMapList,
          showType,
          AMap,
          map
        ));
      }
    });

    onBeforeUnmount(() => {
      labelsLayer.value?.destroy();
      bezierLines.value?.destroy();
      map?.destroy();
    });

    return {
      t,
      mapRef,
      contentStyle: "padding: 7px",
    };
  },
});
</script>

<style>
.amap-info #container {
  height: 100%;
  width: 100%;
}

.amap-info .content-window-card {
}

.amap-info .content-window-card p {
  height: 2rem;
}

.amap-info .custom-info {
  border: solid 1px silver;
}

.amap-info div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

.amap-info div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

.amap-info div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

.amap-info div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

.amap-info div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
  max-height: 200px;
  overflow-y: scroll;
}

.amap-info div.info-middle::-webkit-scrollbar-track {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.amap-info div.info-middle::-webkit-scrollbar {
  width: 7px;
  background-color: #f5f5f5;
}

.amap-info div.info-middle::-webkit-scrollbar-thumb {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #a8a8a8;
}

.amap-info div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

.amap-info div.info-bottom img {
  position: relative;
  z-index: 104;
}

.amap-info span {
  margin-left: 5px;
  font-size: 11px;
}

.amap-info .info-middle img {
  float: left;
  margin-right: 6px;
}
</style>
