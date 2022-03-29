import { IVOriginalData } from "../typings/IVOriginalData";

export const VOriginalDataTrans: IVOriginalData = {
  pageHeaderText: "原始轨迹展示",
  pageDescText:
    "原始轨迹展示页面，旨在以更多的可交互选择形式，对诗人时空流动分析系统所依赖的原始轨迹数据（主要为唐宋年代文学著作可循迹的具有一定声望的诗人和词人），进行更加现代化科学化的细致内容展示。\n本页面主要包含有两方面的内容展示区域，分别是人生轨迹可视化地图展示以及相关诗人简介树形交互部分。本页面的选择区域包含有两个标签，对应着诗人选择标签以及地理选择标签。在诗人选择标签下，下拉框体可以选择唐代和宋代的诗人，支持框体内搜索操作。在地理选择标签下，支持按照国家、省份、城市、地点四大级别级联对地理位置进行搜索和选择。\n对诗人进行搜索后，地图模块将以轨迹和标记点形式呈现所选择诗人的轨迹，点击标记点会在地图内部以对话框体形式呈现该诗人在此处的具体流动行为；同时相关诗人简介区域会以树形模块动态展示所选择诗人的朝代、生平年份、参考文献、轨迹信息。若对地点进行搜索，地图模块将只会定位到该地点，交互对话框体会呈现与此地点相关的所有诗人信息；同时相关诗人简介中也会填入所有与此地点相关联的诗人。搜索按钮仅会在已经选中诗人或地点的前提下被激活。",

  mapCardHeader: "人生轨迹可视化",

  selectPoetTabText: "诗人",
  selectLocationTabText: "地点",
  selectPoetTextHolder: "选择要搜索的诗人",
  selectCountry: "选择国家",
  selectProvince: "选择省份",
  selectCity: "选择城市",
  selectLocation: "选择地点",
  selectConfirmBtnText: "搜索",

  treeCardHeader: "相关诗人简介",
  treeDynasty: "朝代",
  treeLife: "生平年份",
  treeReference: "参考文献",
  treeDetail: "详细生平轨迹",
  treeWait: "等待数据填入......",
};
