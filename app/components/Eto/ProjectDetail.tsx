import * as React from "react";
import { EtoProject } from "../../services/eto";
import * as moment from "moment";
import { EtoTimer, EtoTimerFull } from "./Timer";
import { BigNumber } from "../../../node_modules/bignumber.js";
import { connect } from "alt-react";
import IntlStore from "../../stores/IntlStore";
import AccountStore from "stores/AccountStore";
import {
  selectProjectKeywords,
  Locale,
  selectProjectIsActive,
  selectProjectStatus,
  selectProject,
  selectBanner,
  selectAdv,
  selectTokenTotal,
  EtoRate,
  selectIsUserInProject,
  selectIsUserStatus,
  selectUserProjectStatus
} from "./EtoSelectors";
import { ProgressBar, Button, Colors, Checkbox } from "../Common";
import { ProjectStatus } from "./ProjectStatus";
import counterpart from "counterpart";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { EtoStore } from "../../stores/EtoStore";
import { EtoActions } from "../../actions/EtoActions";
import { EtoPanel } from "./EtoPanel";
import Translate from "react-translate-component";
import { RouterActions } from "../../actions/RouterActions";
import { ModalActions } from "../../actions/ModalActions";
import { DEFAULT_ETOMODAL_ID, EtoLegalModal } from "./EtoLegalModal";
const InfoItem = ({ label, content }) => (
  <li style={{ fontSize: "14px" }}>
    <span
      className="info-title"
      style={{ marginRight: "8px", whiteSpace: "pre" }}
    >
      <Translate content={label} />
      {content && ":"}
    </span>
    <span
      className="info-detail"
      style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
    >
      {content}
    </span>
  </li>
);

// const projectState
type ProjectDetailProps = {
  project: EtoProject.ProjectDetail;
  locale?: Locale;
  isUserIn: boolean;
  [other: string]: any;
};
let ProjectDetail = class extends React.Component<
  RouteComponentProps & ProjectDetailProps
