import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AltContainer from "alt-container";
import AccountStore from "stores/AccountStore";
import { RouterStore } from "stores/RouterStore";
import { RouterActions } from "actions/RouterActions";
import { EtoActions } from "actions/EtoActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { connect } from "alt-react";
import { EtoStore } from "stores/EtoStore";
import { Route, Switch, Redirect } from "react-router-dom";
import { EtoInfoForm } from "./EtoInfoForm";
import { Eto } from "../../services/eto";
import { EtoSurveyForm } from "./EtoSurveyForm";
import { EtoCenter } from "./EtoCenter";
import { EtoRule, EtoExplain } from "./EtoRule";
import counterpart from "counterpart";
import { EtoContent, EtoContentWrapper, EtoPanel } from "./EtoPanel";
import { EtoConfirmModal } from "../Modal/EtoConfirm";
import { ModalActions } from "../../actions/ModalActions";

const EtoTokenComfirmModal = "#$EtoTokenComfirmModal";

type EtoProps = {
  linkedAccounts: any;
  etoState: Eto.EtoInfo;
  account: any;
  myIgnoredAccounts: any;
  passwordAccount: any;
} & RouteComponentProps<{}>;
let EtoToken = class extends React.Component<EtoProps> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  componentWillMount() {
    let { etoState, account } = this.props as any;
    if (etoState.state === Eto.EtoPersonalState.Uninit) {
      EtoActions.queryInfo(account);
    }
  }

  render() {
    let { etoState, account, history } = this.props as any;
    return (
      <div className="grid-container">
        <div style={{ padding: "6px" }} />
        <EtoPanel style={{ marginBottom: "12px" }}>
          <h4 className="color-steel">
            {counterpart.translate("eto_apply.token.label")}
          </h4>
          <select
            onChange={e =>
              EtoActions.putToken(
                e.target.value as Eto.Token,
                account,
                () => ModalActions.showModal(EtoTokenComfirmModal)
                // history.push("/eto/apply")
              )
            }
          >
            {["USDT", "CYB"].map(token => (
              <option
                selected={
                  ((etoState as Eto.EtoInfo).info as Eto.FullInfo).token ===
                  token
                }
                value={token}
                key={token}
              >
                {token}
              </option>
            ))}
          </select>
        </EtoPanel>
        <EtoContent
          style={{ marginBottom: "12px" }}
          heading={counterpart.translate("eto_apply.token.tip_heading")}
          contents={[
            counterpart.translate("eto_apply.token.tip_content_1"),
            counterpart.translate("eto_apply.token.tip_content_2"),
            counterpart.translate("eto_apply.token.tip_content_3")
          ]}
        />
        <EtoConfirmModal
          modalId={EtoTokenComfirmModal}
          onConfirm={() => {
            ModalActions.hideModal(EtoTokenComfirmModal);
            history.push("/eto/apply");
          }}
        />
        <EtoContentWrapper>
          <EtoExplain />
        </EtoContentWrapper>
      </div>
    );
  }
};
EtoToken = BindToChainState(EtoToken);

let EtoTokenWrapper = class extends React.Component<EtoProps> {
  componentWillMount() {
    let {
      linkedAccounts,
      myIgnoredAccounts,
      passwordAccount,
      etoState
    } = this.props;
    let accountCount =
      linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);
    if (!accountCount || etoState.state !== Eto.EtoPersonalState.Lock) {
      this.props.history.push("/eto/apply");
    }
  }
  render() {
    return <EtoToken {...this.props} />;
  }
} as any;

EtoTokenWrapper = connect(
  EtoTokenWrapper,
  {
    listenTo() {
      return [AccountStore, RouterStore, EtoStore];
    },
    getProps() {
      return {
        etoState: EtoStore.getState(),
        account: AccountStore.getState().currentAccount,
        linkedAccounts: AccountStore.getState().linkedAccounts,
        myIgnoredAccounts: AccountStore.getState().myIgnoredAccounts,
        passwordAccount: AccountStore.getState().passwordAccount,
        accountsReady:
          AccountStore.getState().accountsLoaded &&
          AccountStore.getState().refsLoaded
      };
    }
  }
) as any;
export { EtoTokenWrapper as EtoToken };
export default EtoTokenWrapper;
