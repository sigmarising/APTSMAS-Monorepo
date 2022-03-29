import { ref, Ref } from "vue";
import { PoetResultTrajectory } from "./IApiData";

/**
 * The custom map style can't set the China's country boundary color
 * from red to other. If you think this is incompatible, just set this
 * const `USE_CUSTOM_MAP_STYLE` to `false`
 */
export const USE_CUSTOM_MAP_STYLE = true;

export function useMapData(
  vmPoets: Ref<number[] | null>,
  mapData: Ref<PoetResultTrajectory[]>,
  mapColor: string[],
  AMap: AMap.NameSpace,
  map: AMap.Map | null
): { updateMap: () => void; bezierLineList: Ref<AMap.BezierCurve[]> } {
  const handlePath = (line: PoetResultTrajectory) => {
    const path: number[][] = [];

    let previous: number[] = [];
    for (const marker of line.trajectory) {
      if (path.length === 0) {
        previous = [marker.lng, marker.lat];
        path.push(previous);
        continue;
      }

      const ctrl1 = [(previous[0] + marker.lng) / 2.0, previous[1]];
      const ctrl2 = [marker.lng, (previous[1] + marker.lat) / 2.0];

      path.push([
        ctrl1[0],
        ctrl1[1],
        ctrl2[0],
        ctrl2[1],
        marker.lng,
        marker.lat,
      ]);

      previous = [marker.lng, marker.lat];
    }

    const bezierLine = new AMap.BezierCurve({
      isOutline: true,
      outlineColor: mapColor[line.normal ? 0 : 1],
      borderWeight: 0.5,
      strokeColor: mapColor[line.normal ? 0 : 1],
      strokeOpacity: 1,
      strokeWeight: 2,
      strokeStyle: "solid",
      lineJoin: "round",
      lineCap: "round",
    });
    bezierLine.setOptions({ path });

    return bezierLine;
  };

  // store all bezierCurve
  // if you want better performance, make it to bezierLinePool
  const bezierLineList = ref<AMap.BezierCurve[]>([]);

  const updateMap = () => {
    // clear map
    map?.clearMap();

    // clear memory
    for (const line of bezierLineList.value) line.destroy();
    bezierLineList.value = [];

    // push new
    for (const line of mapData.value) {
      if (vmPoets.value?.includes(line.id)) {
        const bezierLine = handlePath(line);

        bezierLineList.value.push(bezierLine);
        map?.add(bezierLine);
      }
    }

    // auto view
    map?.setFitView();
  };

  return { updateMap, bezierLineList };
}
