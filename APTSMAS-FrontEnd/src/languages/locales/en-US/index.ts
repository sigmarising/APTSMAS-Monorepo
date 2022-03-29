import { HomePageTrans } from "./HomePage";
import { NotFoundTrans } from "./NotFound";
import { VOriginalDataTrans } from "./VOriginalData";
import { ILang } from "../typings";
import { VOLAMPageTrans } from "./OLAMPage";
import { VTimeVariantPageTrans } from "./TimeVariantPage";
import { EmbPageTrans } from "./EmbPage";
import { VSpaceScalePageTrans } from "./SpaceScalePage";

const translations: ILang = {
  homePage: HomePageTrans,
  notFound: NotFoundTrans,
  vOriginalData: VOriginalDataTrans,
  vOLAM: VOLAMPageTrans,
  vTimeVariant: VTimeVariantPageTrans,
  vEmb: EmbPageTrans,
  vSpaceScale: VSpaceScalePageTrans,
};

export default translations;
