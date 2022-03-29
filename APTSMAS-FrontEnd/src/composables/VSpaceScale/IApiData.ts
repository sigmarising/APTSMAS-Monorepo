export interface IEdgeItem {
  from: string;
  fromLat: number;
  fromLng: number;
  times: number;
  to: string;
  toLat: number;
  toLng: number;
}

export interface INodeItem {
  degree: number;
  id: string;
  lat: number;
  lng: number;
}

export interface IEdgeContent {
  [property: string]: IEdgeItem[];
}

export interface INodeContent {
  [property: string]: INodeItem[];
}

export interface ISpaceScaleSearchResult {
  type: "points" | "edges";
  content: string;
}
