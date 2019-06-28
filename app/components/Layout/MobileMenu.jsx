import * as React from "react";
import * as PropTypes from "prop-types";
import Panel from "react-foundation-apps/src/panel";
import Trigger from "react-foundation-apps/src/trigger";
import { Link } from "react-router-dom";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Translate from "react-translate-component";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import WalletUnlockStore from "stores/WalletUnlockStore";
import WalletManagerStore from "stores/WalletManagerStore";
import SettingsStore from "stores/SettingsStore";
import { Apis } from "cybexjs-ws";

class MobileMenu extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onClick() {
    ZfApi.publish("mobile-menu", "close");
  }

  _onNavigate(route, e) {
    e.preventDefault();
    this.context.router.history.push(route);
    ZfApi.publish("mobile-menu", "close");
  }

  render() {
    let { id, currentAccount, linkedAccounts } = this.props;
    let accounts = null;

    if (linkedAccounts.size > 1) {
      accounts = linkedAccounts.map(a => {
        return (
          <li key={a} onClick={this.onClick}>
            <Link to={`/account/${a}/overview`}>{a}</Link>
          </li>
        );
      });
    } else if (linkedAccounts.size === 1) {
      accounts = (
        <li key="account" onClick={this.onClick}>
          <Link to={`/account/${linkedAccounts.first()}/overview`}>
            <Translate content="header.account" />
          </Link>
        </li>
      );
    }

    let linkToAccountOrDashboard;
    if (linkedAccounts.size > 1)
      linkToAccountOrDashboard = (
        <a onClick={this._onNavigate.bind(this, "/dashboard")}>
          <Translate content="header.dashboard" />
        </a>
      );
    else if (currentAccount)
      linkToAccountOrDashboard = (
        <a
          onClick={this._onNavigate.bind(
            this,
            `/account/${currentAccount}/overview`
          )}
        >
          <Translate content="header.account" />
        </a>
      );
    // else linkToAccountOrDashboard = <Link to="/create-account">Create Account</Link>;
    else
      linkToAccountOrDashboard = (
        <a onClick={this._onNavigate.bind(this, "/create-account")}>
          <Translate content="account.create_login" />
        </a>
      );

    let tradeLink = this.props.lastMarket ? (
      <a
        onClick={this._onNavigate.bind(
          this,
          `/market/${this.props.lastMarket}`
        )}
      >
        <Translate content="header.exchange" />
      </a>
    ) : (
      <a onClick={this._onNavigate.bind(this, "/market/CYB_JADE.ETH")}>
        <Translate content="header.exchange" />
      </a>
    );

    return (
      <Panel id={id} position="right">
        <div className="grid-content">
          <Trigger close={id}>
            <a className="close-button">&times;</a>
          </Trigger>
          <section style={{ marginTop: "3rem" }} className="block-list">
            <ul>
              <li>{linkToAccountOrDashboard}</li>
              <li>
                <a onClick={this._onNavigate.bind(this, "/transfer")}>
                  <Translate content="header.payments" />
                </a>
              </li>
              <li>
                <a onClick={this._onNavigate.bind(this, "/eto")}>
                  <Translate content="nav.eto_apply" />
                </a>
              </li>
              <li>
                <a onClick={this._onNavigate.bind(this, "/lockdrop")}>
                  <Translate content="nav.lockdrop" />
                </a>
              </li>
              <li>
                <a onClick={this._onNavigate.bind(this, "/eto/projects")}>
                  ETO
                </a>
              </li>
              {linkedAccounts.size === 0 && !currentAccount ? null : (
                <li>{tradeLink}</li>
              )}
              {linkedAccounts.size === 0 && !currentAccount ? null : (
                <li>
                  <a onClick={this._onNavigate.bind(this, "/gateway")}>
                    <Translate content="nav.gateway" />
                  </a>
                </li>
              )}
              {/* {currentAccount && myAccounts.indexOf(currentAccount) !== -1 ? <li onClick={this.onClick}><Link to={"/deposit-withdraw/"}><Translate content="account.deposit_withdraw" /></Link></li> : null} */}
              <li>
                <a onClick={this._onNavigate.bind(this, "/explorer")}>
                  <Translate content="header.explorer" />
                </a>
              </li>
              <li>
                <a onClick={this._onNavigate.bind(this, "/settings")}>
                  <Translate content="header.settings" />
                </a>
              </li>
            </ul>
          </section>

          <section style={{ marginTop: "3rem" }} className="block-list">
            <header>
              <Translate content="account.accounts" />
            </header>
            <ul>{accounts}</ul>
          </section>
        </div>
      </Panel>
    );
  }
}

MobileMenu = connect(
  MobileMenu,
  {
    listenTo() {
      return [
        AccountStore,
        WalletUnlockStore,
        WalletManagerStore,
        SettingsStore
      ];
    },
    getProps() {
      const chainID = Apis.instance().chain_id;
      return {
        linkedAccounts: AccountStore.getState().linkedAccounts,
        currentAccount: AccountStore.getState().currentAccount,
        locked: WalletUnlockStore.getState().locked,
        current_wallet: WalletManagerStore.getState().current_wallet,
        lastMarket: SettingsStore.getState().viewSettings.get(
          `lastMarket${chainID ? "_" + chainID.substr(0, 8) : ""}`
        ),
        myAccounts: AccountStore.getMyAccounts()
      };
    }
  }
);

export default class WidthWrapper extends React.Component {
  constructor() {
    super();

    let width = window && window.innerWidth;
    this.state = {
      visible: width <= 640
    };

    this._checkWidth = this._checkWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this._checkWidth, {
      capture: false,
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._checkWidth);
  }

  _checkWidth() {
    let width = window && window.innerWidth;
    let visible = width <= 640;
    if (visible !== this.state.visible) {
      this.setState({ visible });
    }
  }

  render() {
    if (!this.state.visible) return null;
    return <MobileMenu {...this.props} />;
  }
}
