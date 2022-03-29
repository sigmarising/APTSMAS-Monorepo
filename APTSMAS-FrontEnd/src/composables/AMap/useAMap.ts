import AMapLoader from "@amap/amap-jsapi-loader";
import type { IState } from "@/store";
import { Store } from "@/store";

/**
 * useAMap returns
 * @property `asyncLoadAMap` the async func to load amap
 */
interface useAMapReturn {
  asyncLoadAMap: () => Promise<AMap.NameSpace>;
}

/**
 * hook for the AMap load in
 * @param `AMapPlugins` the plugin list of AMap
 * @param `AMapUIPlugins` the plugin list of AMapUI
 * @param `store` the VueX store
 * @returns the AMap instance
 *
 * Notice:
 *    The asyncLoadAMap use the async loader from @amap/amap-jsapi-loader
 *    And this loader will extend the window object with three new properties
 *    of AMap, AMapUI, Loca.
 *    However, the js loader return only a Promise of AMap (the same with the property object
 *    on window, you can log to confirm this).
 *    If you want to use AMap, you can use it by window or this function useAMap
 *    else if you want to use AMapUI or Loca, just use them by window
 */
export function useAMap(
  store: Store<IState>,
  AMapPlugins?: string[] | undefined,
  AMapUIPlugins?: string[] | undefined
): useAMapReturn {
  // load AMap with JS loader onMounted Async
  const asyncLoadAMap = async () => {
    const AMap: AMap.NameSpace = await AMapLoader.load({
      key: store.state.aMap.secretKey,
      version: "2.0",
      plugins: AMapPlugins ? AMapPlugins : [],
      AMapUI: {
        version: "1.1",
        plugins: AMapUIPlugins ? AMapUIPlugins : [],
      },
      Loca: {
        version: "2.0.0",
      },
    });
    return AMap;
  };

  return {
    asyncLoadAMap,
  };
}
