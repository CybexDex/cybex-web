import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AltContainer from "alt-container";
import AccountStore from "stores/AccountStore";
import { RouterStore } from "stores/RouterStore";
import { RouterActions } from "actions/RouterActions";
import { LockCActions } from "actions/LockCActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { connect } from "alt-react";
import { LockCStore } from "stores/LockCStore";
import { LockC } from "../../services/lockC";
import { LockCCenter } from "./LockCCenter";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { DepositModal } from "../Gateway/DepositModal";
import { DEPOSIT_MODAL_ID } from "../../actions/GatewayActions";
import { GatewayStore } from "../../stores/GatewayStore";

type LockCProps = {
  linkedAccounts: any;
  account: any;
  depositModal?: boolean;
  accountsReady: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let LockCApply = class extends React.Component<LockCProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { lockCState, account } = this.props as any;
    if (lockCState.state === LockC.LockCPersonalState.Uninit) {
      WalletUnlockActions.unlock()
        .then(() => {
          LockCActions.queryInfo(account);
        })
        .catch(err => {
          this.props.history.goBack();
        });
    }
  }
  componentDidUpdate(prevProps) {
    let { lockCState, account } = this.props as any;
    if (
      lockCState.state === LockC.LockCPersonalState.Uninit &&
      lockCState.state !== prevProps.lockCState.state
    ) {
      WalletUnlockActions.unlock()
        .then(() => {
          LockCActions.queryInfo(account);
        })
        .catch(err => {
          console.error(err);
          this.props.history.goBack();
        });
    }
  }

  // render() {
  //   let { lockCState } = this.props as any;
  //   return lockCState.state === LockC.LockCPersonalState.Uninit ? (
  //     <LoadingIndicator
  //       style={{
  //         height: "100vh",
  //         position: "fixed",
  //         width: "100vw",
  //         textAlign: "center",
  //         backgroundColor: "rgba(0,0,0,0.4)",
  //         lineHeight: "80vh",
  //         zIndex: 1
  //       }}
  //       type="three-bounce"
  //     />
  //   ) : lockCState.state === LockC.LockCPersonalState.Basic ||
  //     lockCState.state === LockC.LockCPersonalState.Survey ? (
  //     <LockCCenter overtime {...this.props} />
  //   ) : lockCState.state === LockC.LockCPersonalState.Lock ? (
  //     <LockCCenter {...this.props} />
  //   ) : (
  //     <h1>Unknown</h1>
  //   );
  // }
  render() {
    let { lockCState, account } = this.props as any;
    return (
      <>
        <LockCCenter {...this.props} />
      </>
    );
  }
};
LockCApply = BindToChainState(LockCApply);

let LockCApplyWrapper = class extends React.Component<LockCProps> {
  componentWillMount() {
    console.debug("WillMount: ", this.props);
    let {
      linkedAccounts,
      myIgnoredAccounts,
      passwordAccount,
      account
    } = this.props;
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
    return (
      <div className="grid-container">
        <div style={{ padding: "6px" }} />
        <LockCApply {...this.props} />
      </div>
    );
  }
} as any;

LockCApplyWrapper = connect(
  LockCApplyWrapper,
  {
    listenTo() {
      return [AccountStore, RouterStore, LockCStore, GatewayStore];
    },
    getProps() {
      return {
        depositModal: GatewayStore.getState().modals.get(DEPOSIT_MODAL_ID),
        lockCState: LockCStore.getState(),
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
export { LockCApplyWrapper as LockCApply };
export default LockCApplyWrapper;
