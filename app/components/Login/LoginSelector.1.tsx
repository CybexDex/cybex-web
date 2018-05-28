import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router";
import Translate from "react-translate-component";
import RestoreWallet from "components/Account/RestoreWallet";
import SettingsActions from "actions/SettingsActions";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { LeftSlide } from "components/Common/LeftSlide";
import {
  Input,
  Button,
  ButtonSize,
  ButtonType,
  Panel,
  LoginAccountInput,
  LoginPasswordInput
} from "components/Common";
import { $styleFlexContainer, $styleFlexItem } from "components/Common/Styles";
import Radium from "Radium";

import WalletDb from "stores/WalletDb";
import WalletUnlockStore from "stores/WalletUnlockStore";
import AccountStore from "stores/AccountStore";
import AccountActions from "actions/AccountActions";

export default class LoginSelector extends React.Component<any, any> {
  onSelect(route) {
    this.props.router.push("/create-account/" + route);
  }

  render() {
    if (this.props.children) {
      return this.props.children;
    }
    return (
      <div
        className="login-wrapper anim-fade"
        style={{ width: "100%", display: "flex", height: "100%" }}
      >
        
        <div className="grid-content" style={{ paddingTop: 30 }}>
          <h2 className="text-center">
            <Translate content="wallet.login_create_type" />
          </h2>
          <div className="grid-block no-margin no-padding vertical medium-horizontal no-overflow login-selector">
            <div className="box small-12 medium-5 large-5">
              <div
                className="block-content-header"
                style={{ position: "relative" }}
              >
                <Translate content="wallet.wallet_model" component="h4" />
              </div>
              <div className="box-content">
                <Translate content="wallet.wallet_model_1" component="p" />
                <Translate content="wallet.wallet_model_2" component="p" />
                <Translate
                  unsafe
                  content="wallet.wallet_model_3"
                  component="ul"
                />
              </div>
              <div className="fix-bottom">
                <Translate content="wallet.already_have_wallet" component="p" />
                <ul className="list">
                  <li className="link">
                    <Link to="/existing-account">
                      <Translate content="wallet.restore" />
                    </Link>
                  </li>
                  <li className="link">
                    <Link to="/create-wallet-brainkey">
                      <Translate content="settings.backup_brainkey" />
                    </Link>
                  </li>
                </ul>
                <Translate content="or" component="p" />
                <div
                  className="button"
                  onClick={this.onSelect.bind(this, "wallet")}
                >
                  <Link to="/create-account/wallet">
                    <Translate content="wallet.use_wallet_create" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="box small-12 medium-5 large-5 vertical">
              <div
                className="block-content-header"
                style={{ position: "relative" }}
              >
                <Translate content="wallet.password_model" component="h4" />
              </div>
              <div className="box-content">
                <Translate content="wallet.password_model_1" component="p" />
                <Translate
                  content="wallet.password_model_2"
                  unsafe
                  component="p"
                />
                <Translate
                  unsafe
                  content="wallet.password_model_3"
                  component="ul"
                />
              </div>
              <div className="fix-bottom">
                <Translate
                  content="wallet.already_have_account"
                  component="p"
                />
                <ul className="list">
                  <li className="link">
                    <Link
                      className="create-account"
                      onClick={() => {
                        SettingsActions.changeSetting({
                          setting: "passwordLogin",
                          value: true
                        });
                        WalletUnlockActions.unlock.defer();
                      }}
                    >
                      <Translate content="account.password_login" />
                    </Link>
                  </li>
                </ul>
                <Translate content="or" component="p" />
                <div
                  className="button"
                  onClick={this.onSelect.bind(this, "password")}
                >
                  <Link to="/create-account/password">
                    <Translate content="wallet.use_password_create" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
