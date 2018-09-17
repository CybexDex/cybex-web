import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "alt-react";
import WalletManagerStore from "stores/WalletManagerStore";
import BalanceClaimActive from "components/Wallet/BalanceClaimActive";
import Translate from "react-translate-component";

import { Route, Switch } from "react-router-dom";
import { BackupRestore } from "components/Wallet/Backup";
import ImportKeys from "components/Wallet/ImportKeys";
import Brainkey from "components/Wallet/Brainkey";

const connectObject = {
  listenTo() {
    return [WalletManagerStore];
  },
  getProps() {
    const wallet = WalletManagerStore.getState();
    return { wallet };
  }
};

class ExistingAccount extends React.Component {
  render() {
    const has_wallet = this.props.wallet.wallet_names.count() != 0;
    return (
      <div className="grid-container">
        <div className="grid-content">
          <div className="content-block center-content">
            <div className="page-header">
              <h1>
                <Translate content="account.welcome" />
              </h1>
              {!has_wallet ? (
                <h3>
                  <Translate content="wallet.create_wallet_backup" />
                </h3>
              ) : (
                <h3>
                  <Translate content="wallet.setup_wallet" />
                </h3>
              )}
            </div>
            <div className="content-block">
              <Switch>
                <Route path="/existing-account" component={BackupRestore} />
                <Route
                  path="/existing-account/import-backup"
                  component={ExistingAccountOptions}
                />
                <Route
                  path="/existing-account/import-keys"
                  component={ImportKeys}
                />
                <Route path="/existing-account/brainkey" component={Brainkey} />
                <Route
                  path="/existing-account/balance-claim"
                  component={BalanceClaimActive}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ExistingAccount = connect(
  ExistingAccount,
  connectObject
);

class ExistingAccountOptions extends React.Component {
  render() {
    const has_wallet = this.props.wallet.wallet_names.count() != 0;
    return (
      <span>
        {!has_wallet ? (
          <div>
            <Link to="existing-account/import-backup">
              <Translate content="wallet.import_backup" />
            </Link>
            <br />
            <br />
            <Link to="existing-account/import-keys">
              <Translate content="wallet.import_cyb1" />
            </Link>
            <br />
            <br />
            <Link to="existing-account/import-keys">
              <Translate content="wallet.create_wallet" />
            </Link>
            <br />
            <hr />
          </div>
        ) : null}

        {!has_wallet ? null : <BalanceClaimActive />}

        {has_wallet ? (
          <span>
            <Link to="dashboard">
              <div className="button outline">
                <Translate component="span" content="header.dashboard" />
              </div>
            </Link>
            <Link to="wallet">
              <div className="button outline">
                <Translate content="settings.wallets" />
              </div>
            </Link>
          </span>
        ) : null}
      </span>
    );
  }
}
ExistingAccountOptions = connect(
  ExistingAccountOptions,
  connectObject
);

export { ExistingAccount, ExistingAccountOptions };
export default ExistingAccount;
