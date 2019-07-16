import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AltContainer from "alt-container";
import AccountStore from "stores/AccountStore";
import { RouterStore } from "stores/RouterStore";
import { RouterActions } from "actions/RouterActions";
import { EtoActions } from "actions/EtoActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { connect } from "alt-react";
import { EtoStore } from "stores/EtoStore";
import { Route, Switch, Redirect } from "react-router-dom";
import { EtoInfoForm } from "./EtoInfoForm";
import { Eto } from "../../services/eto";
import { EtoSurveyForm } from "./EtoSurveyForm";
import { EtoCenter } from "./EtoCenter";
import { EtoRule, EtoExplain } from "./EtoRule";
import counterpart from "counterpart";
import { EtoContent, EtoContentWrapper } from "./EtoPanel";
import { EtoLockForm } from "./EtoLockForm";
import { Gtag } from "services/Gtag";

type EtoProps = {
  linkedAccounts: any;
  etoState: Eto.EtoInfo;
  account: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let EtoLock = class extends React.Component<EtoProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { etoState, account } = this.props as any;
    if (etoState.state === Eto.EtoPersonalState.Uninit) {
      EtoActions.queryInfo(account);
    }
  }
  componentDidUpdate() {
    let { etoState, account } = this.props as any;
    if (etoState.state === Eto.EtoPersonalState.Uninit) {
      EtoActions.queryInfo(account);
    }
  }

  render() {
    let { etoState, account } = this.props as any;
    return (
      <div className="grid-container">
        <div style={{ padding: "6px" }} />
        <EtoLockForm
          balance={this.props.account.getIn(["balances", "1.3.0"])}
          onLock={value =>
            EtoActions.applyLock(value, this.props.account, () => {
              Gtag.eventActivity("Eto", "锁仓成功，跳转");
              EtoActions.queryInfo(this.props.account);
              this.props.history.push("/eto/apply");
            })
          }
        />
        <EtoRule />
        <EtoContentWrapper>
          <EtoExplain />
        </EtoContentWrapper>
        <EtoContent
          heading={counterpart.translate("eto_apply.lock.tip_heading")}
          contents={new Array(4)
            .fill(1)
            .map((_, i) =>
              counterpart.translate(`eto_apply.lock.tip_content_${i + 1}`)
            )}
        />
      </div>
    );
  }
};
EtoLock = BindToChainState(EtoLock);

let EtoLockWrapper = class extends React.Component<EtoProps> {
  componentWillMount() {
    let {
      linkedAccounts,
      myIgnoredAccounts,
      passwordAccount,
      etoState
    } = this.props;
    let accountCount =
      linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);
    if (!accountCount || etoState.state !== Eto.EtoPersonalState.Lock) {
      this.props.history.push("/eto/apply");
    }
  }
  render() {
    return <EtoLock {...this.props} />;
  }
} as any;

EtoLockWrapper = connect(
  EtoLockWrapper,
  {
    listenTo() {
      return [AccountStore, RouterStore, EtoStore];
    },
    getProps() {
      return {
        etoState: EtoStore.getState(),
        account: AccountStore.getState().currentAccount,
        linkedAccounts: AccountStore.getState().linkedAccounts,
        myIgnoredAccounts: AccountStore.getState().myIgnoredAccounts,
        passwordAccount: AccountStore.getState().passwordAccount,
        accountsReady:
          AccountStore.getState().accountsLoaded &&
          AccountStore.getState().refsLoaded
      };
    }
  }
) as any;
export { EtoLockWrapper as EtoLock };
export default EtoLockWrapper;
