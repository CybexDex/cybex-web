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

  render() {
    return <h1>hello</h1>;
  }
} as any;
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
