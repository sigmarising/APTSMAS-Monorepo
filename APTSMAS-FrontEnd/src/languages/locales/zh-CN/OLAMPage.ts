import { IOLAMPage } from "../typings/IOLAMPage";

export const VOLAMPageTrans: IOLAMPage = {
  pageHeaderText: "轨迹 OLAM 挖掘",
  pageDescText:
    "轨迹联机分析挖掘（On-Line Analytical Mining，OLAM）页面，从诗人的轨迹数据中抽取了诗人、时间、地理三个维度，以数据仓库的形式对诗人轨迹的数据进行管理和分析。\n整个页面分为两大部分，即联机分析处理（On-Line Analytic Processing，OLAP）选择部分，以及分析展示图表部分。OLAP 选择部分包括诗人、时间、地理三个维度，支持在维度上进行不同层级的上卷、下钻、切片操作（切片操作支持搜索选取）。分析按钮在任何一个维度未完成选取操作之前不会被激活。\n分析图表展示部分包含有多个图表，其中包括 OLAM 维度立方体、诗人游历排名、游历地理排名、频繁和离群迁徙模式、热点访问时间等图表信息。所有的图表均支持图标上悬浮指针等具体查看的操作。\n本页面初始化的示例数据，为在诗人维度为唐朝，时间维度选择百年范围 700-1099 年，地理维度选取国家级别的中国和吉尔吉斯斯坦的条件下的分析结果。",

  selectPoet: "诗人选择",
  selectTime: "时间选择",
  selectGeo: "地理选择",
  selectChangeBtnText: "修改",
  selectConfirmBtnText: "分析",

  drawerCurrentSelected: "当前选中",
  drawerRollUp: "上卷",
  drawerDrillDown: "下钻",
  drawerSlicing: "切片",
  drawerScaleUp: "尺度增大",
  drawerScaleDown: "尺度缩小",
  drawerRollUpEnable: "选择以上卷",
  drawerRollUpDisable: "无法上卷",
  drawerDrillDownEnable: "选择以下钻",
  drawerDrillDownDisable: "无法下钻",

  chartTitleTree: "OLAM 维度立方体",
  chartTitlePoetTopK: "诗人游历 Top 20",
  chartTitleLocationTopK: "游历地点 Top 20",
  chartTitleProvinceTopK: "游历省份 Top 20",
  chartTitleFreqLocation: "频繁地点迁徙模式",
  chartTitleFreqProvince: "频繁省份迁徙模式",
  chartTitleOutlierLocation: "离群地点迁徙模式",
  chartTitleOutlierProvince: "离群省份迁徙模式",

  chartTitleYearTopK: "热点年份 Top 20",
  chartTitleDecadeTopK: "热点十年 Top 20",
  chartTitleCenturyTopK: "热点百年 Top 20",
};
