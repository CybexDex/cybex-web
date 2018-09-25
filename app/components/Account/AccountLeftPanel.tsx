import * as React from "react";
import * as PropTypes from "prop-types";

import { Link, NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import AccountInfo from "./AccountInfo";
import Translate from "react-translate-component";
import AccountActions from "actions/AccountActions";
import SettingsActions from "actions/SettingsActions";
import AssetName from "../Utility/AssetName";
import { JadePool } from "services/GatewayConfig";
import { GatewayActions, DEPOSIT_MODAL_ID } from "actions/GatewayActions";
import { JADE_COINS } from "stores/GatewayStore";
import utils from "common/utils";

const PrimaryCoin = Object.keys(JADE_COINS).slice(0, 2);

class AccountLeftPanel extends React.Component<
  {
    myAccounts?;
    viewSettings?;
    account;
    linkedAccounts;
    isMyAccount;
    passwordLogin;
    advancedMode: boolean;
  },
  any
> {
  last_path = null;
  static propTypes = {
    account: PropTypes.object.isRequired,
    advancedMode: PropTypes.bool.isRequired,
    linkedAccounts: PropTypes.object
  };

  static defaultProps = {
    advancedMode: false
  };

  constructor(props) {
    super(props);

    this.state = {
      showAdvanced: props.viewSettings.get("showAdvanced", false),
      showQR: props.viewSettings.get("showDepositQR", false)
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const changed = this.last_path !== window.location.hash;
    this.last_path = window.location.hash;
    return (
      changed ||
      this.props.account !== nextProps.account ||
      this.props.linkedAccounts !== nextProps.linkedAccounts ||
      this.props.isMyAccount !== nextProps.isMyAccount ||
      nextState.showAdvanced !== this.state.showAdvanced ||
      nextState.showQR !== this.state.showQR ||
      nextState.titleClass !== this.state.titleClass
    );
  }

  componentWillUnmount() {
    ReactTooltip.hide();
  }

  onLinkAccount(e) {
    e.preventDefault();
    AccountActions.linkAccount(this.props.account.get("name"));
  }

  onUnlinkAccount(e) {
    e.preventDefault();
    AccountActions.unlinkAccount(this.props.account.get("name"));
  }

  _toggleAdvanced(e) {
    e.preventDefault();
    let newState = !this.state.showAdvanced;
    this.setState({
      showAdvanced: newState
    });

    SettingsActions.changeViewSetting({ showAdvanced: newState });
  }

  _toggleQR(value) {
    this.setState({
      showQR: value
    });
    SettingsActions.changeViewSetting({ showDepositQR: value });
  }

  _depositClick = typeCode => {
    let { account } = this.props;
    return GatewayActions.showDepositModal(
      account.get("name"),
      PrimaryCoin[typeCode]
    );
  };
  _withdrawClick = info => {
    // this._toggleQR(true);
    // this.setState({ titleClass: "account-title flash" });
    // setTimeout(() => {
    //     this.setState({ titleClass: undefined });
    // }, 250);
    GatewayActions.showWithdrawModal("JADE.ETH");
  };

  render() {
    let { account, linkedAccounts, isMyAccount, passwordLogin } = this.props;
    let account_name = account.get("name");
    let linkBtn = null;

    linkBtn = isMyAccount ? null : linkedAccounts.has(account_name) ? (
      <span
        className="button block-button"
        onClick={this.onUnlinkAccount.bind(this)}
      >
        <Translate content="account.unfollow" />
      </span>
    ) : (
      <span
        className="button block-button"
        onClick={this.onLinkAccount.bind(this)}
      >
        <Translate content="account.follow" />
      </span>
    );

    let caret = this.state.showAdvanced ? (
      <span>&#9660;</span>
    ) : (
      <span>&#9650;</span>
    );

    const imageSize = { height: 150, width: 150 };

    return (
      <div className="grid-block vertical account-left-panel no-padding no-overflow">
        <div className="grid-block">
          <div
            className="grid-content no-padding"
            style={{ overflowX: "hidden" }}
          >
            <div className="regular-padding vertical-center">
              <AccountInfo
                account={account.get("id")}
                image_size={imageSize}
                my_account={isMyAccount}
                showQR={this.state.showQR}
                toggleQR={this._toggleQR.bind(this)}
                titleClass={this.state.titleClass}
              />
              <div
                className="grid-container no-margin full-width-content"
                style={{ paddingTop: 20, maxWidth: imageSize.width }}
              >
                <div style={{ paddingBottom: 15 }}>
                  <Link to={`/transfer/?to=${account_name}`}>
                    <Translate
                      className="button block-button no-margin"
                      content="account.pay"
                    />
                  </Link>
                </div>
                {linkBtn}
                {isMyAccount && (
                  <Translate
                    component="button"
                    content="wallet.link_deposit_asset"
                    className="button"
                    asset={utils.replaceName(PrimaryCoin[1]).name}
                    onClick={() => this._depositClick(1)}
                  />
                )}

                {isMyAccount && (
                  <Translate
                    component="button"
                    content="wallet.link_deposit_asset"
                    className="margin-top button"
                    asset={utils.replaceName(PrimaryCoin[0]).name}
                    onClick={() => this._depositClick(0)}
                  />
                )}
              </div>
            </div>
            <section className="block-list">
              <ul className="account-left-menu" style={{ marginBottom: 0 }}>
                <li>
                  <NavLink
                    to={`/account/${account_name}/dashboard/`}
                    activeClassName="active"
                  >
                    <Translate content="header.dashboard" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/account/${account_name}/member-stats/`}
                    activeClassName="active"
                  >
                    <Translate content="account.member.stats" />
                  </NavLink>
                </li>
                {/* <li><Link to={`/account/${account_name}/orders/`} activeClassName="active"><Translate content="account.open_orders"/></Link></li> */}
                <li>
                  <NavLink
                    to={`/account/${account_name}/permissions/`}
                    activeClassName="active"
                  >
                    <Translate content="account.permissions" />
                  </NavLink>
                </li>

                {/* <li className="menu-subheader" >
                                <span className="button outline small">
                                <Translate content="account.user_issued_assets.advanced" />

                            </span>
                        </li> */}
              </ul>
            </section>

            {/* Advanced features*/}
            {this.props.advancedMode && [
              <div
                key="advanceMode"
                style={{ paddingBottom: 10, paddingTop: 20 }}
              >
                <div className="grid-container no-margin advanced-toggle">
                  <a
                    onClick={this._toggleAdvanced.bind(this)}
                    className="button outline small block-button"
                    style={{
                      border: "none",
                      textAlign: "left",
                      paddingLeft: "1.75rem"
                    }}
                  >
                    <Translate content="account.user_issued_assets.advanced" />
                    <span> {caret}</span>
                  </a>
                </div>
              </div>,
              <section key="advancedFnList" className="block-list">
                {this.state.showAdvanced ? (
                  <ul className="account-left-menu">
                    <li>
                      <NavLink
                        to={`/account/${account_name}/voting/`}
                        activeClassName="active"
                      >
                        <Translate content="account.voting" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/account/${account_name}/assets/`}
                        activeClassName="active"
                      >
                        <Translate content="account.user_issued_assets.issued_assets" />
                      </NavLink>
                    </li>

                    {
                      <li>
                        <NavLink
                          to={`/account/${account_name}/whitelist/`}
                          activeClassName="active"
                        >
                          <Translate content="account.whitelist.title" />
                        </NavLink>
                      </li>
                    }
                    {isMyAccount ? (
                      <li>
                        <NavLink
                          to={`/account/${account_name}/vesting/`}
                          activeClassName="active"
                        >
                          <Translate content="account.vesting.title" />
                        </NavLink>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </section>,
              isMyAccount &&
                !passwordLogin && (
                  <div
                    key="wallteModeCreateMode"
                    className="regular-padding vertical-center"
                  >
                    <div className="button block-button create-account-button">
                      <Link
                        to={`/create-account/${
                          this.props.passwordLogin ? "password" : "wallet"
                        }`}
                      >
                        <Translate content="account.create_new" />
                      </Link>
                    </div>
                  </div>
                )
            ]}
          </div>
        </div>
      </div>
    );
  }
}

export default AccountLeftPanel;
