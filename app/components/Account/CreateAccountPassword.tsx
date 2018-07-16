import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "alt-react";
import classNames from "classnames";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import AccountNameInput from "./../Forms/AccountNameInput";
import WalletDb from "stores/WalletDb";
import notify from "actions/NotificationActions";
import { Link } from "react-router";
import AccountSelect from "../Forms/AccountSelect";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import LoadingIndicator from "../LoadingIndicator";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import { ChainStore, FetchChain, key } from "cybexjs";
import ReactTooltip from "react-tooltip";
import utils from "common/utils";
import SettingsActions from "actions/SettingsActions";
import WalletUnlockActions from "actions/WalletUnlockActions";
import Icon from "../Icon/Icon";
import CopyButton from "../Utility/CopyButton";
import Captcha from "../Utility/Captcha";
import PasswordInput from "./../Forms/PasswordInput";
import { LoginSelector } from "components/Login/LoginSelector";
import { WalletInfo } from "components/Login/CreateSelector";
import { Checkbox, Button } from "components/Common";
import {
  $styleFlexContainer,
  $styleFlexItem,
  $styleFlexAutoWrap
} from "components/Common/Styles";
import { $breakpointSmall } from "components/Common/Breakpoints";
import Radium from "radium";
import { Gtag } from "services/Gtag";

