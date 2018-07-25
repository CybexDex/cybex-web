import * as React from "react";
import * as PropTypes from "prop-types";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import WalletUnlockStore from "stores/WalletUnlockStore";
import GatewayStore from "stores/GatewayStore";
import AccountLeftPanel from "./AccountLeftPanel";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import { connect } from "alt-react";
import accountUtils from "lib/common/account_utils";
import DepositModal from "components//Gateway/DepositModal";
import WithdrawModal from "components//Gateway/WithdrawModal";
import { List } from "immutable";
import {
  GatewayActions,
  DEPOSIT_MODAL_ID,
  WITHDRAW_MODAL_ID
} from "actions/GatewayActions";
import { Route, Switch, Redirect } from "react-router-dom";

type Props = {
  depositModal?;
  withdrawModal?;
  backedCoins?;
  viewSettings?;
  myAccounts?;
  linkedAccounts?;
  bridgeCoins?;
  gatewayDown?;
  account_name?;
  searchAccounts?;
  settings?;
  wallet_locked?;
  account?;
  myActiveAccounts?;
  hiddenAssets?;
  history?;
  match?
};

/* Nested routes */
import AccountAssets from "./AccountAssets";
import { AccountAssetCreate } from "./AccountAssetCreate";
import AccountAssetUpdate from "./AccountAssetUpdate";
import AccountMembership from "./AccountMembership";
import AccountVesting from "./AccountVesting";
import AccountPermissions from "./AccountPermissions";
import AccountSignedMessages from "./AccountSignedMessages";
import AccountWhitelist from "./AccountWhitelist";
import AccountVoting from "./AccountVoting";
import AccountOverview from "./AccountOverview";

/*
<Route
                path="/account/:account_name/overview"
                exact
                component={AccountOverview}
              />
              <Route
                path="/account/:account_name/assets"
                component={AccountAssets}
              />
              <Route
                path="/account/:account_name/create-asset"
                component={AccountAssetCreate}
              />
              <Route
                path="/account/:account_name/update-asset/:asset"
                component={AccountAssetUpdate}
              />
              <Route
                path="/account/:account_name/member-stats"
                component={AccountMembership}
              />
              <Route
                path="/account/:account_name/vesting"
                component={AccountVesting}
              />
              <Route
                path="/account/:account_name/permissions"
                component={AccountPermissions}
              />
              <Route
                path="/account/:account_name/voting"
                component={AccountVoting}
              />
              <Route
                path="/account/:account_name/orders"
                component={AccountOrders}
              />
              <Route
                path="/account/:account_name/whitelist"
                component={AccountWhitelist}
              />
*/

