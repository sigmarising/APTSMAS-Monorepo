import { IVOriginalData } from "../typings/IVOriginalData";

export const VOriginalDataTrans: IVOriginalData = {
  pageHeaderText: "Original Data Visualize",
  pageDescText:
    "The Original Data Visualize page is designed to provide more interactive options for the original trajectory data that the Ancient Poets Temporal and Spatial Mobility Analysis System (APTSMAS) relies on (Tang and Song dynasties poets who have a certain reputation and can be traced) and carry out a more modern and scientific detailed content display.\nThis page mainly includes two content display areas, namely, the visual map display of the Life Routes Visualize and the tree-shaped interactive part of the Related Poets Intro. The selection area of this page contains two tabs, corresponding to the Poet Selection tab and the Geo Selection tab. Under the Poet Selection tab, the drop-down box can select poets from the Tang and Song Dynasties, and supports search operations in the box. Under the Geographic Selection tab, you can search and select geographic locations by cascading four levels: country, province, city, and location. \nAfter searching for a poet, the map module will display the trajectory of the selected poet in the form of tracks and markers. Clicking on the marker points will display the poet's specific flow behavior here in the form of a dialog box inside the map. The introduction area will dynamically display the dynasty, life year, references, and trajectory information of the selected poet in a tree-shaped module. If you search for a place, the map module will only locate the place, and the interactive dialog will display all poet information related to this place. At the same time, all poets associated with this place will be filled in the relevant poet profiles. The search button will only be activated if a poet or location has been selected.",

  mapCardHeader: "Life Routes Visualize",

  selectPoetTabText: "Poet",
  selectLocationTabText: "Location",
  selectPoetTextHolder: "Select poet",
  selectCountry: "Select country",
  selectProvince: "Select province",
  selectCity: "Select City",
  selectLocation: "Select Location",
  selectConfirmBtnText: "Search",

  treeCardHeader: "Related Poets Intro",
  treeDynasty: "Dynasty",
  treeLife: "Life Duration",
  treeReference: "References Books",
  treeDetail: "Ages Detail",
  treeWait: "Waiting for data to fill in......",
};
