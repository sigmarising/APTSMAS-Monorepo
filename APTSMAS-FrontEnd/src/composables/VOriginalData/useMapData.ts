import { ref, Ref, watch } from "vue";
import type { ITravelDetail } from "./useApiData";
import type { IPoetInfoData } from "./useApiData";

/**
 * The custom map style can't set the China's country boundary color
 * from red to other. If you think this is incompatible, just set this
 * const `USE_CUSTOM_MAP_STYLE` to `false`
 */
export const USE_CUSTOM_MAP_STYLE = true;

export interface IPoetInfoMap {
  id: number;
  name: string;
  dynasty: string;
  lifeStart: number;
  lifeEnd: number;
  travelDetail: ITravelDetail;
}

export function convert2InfoMap(oldData: IPoetInfoData): IPoetInfoMap {
  return {
    id: oldData.id,
    name: oldData.name,
    dynasty: oldData.dynasty,
    lifeStart: oldData.lifeStart,
    lifeEnd: oldData.lifeEnd,
    travelDetail: oldData.travelDetail,
  };
}

export function useMapData(
  updateTime: Ref<string>,
  locationId: Ref<string>,
  poetInfoMapList: Ref<IPoetInfoMap[]>,
  showType: Ref<"People" | "Location">,
  AMap: AMap.NameSpace,
  map: AMap.Map | null
): {
  labelsLayer: Ref<AMap.LabelsLayer>;
  bezierLines: Ref<AMap.BezierCurve>;
} {
  // create infoWin
  const createInfoWindow = (title: string, content: string) => {
    const info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    info.style.width = "325px";

    // top
    const top = document.createElement("div");
    const titleD = document.createElement("div");
    const closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "/close2.gif";
    closeX.onclick = () => {
      map?.clearInfoWindow();
    };

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // middle
    const middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = "white";
    middle.innerHTML = content;
    info.appendChild(middle);

    // bottom
    const bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = "relative";
    bottom.style.top = "0px";
    bottom.style.margin = "0 auto";
    const sharp = document.createElement("img");
    sharp.src = "sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
  };

  // Callback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerClick = (e: any) => {
    map?.clearInfoWindow();
    const infoWin = new AMap.InfoWindow({
      isCustom: true,
      content: createInfoWindow(
        e.data.data.txt + " - 相关信息",
        e.target.content
      ),
      offset: new AMap.Pixel(16, -40),
    });
    if (map !== null) {
      infoWin.open(map, e.target.getPosition(), 400);
      map.setCenter(e.target.getPosition());
    }
  };

  // Method: handle the data
  const handleData = (
    locationId: string,
    infoMapList: IPoetInfoMap[]
  ): {
    points: AMap.LabelMarker[];
    path: number[][];
  } => {
    const points: AMap.LabelMarker[] = [];
    const path: number[][] = [];
    if (locationId === "-1")
      return {
        points,
        path,
      };

    // this need to return path
    if (infoMapList.length === 1 && showType.value === "People") {
      // form points
      for (const marker of infoMapList[0].travelDetail.markers) {
        const lm = new AMap.LabelMarker({
          name: marker.location + marker.id,
          position: new AMap.LngLat(marker.lng, marker.lat),
          icon: {
            image: "/mark_bs.png",
            size: [19, 32],
          },
          text: {
            content: marker.location,
            direction: "bottom",
            offset: [0, 3],
            style: {
              fontSize: 12,
              fontWeight: "normal",
              fillColor: "white",
              padding: "5",
              backgroundColor: "#3E944A",
              borderColor: "#53748A",
              borderWidth: 1,
            },
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (lm as any).content =
          "<b>" +
          infoMapList[0].name +
          " " +
          infoMapList[0].dynasty +
          " " +
          infoMapList[0].lifeStart.toString() +
          "-" +
          infoMapList[0].lifeEnd.toString() +
          "</b><br/>" +
          marker.detail.join("<br/>");

        lm.on("click", markerClick);

        points.push(lm);
      }

      // form path
      let previous: number[] = [];
      for (const line of infoMapList[0].travelDetail.lines) {
        for (const marker of line.markers) {
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
      }
    }
    // this need to return points (1 item) only
    else if (infoMapList.length > 0) {
      const conf: { name: string; location: string; position: AMap.Vector2 } = {
        name: "",
        location: "",
        position: [0, 0],
      };
      const content: string[] = [];

      infoMapList.forEach((poet, poetIndex) => {
        for (const marker of poet.travelDetail.markers) {
          if (marker.id === locationId) {
            if (conf.name === "") {
              conf.name = marker.id;
              conf.location = marker.location;
              conf.position = [marker.lng, marker.lat];
            }
            content.push(
              "<b>" +
                infoMapList[poetIndex].name +
                " " +
                infoMapList[poetIndex].dynasty +
                " " +
                infoMapList[poetIndex].lifeStart.toString() +
                "-" +
                infoMapList[poetIndex].lifeEnd.toString() +
                "</b><br/>" +
                marker.detail.join("<br/>")
            );
          }
        }
      });

      const lm = new AMap.LabelMarker({
        name: conf.name,
        position: conf.position,
        icon: {
          image: "/mark_bs.png",
          size: [19, 32],
        },
        text: {
          content: conf.location,
          direction: "bottom",
          offset: [0, 3],
          style: {
            fontSize: 12,
            fontWeight: "normal",
            fillColor: "white",
            padding: "5",
            backgroundColor: "#3E944A",
            borderColor: "#53748A",
            borderWidth: 1,
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lm as any).content = content.join("<br/>");
      lm.on("click", markerClick);
      points.push(lm);
    }

    return {
      points,
      path,
    };
  };

  const markers = ref<AMap.LabelMarker[]>([]);
  const lines = ref<number[][]>([]);
  const labelsLayer = ref(
    new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    })
  );
  const bezierLines = ref(
    new AMap.BezierCurve({
      isOutline: true,
      outlineColor: "gray",
      borderWeight: 0.5,
      strokeColor: "gray",
      strokeOpacity: 1,
      strokeWeight: 2,
      strokeStyle: "solid",
      lineJoin: "round",
      lineCap: "round",
      // showDir: true,
    })
  );

  map?.add(labelsLayer.value);

  // watch for data update
  watch(updateTime, () => {
    map?.clearMap();

    const { path, points } = handleData(
      locationId.value,
      poetInfoMapList.value
    );
    markers.value = points;
    lines.value = path;

    if (markers.value.length > 0) {
      labelsLayer.value.add(markers.value);
    }
    if (lines.value.length > 0) {
      bezierLines.value.setOptions({ path: lines.value });
      map?.add(bezierLines.value);
    }

    map?.setFitView();
  });

  return {
    labelsLayer,
    bezierLines,
  };
}
