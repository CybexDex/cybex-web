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
let HtlcOverview = class extends React.Component<{
  account: any;
  isCurrentAccount?: boolean;
}> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };
  render() {
    let { htlcs } = this.props.account.toJS();
    return (
      <table className="table dashboard-table vest-table">
        <thead>
          <tr>
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
          {(htlcs as Htlc.HtlcRecord[]).map(htlc => (
            <tr key={htlc.id}>
              <td style={{ textAlign: "center" }}>
                <FormattedAsset asset={htlc.transfer.asset_id} hide_amount />
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
                {moment(htlc.conditions.time_lock.expiration + "Z").format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {Htlc.HashAlgo[htlc.conditions.hash_lock.preimage_hash[0]]}
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
                htlc.transfer.to === this.props.account.get("id") ? (
                  <Button
                    size="smaller"
                    type="hollow-secondary"
                    onClick={() =>
                      HtlcActions.redeemHtlc(
                        htlc.id,
                        this.props.account.get("id"),
                        "a",
                        this.props.account
                      )
                    }
                  >
                    <Translate content="header.unlock" />
                  </Button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          (props.account && props.account.get("name"))
      };
    },
    listenTo() {
      return [AccountStore];
    }
  }
) as any;
export { HtlcOverview };
export default HtlcOverview;
