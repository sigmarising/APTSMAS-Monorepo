interface IdItem {
  name: string;
  type: "country" | "province" | "city" | "location";
}

export interface IId2Geo {
  [propertyName: string]: IdItem;
}
