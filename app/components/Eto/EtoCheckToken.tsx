import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import IntlStore from "stores/IntlStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "lib/common/utils";
import { BaseModal } from "./../Modal/BaseModalNew";
import * as moment from "moment";
import EtoStore from "stores/EtoStore";
import { Eto } from "../../services/eto";
import { DEFAULT_ETO_CHECK_TOKEN } from "../Modal/ModalID";
import { EtoPanel } from "./EtoPanel";
import { EtoActions } from "../../actions/EtoActions";
import { Radio, Button } from "../Common";
import { EtoTokenTips } from "./EtoToken";

export const checkToken = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let info = (EtoStore.getState() as Eto.EtoInfo).info;
      if (info && !info[Eto.Fields.token]) {
        ModalActions.showModal(DEFAULT_ETO_CHECK_TOKEN, false, {
          onResolve: resolve,
          onReject: reject
        });
      }
    }, 0);
  });

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale?; modalId?; open?; className?; account };

let EtoTokenModal = class extends React.Component<
  props,
  { fadeOut?; neverShow?; token }
> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false,
      token: ""
    };
  }

  handleNeverShow = e => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  };

  onSubmit = e => {
    // console.debug("CheckToken: ", e);
    e.preventDefault();
    EtoActions.putToken(
      this.state.token as Eto.Token,
      this.props.account,
      () =>
        ModalActions.closeModalWithResolve({
          modal_id: this.props.modalId,
          result: { data: true }
        })
      // history.push("/eto/apply")
    );
  };

  render() {
    let { modalId, open, locale, account } = this.props;
    return (
      open && (
        <BaseModal modalId={this.props.modalId} noCloseBtn>
          <div
            className="modal-content game-modal"
            style={{ padding: "24px 0", paddingBottom: 0 }}
          >
            <EtoPanel style={{ marginBottom: "12px" }}>
              <h4
                className="color-steel"
                style={{ fontSize: "14px", textAlign: "center" }}
              >
                {counterpart.translate("eto_token_modal.title")}
              </h4>
              <form onSubmit={this.onSubmit} style={{ textAlign: "center" }}>
                <div style={{ margin: "8px auto", display: "inline-block" }}>
                  {["USDT", "CYB"].map(token => (
                    <Radio
                      key={token}
                      onClick={value => this.setState({ token })}
                      labelStyle={{ fontSize: "12px", margin: "8px" }}
                      label={token}
                      value={token}
                      bindTo={this.state.token}
                    />
                  ))}
                </div>
                <div className="input-field">
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    disabled={!this.state.token}
                  >
                    确认
                  </Button>
                </div>
              </form>
            </EtoPanel>
            {
              <EtoTokenTips
                style={{ background: "transparent", boxShadow: "unset" }}
              />
            }
          </div>
        </BaseModal>
      )
    );
  }
};

EtoTokenModal = connect(
  EtoTokenModal,
  {
    listenTo() {
      return [ModalStore, IntlStore];
    },
    getProps(props) {
      let { modalId } = props;
      return {
        locale: IntlStore.getState().currentLocale,
        open: ModalStore.getState().showingModals.has(modalId)
      };
    }
  }
) as any;
export { EtoTokenModal };
export default EtoTokenModal;
