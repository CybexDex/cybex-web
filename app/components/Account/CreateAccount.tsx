import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "alt-react";
import classNames from "classnames";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import AccountNameInput from "./../Forms/AccountNameInput";
import PasswordInput from "./../Forms/PasswordInput";
import WalletDb from "stores/WalletDb";
import notify from "actions/NotificationActions";
import { Link } from "react-router";
import AccountSelect from "../Forms/AccountSelect";
import WalletUnlockActions from "actions/WalletUnlockActions";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import LoadingIndicator from "../LoadingIndicator";
import WalletActions from "actions/WalletActions";
import Translate from "react-translate-component";
import { ChainStore, FetchChain } from "cybexjs";
import { BackupCreate } from "../Wallet/Backup";
import ReactTooltip from "react-tooltip";
import utils from "common/utils";
import SettingsActions from "actions/SettingsActions";
import counterpart from "counterpart";
import NewWalletTips from "components/Account/NewWalletTips.tsx";
import RestoreWallet from "components/Account/RestoreWallet";
import Captcha from "../Utility/Captcha";
import {
  $styleFlexContainer,
  Button,
  $styleFlexAutoWrap,
  $styleFlexItem
} from "../Common";
import { WalletInfo } from "components/Login/CreateSelector";
import { LoginSelector } from "components/Login/LoginSelector";
import { CreateSwitcher } from "components/Login/CreateSwitcher";
import Radium from "radium";

