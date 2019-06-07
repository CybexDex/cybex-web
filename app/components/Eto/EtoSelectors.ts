import { EtoProject } from "../../services/eto";
import { EtoState } from "../../stores/EtoStore";
import * as moment from "moment";
import BigNumber from "bignumber.js";
export const enum Locale {
  ZH = "zh",
  EN = "en",
  VN = "vn"
}
export const selectProjects = (eto: EtoState) => eto.projects;

export const selectProject = (eto: EtoState) => (id: string) =>
  selectProjects(eto).find(project => project.id === id);

export const selectBanners = (eto: EtoState) => eto.banners;
export const selectIsUserStatus = (eto: EtoState, projectID: string) =>
  eto.userInSet[projectID] || {};
export const selectUserProjectStatus = (eto: EtoState, projectID: string) =>
  eto.userProjectStatus[projectID] || { current_base_token_count: 0 };
export const selectIsUserInProject = (eto: EtoState, projectID: string) =>
  eto.userInSet[projectID] && eto.userInSet[projectID].status === "ok";

export const selectProjectStatus = (etoProject: EtoProject.ProjectDetail) =>
  etoProject.status === EtoProject.EtoStatus.Unstart
    ? moment.utc(etoProject.start_at).isAfter(moment())
      ? EtoProject.EtoStatus.Unstart
      : EtoProject.EtoStatus.Running
    : etoProject.status === EtoProject.EtoStatus.Running
    ? EtoProject.EtoStatus.Running
    : etoProject.status === EtoProject.EtoStatus.Finished
    ? EtoProject.EtoStatus.Finished
    : EtoProject.EtoStatus.Failed;

export const selectProjectIsActive = (etoProject: EtoProject.ProjectDetail) =>
  selectProjectStatus(etoProject) === EtoProject.EtoStatus.Running;

// export const selectProjectStatus = (etoProject: EtoProject.ProjectDetail) =>
//   etoProject.finish_at
//     ? EtoProject.EtoStatus.Finish
//     : moment.utc(etoProject.start_at).isAfter(moment())
//     ? EtoProject.EtoStatus.Uninit
//     : EtoProject.EtoStatus.Running;
export const selectBanner = (eto: EtoProject.Banner, locale = Locale.ZH) =>
  ({
    imgUrl: locale === Locale.ZH ? eto.adds_banner : eto.adds_banner__lang_en,
    projectLink: eto.id
  } as EtoProject.SelectedBanner);
export const selectAdv = (eto: EtoProject.ProjectDetail, locale = Locale.ZH) =>
  locale === Locale.ZH ? eto.adds_advantage : eto.adds_advantage__lang_en;
export const selectTokenTotal = (
  eto: EtoProject.ProjectDetail,
  locale = Locale.ZH
) =>
  locale === Locale.ZH ? eto.adds_token_total : eto.adds_token_total__lang_en;

export const selectProjectKeywords = (
  eto: EtoProject.ProjectDetail,
  locale = Locale.ZH
) => (Locale.ZH ? eto.adds_keyword : eto.adds_keyword__lang_en);

export class EtoRate {
  rate: BigNumber;
  baseAsset: string;
  quoteAsset: string;
  base: number;
  quote = 1;
  constructor(public project: EtoProject.ProjectDetail) {
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
export const projectRate = (project: EtoProject.ProjectDetail) => {
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
