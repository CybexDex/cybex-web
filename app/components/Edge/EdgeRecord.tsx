import * as React from "react";
import { EdgeState, EdgeStore } from "../../stores/EdgeStore";
import { Edge, CybexRecord } from "../../services/edge";
import { Apis } from "cybexjs-ws";
import AccountStore from "stores/AccountStore";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { RouterStore } from "../../stores/RouterStore";
import { connect } from "alt-react";
import { EdgeActions } from "../../actions/EdgeActions";
import counterpart from "counterpart";
import { Colors } from "../Common";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { calcValue } from "../../utils/Asset";
const { useState, useEffect } = React;
const blockCache = {};
const fetchBlock = (blockNum: number) => {
  if (blockCache[blockNum]) {
    return Promise.resolve(blockCache[blockNum]) as Promise<
      CybexRecord.BlockSummary
    >;
  }
  return Apis.instance()
    .db_api()
    .exec("get_block_header", [blockNum])
    .then(block => {
      blockCache[blockNum] = block;
      return block;
    }) as Promise<CybexRecord.BlockSummary>;
};
const RecordStyles = {
  labelText: {
    fontSize: "12px",
    color: "rgba(120,129,154, 0.5)"
  },
  contentText: {
    fontSize: "12px",
    color: "rgb(120,129,154)"
  }
};

let EdgeRecord = ({ amount, asset, period_in_secs, block }) => {
  const [
    blockSummary,
    setBlockSummary
  ] = useState<null | CybexRecord.BlockSummary>(null);
  useEffect(() => {
    fetchBlock(block).then(setBlockSummary);
  }, [block]);
  return blockSummary ? (
    <div style={{ background: Colors.$colorLead }}>
      {asset && asset.get && asset.get("precision") && (
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ height: "24px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    color: `rgba(255, 255, 255, 0.5)`
                  }}
                >
                  {counterpart.translate("edge.records.lockup_value")}:{" "}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: Colors.$colorWhite
                  }}
                >
                  {calcValue(amount, asset.get("precision"))}
                </span>
              </td>
              <td align="right">
                <span
                  style={{
                    fontSize: "14px",
                    color: `rgba(255, 255, 255, 0.5)`
                  }}
                >
                  {counterpart.translate("edge.lockup_period")}:{" "}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: Colors.$colorWhite
                  }}
                >
                  {calcValue(amount, asset.get("precision"))}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ height: "20px" }}>
                <span style={RecordStyles.labelText}>
                  {counterpart.translate("edge.records.period_remain")}:{" "}
                </span>
                <span style={RecordStyles.contentText}>
                  {calcValue(amount, asset.get("precision"))}
                </span>
              </td>
              <td align="right">
                <span style={RecordStyles.labelText}>
                  {counterpart.translate("edge.records.drop_weight")}:{" "}
                </span>
                <span style={RecordStyles.contentText}>
                  {calcValue(amount, asset.get("precision"))}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ height: "20px" }}>
                <span style={RecordStyles.labelText}>
                  {counterpart.translate("edge.records.lockup_from")}:{" "}
                </span>
                <span style={RecordStyles.contentText}>
                  {calcValue(amount, asset.get("precision"))}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {/* {JSON.stringify(asset)}
      {JSON.stringify(blockSummary)} */}
    </div>
  ) : null;
};

EdgeRecord["propTypes"] = {
  asset: ChainTypes.ChainAsset.isRequired
};

EdgeRecord = BindToChainState(EdgeRecord);

let EdgeRecords = ({
  edgeState,
  account,
  history
}: {
  edgeState: EdgeState;
  account;
  history;
}) => {
  useEffect(() => {
    if (!edgeState || !edgeState.info) {
      WalletUnlockActions.unlock()
        .then(() => {
          EdgeActions.queryInfo(account);
        })
        .catch(err => {
          console.error(err);
          history.goBack();
        });
    } else {
      EdgeActions.queryInfo(account);
    }
  }, []);
  return (
    <div className="grid-container">
      {((edgeState.info && edgeState.info[Edge.Fields.records]) || []).map(
        record => (
          <EdgeRecord
            key={record.id}
            block={record.block_num}
            asset={record.op[1].amount.asset_id}
            amount={record.op[1].amount.amount}
            period_in_secs={record.op[1].extensions[0][1].vesting_period}
          />
        )
      )}
    </div>
  );
};
EdgeRecords["propTypes"] = {
  account: ChainTypes.ChainAccount.isRequired
};
EdgeRecords = BindToChainState(EdgeRecords);
EdgeRecords = connect(
  EdgeRecords,
  {
    listenTo() {
      return [AccountStore, RouterStore, EdgeStore];
    },
    getProps() {
      return {
        account: AccountStore.getState().currentAccount,
        edgeState: EdgeStore.getState()
      };
    }
  }
) as any;
export { EdgeRecords };
export default EdgeRecords;
