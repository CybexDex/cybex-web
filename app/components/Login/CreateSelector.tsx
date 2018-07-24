import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Translate from "react-translate-component";
import RestoreWallet from "components/Account/RestoreWallet";
import SettingsActions from "actions/SettingsActions";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { LeftSlide } from "components/Common/LeftSlide";
import LoadingIndicator from "components/LoadingIndicator";
import Loadable from "react-loadable";
import {
  Input,
  Button,
  ButtonSize,
  ButtonType,
  Panel,
  Icon,
  LoginAccountInput,
  LoginPasswordInput,
  Colors
} from "components/Common";
import {
  $styleFlexContainer,
  $styleFlexItem,
  $styleSecondaryText
} from "components/Common/Styles";
import { $breakpointSmall } from "components/Common/Breakpoints";
import Radium from "radium";

import WalletDb from "stores/WalletDb";
import WalletUnlockStore from "stores/WalletUnlockStore";
import AccountStore from "stores/AccountStore";
import AccountActions from "actions/AccountActions";
import { LoginSelector } from "components/Login/LoginSelector";
import { CreateSwitcher } from "components/Login/CreateSwitcher";

import { Route, Switch } from "react-router-dom";

import { CreateAccountPassword } from "components/Account/CreateAccountPassword";
import CreateAccount from "components/Account/CreateAccount";

export const WalletInfo = Radium(
  class extends React.PureComponent<{ mode; withSwitcher?; style? }, any> {
    static defaultProps = {
      mode: 0,
      withSwitcher: false
    };
    render() {
      let { mode, style, withSwitcher } = this.props;
      return mode === 1 ? (
        <div
          style={
            [
              $styleFlexContainer("column", "space-between"),
              $styleFlexItem(1, 1, "50%"),
              CreateSelector.$style.panelContent,
              style
            ] as any
          }
        >
          <h5
            style={
              [
                $styleFlexContainer("row", null, "center"),
                CreateSelector.$style.panelHeader
              ] as any
            }
          >
            <Icon icon="info" style={{ fontSize: "1.4em" }} />
            <Translate
              style={{ marginLeft: "0.5em" }}
              content="wallet.wallet_model_about"
            />
          </h5>
          <div className="box-content">
            <Translate
              content="wallet.wallet_model_1"
              component="p"
              style={CreateSelector.$style.para}
            />
            <Translate
              unsafe
              content="wallet.wallet_model_2"
              style={CreateSelector.$style.para}
              component="p"
            />
            <Translate
              unsafe
              content="wallet.wallet_model_3"
              className="text-right"
              component="ul"
            />
          </div>
          {withSwitcher && (
            <CreateSwitcher style={{ alignSelf: "flex-end" }} mode={1} />
          )}
        </div>
      ) : (
        <div
          style={
            [
              $styleFlexContainer("column", "space-between"),
              $styleFlexItem(1, 1, "50%"),
              CreateSelector.$style.panelContent,
              style
            ] as any
          }
        >
          <h5
            style={
              [
                $styleFlexContainer("row", null, "center"),
                CreateSelector.$style.panelHeader
              ] as any
            }
          >
            <Icon icon="info" style={{ fontSize: "1.4em" }} />
            <Translate
              style={{ marginLeft: "0.5em" }}
              content="wallet.password_model_about"
            />
          </h5>
          <div className="box-content">
            <Translate
              content="wallet.password_model_1"
              component="p"
              style={CreateSelector.$style.para}
            />
            <Translate
              unsafe
              content="wallet.password_model_2"
              style={CreateSelector.$style.para}
              component="p"
            />
            <Translate
              unsafe
              content="wallet.password_model_3"
              component="ul"
            />
          </div>
          {withSwitcher && (
            <CreateSwitcher style={{ alignSelf: "flex-end" }} mode={0} />
          )}
        </div>
      );
    }
  }
);