> {
  updateTimer;

  state = { legal: false };

  _renderLegalTip = () => {
    return (
      <Checkbox
        onChange={legal => this.setState({ legal })}
        active={this.state.legal}
      >
        <Translate
          content="EIO.IHaveRead_1"
          condition={
            <a
              href="javascipt:;"
              onClick={() => ModalActions.showModal(DEFAULT_ETOMODAL_ID)}
            >
              {counterpart.translate("EIO.IHaveRead_2")}
            </a>
          }
        />
      </Checkbox>
    );
  };
  componentWillUnmount() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  }
  componentWillMount() {
    EtoActions.loadProjectDetail(this.props.match.params["id"]);
    this.updateTimer = setInterval(() => {
      EtoActions.queryUserIn(this.props.match.params["id"], this.props.account);
      EtoActions.updateProject(this.props.match.params["id"]);
      EtoActions.updateProjectByUser(
        this.props.match.params["id"],
        this.props.account
      );
    }, 3000);
  }

  render() {
    if (!this.props.project) {
      return null;
    }

    const { match, project, locale, history, isLogin, isUserIn } = this.props;
    const isActive = selectProjectIsActive(project);
    console.debug("ISACtive: ", isActive, project);
    const status = selectProjectStatus(project);
    const rate = new EtoRate(project);

    return (
      <div
        className="grid-container row"
        style={{ display: "flex", flexWrap: "wrap", padding: "12px" }}
      >
        <div className="column small-12 medium-7">
          <img src={selectBanner(project, locale).imgUrl} alt="" />
          <div style={{ display: "flex", margin: "12px 0" }}>
            <div style={{ flexGrow: 1 }}>
              <ProgressBar
                styleType={isActive ? "primary" : "secondary"}
                percent={(project.current_percent || 0) * 100}
              />
            </div>
            <span
              style={{
                marginLeft: "1em",
                color: isActive ? Colors.$colorOrange : Colors.$colorWhite
              }}
            >
              {project.current_percent * 100}%
            </span>
          </div>
          <div>
            <h5 style={{ fontSize: "14px" }}>
              {counterpart.translate("EIO.Personal_Limit")}:{" "}
              {project.base_min_quota === project.base_max_quota
                ? rate.convertBaseToQuote(project.base_max_quota)
                : `${rate.convertBaseToQuote(
                    project.base_min_quota
                  )}-${rate.convertBaseToQuote(project.base_max_quota)}`}
              {` ${project.token_name}`}
            </h5>
            <h5 style={{ fontSize: "14px" }}>
              {counterpart.translate("EIO.Total")}:{" "}
              {rate.convertBaseToQuote(project.base_token_count)}{" "}
              {project.token_name}
            </h5>
            <h5 style={{ fontSize: "14px" }}>
              {counterpart.translate("EIO.Redeeming_Ratio")}: {project.eto_rate}
            </h5>
          </div>
          <div style={{ textAlign: "left", margin: "16px 0" }}>
            <EtoTimerFull showTip project={project} />
          </div>
        </div>
        <div className="column small-12 medium-5">
          <h4 style={{ textAlign: "left", margin: "0 12px", fontSize: "32px" }}>
            {project.name}{" "}
            <span style={{ fontWeight: "lighter", fontSize: "18px" }}>
              [
              <ProjectStatus
                style={{ display: "inline", fontSize: "18px" }}
                status={status}
              />
              ]
            </span>
          </h4>
          <ul>
            <InfoItem label="EIO.Project_Name" content={project.project} />
            <InfoItem
              label="EIO.Total_Token_Supply"
              content={selectTokenTotal(project)}
            />
            <InfoItem
              label="eto_project.current_currency"
              content={counterpart.translate("eto_project.no_currency")}
            />
            <InfoItem
              label="eto_project.lockup"
              content={counterpart.translate("eto_project.no_lockup")}
            />
            <InfoItem
              label="eto_project.distribution"
              content={counterpart.translate("eto_project.dist_cybex")}
            />
            <InfoItem label="eto_project.market" content="CYB/DOT USDT/DOT" />
          </ul>
          <ul>
            <InfoItem label="eto_project.more" content="" />
            <InfoItem
              label="EIO.Official_Website"
              content={
                <a href={project.adds_website}>{project.adds_website}</a>
              }
            />
            <InfoItem
              label="EIO.Whitepaper"
              content={
                <a href={project.adds_whitepaper}>{project.adds_whitepaper}</a>
              }
            />
          </ul>
          <div style={{ margin: "12px" }}>
            {isLogin ? (
              (status === EtoProject.EtoStatus.Unstart ||
                status === EtoProject.EtoStatus.Running) &&
              !isUserIn ? (
                <Button type="primary" disabled>
                  {counterpart.translate("eto_project.fobidden")}
                </Button>
              ) : status === EtoProject.EtoStatus.Unstart && isUserIn ? (
                <>
                  {this._renderLegalTip()}
                  <Button type="primary" disabled>
                    {counterpart.translate("EIO.pre")}
                  </Button>
                </>
              ) : status === EtoProject.EtoStatus.Running && isUserIn ? (
                <>
                  {this._renderLegalTip()}
                  <Button
                    type="primary"
                    disabled={!this.state.legal}
                    onClick={() => history.push(`/eto/join/${project.id}`)}
                  >
                    {counterpart.translate("EIO.participate")}
                  </Button>
                </>
              ) : null
            ) : (
              <Button
                onClick={() => {
                  RouterActions.setDeferRedirect(history.location.pathname);
                  history.push("/login");
                }}
              >
                {counterpart.translate("EIO.Not_login")}
              </Button>
            )}
          </div>
          {/* <h4>{selectProjectKeywords(project, locale)}</h4> */}
        </div>
        <div className="column small-12">
          <EtoPanel style={{ margin: 0 }}>
            <Translate content="EIO.Project_Strengths" component="h2" />
            <p style={{ fontSize: "14px" }}>{selectAdv(project, locale)}</p>
          </EtoPanel>
        </div>
        <EtoLegalModal modalId={DEFAULT_ETOMODAL_ID} />
      </div>
    );
  }
};

export function isLogin(accountStore): boolean {
  let state = {
    account: AccountStore.getState().currentAccount,
    linkedAccounts: AccountStore.getState().linkedAccounts,
    myIgnoredAccounts: AccountStore.getState().myIgnoredAccounts,
    passwordAccount: AccountStore.getState().passwordAccount
  };
  let accountCount =
    state.linkedAccounts.size +
    state.myIgnoredAccounts.size +
    (state.passwordAccount && state.account ? 1 : 0);
  return !!accountCount;
}

ProjectDetail = withRouter<RouteComponentProps & ProjectDetailProps>((connect(
  ProjectDetail,
  {
    listenTo() {
      return [IntlStore, EtoStore, AccountStore];
    },
    getProps({ match }) {
      let project = selectProject(EtoStore.getState())(match.params.id);

      return {
        isLogin: isLogin(AccountStore),
        account: AccountStore.getState().currentAccount,
        isUserIn: selectIsUserInProject(EtoStore.getState(), match.params.id),
        locale: IntlStore.getState().currentLocale,
        currentAccount: AccountStore.getState().currentAccount,
        userStatus: selectIsUserStatus(EtoStore.getState(), match.params.id),
        userProjectStatus: selectUserProjectStatus(
          EtoStore.getState(),
          match.params.id
        ),
        project,
        asset: project && project.base_token
      };
    }
  }
) as unknown) as typeof ProjectDetail) as any;

export { ProjectDetail };
