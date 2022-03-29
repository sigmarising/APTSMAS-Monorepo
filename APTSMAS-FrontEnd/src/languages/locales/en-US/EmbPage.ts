import { IEmbPage } from "../typings/IEmbPage";

export const EmbPageTrans: IEmbPage = {
  pageHeaderText: "Trajectory Embedding Analysis",
  pageDescText:
    "The Trajectory Embedding Analysis page uses the Trajectory Embedding Representation Learning Algorithm to calculate in a semi-supervised manner whether the migration patterns of different poets in their life trajectories are outliers or ordinary as a whole. Then, according to the calculation results of the model, real-time calculation, analysis and display of the access degree of different geographical levels are performed. \nThe selection area of the page can select the model kernel used to calculate the embedded representation of the trajectory, and the algorithm selection part can select the algorithm basis for initializing the outlier trajectory during semi-supervised training. The confirm button will only be activated when the two selection boxes are not empty. The initialization data of the page comes from the results of the UTATD kernel and the LongShort-Based semi-supervised labeling algorithm. \nThe trajectory map module can search and select multiple poets through the drop-down box, and the ordinary and outlier trajectories will be marked in green and red respectively on the map. The tree diagram module can directly and interactively view the overall analysis results (supports node click and zoom operations). The access ranking for each geographic level will be displayed in the form of a column chart.",

  embKernelSelectPlaceHolder: "Select embedding kernel",
  algorithmSelectPlaceHolder: "Select algorithm",
  poetSelectPlaceHolder: "Select Poets' trajectories",

  selectConfirmBtnText: "Confirm",
  showBtnText: "Show",

  mapHeader: "Normal/Abnormal Trajectories Map",

  chartHeaderTree: "Normal/Abnormal Poets Tree View",

  chartHeaderNormalLocationInDegree: "Normal Location In-Degree Top 20",
  chartHeaderNormalLocationOutDegree: "Normal Location Out-Degree Top 20",
  chartHeaderAbnormalLocationInDegree: "Abnormal Location In-Degree Top 20",
  chartHeaderAbnormalLocationOutDegree: "Abnormal Location Out-Degree Top 20",

  chartHeaderNormalCityInDegree: "Normal City In-Degree Top 20",
  chartHeaderNormalCityOutDegree: "Normal City Out-Degree Top 20",
  chartHeaderAbnormalCityInDegree: "Abnormal City In-Degree Top 20",
  chartHeaderAbnormalCityOutDegree: "Abnormal City Out-Degree Top 20",

  chartHeaderNormalProvinceInDegree: "Normal Province In-Degree Top 20",
  chartHeaderNormalProvinceOutDegree: "Normal Province Out-Degree Top 20",
  chartHeaderAbnormalProvinceInDegree: "Abnormal Province In-Degree Top 20",
  chartHeaderAbnormalProvinceOutDegree: "Abnormal Province Out-Degree Top 20",

  chartHeaderNormalCountryInDegree: "Normal Country In-Degree Top 20",
  chartHeaderNormalCountryOutDegree: "Normal Country Out-Degree Top 20",
  chartHeaderAbnormalCountryInDegree: "Abnormal Country In-Degree Top 20",
  chartHeaderAbnormalCountryOutDegree: "Abnormal Country Out-Degree Top 20",
};
