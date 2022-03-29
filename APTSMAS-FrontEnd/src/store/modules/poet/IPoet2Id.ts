interface PoetItem {
  id: number;
  dynasty: string;
}

export interface IPoet2Id {
  [propertyName: string]: PoetItem;
}
