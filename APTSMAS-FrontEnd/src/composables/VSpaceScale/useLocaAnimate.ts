/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, Ref } from "vue";
import { ANIMATE_UPDATE_TIME_MS, MIN_YEAR, MAX_YEAR } from "./constants";
import { IEdgeContent, INodeContent } from "./IApiData";

/**
 * Switch: USE_PULSE_LINE
 *    True: use Loca Pulse Line
 *    False: use Loca Pulse Link
 *
 * Notice:
 *    The Loca Pulse Line almost have the performance which make sense on most device
 *    But the Loca Pulse Link really have the performance issue when there are too many links
 *    on the map. So, If you want to use it, consider it twice and think about which device and
 *    where you will use this scene for.
 *
 * P.S.
 *    If you want to use Loca Pulse Link, please also notice the code in `@/components/VSpaceScale/VMap.vue`
 *    of `pitch: USE_PULSE_LINE ? 0 : 48,` for the 3D-Map View Setting.
 */
export const USE_PULSE_LINE = true;

/**
 * The custom map style can't set the China's country boundary color
 * from red to other. If you think this is incompatible, just set this
 * const `USE_CUSTOM_MAP_STYLE` to `false`
 */
export const USE_CUSTOM_MAP_STYLE = true;

export type DynamicHandlerFuncProto = (
  previousInterval: number | null,
  currentInterval: Ref<number | null>,
  currentYear: Ref<number>,
  edges: IEdgeContent,
  nodes: INodeContent
) => void;

export function useLocaAnimate(
  Loca: any,
  loca: any | null
): {
  dynamicHandler: DynamicHandlerFuncProto;
  lineLayer: Ref<any>;
  scatterLayer: Ref<any>;
} {
  // color config
  const headColors = ["#ECFFB1", "#146968", "#146968"];
  const trailColors = [
    "rgba(255,178,6, 0.2)",
    "rgba(255,178,6, 0.2)",
    "rgba(20,105,104, 0.2)",
  ];
  const colorIndex = 1;

  // data var
  let lineSource: any = {
    type: "FeatureCollection",
    features: [],
  };
  let scatterSource: any = {
    type: "FeatureCollection",
    features: [],
  };
  let lineSourceMap: any = {};
  let scatterSourceMap: any = {};
  let lineLocaSource: any = new Loca.GeoJSONSource({ data: lineSource });
  let scatterLocaSource: any = new Loca.GeoJSONSource({ data: scatterSource });

  // reset data var
  const resetData = () => {
    lineSource = {
      type: "FeatureCollection",
      features: [],
    };
    scatterSource = {
      type: "FeatureCollection",
      features: [],
    };
    lineSourceMap = {};
    scatterSourceMap = {};
    lineLocaSource.destroy();
    scatterLocaSource.destroy();
    lineLocaSource = new Loca.GeoJSONSource({ data: lineSource });
    scatterLocaSource = new Loca.GeoJSONSource({ data: scatterSource });
  };

  // set data var to loca layer
  const setData = () => {
    lineLayer.value.setSource(lineLocaSource);
    scatterLayer.value.setSource(scatterLocaSource);
  };

  // form data var with specific year by incremental form
  const formData = (edges: IEdgeContent, nodes: INodeContent, year: number) => {
    const strYear = year.toString();

    // line
    const currentNewEdges = edges[strYear];
    if (currentNewEdges.length > 0) {
      for (const edge of currentNewEdges) {
        const id = edge.from + "-" + edge.to;

        if (id in lineSourceMap) {
          lineSource.features[lineSourceMap[id]].properties.times = edge.times;
        } else {
          lineSource.features.push({
            type: "Feature",
            properties: {
              colorIndex,
              times: edge.times,
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [edge.fromLng, edge.fromLat],
                [edge.toLng, edge.toLat],
              ],
            },
          });
          lineSourceMap[id] = lineSource.features.length - 1;
        }
      }
    }

    // scatter
    const currentNewNodes = nodes[strYear];
    if (currentNewNodes.length > 0) {
      for (const node of currentNewNodes) {
        if (node.id in scatterSourceMap) {
          scatterSource.features[scatterSourceMap[node.id]].properties.degree =
            node.degree;
        } else {
          scatterSource.features.push({
            type: "Feature",
            properties: {
              degree: node.degree,
            },
            geometry: {
              type: "Point",
              coordinates: [node.lng, node.lat],
            },
          });
          scatterSourceMap[node.id] = scatterSource.features.length - 1;
        }
      }
    }

    // final
    lineLocaSource.destroy();
    scatterLocaSource.destroy();
    lineLocaSource = new Loca.GeoJSONSource({
      data: lineSource,
    });
    scatterLocaSource = new Loca.GeoJSONSource({
      data: scatterSource,
    });
  };

  // loca layer
  const lineLayer = ref(
    USE_PULSE_LINE
      ? new Loca.PulseLineLayer({
          zIndex: 10,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
        })
      : new Loca.PulseLinkLayer({
          zIndex: 10,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
          depth: true,
        })
  );
  const scatterLayer = ref(
    new Loca.ScatterLayer({
      zIndex: 12,
      opacity: 1,
      visible: true,
      zooms: [2, 22],
    })
  );
  setData(); // must setData() here, else Loca will run into error
  if (USE_PULSE_LINE) {
    lineLayer.value.setStyle({
      altitude: 0,
      lineWidth: (_: any, feature: any) =>
        Math.log(feature.properties.times) * 1.3 + 1,
      headColor: (_: any, feature: any) =>
        headColors[feature.properties.colorIndex],
      trailColor: (_: any, feature: any) =>
        trailColors[feature.properties.colorIndex],
      interval: 0.5,
      duration: 5000,
    });
  } else {
    lineLayer.value.setStyle({
      unit: "px",
      // dash: [40000, 0, 40000, 0],
      lineWidth: (_: any, feature: any) => {
        const lineWidth = Math.log(feature.properties.times) * 1.3 + 1;
        return [lineWidth, lineWidth];
      },
      height: (_: any, feat: any) => {
        return feat.distance / 3 + 10;
      },
      smoothSteps: 10,
      speed: 5,
      flowLength: 50,
      maxHeightScale: 0.3,
      lineColors: [headColors[1]],
      headColor: headColors[0],
      trailColor: trailColors[1],
    });
  }
  scatterLayer.value.setStyle({
    unit: "px",
    size: (_: any, feature: any) => {
      const size = Math.log(feature.properties.degree) * 3 + 10;
      return [size, size];
    },
    borderWidth: 0,
    texture: "/breath_yellow.png",
    duration: 2000,
    animate: true,
  });

  loca.add(lineLayer.value);
  loca.add(scatterLayer.value);
  loca.animate.start();

  const dynamicHandler = (
    previousInterval: number | null,
    currentInterval: Ref<number | null>,
    currentYear: Ref<number>,
    edges: IEdgeContent,
    nodes: INodeContent
  ) => {
    if (previousInterval !== null && previousInterval !== 0) {
      window.clearInterval(previousInterval);
    }
    resetData();
    setData();
    currentYear.value = MIN_YEAR;

    currentInterval.value = window.setInterval(() => {
      if (MIN_YEAR <= currentYear.value && currentYear.value <= MAX_YEAR) {
        // form and set data
        formData(edges, nodes, currentYear.value);
        setData();

        currentYear.value += 1;
      } else if (currentInterval.value) {
        window.clearInterval(currentInterval.value);
        currentInterval.value = null;
      }
    }, ANIMATE_UPDATE_TIME_MS);
  };

  return {
    dynamicHandler,
    lineLayer,
    scatterLayer,
  };
}
