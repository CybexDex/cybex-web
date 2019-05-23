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
import { EtoApplyDone } from "./EtoApplyDone";
import { EtoCenter } from "./EtoCenter";
import WalletUnlockActions from "actions/WalletUnlockActions";

type EtoProps = {
  linkedAccounts: any;
  account: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let EtoApply = class extends React.Component<EtoProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { etoState, account } = this.props as any;
    console.debug("Props: ", this.props);
    if (etoState.state === Eto.EtoPersonalState.Uninit) {
      WalletUnlockActions.unlock()
        .then(() => {
          EtoActions.queryInfo(account);
        })
        .catch(err => {
          this.props.history.goBack();
        });
    }
  }

  render() {
    let { etoState } = this.props as any;
    return etoState.state === Eto.EtoPersonalState.Uninit ? (
      <h1 />
    ) : etoState.state === Eto.EtoPersonalState.Basic ? (
      <EtoInfoForm
        onSubmit={form => EtoActions.putBasic(form, this.props.account)}
        account={this.props.account.get("name")}
      />
    ) : etoState.state === Eto.EtoPersonalState.Survey ? (
      <EtoSurveyForm
        onSubmit={form => EtoActions.putSurvey(form, this.props.account)}
        account={this.props.account.get("name")}
      />
    ) : etoState.state === Eto.EtoPersonalState.ApplyDone ? (
      <EtoApplyDone {...this.props} />
    ) : etoState.state === Eto.EtoPersonalState.Lock ? (
      <EtoCenter {...this.props} />
    ) : (
      <h1>Unknown</h1>
    );
  }
};
EtoApply = BindToChainState(EtoApply);

let EtoApplyWrapper = class extends React.Component<EtoProps> {
  componentWillMount() {
    let { linkedAccounts, myIgnoredAccounts, passwordAccount } = this.props;
    let accountCount =
      linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);
    if (!accountCount) {
      RouterActions.setDeferRedirect("/eto/apply");
      this.props.history.push("/login");
    } else {
      RouterActions.setDeferRedirect("");
    }
  }
  render() {
    return <EtoApply {...this.props} />;
  }
} as any;

EtoApplyWrapper = connect(
  EtoApplyWrapper,
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
export { EtoApplyWrapper as EtoApply };
export default EtoApplyWrapper;
