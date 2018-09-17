import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "alt-react";
import * as Immutable from "immutable";

import PrivateKeyStore from "stores/PrivateKeyStore";
import BalanceClaimActiveStore from "stores/BalanceClaimActiveStore";
import BalanceClaimActiveActions from "actions/BalanceClaimActiveActions";
import FormattedAsset from "components/Utility/FormattedAsset";
import Translate from "react-translate-component";
import { GatewayActions } from "actions/GatewayActions";
import * as moment from "moment";
import counterpart from "counterpart";

let VestedBalancesLists = class extends React.PureComponent<any> {
  constructor(props: any) {
    super(props);
    // GatewayActions.showDepositModal("any", "BTC");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.claim_account_name !== this.props.claim_account_name) {
      this.onClaimAccount(nextProps.claim_account_name, nextProps.checked);
    }
  }

  render() {
    // if (this.props.balances === undefined || !this.props.total_by_account_asset.size)
    //   return <div></div>;
    // console.debug("total_by_account_asset: ", this.props.total_by_account_asset);
    let sortFn = (pre, next) => (pre["id"] < next["id"] ? -1 : 1);
    let unclaimed =
      this.props.total_by_account_asset &&
      this.props.total_by_account_asset.toArray();
    console.debug("Unclamed: ");
    let balances =
      unclaimed &&
      unclaimed.length &&
      unclaimed
        .map(unc => unc.balances.sort(sortFn))
        .reduce((prev, next) => [...prev, ...next]);
    return (
      <div>
        <table className="table dashboard-table vest-table">
          <thead>
            <tr>
              <th>{/* C H E C K B O X */}</th>
              <th style={{ textAlign: "center" }}>
                <Translate content="account.asset" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="exchange.amount" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.end_time" />
              </th>
              <th style={{ textAlign: "center" }}>
                <Translate content="vesting.progress" />
              </th>
              <th
                style={{ textAlign: "center" }}
                title={counterpart.translate("vesting.pubkey_tip")}
                className="tooltip with-tooltip"
                data-place="bottom"
                data-tip={counterpart.translate("vesting.pubkey_tip")}
              >
                <Translate content="vesting.pubkey" />
              </th>
            </tr>
          </thead>
          <tbody>
            {balances &&
              balances.filter(v => !!v.vesting_policy).map(vestingItem => {
                let index = vestingItem["id"];
                let { vesting_policy, public_key_string } = vestingItem;
                let endDate = moment
                  .utc(vesting_policy.begin_timestamp)
                  .add(vesting_policy.vesting_cliff_seconds, "s");
                let now = moment.utc();
                let progress =
                  vesting_policy.vesting_cliff_seconds -
                  (endDate.valueOf() - now.valueOf()) / 1000;
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        // checked={!!this.props.checked.get(index)}
                        onChange={e => this.onCheckbox(index, vestingItem, e)}
                        disabled={now.isBefore(endDate)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {vesting_policy.begin_balance ? (
                        <FormattedAsset
                          amount={vestingItem.balance.amount}
                          asset={vestingItem.balance.asset_id}
                          hide_amount
                        />
                      ) : null}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {vesting_policy.begin_balance ? (
                        <div>
                          <FormattedAsset
                            amount={vestingItem.balance.amount}
                            asset={vestingItem.balance.asset_id}
                            hide_asset
                          />
                        </div>
                      ) : null}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {endDate.format("YYYY-MM-DD HH:mm:ss zZ")}
                    </td>
                    <td>
                      {vesting_policy.begin_timestamp && (
                        <progress
                          value={progress}
                          max={vesting_policy.vesting_cliff_seconds}
                        />
                      )}
                    </td>
                    <td>{public_key_string}</td>
                  </tr>
                );
              }) || null}
            {!this.props.total_by_account_asset ||
              (this.props.total_by_account_asset.size === 0 && (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  onCheckbox(index, balances, e) {
    let value = e.target.checked;
    let checked = this.props.checked;
    if (!value) {
      checked = checked.delete(index);
    } else {
      checked = checked.set(index, balances);
    }
    BalanceClaimActiveActions.setSelectedBalanceClaims(checked);
  }

  onClaimAccount(claim_account_name, checked) {
    // A U T O  S E L E C T  A C C O U N T S
    // only if nothing is selected (play it safe)
    if (checked.size) return;
    let index = -1;
    this.props.total_by_account_asset.forEach((v, k) => {
      index++;
      let name = k.get(0);
      if (name === claim_account_name) {
        if (v.unclaimed || v.vesting.unclaimed)
          checked = checked.set(index, v.balances);
      }
    });
    if (checked.size)
      BalanceClaimActiveActions.setSelectedBalanceClaims(checked);
  }
};

VestedBalancesLists = connect(
  VestedBalancesLists,
  {
    listenTo() {
      return [BalanceClaimActiveStore];
    },
    getProps() {
      let props = BalanceClaimActiveStore.getState();
      // console.debug("Props: ", props);
      let { balances, address_to_pubkey } = props;
      // console.debug("Balance: ", balances && balances.toJS());
      let private_keys = PrivateKeyStore.getState().keys;
      let groupCountMap = Immutable.Map().asMutable();
      let groupCount = (group, distinct) => {
        let set = groupCountMap.get(group);
        if (!set) {
          set = Immutable.Set().asMutable();
          groupCountMap.set(group, set);
        }
        set.add(distinct);
        return set.size;
      };
      if (balances)
        props.total_by_account_asset = balances
          .groupBy(v => {
            // K E Y S
            let names = "";
            let pubkey = address_to_pubkey.get(v.owner);
            let private_key_object = private_keys.get(pubkey);
            // Imported Account Names (just a visual aid, helps to auto select a real account)
            if (private_key_object && private_key_object.import_account_names)
              names = private_key_object.import_account_names.join(", ");

            // Signing is very slow, further divide the groups based on the number of signatures required
            let batch_number = Math.ceil(
              groupCount(Immutable.List([names, v.balance.asset_id]), v.owner) /
                60
            );
            let name_asset_key = Immutable.List([
              names,
              v.balance.asset_id,
              batch_number
            ]);
            return name_asset_key;
          })
          .map(l =>
            l.reduce(
              (r, v) => {
                // V A L U E S
                v.public_key_string = address_to_pubkey.get(v.owner);
                r.balances = r.balances.add(v);
                if (v.vested_balance != undefined) {
                  r.vesting.unclaimed += Number(v.vested_balance.amount);
                  r.vesting.total += Number(v.balance.amount);
                } else {
                  r.unclaimed += Number(v.balance.amount);
                }
                return r;
              },
              {
                unclaimed: 0,
                vesting: { unclaimed: 0, total: 0 },
                balances: Immutable.Set()
              }
            )
          )
          .sortBy(k => k);
      return props;
    }
  }
);
export { VestedBalancesLists };
export default VestedBalancesLists;
