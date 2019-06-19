import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AltContainer from "alt-container";
import AccountStore from "stores/AccountStore";
import { RouterStore } from "stores/RouterStore";
import { RouterActions } from "actions/RouterActions";
import { EdgeActions } from "actions/EdgeActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { connect } from "alt-react";
import { EdgeStore } from "stores/EdgeStore";
import { Edge } from "../../services/edge";
import { EdgeApplyDone } from "./EdgeApplyDone";
import { EdgeCenter } from "./EdgeCenter";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { Gtag } from "services/Gtag";
import { LoadingIndicator } from "../LoadingIndicator";
import { DEFAULT_ETO_CHECK_TOKEN } from "../Modal/ModalID";
import { DepositModal } from "../Gateway/DepositModal";
import { DEPOSIT_MODAL_ID } from "../../actions/GatewayActions";
import { GatewayStore } from "../../stores/GatewayStore";

type EdgeProps = {
  linkedAccounts: any;
  account: any;
  depositModal?: boolean;
  accountsReady: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let EdgeApply = class extends React.Component<EdgeProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { edgeState, account } = this.props as any;
    if (edgeState.state === Edge.EdgePersonalState.Uninit) {
      WalletUnlockActions.unlock()
        .then(() => {
          EdgeActions.queryInfo(account);
        })
        .catch(err => {
          this.props.history.goBack();
        });
    }
  }
  componentDidUpdate(prevProps) {
    let { edgeState, account } = this.props as any;
    if (
      edgeState.state === Edge.EdgePersonalState.Uninit &&
      edgeState.state !== prevProps.edgeState.state
    ) {
      WalletUnlockActions.unlock()
        .then(() => {
          EdgeActions.queryInfo(account);
        })
        .catch(err => {
          console.error(err);
          this.props.history.goBack();
        });
    }
  }

  // render() {
  //   let { edgeState } = this.props as any;
  //   return edgeState.state === Edge.EdgePersonalState.Uninit ? (
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
  //   ) : edgeState.state === Edge.EdgePersonalState.Basic ||
  //     edgeState.state === Edge.EdgePersonalState.Survey ? (
  //     <EdgeCenter overtime {...this.props} />
  //   ) : edgeState.state === Edge.EdgePersonalState.Lock ? (
  //     <EdgeCenter {...this.props} />
  //   ) : (
  //     <h1>Unknown</h1>
  //   );
  // }
  render() {
    let { edgeState, account } = this.props as any;
    return (
      <>
        <EdgeCenter {...this.props} />
        {this.props.depositModal && (
          <DepositModal
            balances={account.get("balances", null)}
            modalId={DEPOSIT_MODAL_ID}
            fade={true}
          />
        )}
      </>
    );
  }
};
EdgeApply = BindToChainState(EdgeApply);

let EdgeApplyWrapper = class extends React.Component<EdgeProps> {
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
        <EdgeApply {...this.props} />
      </div>
    );
  }
} as any;

EdgeApplyWrapper = connect(
  EdgeApplyWrapper,
  {
    listenTo() {
      return [AccountStore, RouterStore, EdgeStore];
    },
    getProps() {
      return {
        depositModal: GatewayStore.getState().modals.get(DEPOSIT_MODAL_ID),
        edgeState: EdgeStore.getState(),
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
export { EdgeApplyWrapper as EdgeApply };
export default EdgeApplyWrapper;
