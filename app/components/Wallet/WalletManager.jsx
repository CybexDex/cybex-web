import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "alt-react";
import WalletActions from "actions/WalletActions";
import BackupActions from "actions/BackupActions";
import WalletManagerStore from "stores/WalletManagerStore";
import Translate from "react-translate-component";
import cname from "classnames";
import counterpart from "counterpart";
import { withRouter } from "react-router-dom";
import "./WalletManager.scss";
const connectObject = {
  listenTo() {
    return [WalletManagerStore];
  },
  getProps() {
    return WalletManagerStore.getState();
  }
};

class WalletManager extends React.Component {
  getTitle() {
    switch (this.props.location.pathname) {
      case "/wallet/create":
        return "wallet.create_wallet";
        break;

      case "/wallet/backup/create":
        return "wallet.create_backup";
        break;

      case "/wallet/backup/restore":
        return "wallet.restore_backup";
        break;

      case "/wallet/backup/brainkey":
        return "wallet.backup_brainkey";
        break;

      case "/wallet/delete":
        return "wallet.delete_wallet";
        break;

      case "/wallet/change-password":
        return "wallet.change_password";
        break;

      case "/wallet/import-keys":
        return "wallet.import_keys";
        break;

      default:
        return "wallet.console";
        break;
    }
  }
  _renderCancel = () => {
    if (this.props.location.pathname === "/wallet") {
      return null;
    }
    return (
      <a
        href="javascripts:;"
        onClick={() => window.history.back()}
        style={{ position: "absolute", right: 0, top: "50%" }}
      >
        <Translate content="transfer.back" />
      </a>
    );
  };

