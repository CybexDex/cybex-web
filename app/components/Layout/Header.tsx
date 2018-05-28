import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router";
import { connect } from "alt-react";
import ActionSheet from "react-foundation-apps/src/action-sheet";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import MarketsStore from "stores/MarketsStore";
import SettingsStore from "stores/SettingsStore";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Icon from "../Icon/Icon";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import WalletDb from "stores/WalletDb";
import WalletUnlockStore from "stores/WalletUnlockStore";
import WalletUnlockActions from "actions/WalletUnlockActions";
import WalletManagerStore from "stores/WalletManagerStore";
import cnames from "classnames";
import TotalBalanceValue from "../Utility/TotalBalanceValue";
import ReactTooltip from "react-tooltip";
import { Apis } from "cybexjs-ws";
import notify from "actions/NotificationActions";
import IntlActions from "actions/IntlActions";
import AccountImage from "../Account/AccountImage";
import ContextMenuStore from "stores/ContextMenuStore";
import { VolumnStore } from "stores/VolumeStore";
import { VolumeDisplay } from "./VolumeDisplay";
import Nav from "components/Layout/Nav";
import { Icon as NewIcon } from "components/Common";
import { ModalActions } from "actions/ModalActions";
import LogoutModal, {
  DEFAULT_LOGOUT_MODAL_ID
} from "components/Modal/LogoutModal";
var logo = require("assets/logo-text.png");
// var logo = require("assets/cybex-logo.png");

const FlagImage = ({ flag, width = 20, height = 20 }) => {
  return (
    <img
      height={height}
      width={width}
      src={"language-dropdown/" + flag.toUpperCase() + ".png"}
    />
  );
};

const AccountName = ({ account_display_name }) => (
  <span className="table-cell" style={{ paddingLeft: 5 }}>
    <div className="inline-block">
      <span className="text-raw">{account_display_name}</span>
    </div>
  </span>
);

