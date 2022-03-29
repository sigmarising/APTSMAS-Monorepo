import { IEmbPage } from "./IEmbPage";
import { IHomePage } from "./IHomePage";
import { INotFound } from "./INotFound";
import { IOLAMPage } from "./IOLAMPage";
import { ISpaceScalePage } from "./ISpaceScale";
import { ITimeVariantPage } from "./ITimeVariantPage";
import { IVOriginalData } from "./IVOriginalData";

export interface ILang {
  homePage: IHomePage;
  notFound: INotFound;
  vOriginalData: IVOriginalData;
  vOLAM: IOLAMPage;
  vTimeVariant: ITimeVariantPage;
  vEmb: IEmbPage;
  vSpaceScale: ISpaceScalePage;
}
