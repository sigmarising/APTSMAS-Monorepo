import type { TimeVariantType } from "./useSelectCardOptions";

export interface ITimeVariantApiResponse {
  type: TimeVariantType;
  content: string;
}

export interface ITimeVariantContentItem {
  name: string;
  value: number;
}

export interface ITimeVariantContent {
  [property: string]: ITimeVariantContentItem[];
}
