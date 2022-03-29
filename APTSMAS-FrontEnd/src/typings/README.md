# typings of APTSMAS

This folder `typings/` store the types of some TSless libs. For currently, all the lib we used is TS-friendly except AMap-JSLoader.

However, the AMap official provides the types define for the kernel libs of JS-API2.0, and we can find it on [`@amap/amap-jsapi-types`](https://www.npmjs.com/package/@amap/amap-jsapi-types).

But, the official `.d.ts` is too old and has a lot of mistakes witch make the developer confuse and disgusting. So, what I do is:
1. Copying the `.d.ts` file from `node_modules` to `src/typings`
2. npm uninstall the `@amap/amap-jsapi-types`
3. Manual modify this type declare file to fit the development.

## Changes I Made to AMap.d.ts

* `LabelsLayer_2` is the actually Class we used rather than `LabelsLayer`, but it doesn't been export, so we merge them to `LabelsLayer`
* on `Map` class, method `setFitView` doesn't need any parameters

## Using typings of AMap.d.ts

The file is declared global. If still something go wrong, just add `/*global AMap*/` to JS/TS.

## About WinMap.d.ts

The AMap JS Loader will extend the window object with three new properties of AMap, AMapUI and Loca. So this declare file is to extend the Window with these properties.

Because the official doesn't provide the `@types` of AMapUI and Loca, so we just use `any` type for faster development.
