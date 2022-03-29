export interface IOLAMPage {
  pageHeaderText: string;
  pageDescText: string;

  selectPoet: string;
  selectTime: string;
  selectGeo: string;
  selectChangeBtnText: string;
  selectConfirmBtnText: string;

  drawerCurrentSelected: string;
  drawerRollUp: string;
  drawerDrillDown: string;
  drawerSlicing: string;
  drawerScaleUp: string;
  drawerScaleDown: string;
  drawerRollUpEnable: string;
  drawerRollUpDisable: string;
  drawerDrillDownEnable: string;
  drawerDrillDownDisable: string;

  chartTitleTree: string;
  chartTitlePoetTopK: string;
  chartTitleLocationTopK: string;
  chartTitleProvinceTopK: string;
  chartTitleFreqLocation: string;
  chartTitleFreqProvince: string;
  chartTitleOutlierLocation: string;
  chartTitleOutlierProvince: string;

  chartTitleYearTopK: string;
  chartTitleDecadeTopK: string;
  chartTitleCenturyTopK: string;
}