let CreateAccountPassword = class extends React.Component<any, any> {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  accountNameInput = null;
  cap: any;

  constructor(props) {
    super(props);
    this.state = {
      validAccountName: false,
      accountName: "",
      validPassword: false,
      registrar_account: null,
      loading: false,
      hide_refcode: true,
      show_identicon: false,
      step: 1,
      showPass: false,
      generatedPassword: ("P" + key.get_random_key().toWif()).substr(0, 45),
      confirm_password: "",
      cap: {
        id: null,
        captcha: null
      },
      understand_1: false,
      understand_2: false,
      understand_3: false
    };
    this.onFinishConfirm = this.onFinishConfirm.bind(this);
  }

  componentWillMount() {
    SettingsActions.changeSetting({
      setting: "passwordLogin",
      value: true
    });
  }

  componentDidMount() {
    ReactTooltip.rebuild();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !utils.are_equal_shallow(nextState, this.state);
  }

  isValid = () => {
    let firstAccount = AccountStore.getMyAccounts().length === 0;
    let valid = this.state.validAccountName;
    if (!WalletDb.getWallet()) {
      valid = valid && this.state.validPassword;
    }
    if (!firstAccount) {
      valid = valid && this.state.registrar_account;
    }
    valid = valid && !!this.state.cap && !!this.state.cap.captcha;
    console.debug("THis. cap: ", valid, this.state.cap, this.state.cap.captcha);
    return (
      valid &&
      this.state.understand_1 &&
      this.state.understand_2 &&
      this.state.understand_3
    );
  };

  onAccountNameChange(e) {
    let state: any = {};
    if (e.valid !== undefined) state.validAccountName = e.valid;
    if (e.value !== undefined) state.accountName = e.value;
    if (!this.state.show_identicon) state.show_identicon = true;
    this.setState(state);
  }

  onFinishConfirm(confirm_store_state) {
    if (
      confirm_store_state.included &&
      confirm_store_state.broadcasted_transaction
    ) {
      TransactionConfirmStore.unlisten(this.onFinishConfirm);
      TransactionConfirmStore.reset();

      FetchChain("getAccount", this.state.accountName, undefined, {
        [this.state.accountName]: true
      }).then(() => {
        this.props.router.push("/wallet/backup/create?newAccount=true");
      });
    }
  }

  _unlockAccount(name, password) {
    WalletDb.validatePassword(password, true, name);
    WalletUnlockActions.checkLock.defer();
  }

  createAccount(name, password) {
    let refcode = this.refs.refcode ? (this.refs.refcode as any).value() : null;
    let referralAccount = AccountStore.getState().referralAccount;
    this.setState({ loading: true });
    let { cap } = this.state;
    AccountActions.createAccountWithPassword(
      name,
      password,
      this.state.registrar_account,
      referralAccount || this.state.registrar_account,
      0,
      refcode,
      cap
    )
      .then(() => {
        AccountActions.setPasswordAccount(name);
        // User registering his own account
        if (this.state.registrar_account) {
          FetchChain("getAccount", name, undefined, { [name]: true }).then(
            () => {
              this.setState({
                step: 2,
                loading: false
              });
              this._unlockAccount(name, password);
            }
          );
          TransactionConfirmStore.listen(this.onFinishConfirm);
        } else {
          // Account registered by the faucet
          FetchChain("getAccount", name, undefined, { [name]: true }).then(
            () => {
              this.setState({
                step: 2
              });
              this._unlockAccount(name, password);
            }
          );
        }
        Gtag.eventRegisterDone(name);
      })
      .catch(error => {
        console.log("ERROR AccountActions.createAccount", error);
        let error_msg = error ? error : "unknown error";
        // let error_msg =
        //   error.base && error.base.length && error.base.length > 0
        //     ? error.base[0]
        //     : "unknown error";
        // if (error.remote_ip) error_msg = error.remote_ip[0];
        notify.addNotification({
          message: `Failed to create account: ${name} - ${error_msg}`,
          level: "error",
          autoDismiss: 5
        });
        this.cap && this.cap.updateCaptcha();
        this.setState({ loading: false });
        Gtag.eventRegisterFailed(name);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.isValid()) return;
    let account_name = this.accountNameInput.getValue();
    // if (WalletDb.getWallet()) {
    //     this.createAccount(account_name);
    // } else {
    let password = this.state.password;
    this.createAccount(account_name, password);
  }

  onPasswordChange(e) {
    this.setState({ password: e.value, validPassword: e.valid });
  }

  onRegistrarAccountChange(registrar_account) {
    this.setState({ registrar_account });
  }

  // showRefcodeInput(e) {
  //     e.preventDefault();
  //     this.setState({hide_refcode: false});
  // }

  _onInput(value, e) {
    this.setState({
      [value]: value === "password" ? e.target.value : !this.state[value]
    });
  }

  setCaptcha = cap => {
    console.debug("Set Cap:", cap);
    this.setState({ cap });
  };

  _renderAccountCreateForm() {
    let { registrar_account } = this.state;

    let my_accounts = AccountStore.getMyAccounts();
    let firstAccount = my_accounts.length === 0;
    let valid = this.isValid();
    let isLTM = false;
    let registrar = registrar_account
      ? ChainStore.getAccount(registrar_account)
      : null;
    if (registrar) {
      if (registrar.get("lifetime_referrer") == registrar.get("id")) {
        isLTM = true;
      }
    }

    let buttonClass = classNames("submit-button button no-margin", {
      disabled: !valid || (registrar_account && !isLTM)
    });

    return (
      <div
        className="create-form"
        style={[$styleFlexContainer(), $styleFlexAutoWrap] as any}
      >
        <div
          style={
            [
              { textAlign: "left", width: "60%" },
              $styleFlexItem(1, 1, "60%")
            ] as any
          }
        >
          <form
            style={{ maxWidth: "60rem" }}
            onSubmit={this.onSubmit.bind(this)}
            noValidate
          >
            <AccountNameInput
              ref={ref => {
                if (ref) {
                  this.accountNameInput = ref.refs.nameInput;
                }
              }}
              cheapNameOnly={!!firstAccount}
              onChange={this.onAccountNameChange.bind(this)}
              accountShouldNotExist={true}
              placeholder={counterpart.translate("wallet.account_public")}
              noLabel
            />

            <div className="form-field">
              <label className="left-label">
                <Translate content="wallet.generated" />&nbsp;&nbsp;<span
                  className="tooltip"
                  data-html={true}
                  data-tip={counterpart.translate("tooltip.generate")}
                >
                  <Icon name="question-circle" />
                </span>
              </label>
              <div style={{ paddingBottom: "0.5rem" }}>
                <span className="inline-label">
                  <input
                    style={{ maxWidth: "calc(100% - 48px)", fontSize: "80%" }}
                    disabled
                    value={this.state.generatedPassword}
                    type="text"
                  />
                  <CopyButton
                    text={this.state.generatedPassword}
                    tip="tooltip.copy_password"
                    dataPlace="top"
                  />
                </span>
              </div>
            </div>
            <div className="form-field">
              <PasswordInput
                ref="password"
                confirmation={true}
                passwordLength={12}
                onChange={this.onPasswordChange.bind(this)}
                noLabel
                checkStrength
              />
            </div>
            <div className="confirm-checks">
              <Checkbox
                onChange={this._onInput.bind(this, "understand_3")}
                size="large"
                active={this.state.understand_3}
              >
                <Translate
                  style={{ fontSize: "0.8em", userSelect: "none" }}
                  content="wallet.understand_3"
                />
              </Checkbox>
            </div>
            <br />
            <div className="confirm-checks">
              <Checkbox
                onChange={this._onInput.bind(this, "understand_1")}
                size="large"
                active={this.state.understand_1}
              >
                <Translate
                  style={{ fontSize: "0.8em", userSelect: "none" }}
                  content="wallet.understand_1"
                />
              </Checkbox>
            </div>
            <br />
            <div className="confirm-checks" style={{ paddingBottom: "1.5rem" }}>
              <Checkbox
                onChange={this._onInput.bind(this, "understand_2")}
                size="large"
                active={this.state.understand_2}
              >
                <Translate
                  style={{ fontSize: "0.8em", userSelect: "none" }}
                  content="wallet.understand_2"
                />
              </Checkbox>
              {/* <label>
              <input
                type="checkbox"
                onChange={this._onInput.bind(this, "understand_2")}
                checked={this.state.understand_2}
              />
            </label> */}
            </div>
            <div className="form-field">
              <label>
                <Translate content="captcha.label" />
              </label>
              <Captcha onCapthaChange={this.setCaptcha} />
            </div>

            {/* If this is not the first account, show dropdown for fee payment account */}
            {firstAccount ? null : (
              <div
                className="full-width-content form-group no-overflow"
                style={{ paddingTop: 30 }}
              >
                <label>
                  <Translate content="account.pay_from" />
                </label>
                <AccountSelect
                  account_names={my_accounts}
                  onChange={this.onRegistrarAccountChange.bind(this)}
                />
                {registrar_account && !isLTM ? (
                  <div style={{ textAlign: "left" }} className="facolor-error">
                    <Translate content="wallet.must_be_ltm" />
                  </div>
                ) : null}
              </div>
            )}
            <div style={{ marginTop: "1em" }} />
            {/* Submit button */}
            {this.state.loading ? (
              <LoadingIndicator type="three-bounce" />
            ) : (
              <Button
                style={{ width: "100%" }}
                type={"primary"}
                disabled={!valid || (registrar_account && !isLTM)}
              >
                <Translate content="account.create_account" />
              </Button>
            )}
          </form>
          {/* <br />
                <p>
                    <Translate content="wallet.cyb_rules" unsafe />
                </p> */}
        </div>
        <WalletInfo
          withSwitcher
          mode={0}
          style={{ justifyContent: "flex-start" }}
        />
      </div>
    );
  }

  _renderAccountCreateText() {
    let my_accounts = AccountStore.getMyAccounts();
    let firstAccount = my_accounts.length === 0;

    return (
      <div>
        <h4 style={{ fontWeight: "bold", paddingBottom: 15 }}>
          <Translate content="wallet.wallet_password" />
        </h4>

        <Translate
          style={{ textAlign: "left" }}
          unsafe
          component="p"
          content="wallet.create_account_password_text"
        />

        <Translate
          style={{ textAlign: "left" }}
          component="p"
          content="wallet.create_account_text"
        />

        {firstAccount ? null : (
          <Translate
            style={{ textAlign: "left" }}
            component="p"
            content="wallet.not_first_account"
          />
        )}
      </div>
    );
  }

  _renderBackup() {
    return (
      <div className="backup-submit">
        <p>
          <Translate unsafe content="wallet.password_crucial" />
        </p>
        <div>
          {!this.state.showPass ? (
            <div
              onClick={() => {
                this.setState({ showPass: true });
              }}
              className="button"
            >
              <Translate content="wallet.password_show" />
            </div>
          ) : (
            <div>
              <h5>
                <Translate content="settings.password" />:
              </h5>
              <div
                style={{ fontWeight: "bold", wordWrap: "break-word" }}
                className="no-overflow"
              >
                {this.state.password}
              </div>
            </div>
          )}
        </div>
        <div className="divider" />
        <p className="txtlabel warning">
          <Translate unsafe content="wallet.password_lose_warning" />
        </p>
        <button className="button" onClick={() => this.setState({ step: 3 })}>
          OK
        </button>
      </div>
    );
  }
  _onBackupDownload = () => {
    this.setState({
      step: 3
    });
  };

  _renderBackupText() {
    return (
      <div>
        <p style={{ fontWeight: "bold" }}>
          <Translate content="footer.backup" />
        </p>
        <p className="txtlabel warning">
          <Translate unsafe content="wallet.password_lose_warning" />
        </p>
      </div>
    );
  }

  _renderGetStarted() {
    return (
      <table className="table">
        <tbody>
          <tr>
            <td>
              <Translate content="wallet.tips_dashboard" />:
            </td>
            <td>
              <Link to="/dashboard">
                <Translate content="header.dashboard" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Translate content="wallet.tips_account" />:
            </td>
            <td>
              <Link to={`/account/${this.state.accountName}/overview`}>
                <Translate content="wallet.link_account" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Translate content="wallet.tips_transfer" />:
            </td>
            <td>
              <Link to="/transfer">
                <Translate content="wallet.link_transfer" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Translate content="wallet.tips_settings" />:
            </td>
            <td>
              <Link to="/settings">
                <Translate content="header.settings" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  _renderGetStartedText() {
    return (
      <div>
        <p style={{ fontWeight: "bold" }}>
          <Translate content="wallet.congrat" />
        </p>

        <p>
          <Translate content="wallet.tips_explore_pass" />
        </p>

        <p>
          <Translate content="wallet.tips_header" />
        </p>

        <p className="txtlabel warning">
          <Translate content="wallet.tips_login" />
        </p>
      </div>
    );
  }

  render() {
    let { step } = this.state;
    // let my_accounts = AccountStore.getMyAccounts();
    // let firstAccount = my_accounts.length === 0;
    return (
      <div
        className="create-wrapper readable anim-fade"
        style={[{ margin: "1em auto auto auto" }] as any}
      >
        <div>
          <Translate
            component="h2"
            // style={{ marginLeft: "1em" }}
            className="text-center"
            content="wallet.use_password_create"
          />
        </div>
        <div className="create-password">
          {step === 2 ? (
            <p style={{ fontWeight: "bold" }}>
              <Translate content={"wallet.step_" + step} />
            </p>
          ) : null}

          {step === 3 ? this._renderGetStartedText() : null}

          {step === 1
            ? this._renderAccountCreateForm()
            : step === 2
              ? this._renderBackup()
              : this._renderGetStarted()}
        </div>
        {step === 1 && (
          <LoginSelector style={{ marginTop: "1em", marginBottom: "2em" }} />
        )}
      </div>
    );
  }
};
CreateAccountPassword = Radium(CreateAccountPassword);
CreateAccountPassword = connect(
  CreateAccountPassword,
  {
    listenTo() {
      return [AccountStore];
    },
    getProps() {
      return {};
    }
  }
);

export { CreateAccountPassword };
export default CreateAccountPassword;