let CreateAccount = Radium(
  class extends React.Component<any, any> {
    accountNameInput = null;
    passwordInput = null;

    constructor(props) {
      super(props);
      this.state = {
        knownWallet: false, // 用来检测用户是否明确知晓钱包重要性及其备份
        validAccountName: false,
        accountName: "",
        validPassword: false,
        registrar_account: null,
        loading: false,
        hide_refcode: true,
        show_identicon: false,
        step: 1,
        cap: {
          id: null,
          captcha: null
        }
      };
      this.onFinishConfirm = this.onFinishConfirm.bind(this);
    }

    componentWillMount() {
      SettingsActions.changeSetting({
        setting: "passwordLogin",
        value: false
      });
    }

    componentDidMount() {
      ReactTooltip.rebuild();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !utils.are_equal_shallow(nextState, this.state);
    }

    isValid() {
      let firstAccount = AccountStore.getMyAccounts().length === 0;
      let valid = this.state.validAccountName;
      console.debug("Valid 1", valid);
      if (!WalletDb.getWallet()) {
        // console.debug("Valid Not Wallet", valid, this.state.validPassword);
        valid = valid && this.state.validPassword;
      }
      if (!firstAccount) {
        // console.debug("Valid Not Wallet", valid, this.state.registrar_account, firstAccount);
        valid = valid && this.state.registrar_account;
        return valid;
      }
      // console.debug("Valid Not Wallet", valid, this.state.registrar_account, firstAccount);
      let { id, captcha } = this.state.cap;
      return valid && !!id && !!captcha;
    }

    onAccountNameChange(e) {
      const state = {};
      if (e.valid !== undefined) state.validAccountName = e.valid;
      if (e.value !== undefined) state.accountName = e.value;
      if (!this.state.show_identicon) state.show_identicon = true;
      this.setState(state);
    }

    onPasswordChange(e) {
      this.setState({ password: e.value, validPassword: e.valid });
    }

    setCaptcha = cap => {
      this.setState({ cap });
    };
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
          console.log("onFinishConfirm");
          this.props.router.push("/wallet/backup/create?newAccount=true");
        });
      }
    }

    createAccount(name) {
      let { cap } = this.state;
      let refcode = this.refs.refcode ? this.refs.refcode.value() : null;
      let referralAccount = AccountStore.getState().referralAccount;
      WalletUnlockActions.unlock().then(() => {
        this.setState({ loading: true });

        AccountActions.createAccount(
          name,
          this.state.registrar_account,
          referralAccount || this.state.registrar_account,
          0,
          refcode,
          cap
        )
          .then(() => {
            // User registering his own account
            if (this.state.registrar_account) {
              FetchChain("getAccount", name, undefined, { [name]: true }).then(
                () => {
                  this.setState({
                    step: 2,
                    loading: false
                  });
                }
              );
              TransactionConfirmStore.listen(this.onFinishConfirm);
            } else {
              // Account registered by the faucet
              FetchChain("getAccount", name, undefined, { [name]: true }).then(
                () => {
                  this.setState({
                    step: 2,
                    loading: false
                  });
                }
              );
            }
          })
          .catch(error => {
            console.log("ERROR AccountActions.createAccount", error);
            let error_msg = error ? error : "unknown error";
            notify.addNotification({
              message: `Failed to create account: ${name} - ${error_msg}`,
              level: "error",
              autoDismiss: 5
            });
            this.cap && this.cap.updateCaptcha();
            this.setState({ loading: false });
          });
      });
    }

    createWallet(password) {
      return WalletActions.setWallet(
        "default", //wallet name
        password
      )
        .then(() => {
          console.log("Congratulations, your wallet was successfully created.");
        })
        .catch(err => {
          console.log("CreateWallet failed:", err);
          notify.addNotification({
            message: `Failed to create wallet: ${err}`,
            level: "error",
            autoDismiss: 10
          });
        });
    }

    onSubmit(e) {
      e.preventDefault();
      if (!this.isValid()) return;
      let account_name = this.accountNameInput.getValue();
      console.debug("AccoutnName: ", account_name);
      if (WalletDb.getWallet()) {
        this.createAccount(account_name);
      } else {
        let password = this.state.password;
        console.debug("AccoutnName: Passwords", password);

        this.createWallet(password).then(() =>
          this.createAccount(account_name)
        );
      }
    }

    onRegistrarAccountChange(registrar_account) {
      this.setState({ registrar_account });
    }

    // showRefcodeInput(e) {
    //     e.preventDefault();
    //     this.setState({hide_refcode: false});
    // }

    _getAccount() {
      let my_accounts = AccountStore.getMyAccounts();
      let firstAccount = my_accounts.length === 0;
      return {
        my_accounts,
        firstAccount
      };
    }

    _renderAccountCreateForm() {
      let { registrar_account } = this.state;
      let { my_accounts, firstAccount } = this._getAccount();
      let hasWallet = WalletDb.getWallet();
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

      console.debug("Vdlis: ", valid, registrar_account, isLTM);

      let buttonClass = classNames("submit-button button no-margin", {
        disabled: !valid || (registrar_account && !isLTM)
      });

      return (
        <div style={[$styleFlexContainer(), $styleFlexAutoWrap] as any}>
          <form
            style={
              [
                { width: "60%", padding: "1em" },
                $styleFlexItem(1, 1, "60%")
              ] as any
            }
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

            {/* Only ask for password if a wallet already exists */}
            {hasWallet ? null : (
              <PasswordInput
                ref="password"
                confirmation={true}
                onChange={this.onPasswordChange.bind(this)}
                noLabel
                checkStrength
              />
            )}

            {/* If this is not the first account, show dropdown for fee payment account */}
            {firstAccount ? null : (
              <div className="full-width-content form-group no-overflow">
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
            {firstAccount && (
              <div className="full-width-content form-group">
                <label>
                  <Translate content="captcha.label" />
                </label>
                <Captcha onCapthaChange={this.setCaptcha} />
              </div>
            )}
            <div style={{ marginTop: "1em" }} />

            {/* Submit button */}
            {this.state.loading ? (
              <LoadingIndicator type="three-bounce" />
            ) : (
              <Button
                disabled={!valid || (registrar_account && !isLTM)}
                style={{ width: "100%" }}
                type="primary"
              >
                <Translate content="account.create_account" />
              </Button>
            )}
            {/* Skip to step 3 */}
            {!hasWallet || firstAccount ? null : (
              <div style={{ paddingTop: 20 }}>
                <label>
                  <a
                    onClick={() => {
                      this.setState({ step: 3 });
                    }}
                  >
                    <Translate content="wallet.go_get_started" />
                  </a>
                </label>
              </div>
            )}
          </form>
          <WalletInfo
            mode={1}
            withSwitcher
            style={{ width: "40%", justifyContent: "flex-start" }}
          />
        </div>
      );
    }

    _renderWalletTips() {
      return <div>Tips</div>;
    }

    _renderBackup() {
      return (
        <div className="backup-submit">
          <p>
            <Translate unsafe content="wallet.wallet_crucial" />
          </p>
          <div className="divider" />
          <BackupCreate noText downloadCb={this._onBackupDownload} />
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
          <p>
            <Translate content="wallet.wallet_move" unsafe />
          </p>
          <p className="txtlabel warning">
            <Translate unsafe content="wallet.wallet_lose_warning" />
          </p>
        </div>
      );
    }

    _renderGetStarted() {
      return (
        <div>
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
        </div>
      );
    }

    _renderGetStartedText() {
      return (
        <div>
          <p style={{ fontWeight: "bold" }}>
            <Translate content="wallet.congrat" />
          </p>

          <p>
            <Translate content="wallet.tips_explore" />
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
      let { firstAccount } = this._getAccount();

      return (
        <div
          className="readable anim-fade"
          style={[{ margin: "1em auto auto auto" }] as any}
        >
          {!this.state.knownWallet && firstAccount ? (
            <NewWalletTips
              onKnownWallet={() => this.setState({ knownWallet: true })}
            />
          ) : (
            <div>
              <h2 className="text-center">
                {firstAccount ? (
                  <Translate content="wallet.create_w_a" />
                ) : (
                  <Translate content="wallet.create_a" />
                )}
              </h2>
              {step === 1
                ? this._renderAccountCreateForm()
                : step === 2
                  ? this._renderBackup()
                  : this._renderGetStarted()}
              {step === 1
                ? null
                : step === 2
                  ? this._renderBackupText()
                  : this._renderGetStartedText()}
            </div>
          )}
          {step === 1 && (
            <LoginSelector style={{ marginTop: "2em", marginBottom: "2em" }} />
          )}
        </div>
      );
    }
  }
);

export default connect(CreateAccount, {
  listenTo() {
    return [AccountStore];
  },
  getProps() {
    return {};
  }
});
