import { EdgeProject } from "../../services/edge";
import { EdgeState } from "../../stores/EdgeStore";
import * as moment from "moment";
import BigNumber from "bignumber.js";
export const enum Locale {
  ZH = "zh",
  EN = "en",
  VN = "vn"
}
export const selectProjects = (eto: EdgeState) => eto.projects;

export const selectProject = (eto: EdgeState) => (id: string) =>
  selectProjects(eto).find(project => project.id === id);

export const selectBanners = (eto: EdgeState) => eto.banners;
export const selectIsUserStatus = (eto: EdgeState, projectID: string) =>
  eto.userInSet[projectID] || {};
export const selectUserProjectStatus = (eto: EdgeState, projectID: string) =>
  eto.userProjectStatus[projectID] || { current_base_token_count: 0 };
export const selectIsUserInProject = (eto: EdgeState, projectID: string) =>
  eto.userInSet[projectID] && eto.userInSet[projectID].status === "ok";

export const selectProjectStatus = (etoProject: EdgeProject.ProjectDetail) =>
  etoProject.status === EdgeProject.EdgeStatus.Unstart
    ? moment.utc(etoProject.start_at).isAfter(moment())
      ? EdgeProject.EdgeStatus.Unstart
      : EdgeProject.EdgeStatus.Running
    : etoProject.status === EdgeProject.EdgeStatus.Running
    ? EdgeProject.EdgeStatus.Running
    : etoProject.status === EdgeProject.EdgeStatus.Finished
    ? EdgeProject.EdgeStatus.Finished
    : EdgeProject.EdgeStatus.Failed;

export const selectProjectIsActive = (etoProject: EdgeProject.ProjectDetail) =>
  selectProjectStatus(etoProject) === EdgeProject.EdgeStatus.Running;

// export const selectProjectStatus = (etoProject: EdgeProject.ProjectDetail) =>
//   etoProject.finish_at
//     ? EdgeProject.EdgeStatus.Finish
//     : moment.utc(etoProject.start_at).isAfter(moment())
//     ? EdgeProject.EdgeStatus.Uninit
//     : EdgeProject.EdgeStatus.Running;
export const selectBanner = (eto: EdgeProject.Banner, locale = Locale.ZH) =>
  ({
    imgUrl: locale === Locale.ZH ? eto.adds_banner : eto.adds_banner__lang_en,
    projectLink: eto.id
  } as EdgeProject.SelectedBanner);
export const selectAdv = (eto: EdgeProject.ProjectDetail, locale = Locale.ZH) =>
  locale === Locale.ZH ? eto.adds_advantage : eto.adds_advantage__lang_en;
export const selectTokenTotal = (
  eto: EdgeProject.ProjectDetail,
  locale = Locale.ZH
) =>
  locale === Locale.ZH ? eto.adds_token_total : eto.adds_token_total__lang_en;

export const selectProjectKeywords = (
  eto: EdgeProject.ProjectDetail,
  locale = Locale.ZH
) => (Locale.ZH ? eto.adds_keyword : eto.adds_keyword__lang_en);

export class EdgeRate {
  rate: BigNumber;
  baseAsset: string;
  quoteAsset: string;
  base: number;
  quote = 1;
  constructor(public project: EdgeProject.ProjectDetail) {
    let rate = (this.rate = new BigNumber(project.base_token_count).div(
      new BigNumber(project.quote_token_count)
    ));
    this.baseAsset = project.base_token;
    this.quoteAsset = project.token;
    this.base = rate.toNumber();
  }

  convertBaseToQuote(baseValue: number) {
    return new BigNumber(baseValue).div(this.rate).toNumber();
  }
  convertQuoteToBase(quote: number) {
    return this.rate.times(quote).toNumber();
  }
}
export const projectRate = (project: EdgeProject.ProjectDetail) => {
  let rate = new BigNumber(project.base_token_count).div(
    new BigNumber(project.quote_token_count)
  );
  return {
    baseAsset: project.base_token,
    quoteAsset: project.token,
    base: rate.toNumber(),
    quote: 1
  };
};
