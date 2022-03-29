import { IOLAMPage } from "../typings/IOLAMPage";

export const VOLAMPageTrans: IOLAMPage = {
  pageHeaderText: "Trajectory OLAM",
  pageDescText:
    "Trajectory OLAM (On-Line Analytical Mining) Page extracts three dimensions of Poets, Time and Geography from the poet's trajectory data, then manages and analyzes the poet's trajectory data in the form of a data warehouse. \nThe entire page is divided into two parts, namely the OLAP (On-Line Analytic Processing) selection part, and the analysis display chart part. The OLAP selection part includes three dimensions: poets, time, and geography. It supports scrolling up, drilling down, and slicing operations at different levels on the dimension (slicing operations support search selection). The Analysis button will not be activated until any dimension has been selected. \nAnalysis chart display section contains multiple charts, including OLAM dimension cube, poet travel ranking, travel geographic ranking, frequent and outlier migration patterns, hot-spot visit time and other chart information. All charts support specific viewing operations such as the hovering pointer on the icon. \nThe sample data initialized on this page is the analysis result under the condition that the poet dimension is Tang Dynasty, the time dimension is 700-1099 years, and the geographic dimension is China and Kyrgyzstan at the national level.",

  selectPoet: "Poets Selected",
  selectTime: "Time Selected",
  selectGeo: "Geo Selected",
  selectChangeBtnText: "Change",
  selectConfirmBtnText: "Analysis",

  drawerCurrentSelected: "Current Selected",
  drawerRollUp: "Roll-Up",
  drawerDrillDown: "Drill-Down",
  drawerSlicing: "Slicing",
  drawerScaleUp: "Scale Up",
  drawerScaleDown: "Scale Down",
  drawerRollUpEnable: "Select to Roll-Up",
  drawerRollUpDisable: "Can't Roll-Up",
  drawerDrillDownEnable: "Select to Drill-Down",
  drawerDrillDownDisable: "Can't Drill-Down",

  chartTitleTree: "OLAM Dimensional Cube",
  chartTitlePoetTopK: "Poet Travel Top 20",
  chartTitleLocationTopK: "Traveled Location Top 20",
  chartTitleProvinceTopK: "Traveled Province Top 20",
  chartTitleFreqLocation: "Frequent Location Pattern",
  chartTitleFreqProvince: "Frequent Province Pattern",
  chartTitleOutlierLocation: "Outlier Location Pattern",
  chartTitleOutlierProvince: "Outlier Province Pattern",

  chartTitleYearTopK: "Hot Year Top 20",
  chartTitleDecadeTopK: "Hot Decade Top 20",
  chartTitleCenturyTopK: "Hot Century Top 20",
};