let AccountPage = class extends React.Component<Props, any> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  static defaultProps = {
    account: "props.params.account_name"
  };

  componentDidMount() {
    if (this.props.account && AccountStore.isMyAccount(this.props.account)) {
      AccountActions.setCurrentAccount.defer(this.props.account.get("name"));
    }

    // Fetch possible fee assets here to avoid async issues later (will resolve assets)
    accountUtils.getPossibleFees(this.props.account, "transfer");
  }

  render() {
      console.debug("AccountPage");
    let {
      myAccounts,
      linkedAccounts,
      account_name,
      searchAccounts,
      settings,
      wallet_locked,
      account,
      myActiveAccounts,
      hiddenAssets,
      history,
      match,
      bridgeCoins,
      backedCoins
    } = this.props;
    let { depositModal, withdrawModal } = this.props;
    let isMyAccount = AccountStore.isMyAccount(account);

    let passOnProps = {
      account_name,
      myActiveAccounts,
      searchAccounts,
      settings,
      wallet_locked,
      account,
      isMyAccount,
      hiddenAssets,
      backedCoins,
      bridgeCoins,
      contained: true,
      balances: account.get("balances", List()).toList(),
      orders: account.get("orders", List()).toList(),
      viewSettings: this.props.viewSettings,
      proxy: account.getIn(["options", "voting_account"]),
      history: this.props.history
    };

    return (
      <div className="grid-block page-layout">
        <div
          className="show-for-medium grid-block shrink left-column no-padding"
          style={{ minWidth: 200 }}
        >
          <AccountLeftPanel
            account={account}
            isMyAccount={isMyAccount}
            linkedAccounts={linkedAccounts}
            myAccounts={myAccounts}
            viewSettings={this.props.viewSettings}
            passwordLogin={settings.get("passwordLogin")}
          />
        </div>
        <div className="grid-block main-content">
          <div className="grid-container">
            <Switch>
              <Route
                path={`/account/${account_name}`}
                exact
                render={() => <AccountOverview {...passOnProps} />}
              />
              <Redirect
                from={`/account/${account_name}/overview`}
                to={`/account/${account_name}`}
              />
              <Redirect
                from={`/account/${account_name}/dashboard`}
                to={`/account/${account_name}`}
              />
              <Route
                path={`/account/${account_name}/assets`}
                exact
                render={() => <AccountAssets {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/create-asset`}
                exact
                render={() => <AccountAssetCreate {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/update-asset/:asset`}
                exact
                render={() => <AccountAssetUpdate {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/member-stats`}
                exact
                render={() => <AccountMembership {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/vesting`}
                exact
                render={() => <AccountVesting {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/permissions`}
                exact
                render={() => <AccountPermissions {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/voting`}
                exact
                render={() => <AccountVoting {...this.props} {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/whitelist`}
                exact
                render={() => <AccountWhitelist {...passOnProps} />}
              />
              <Route
                path={`/account/${account_name}/signedmessages`}
                exact
                render={() => <AccountSignedMessages {...passOnProps} />}
              />
            </Switch>
            {/* {React.cloneElement(React.Children.only(this.props.children), {
              account_name,
              linkedAccounts,
              searchAccounts,
              settings,
              wallet_locked,
              account,
              isMyAccount,
              hiddenAssets,
              contained: true,
              balances: account.get("balances", null),
              orders: account.get("orders", null),
              backedCoins: this.props.backedCoins,
              bridgeCoins: this.props.bridgeCoins,
              gatewayDown: this.props.gatewayDown,
              viewSettings: this.props.viewSettings,
              proxy: account.getIn(["options", "voting_account"])
            })} */}
            {depositModal && (
              <DepositModal
                balances={account.get("balances", null)}
                modalId={DEPOSIT_MODAL_ID}
                fade={true}
              />
            )}
            {withdrawModal && (
              <WithdrawModal
                balances={account.get("balances", null)}
                account={account}
                issuer={account.get("id")}
                modalId={WITHDRAW_MODAL_ID}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
AccountPage = BindToChainState(AccountPage, {
  keep_updating: true,
  show_loader: true
});

class AccountPageStoreWrapper extends React.Component<any, any> {
  render() {
    let account_name = this.props.match.params.account_name;
    
    return <AccountPage {...this.props} account={account_name} account_name={account_name} />;
  }
}

export default connect(
  AccountPageStoreWrapper,
  {
    listenTo() {
      return [AccountStore, SettingsStore, WalletUnlockStore, GatewayStore];
    },
    getProps(props) {
      return {
        linkedAccounts: AccountStore.getState().linkedAccounts,
        searchAccounts: AccountStore.getState().searchAccounts,
        settings: SettingsStore.getState().settings,
        hiddenAssets: SettingsStore.getState().hiddenAssets,
        wallet_locked: WalletUnlockStore.getState().locked,
        myAccounts: AccountStore.getState().myAccounts,
        myActiveAccounts: AccountStore.getState().myActiveAccounts,
        viewSettings: SettingsStore.getState().viewSettings,
        backedCoins: GatewayStore.getState().backedCoins,
        bridgeCoins: GatewayStore.getState().bridgeCoins,
        gatewayDown: GatewayStore.getState().down,
        depositModal: GatewayStore.getState().modals.get(DEPOSIT_MODAL_ID),
        withdrawModal: GatewayStore.getState().modals.get(WITHDRAW_MODAL_ID)
      };
    }
  }
);
