import { IEmbPage } from "../typings/IEmbPage";

export const EmbPageTrans: IEmbPage = {
  pageHeaderText: "轨迹表示嵌入分析",
  pageDescText:
    "轨迹表示嵌入分析页面通过轨迹嵌入表示学习算法，以半监督的方式计算出不同的诗人在人生轨迹的迁徙模式在整体上是离群还是寻常。然后再依据模型计算结果，对不同地理级别的出入度进行实时计算分析展示。\n页面的选择区域可以选取用于计算轨迹嵌入表示的模型内核，算法选择部分则是可以选择半监督训练时初始化标注离群轨迹的算法依据，确认按钮仅会在两个选择框非空时激活。页面的初始化数据来自于 UTATD 内核和 LongShort-Based 半监督标注算法的结果。\n轨迹地图模块可以通过下拉框搜索并多选诗人，地图上会以绿色和红色分别标注出寻常和离群的轨迹。树形图模块则可以直接交互式查看整体的分析结果（支持节点点击和缩放操作）。各个地理级别的出入度排名将以柱形图的形式进行展示。",

  embKernelSelectPlaceHolder: "选择表示嵌入内核",
  algorithmSelectPlaceHolder: "选择算法",
  poetSelectPlaceHolder: "选择诗人轨迹",

  selectConfirmBtnText: "确认",
  showBtnText: "显示",

  mapHeader: "寻常/离群轨迹地图",

  chartHeaderTree: "寻常/离群诗人树形图",

  chartHeaderNormalLocationInDegree: "寻常地点入度 Top 20",
  chartHeaderNormalLocationOutDegree: "寻常地点出度 Top 20",
  chartHeaderAbnormalLocationInDegree: "离群地点入度 Top 20",
  chartHeaderAbnormalLocationOutDegree: "离群地点出度 Top 20",

  chartHeaderNormalCityInDegree: "寻常城市入度 Top 20",
  chartHeaderNormalCityOutDegree: "寻常城市出度 Top 20",
  chartHeaderAbnormalCityInDegree: "离群城市入度 Top 20",
  chartHeaderAbnormalCityOutDegree: "离群城市出度 Top 20",

  chartHeaderNormalProvinceInDegree: "寻常省份入度 Top 20",
  chartHeaderNormalProvinceOutDegree: "寻常省份出度 Top 20",
  chartHeaderAbnormalProvinceInDegree: "离群省份入度 Top 20",
  chartHeaderAbnormalProvinceOutDegree: "离群省份出度 Top 20",

  chartHeaderNormalCountryInDegree: "寻常国家入度 Top 20",
  chartHeaderNormalCountryOutDegree: "寻常国家出度 Top 20",
  chartHeaderAbnormalCountryInDegree: "离群国家入度 Top 20",
  chartHeaderAbnormalCountryOutDegree: "离群国家出度 Top 20",
};