const FlagDropdown = class extends React.PureComponent<{
  currentLocale;
  locales;
}> {
  render() {
    let { currentLocale, locales } = this.props;
    return (
      <ActionSheet>
        <ActionSheet.Button title="">
          <a style={{ padding: "1rem", border: "none" }} className="button">
            <FlagImage flag={currentLocale} />
          </a>
        </ActionSheet.Button>
        <ActionSheet.Content>
          <ul className="no-first-element-top-border">
            {locales.map(locale => {
              return (
                <li key={locale}>
                  {/* <a href onClick={(e) => { e.preventDefault(); IntlActions.switchLocale(locale);  location.reload(false) }}> */}
                  <a
                    href="javascript:;"
                    onClick={e => {
                      e.preventDefault();
                      IntlActions.switchLocale(locale);
                    }}
                  >
                    <span className="table-cell">
                      <FlagImage flag={locale} />
                    </span>
                    <span className="table-cell" style={{ paddingLeft: 10 }}>
                      <Translate content={"languages." + locale} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </ActionSheet.Content>
      </ActionSheet>
    );
  }
};

export const HeadContextMenuId = "$headerContext";

class Header extends React.Component<any, any> {
  unlisten = null;
  static contextTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props);
    this.state = {
      active: context.location.pathname
    };
  }

  componentWillMount() {
    this.unlisten = this.context.router.listen((newState, err) => {
      if (!err) {
        if (this.unlisten && this.state.active !== newState.pathname) {
          this.setState({
            active: newState.pathname
          });
        }
      }
    });
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 1250);
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this.unlisten = null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  logout = () => {
    ModalActions.showModal(DEFAULT_LOGOUT_MODAL_ID);
  };
  _triggerMenu(e) {
    e.preventDefault();
    ZfApi.publish("mobile-menu", "toggle");
  }

  _toggleLock(e) {
    e.preventDefault();
    if (WalletDb.isLocked()) {
      WalletUnlockActions.unlock().then(() => {
        AccountActions.tryToSetCurrentAccount();
      });
    } else {
      WalletUnlockActions.lock();
    }
  }

  _onNavigate(route, e) {
    e.preventDefault();
    this.context.router.push(route);
  }

  _onGoBack(e) {
    e.preventDefault();
    window.history.back();
  }

  _onGoForward(e) {
    e.preventDefault();
    window.history.forward();
  }

  _accountClickHandler(account_name, e) {
    e.preventDefault();
    ZfApi.publish("account_drop_down", "close");
    if (this.context.location.pathname.indexOf("/account/") !== -1) {
      let currentPath = this.context.location.pathname.split("/");
      currentPath[2] = account_name;
      this.context.router.push(currentPath.join("/"));
    }
    if (account_name !== this.props.currentAccount) {
      AccountActions.setCurrentAccount.defer(account_name);
      notify.addNotification({
        message: counterpart.translate("header.account_notify", {
          account: account_name
        }),
        level: "success",
        autoDismiss: 2
      });
    }
    // this.onClickUser(account_name, e);
  }

  // onClickUser(account, e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //
  //     this.context.router.push(`/account/${account}/overview`);
  // }

  render() {
    let { active } = this.state;
    let {
      currentAccount,
      starredAccounts,
      passwordLogin,
      contextMenu
    } = this.props;
    let locked_tip = counterpart.translate("header.locked_tip");
    let unlocked_tip = counterpart.translate("header.unlocked_tip");
    let logout_tip = counterpart.translate("header.logout_tip");

    let tradingAccounts = AccountStore.getMyAccounts();

    if (starredAccounts.size) {
      for (let i = tradingAccounts.length - 1; i >= 0; i--) {
        if (!starredAccounts.has(tradingAccounts[i])) {
          tradingAccounts.splice(i, 1);
        }
      }
      starredAccounts.forEach(account => {
        if (tradingAccounts.indexOf(account.name) === -1) {
          tradingAccounts.push(account.name);
        }
      });
    }

    let myAccounts = AccountStore.getMyAccounts();
    // console.debug("MyAccounts: ", myAccounts);
    let myAccountCount = myAccounts.length;

    let walletBalance =
      myAccounts.length && this.props.currentAccount ? (
        <div className="grp-menu-item header-balance">
          <a>
            <TotalBalanceValue.AccountWrapper
              label="exchange.balance"
              accounts={[this.props.currentAccount]}
              inHeader={true}
            />
          </a>
        </div>
      ) : null;

    let dashboard = (
      <a
        style={{
          padding: 4,
          paddingTop: 18,
          paddingBottom: 18,
          flex: "0 0 auto"
        }}
        className={cnames({
          active: active === "/" || active.indexOf("dashboard") !== -1
        })}
        onClick={this._onNavigate.bind(this, "/dashboard")}
      >
        <img style={{ margin: 0, height: 20, marginLeft: 6 }} src={logo} />
      </a>
    );

    let createAccountLink =
      myAccountCount === 0 ? (
        <ActionSheet.Button title="" setActiveState={() => {}}>
          <a
            className="button create-account"
            onClick={this._onNavigate.bind(this, "/login")}
            style={{ padding: "1rem", border: "none" }}
          >
            <Icon className="icon-14px" name="user" />{" "}
            <Translate content="account.create_login" />
          </a>
        </ActionSheet.Button>
      ) : null;

    let lock_unlock =
      !!this.props.current_wallet || passwordLogin ? (
        <div className="grp-menu-item">
          {this.props.locked ? (
            <a
              style={{ padding: "1rem" }}
              className="button"
              href="javascript:;"
              onClick={this._toggleLock.bind(this)}
              data-class="unlock-tooltip"
              data-tip={locked_tip}
              data-place="bottom"
              data-html
            >
              <Icon className="icon-14px" name="locked" />
            </a>
          ) : (
            <a
              style={{ padding: "1rem" }}
              href="javascript:;"
              className="button"
              onClick={this._toggleLock.bind(this)}
              data-class="unlock-tooltip"
              data-tip={unlocked_tip}
              data-place="bottom"
              data-html
            >
              <Icon className="icon-14px" name="unlocked" />
            </a>
          )}
        </div>
      ) : null;

    let tradeLink = this.props.lastMarket ? (
      <a
        className={cnames({ active: active.indexOf("market/") !== -1 })}
        onClick={this._onNavigate.bind(
          this,
          `/market/${this.props.lastMarket}`
        )}
      >
        <Translate component="span" content="header.exchange" />
      </a>
    ) : (
      <a
        className={cnames({ active: active.indexOf("market/") !== -1 })}
        onClick={this._onNavigate.bind(this, "/market/CYB_JADE.ETH")}
      >
        <Translate component="span" content="header.exchange" />
      </a>
    );

    // Account selector: Only active inside the exchange
    let accountsDropDown = null,
      account_display_name,
      accountsList;
    if (currentAccount) {
      account_display_name =
        currentAccount.length > 20
          ? `${currentAccount.slice(0, 20)}..`
          : currentAccount;
      if (tradingAccounts.indexOf(currentAccount) < 0) {
        tradingAccounts.push(currentAccount);
      }
      if (tradingAccounts.length >= 1) {
        accountsList = tradingAccounts.sort().map((name, index) => {
          return (
            <li
              className={name === account_display_name ? "current-account" : ""}
              key={name}
            >
              <a
                href="javascript:;"
                onClick={this._accountClickHandler.bind(this, name)}
              >
                <span className="table-cell">
                  <AccountImage
                    style={{ position: "relative", top: 0 }}
                    size={{ height: 20, width: 20 }}
                    account={name}
                  />
                </span>
                <span className="table-cell" style={{ paddingLeft: 10 }}>
                  <span>{name}</span>
                </span>
              </a>
            </li>
          );
        });
      }
    }

    accountsDropDown = createAccountLink ? (
      createAccountLink
    ) : tradingAccounts.length === 1 ? (
      <ActionSheet.Button title="" setActiveState={() => {}}>
        <a
          onClick={this._accountClickHandler.bind(this, account_display_name)}
          style={{ cursor: "default", padding: "1rem", border: "none" }}
          className="button"
        >
          <span className="table-cell">
            <AccountImage
              style={{ display: "inline-block" }}
              size={{ height: 20, width: 20 }}
              account={account_display_name}
            />
          </span>
          {/* <span className="table-cell" style={{ paddingLeft: 5 }}><div className="inline-block"><span>{account_display_name}</span></div></span> */}
          <AccountName account_display_name={account_display_name} />
        </a>
      </ActionSheet.Button>
    ) : (
      <ActionSheet>
        <ActionSheet.Button title="">
          <a style={{ padding: "1rem", border: "none" }} className="button">
            <span className="table-cell">
              <AccountImage
                style={{ display: "inline-block" }}
                size={{ height: 20, width: 20 }}
                account={account_display_name}
              />
            </span>
            <AccountName account_display_name={account_display_name} />
          </a>
        </ActionSheet.Button>
        {tradingAccounts.length > 1 ? (
          <ActionSheet.Content>
            <ul className="no-first-element-top-border">{accountsList}</ul>
          </ActionSheet.Content>
        ) : null}
      </ActionSheet>
    );

    let settingsDropdown = (
      <a
        style={{ padding: "1rem", border: "none" }}
        className="button"
        onClick={this._onNavigate.bind(this, "/settings")}
      >
        <Icon className="icon-14px" name="cog" />
      </a>
    );

    // const enableDepositWithdraw = Apis.instance().chain_id.substr(0, 8) === "4018d784";
    const enableDepositWithdraw = false;
    return (
      <div className="header menu-group primary with-shadow">
        <div className="show-for-small-only">
          <ul className="primary menu-bar title">
            <li>
              <a href="javascript:;" onClick={this._triggerMenu}>
                <Icon className="icon-32px" name="menu" />
              </a>
            </li>
          </ul>
        </div>
        <div
          className="grid-block show-for-medium"
          style={{ overflow: "visible" }}
        >
          {dashboard}
          <VolumeDisplay vol={this.props.vol} />
          <Nav hideIcon={true} isVertical={false} />
          {/* <div id="context-hub" /> */}
        </div>
        <div className="grid-block show-for-medium shrink">
          <div className="grp-menu-items-group header-right-menu">
            {!myAccountCount || !walletBalance ? null : walletBalance}

            {myAccountCount !== 0 ? null : (
              <div className="grp-menu-item overflow-visible">
                {settingsDropdown}
              </div>
            )}

            {myAccountCount !== 0 ? null : (
              <div className="grp-menu-item overflow-visible">
                {
                  <FlagDropdown
                    locales={this.props.locales}
                    currentLocale={this.props.currentLocale}
                  />
                }
              </div>
            )}

            <div className="grp-menu-item overflow-visible account-drop-down">
              {accountsDropDown}
            </div>

            {!myAccountCount ? null : (
              <div className="grp-menu-item overflow-visible account-drop-down">
                {
                  <FlagDropdown
                    locales={this.props.locales}
                    currentLocale={this.props.currentLocale}
                  />
                }
              </div>
            )}

            {!myAccountCount ? null : (
              <div className="grp-menu-item overflow-visible">
                {settingsDropdown}
              </div>
            )}
            {lock_unlock}
            {currentAccount && (
              <div className="grp-menu-item">
                <a
                  style={{ padding: "1rem" }}
                  className="button"
                  href="javascript:;"
                  onClick={this.logout}
                  data-tip={logout_tip}
                  data-place="bottom"
                >
                  <NewIcon
                    style={{ width: "16px", height: "16px" }}
                    icon="logout"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Header, {
  listenTo() {
    return [
      AccountStore,
      WalletUnlockStore,
      WalletManagerStore,
      SettingsStore,
      MarketsStore,
      ContextMenuStore,
      VolumnStore
    ];
  },
  getProps() {
    const chainID = Apis.instance().chain_id;
    return {
      contextMenu: ContextMenuStore.getState().menuStore[HeadContextMenuId],
      linkedAccounts: AccountStore.getState().linkedAccounts,
      currentAccount:
        AccountStore.getState().currentAccount ||
        AccountStore.getState().passwordAccount,
      locked: WalletUnlockStore.getState().locked,
      current_wallet: WalletManagerStore.getState().current_wallet,
      lastMarket: SettingsStore.getState().viewSettings.get(
        `lastMarket${chainID ? "_" + chainID.substr(0, 8) : ""}`
      ),
      vol: VolumnStore.getState(),
      starredAccounts: AccountStore.getState().starredAccounts,
      passwordLogin: SettingsStore.getState().settings.get("passwordLogin"),
      currentLocale: SettingsStore.getState().settings.get("locale"),
      locales: SettingsStore.getState().defaults.locale
    };
  }
});
