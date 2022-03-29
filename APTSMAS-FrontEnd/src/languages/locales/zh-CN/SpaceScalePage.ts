import { ISpaceScalePage } from "../typings/ISpaceScale";

export const VSpaceScalePageTrans: ISpaceScalePage = {
  pageHeaderText: "空间规模时变迁徙",
  pageDescText:
    "空间规模时变迁徙页面旨在动态随年份的时间变化，可视化展示不同诗人的迁徙轨迹结果。\n地图模块会以点和线的形式展示众多不同诗人迁徙的变化，其中线越粗表明此轨迹模式有越多人采用，而点越粗表明此地点的造访程度越高。地图模块支持缩放和拖动操作。\n时间动态变化将允许年份变化到最大值时停止，而时间重置按钮可以在任意时刻将变化的时间重置为最小值。",

  mapHeaderText: "可视化地图",
  mapCurrentYear: "当前年份为",
  mapResetTime: "时间重置",
};