  render() {
    return (
      <div className="grid-block vertical">
        <div className="grid-container" style={{ maxWidth: "40rem" }}>
          <div className="content-block center-content">
            <div className="page-header" style={{ position: "relative" }}>
              <Translate component="h3" content={this.getTitle()} />
              {this._renderCancel()}
            </div>
            <div className="content-block">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}
WalletManager = connect(
  WalletManager,
  connectObject
);
WalletManager = withRouter(WalletManager);

class WalletOptions extends React.Component {
  render() {
    let has_wallet = !!this.props.current_wallet;
    let has_wallets = this.props.wallet_names.size > 1;
    let current_wallet = this.props.current_wallet
      ? this.props.current_wallet.toUpperCase()
      : "";
    return (
      <div className="wallet-options">
        <div className="grid-block">
          <div className="grid-content">
            <div className="card">
              <div className="card-content">
                <label>
                  <Translate content="wallet.active_wallet" />:
                </label>
                <div>{current_wallet}</div>
                <br />
                {has_wallets ? (
                  <Link to="/wallet/change" className="button outline success">
                    <Translate content="wallet.change_wallet" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid-content">
            <div className="card">
              <div className="card-content">
                <label>
                  <Translate content="wallet.import_keys_tool" />
                </label>
                {/* <div style={{ visibility: "hidden" }}>Dummy</div> */}
                {/* <br /> */}
                {has_wallet ? (
                  <Link to="/wallet/import-keys">
                    <div className="button outline success readable container">
                      <Translate content="wallet.import_keys" />
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {has_wallet ? (
            <div className="grid-content">
              <div className="card">
                <div className="card-content">
                  <label>
                    <Translate content="wallet.balance_claims" />
                  </label>
                  {/* <div style={{ visibility: "hidden" }}>Dummy</div> */}
                  {/* <br /> */}
                  <Link to="wallet/balance-claims">
                    <div className="button outline success readable container">
                      <Translate content="wallet.balance_claim_lookup" />
                    </div>
                  </Link>
                  {/*<BalanceClaimByAsset>
                            <br/>
                            <div className="button outline success">
                                <Translate content="wallet.balance_claims" /></div>
                        </BalanceClaimByAsset>
                        */}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="backup-links">
          {has_wallet ? (
            <Link to="wallet/backup/create" className="button outline success">
              <Translate content="wallet.create_backup" />
            </Link>
          ) : null}

          {has_wallet ? (
            <Link
              to="wallet/backup/brainkey"
              className="button outline success"
            >
              <Translate content="wallet.backup_brainkey" />
            </Link>
          ) : null}

          <Link to="wallet/backup/restore" className="button outline success">
            <Translate content="wallet.restore_backup" />
          </Link>

          <Link to="wallet/create" className="button outline success">
            <Translate content="wallet.new_wallet" />
          </Link>

          {has_wallet ? (
            <Link to="wallet/delete" className="button outline success">
              <Translate content="wallet.delete_wallet" />
            </Link>
          ) : null}

          {has_wallet ? (
            <Link
              to="wallet/change-password"
              className="button outline success"
            >
              <Translate content="wallet.change_password" />
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}
WalletOptions = connect(
  WalletOptions,
  connectObject
);

class ChangeActiveWallet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    let current_wallet = this.props.current_wallet;
    this.setState({ current_wallet });
  }

  componentWillReceiveProps(np) {
    if (np.current_wallet !== this.state.current_wallet) {
      this.setState({ current_wallet: np.current_wallet });
    }
  }

  render() {
    let state = WalletManagerStore.getState();

    let options = [];
    state.wallet_names.forEach(wallet_name => {
      options.push(
        <option key={wallet_name} value={wallet_name}>
          {wallet_name.toLowerCase()}
        </option>
      );
    });

    let is_dirty = this.state.current_wallet !== this.props.current_wallet;

    return (
      <div>
        <section className="block-list">
          <header>
            <Translate content="wallet.active_wallet" />:
          </header>

          <ul>
            <li className="with-dropdown">
              {state.wallet_names.count() <= 1 ? (
                <div style={{ paddingLeft: 10 }}>
                  {this.state.current_wallet}
                </div>
              ) : (
                <select
                  value={this.state.current_wallet}
                  onChange={this.onChange.bind(this)}
                >
                  {options}
                </select>
              )}
            </li>
          </ul>
        </section>

        <Link to="wallet/create">
          <div className="button outline">
            <Translate content="wallet.new_wallet" />
          </div>
        </Link>

        {is_dirty ? (
          <div className="button outline" onClick={this.onConfirm.bind(this)}>
            <Translate
              content="wallet.change"
              name={this.state.current_wallet}
            />
          </div>
        ) : null}
      </div>
    );
  }

  onConfirm() {
    WalletActions.setWallet(this.state.current_wallet);
    BackupActions.reset();
    // if (window.electron) {
    //     window.location.hash = "";
    //     window.remote.getCurrentWindow().reload();
    // }
    // else window.location.href = "/";
  }

  onChange(event) {
    let current_wallet = event.target.value;
    this.setState({ current_wallet });
  }
}
ChangeActiveWallet = connect(
  ChangeActiveWallet,
  connectObject
);

class WalletDelete extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_wallet: null,
      confirm: 0
    };
  }

  _onCancel() {
    this.setState({
      confirm: 0,
      selected_wallet: null
    });
  }

  render() {
    if (this.state.confirm === 1) {
      return (
        <div style={{ paddingTop: 20 }}>
          <h4>
            <Translate content="wallet.delete_confirm_line1" />
          </h4>
          <Translate component="p" content="wallet.delete_confirm_line3" />
          <br />
          <div className="button outline" onClick={this.onConfirm2.bind(this)}>
            <Translate
              content="wallet.delete_confirm_line4"
              name={this.state.selected_wallet}
            />
          </div>
          <div className="button outline" onClick={this._onCancel.bind(this)}>
            <Translate content="wallet.cancel" />
          </div>
        </div>
      );
    }

    // this.props.current_wallet
    // let placeholder = <option key="placeholder" value="" disabled={this.props.wallet_names.size > 1}></option>
    // if (this.props.wallet_names.size > 1) {
    //     placeholder = <option value="" disabled>{placeholder}</option>;
    // }
    // else {
    //     //When disabled and list_size was 1, chrome was skipping the
    //     //placeholder and selecting the 1st item automatically (not shown)
    //     placeholder = <option value="">{placeholder}</option>;
    // }
    let options = [];
    // let options = [placeholder]
    options.push(
      <option key="select_option" value="">
        {counterpart.translate("settings.delete_select")}&hellip;
      </option>
    );
    this.props.wallet_names.forEach(wallet_name => {
      options.push(
        <option key={wallet_name} value={wallet_name}>
          {wallet_name.toLowerCase()}
        </option>
      );
    });

    let is_dirty = !!this.state.selected_wallet;

    return (
      <div style={{ paddingTop: 20 }}>
        <section className="block-list">
          <header>
            <Translate content="wallet.delete_wallet" />
          </header>
          <ul>
            <li className="with-dropdown">
              <select
                value={this.state.selected_wallet || ""}
                style={{ margin: "0 auto" }}
                onChange={this.onChange.bind(this)}
              >
                {options}
              </select>
            </li>
          </ul>
        </section>
        <div
          className={cname("button outline", { disabled: !is_dirty })}
          onClick={this.onConfirm.bind(this)}
        >
          <Translate
            content={
              this.state.selected_wallet
                ? "wallet.delete_wallet_name"
                : "wallet.delete_wallet"
            }
            name={this.state.selected_wallet}
          />
        </div>
      </div>
    );
  }

  onConfirm() {
    this.setState({ confirm: 1 });
  }

  onConfirm2() {
    WalletActions.deleteWallet(this.state.selected_wallet);
    if (this.props.afterDelete) {
      this.props.afterDelete(this.state.selected_wallet);
    }
    this._onCancel();
    // window.history.back()
  }

  onChange(event) {
    let selected_wallet = event.target.value;
    this.setState({ selected_wallet });
  }
}
WalletDelete = connect(
  WalletDelete,
  connectObject
);

import WalletChangePassword from "components/Wallet/WalletChangePassword";
import ImportKeys from "components/Wallet/ImportKeys";
import Brainkey from "components/Wallet/Brainkey";
import { WalletCreate } from "components/Wallet/WalletCreate";
import { BalanceClaimActive } from "components/Wallet/BalanceClaimActive";
import Backup from "components/Wallet/Backup";
import { Switch, Route } from "react-router-dom";

export const WalletWrapper = () => (
  <WalletManager style={{ margin: "1em auto" }}>
    <Switch>
      <Route path="/wallet/" exact component={WalletOptions} />
      <Route path="/wallet/change" component={ChangeActiveWallet} />
      <Route path="/wallet/change-password" component={WalletChangePassword} />
      <Route path="/wallet/import-keys" component={ImportKeys} />
      <Route path="/wallet/balance-claims" component={BalanceClaimActive} />
      <Route path="/wallet/brainkey" component={Brainkey} />
      <Route path="/wallet/create" component={WalletCreate} />
      <Route path="/wallet/delete" component={WalletDelete} />
      <Route path="/wallet/backup" component={Backup} />
    </Switch>
  </WalletManager>
);
export default WalletWrapper;

export { WalletManager, WalletOptions, ChangeActiveWallet, WalletDelete };
