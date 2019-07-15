import * as React from "react";
import * as PropTypes from "prop-types";

import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import { BaseModal } from "./BaseModalNew";
import { Button, Input, Colors } from "../Common";
import counterpart from "counterpart";
import { Htlc } from "../../services/htlc";
import { HtlcActions } from "../../actions/HtlcActions";
import AccountName from "../Utility/AccountName";
import { sha256, ripemd160 } from "../../cybex/cybexjs/ecc/src/hash";

type props = { modalId; open?; onConfirm; htlc: Htlc.HtlcRecord; account };

class HtlcRedeemModal extends React.Component<
  props,
  { fadeOut?; neverShow?; preimage: string; hashedPreimage: string }
> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false,
      preimage: "",
      hashedPreimage: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.htlc !== this.props.htlc) {
      this.setState({
        preimage: "",
        hashedPreimage: ""
      });
    }
  }

  render() {
    let { modalId, open, onConfirm, htlc, account } = this.props;
    if (!htlc || !account || !account.get) return null;
    let hashMatched =
      this.state.hashedPreimage === htlc.conditions.hash_lock.preimage_hash[1];
    return (
      open && (
        <BaseModal modalId={modalId}>
          <Translate
            component="h4"
            content="htlc.htlc_redeem"
            style={{ marginBottom: "8px" }}
          />
          <div
            className="htlc-section"
            style={{ display: "flex", margin: "10px auto" }}
          >
            <div style={{ flexBasis: "50%" }}>
              <Translate
                content="htlc.from"
                component="label"
                htmlFor="htlcFrom"
                style={{ color: Colors.$colorWhiteOp3 }}
              />
              <AccountName id="htlcFrom" account={htlc.transfer.from} />
            </div>
            <div style={{ flexBasis: "50%" }}>
              <Translate
                content="htlc.to"
                component="label"
                htmlFor="htlcTo"
                style={{ color: Colors.$colorWhiteOp3 }}
              />
              <AccountName id="htlcTo" account={htlc.transfer.to} />
            </div>
          </div>
          <div className="htlc-section" style={{ margin: "12px auto" }}>
            <Translate
              content="htlc.hash"
              component="label"
              style={{ color: Colors.$colorWhiteOp3 }}
              htmlFor="htlcHash"
            />
            <Input
              type="text"
              size="small"
              disabled
              id="htlcHash"
              valueFromOuter
              value={htlc.conditions.hash_lock.preimage_hash[1]}
            />
          </div>
          <div className="htlc-section" style={{ margin: "12px auto" }}>
            <Translate
              content="htlc.preimage"
              style={{ color: Colors.$colorWhiteOp3 }}
              component="label"
              htmlFor="htlcPreimage"
            />
            <Input
              type="text"
              size="small"
              id="htlcPreimage"
              valueFromOuter
              value={this.state.preimage}
              inputStyle={{
                color: hashMatched ? Colors.$colorGrass : Colors.$colorFlame
              }}
              onChange={e =>
                this.setState({
                  preimage: e.target.value,
                  hashedPreimage: (htlc.conditions.hash_lock
                    .preimage_hash[0] === Htlc.HashAlgo.Sha256
                    ? sha256
                    : ripemd160)(e.target.value).toString("hex")
                })
              }
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              size="small"
              disabled={!hashMatched}
              onClick={() =>
                HtlcActions.redeemHtlc(
                  htlc.id,
                  this.props.account.get("id"),
                  this.state.preimage,
                  this.props.account,
                  null,
                  () => {
                    if (onConfirm) {
                      onConfirm();
                    }
                    ModalActions.hideModal(modalId);
                  }
                )
              }
              style={{ width: "100%" }}
            >
              <Translate content="htlc.redeem" />
            </Button>
          </div>
          {/* <Button>{counterpart.translate("")}</Button> */}
        </BaseModal>
      )
    );
  }
}

const HtlcRedeemModalWapper: any = connect(
  HtlcRedeemModal as any,
  {
    listenTo() {
      return [ModalStore];
    },
    getProps(props) {
      let { modalId } = props;
      return {
        open: ModalStore.getState().showingModals.has(modalId)
      };
    }
  }
) as any;

export { HtlcRedeemModalWapper as HtlcRedeemModal };
export default HtlcRedeemModalWapper;
