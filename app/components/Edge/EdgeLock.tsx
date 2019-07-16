import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AccountStore from "stores/AccountStore";
import { RouterStore } from "stores/RouterStore";
import { EdgeActions } from "actions/EdgeActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { connect } from "alt-react";
import { EdgeStore } from "stores/EdgeStore";
import { Edge } from "../../services/edge";
import { EdgeRule, EdgeExplain } from "./EdgeRule";
import counterpart from "counterpart";
import { EdgeContent, EdgeContentWrapper } from "./EdgePanel";
import { EdgeLockForm } from "./EdgeLockForm";
import { Gtag } from "services/Gtag";

type EdgeProps = {
  linkedAccounts: any;
  edgeState: Edge.EdgeInfo;
  account: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let EdgeLock = class extends React.Component<EdgeProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { edgeState, account } = this.props as any;
    if (edgeState.state === Edge.EdgePersonalState.Uninit) {
      EdgeActions.queryInfo(account);
    }
  }
  componentDidUpdate() {
    let { edgeState, account } = this.props as any;
    if (edgeState.state === Edge.EdgePersonalState.Uninit) {
      EdgeActions.queryInfo(account);
    }
  }

  render() {
    let { edgeState, account } = this.props as any;
    return (
      <div className="grid-container">
        <div style={{ padding: "6px" }} />
        <EdgeLockForm
          balance={this.props.account.getIn(["balances", "1.3.3"])}
          onLock={({ value, period }) =>
            EdgeActions.applyLock(value, this.props.account, () => {
              // Gtag.eventActivity("Edge", "锁仓成功，跳转");
              this.props.history.push("/lockdrop/apply");
            })
          }
        />
        <EdgeRule />
        <EdgeContent
          style={{ margin: "12px" }}
          heading={counterpart.translate("eto_apply.lock.tip_heading")}
          ol
          contents={new Array(5)
            .fill(1)
            .map((_, i) =>
              counterpart.translate(`edge.lockup.tip_content_${i + 1}`)
            )}
        />
        <EdgeContentWrapper>
          <EdgeExplain />
        </EdgeContentWrapper>
      </div>
    );
  }
};
EdgeLock = BindToChainState(EdgeLock);

let EdgeLockWrapper = class extends React.Component<EdgeProps> {
  componentWillMount() {
    let {
      linkedAccounts,
      myIgnoredAccounts,
      passwordAccount,
      edgeState
    } = this.props;
    let accountCount =
      linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);
    if (!accountCount || edgeState.state === Edge.EdgePersonalState.Uninit) {
      this.props.history.push("/lockdrop/apply");
    }
  }
  render() {
    return <EdgeLock {...this.props} />;
  }
} as any;

EdgeLockWrapper = connect(
  EdgeLockWrapper,
  {
    listenTo() {
      return [AccountStore, RouterStore, EdgeStore];
    },
    getProps() {
      return {
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
export { EdgeLockWrapper as EdgeLock };
export default EdgeLockWrapper;
