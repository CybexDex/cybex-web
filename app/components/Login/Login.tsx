import * as React from "react";
import * as PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Translate from "react-translate-component";
import RestoreWallet from "components/Account/RestoreWallet";
import SettingsActions from "actions/SettingsActions";
import WalletUnlockActions from "actions/WalletUnlockActions";
import WalletManagerStore from "stores/WalletManagerStore";
import counterpart from "counterpart";
import { LeftSlide } from "components/Common/LeftSlide";
import {
  Input,
  Button,
  ButtonSize,
  ButtonType,
  LoginAccountInput,
  LoginPasswordInput,
  Colors,
  $styleSecondaryText
} from "components/Common";
import { $styleFlexContainer, $styleFlexItem } from "components/Common/Styles";
import Radium from "radium";
import WalletDb from "stores/WalletDb";
import WalletUnlockStore from "stores/WalletUnlockStore";
import AccountStore from "stores/AccountStore";
import AccountActions from "actions/AccountActions";
import { Gtag } from "services/Gtag";
import { connect } from "alt-react";

let LoginCheck: any = class extends React.Component<any, any> {
  componentWillMount() {
    console.debug("PO: ", WalletManagerStore.getState(), AccountStore.getState());
    if (
      AccountStore.getState().currentAccount
    ) {
      this.props.history.push("/dashboard");
    } else {
      SettingsActions.changeSetting({
        setting: "passwordLogin",
        value: true
      });
      WalletUnlockActions.lock();
    }
  }
  render() {
    return <span style={{ display: "none" }} />;
  }
};

LoginCheck = withRouter(LoginCheck);

let LoginMain = Radium(
  class extends React.Component<
    any,
    { account; password; accountValid; passwordValid; errorPass; checking }
  > {
    constructor(props) {
      super(props);
      this.state = {
        account: "",
        accountValid: false,
        passwordValid: false,
        password: null,
        errorPass: false,
        checking: false
      };
    }

    onPasswordEnter = async e => {
      e.preventDefault();
      this.setState({
        checking: true
      });
      SettingsActions.changeSetting({
        setting: "passwordLogin",
        value: true
      });
      this.doLogin();
    };

    doLogin = () => {
      const { password, account } = this.state;
      console.debug("Login: ", this.props, password, account);
      WalletDb.validatePassword(
        password || "",
        true, //unlock
        account
      );
      setTimeout(() => {
        if (WalletDb.isLocked()) {
          // this.setState({ password_error: true });
          this.setState({
            errorPass: true,
            checking: false
          });
          return false;
        } else {
          AccountActions.setPasswordAccount(account);
          this.props.resolve();
          WalletUnlockActions.change();
          Gtag.eventLoginDone(account, "cloud");
        }
      }, 500);
      return false;
    };

    handleFieldChange = (field, value) => {};

    render() {
      let valid = this.state.accountValid && this.state.passwordValid;
      console.debug("valid: ", this.state.account, this.state.password);
      return (
        <div
          style={
            [
              $styleFlexContainer("column", "center", "center"),
              $styleFlexItem(1, 1)
            ] as any
          }
          className="right"
        >
          <div
            className="main-wrapper"
            style={{
              width: "400px",
              maxWidth: "92vw"
            }}
          >
            <form
              style={[$styleFlexContainer("column"), { width: "100%" }] as any}
              onSubmit={this.onPasswordEnter}
            >
              <Translate component="h1" content="account.welcome" />
              <h4 style={{ marginBottom: "3rem" }}>
                <Translate content="account.login_prefix" />
                <Link to="/create-account">
                  <Translate content="account.login_create" />
                </Link>
                <Translate content="account.login_suffix" />
              </h4>
              <LoginAccountInput
                onValidChange={(accountValid, account) =>
                  this.setState({
                    accountValid,
                    account: account && account.name
                  })
                }
              />
              <LoginPasswordInput
                onValidChange={(passwordValid, password) =>
                  this.setState({ passwordValid, password, errorPass: false })
                }
                errorPass={this.state.errorPass}
              />
              <Button
                disabled={!valid}
                type="primary"
                size="large"
                loading={this.state.checking}
                style={{ marginTop: "1.5em" }}
              >
                {counterpart.translate("header.unlock_short")}
              </Button>
            </form>
            <p
              style={
                [
                  $styleSecondaryText,
                  { marginBottom: 0, marginTop: "1em" }
                ] as any
              }
            >
              <Translate content="login.has_wallet" />
              <Link to="/existing-account">
                <Translate content="login.click_to_restore_wallet" />
              </Link>
            </p>
            <p style={[$styleSecondaryText, { marginBottom: 0 }] as any}>
              <Translate content="login.has_brainkey" />
              <Link to="/create-wallet-brainkey">
                <Translate content="login.click_to_restore_brainkey" />
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
);

let Login = class extends React.Component<any, any> {
  onSelect(route) {
    this.props.history.push("/create-account/" + route);
  }

  render() {
    if (this.props.children) {
      return this.props.children;
    }
    return [
      <LoginCheck key="loginCheck" />,
      <div
        key="loginSecond"
        className="login-wrapper anim-fade"
        style={{ width: "100%", display: "flex", height: "100%" }}
      >
        <LeftSlide key="loginSlide"/>
        <LoginMain key="loginMain" resolve={() => this.props.history.push("/dashboard")} />
      </div>
    ];
  }
};

export default Login;
