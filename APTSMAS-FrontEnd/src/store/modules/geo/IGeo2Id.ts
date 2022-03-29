interface LocationItem {
  id: string;
}

interface CityItem {
  id: string;
  content: {
    [propertyName: string]: LocationItem;
  };
}

interface ProvinceItem {
  id: string;
  content: {
    [propertyName: string]: CityItem;
  };
}

interface CountryItem {
  id: string;
  content: {
    [propertyName: string]: ProvinceItem;
  };
}

export interface IGeo2Id {
  [propertyName: string]: CountryItem;
}