export class CreateSelector extends React.Component<any, { mode }> {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    };
  }

  static $style = {
    panelContent: {
      margin: "2em",
      fontSize: "1.16667rem"
    },
    panelHeader: {
      fontSize: "1.3334rem"
    },
    para: {
      color: Colors.$colorWhiteOp8,
      textAlign: "justify",
      lineHeight: 2
    },
    divider: {
      [`@media (max-width: ${$breakpointSmall})`]: {
        display: "none"
      }
    }
  };

  onSelect(route) {
    this.props.history.push("/create-account/" + route);
  }

  switchMode = () => {
    let mode = Math.abs(this.state.mode - 1);
    this.setState({ mode });
  };

  render() {
    let { mode } = this.state;
    if (this.props.children) {
      return this.props.children;
    }
    return (
      <div
        className="login-wrapper anim-fade"
        style={{ width: "100%", display: "flex", height: "100%" }}
      >
        <div className="grid-content" style={{ paddingTop: "2em" }}>
          <h2 className="text-center" style={{ marginBottom: "1em" }}>
            <Translate content="wallet.login_create_type" />
          </h2>
          {mode === 1 && (
            <Panel
              direction="row"
              className="readable anim-fade"
              styles={{ margin: "auto" }}
            >
              <div
                style={
                  [
                    $styleFlexContainer("column", "space-between", "center"),
                    $styleFlexItem(1, 1, "50%"),
                    CreateSelector.$style.panelContent
                  ] as any
                }
              >
                <Icon icon="localWallet" style={{ fontSize: "9em" }} />
                <Translate
                  content="wallet.wallet_model"
                  style={{ color: Colors.$colorOrange }}
                  component="h4"
                />
                <Translate
                  style={{ color: Colors.$colorWhiteOp8, textAlign: "center" }}
                  content="wallet.wallet_model_4"
                  component="p"
                />
                <Button
                  type="primary"
                  onClick={() => {
                    this.onSelect.bind(this, "wallet");
                    this.props.history.push("/create-account/wallet");
                  }}
                  style={{ width: "100%" }}
                >
                  <Translate content="wallet.use_wallet_create" />
                </Button>
              </div>
              <div className="divider" style={CreateSelector.$style.divider} />
              <WalletInfo mode={mode} />
            </Panel>
          )}
          {mode === 0 && (
            <Panel
              direction="row"
              className="readable anim-fade"
              styles={{ margin: "auto" }}
            >
              <WalletInfo mode={mode} />
              <div className="divider" style={CreateSelector.$style.divider} />
              <div
                style={
                  [
                    $styleFlexContainer("column", "space-between", "center"),
                    $styleFlexItem(1, 1, "50%"),
                    CreateSelector.$style.panelContent
                  ] as any
                }
              >
                <Icon icon="cloudWallet" style={{ fontSize: "9em" }} />
                <Translate
                  content="wallet.password_model"
                  style={{ color: Colors.$colorOrange }}
                  component="h4"
                />
                <Translate
                  style={{ color: Colors.$colorWhiteOp8, textAlign: "center" }}
                  content="wallet.password_model_4"
                  component="p"
                />
                <Button
                  type="primary"
                  onClick={() => {
                    this.onSelect.bind(this, "password");
                    this.props.history.push("/create-account/password");
                  }}
                  style={{ width: "100%" }}
                >
                  <Translate content="wallet.use_password_create" />
                </Button>
              </div>
            </Panel>
          )}
          <div className="mode-selector text-center" style={{ margin: "1em" }}>
            <Translate content={"login.can_also"} />
            {mode === 1 ? (
              <Translate
                onClick={this.switchMode}
                component="a"
                href="javascript:;"
                content={"login.create_cloud"}
              />
            ) : (
              <Translate
                onClick={this.switchMode}
                component="a"
                href="javascript:;"
                content={"login.create_local"}
              />
            )}
          </div>
          <LoginSelector />
        </div>
      </div>
    );
  }
}

export const CreateWrapper = () => {
  return (
    <Switch>
      <Route path="/create-account" exact component={CreateSelector} />
      <Route
        path="/create-account/password"
        component={CreateAccountPassword}
      />
      <Route path="/create-account/wallet" component={CreateAccount} />
    </Switch>
  );
};

export default CreateWrapper;
