import * as React from "react";
import BindToChainState from "../Utility/BindToChainState";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import ChainTypes from "../Utility/ChainTypes";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import { Htlc } from "../../services/htlc";
import AssetName from "../Utility/AssetName";
import FormattedAsset from "../Utility/FormattedAsset";
import LinkToAccountById from "../Utility/LinkToAccountById";
import AccountName from "../Utility/AccountName";
import * as moment from "moment";
import { Button } from "../Common";
import { HtlcActions } from "../../actions/HtlcActions";
import { HtlcRedeemModal } from "../Modal/HtlcRedeemModal";
import { DEFAULT_HTLC_REDEEM_MODAL } from "../Modal/ModalID";
import { ModalActions } from "../../actions/ModalActions";
import { HtlcStore } from "../../stores/HtlcStore";
import Icon from "../Icon/Icon";
import { saveAs } from "file-saver";
import {
  HASHED_PREIMAGE_FOR_LOCK_CYB,
  DEST_TIME,
  ORIGIN_TIME
} from "../../actions/LockCActions";
import { HASHED_PREIMAGE } from "../../actions/EtoActions";
function textContent(n) {
  return n ? `"${n.textContent.replace(/[\s\t\r\n]/gi, " ")}"` : "";
}
let HtlcOverview = class extends React.Component<
  {
    account: any;
    records?: Htlc.HtlcRecord[];
    isCurrentAccount?: boolean;
  },
  {
    htlcRedeem: Htlc.HtlcRecord | null;
    htlcExtend: Htlc.HtlcRecord | null;
    extend: boolean;
  }
> {
  state = {
    htlcRedeem: null,
    htlcExtend: null,
    extend: false
  };
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };
  timer;
  componentDidMount() {
    this.updateHtlc();
    this.timer = setInterval(() => {
      this.updateHtlc();
    }, 3000);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  componentWillMount() {
    this.updateHtlc();
  }
  updateHtlc() {
    HtlcActions.updateHtlcRecords(this.props.account.get("id"));
  }

  _downloadCSV = () => {
    let { records } = this.props;
    // let content = document.getElementById()
    const csv_export_container = document.getElementById("htlcTable");
    if (!csv_export_container) return;
    let headers =
      Array.prototype.slice
        .call(
          csv_export_container.childNodes[0].childNodes[0].childNodes,
          0,
          -1
        )
        .map(th => th.textContent)
        .join(",") + "\n";
    let tbody = Array.prototype.map
      .call(
        Array.prototype.slice.call(
          csv_export_container.childNodes[1].childNodes,
          0,
          -1
        ),
        trs =>
          Array.prototype.map
            .call(Array.prototype.slice.call(trs.childNodes, 0, -1), td =>
              td.textContent.replace(/,/gm, "")
            )
            .join(",")
      )
      .join("\n");
    let csv = headers + tbody;
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var today = new Date();
    saveAs(
      blob,
      "htlc-" +
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2) +
        "-" +
        ("0" + today.getHours()).slice(-2) +
        ("0" + today.getMinutes()).slice(-2) +
        ".csv"
    );
  };

  render() {
    let { records: htlcs } = this.props;
    return (
      <>
        <table id="htlcTable" className="table dashboard-table vest-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>
                <Translate content="account.asset" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="exchange.amount" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.from" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.to" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.end_time" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.hash_algo" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.hashed_preimage" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="gateway.operation" />
              </th>
            </tr>
          </thead>
          <tbody>
            {htlcs &&
              (Object.entries(htlcs).map(h => h[1]) as Htlc.HtlcRecord[]).map(
                htlc => (
                  <tr key={htlc.id}>
                    <td style={{ textAlign: "center" }}>{htlc.id}</td>
                    <td style={{ textAlign: "center" }}>
                      <FormattedAsset
                        asset={htlc.transfer.asset_id}
                        hide_amount
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <FormattedAsset
                        asset={htlc.transfer.asset_id}
                        amount={htlc.transfer.amount}
                        hide_asset
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <AccountName account={htlc.transfer.from} />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <AccountName account={htlc.transfer.to} />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(
                        htlc.conditions.time_lock.expiration + "Z"
                      ).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {
                        Htlc.HashAlgo[
                          htlc.conditions.hash_lock.preimage_hash[0]
                        ]
                      }
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        maxWidth: "12em",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {htlc.conditions.hash_lock.preimage_hash[1]}
                    </td>
                    <td>
                      {this.props.isCurrentAccount &&
                      !this.state.extend &&
                      htlc.transfer.from === this.props.account.get("id") &&
                      (htlc.conditions.hash_lock.preimage_hash[1] ===
                        HASHED_PREIMAGE_FOR_LOCK_CYB ||
                        htlc.conditions.hash_lock.preimage_hash[1] ===
                          HASHED_PREIMAGE) &&
                      moment(
                        htlc.conditions.time_lock.expiration + "Z"
                      ).isBefore("2019-08-03T00:00:00Z") ? (
                        <Button
                          size="smaller"
                          type="hollow-secondary"
                          onClick={() => {
                            this.setState({ extend: true });
                            HtlcActions.extendHtlc(
                              htlc.id,
                              htlc.transfer.from,
                              moment(DEST_TIME).diff(
                                moment(
                                  htlc.conditions.time_lock.expiration + "Z"
                                ),
                                "s"
                              ),
                              this.props.account
                            );
                          }}
                        >
                          <Translate content="htlc.extend" />
                        </Button>
                      ) : this.props.isCurrentAccount &&
                        htlc.transfer.to === this.props.account.get("id") ? (
                        <Button
                          size="smaller"
                          type="hollow-secondary"
                          onClick={() => {
                            this.setState(
                              { htlcRedeem: htlc },
                              ModalActions.showModal.bind(
                                this,
                                DEFAULT_HTLC_REDEEM_MODAL
                              )
                            );
                          }}
                        >
                          <Translate content="header.unlock" />
                        </Button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                )
              )}
            <tr className="total-value">
              <td colSpan={8} />
              <td className="text-center">
                <a
                  className="inline-block"
                  href="javascript:;"
                  onClick={this._downloadCSV}
                  data-tip={counterpart.translate("transaction.csv_tip")}
                  data-place="bottom"
                >
                  <Icon name="excel" className="icon-14px" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <HtlcRedeemModal
          htlc={this.state.htlcRedeem}
          modalId={DEFAULT_HTLC_REDEEM_MODAL}
          account={this.props.account}
          onConfirm={() => this.updateHtlc()}
        />
      </>
    );
  }
};

HtlcOverview = BindToChainState(HtlcOverview, { keep_updating: true });
HtlcOverview = connect(
  HtlcOverview,
  {
    getProps(props) {
      return {
        isCurrentAccount:
          AccountStore.getState().currentAccount ===
          (props.account && props.account.get("name")),
        records:
          (props.account &&
            props.account.get &&
            HtlcStore.getState().records[props.account.get("id")]) ||
          []
      };
    },
    listenTo() {
      return [AccountStore, HtlcStore];
    }
  }
) as any;
export { HtlcOverview };
export default HtlcOverview;
