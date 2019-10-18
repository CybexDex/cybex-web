import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AccountStore from "stores/AccountStore";
import { RouterStore } from "stores/RouterStore";
import { LockCActions } from "actions/LockCActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { connect } from "alt-react";
import { LockCStore } from "stores/LockCStore";
import { LockC } from "../../services/lockC";
import { LockCRule, LockCExplain } from "./LockCRule";
import counterpart from "counterpart";
import { LockCContent, LockCContentWrapper } from "./LockCPanel";
import { LockCLockForm } from "./LockCLockForm";
import { Gtag } from "services/Gtag";

type LockCProps = {
  linkedAccounts: any;
  lockCState: LockC.LockCInfo;
  account: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let LockCLock = class extends React.Component<LockCProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { lockCState, account } = this.props as any;
    if (lockCState.state === LockC.LockCPersonalState.Uninit) {
      LockCActions.queryInfo(account);
    }
  }
  componentDidUpdate() {
    let { lockCState, account } = this.props as any;
    if (lockCState.state === LockC.LockCPersonalState.Uninit) {
      LockCActions.queryInfo(account);
    }
  }

  render() {
    let { lockCState, account } = this.props as any;
    return (
      <div className="grid-container">
        <div style={{ padding: "6px" }} />
        <LockCLockForm
          balance={this.props.account.getIn(["balances", "1.3.0"])}
          onLock={({ value, period }) =>
            LockCActions.applyLock(value, this.props.account, () => {
              // Gtag.eventActivity("LockC", "锁仓成功，跳转");
              LockCActions.queryInfo(this.props.account);
              this.props.history.push("/lockc/apply");
            })
          }
        />
        <LockCRule />
        <LockCContent
          style={{ margin: "12px" }}
          heading={counterpart.translate("lockC.lockup.commission_rule")}
          ol
          contents={new Array(6)
            .fill(1)
            .map((_, i) =>
              counterpart.translate(`lockC.lockup.tip_content_${i + 1}`)
            )}
        />
        <LockCContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("lockC.lockup.attention")}
            contents={[
              counterpart.translate("lockC.lockup.attention_info"),
            ]}
          />
        <LockCContentWrapper>
          <LockCExplain />
        </LockCContentWrapper>
      </div>
    );
  }
};
LockCLock = BindToChainState(LockCLock);

let LockCLockWrapper = class extends React.Component<LockCProps> {
  componentWillMount() {
    let {
      linkedAccounts,
      myIgnoredAccounts,
      passwordAccount,
      lockCState
    } = this.props;
    let accountCount =
      linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);
    if (!accountCount || lockCState.state === LockC.LockCPersonalState.Uninit) {
      this.props.history.push("/lockc/apply");
    }
  }
  render() {
    return <LockCLock {...this.props} />;
  }
} as any;

LockCLockWrapper = connect(
  LockCLockWrapper,
  {
    listenTo() {
      return [AccountStore, RouterStore, LockCStore];
    },
    getProps() {
      return {
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
export { LockCLockWrapper as LockCLock };
export default LockCLockWrapper;
