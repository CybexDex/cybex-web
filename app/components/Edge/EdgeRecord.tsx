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
import { Colors, Icon } from "../Common";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { calcValue } from "../../utils/Asset";
import * as moment from "moment";
import { calcBonusCoefficient } from "./utils";
import { EdgePanel } from "./EdgePanel";
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

const sanitizeDate = (dateStr: string) =>
  dateStr.indexOf("Z") === -1 ? dateStr + "Z" : dateStr;
const calcPeriodFromDuration = (duration: number) => {
  return moment
    .duration(duration, "s")
    .asMonths()
    .toFixed(0);
};

const calcRemainsToDate = (dateStr: string | moment.Moment, unit = "d") => {
  if (!dateStr) {
    return "";
  }
  if (typeof dateStr === "string" && dateStr.indexOf("Z") === -1) {
    dateStr = dateStr + "Z";
  }
  return moment(dateStr)
    .diff(moment(), unit as any)
    .toFixed(0);
};

const calcEndMomentOfLockup = (
  blockSummary: CybexRecord.BlockSummary,
  period_in_secs: number
) => {
  if (!blockSummary || !period_in_secs) return "";
  return moment(sanitizeDate(blockSummary.timestamp)).add(period_in_secs, "s");
};

const DropWeight = {
  3: 1.0,
  6: 1.3,
  12: 2.2
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
    <div
      style={{
        background: Colors.$colorLead,
        padding: "12px",
        marginBottom: "2px"
      }}
    >
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
                  {calcValue(amount, asset.get("precision"))} PCX
                </span>
              </td>
              <td align="right">
                <span
                  style={{
                    fontSize: "14px",
                    color: `rgba(255, 255, 255, 0.5)`
                  }}
                >
                  {counterpart.translate("edge.lockup_period")}
                </span>
                {/* <span
                  style={{
                    fontSize: "14px",
                    color: Colors.$colorWhite
                  }}
                >
                  {counterpart.translate("edge.records.lockup_period", {
                    months: calcPeriodFromDuration(period_in_secs)
                  })}
                </span> */}
              </td>
            </tr>
            <tr>
              <td style={{ height: "20px" }}>
                <span style={RecordStyles.labelText}>
                  {counterpart.translate("edge.records.period_remain")}:{" "}
                </span>
                {counterpart.translate("edge.records.lockup_remains", {
                  days: calcRemainsToDate(
                    calcEndMomentOfLockup(blockSummary, period_in_secs)
                  )
                })}
              </td>
              {/* <td align="right">
                <a
                  href={counterpart.translate("edge.records.drop_weight_url")}
                  target={
                    navigator.userAgent.includes("iPhone") ? "" : "_blank"
                  }
                >
                  <span style={RecordStyles.labelText}>
                    <Icon
                      icon="help"
                      style={{ marginRight: "4px", verticalAlign: "bottom" }}
                    />
                    {counterpart.translate("edge.records.drop_weight")}:
                  </span>
                </a>{" "}
                <span style={RecordStyles.contentText}>
                  {calcBonusCoefficient(
                    moment(sanitizeDate(blockSummary.timestamp)),
                    DropWeight[calcPeriodFromDuration(period_in_secs)]
                  )}
                  {DropWeight[calcPeriodFromDuration(period_in_secs)]}
                </span>
              </td> */}
            </tr>
            <tr>
              <td style={{ height: "20px" }}>
                <span style={RecordStyles.labelText}>
                  {counterpart.translate("edge.records.lockup_from")}:{" "}
                </span>
                <span style={RecordStyles.contentText}>
                  {moment(sanitizeDate(blockSummary.timestamp)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
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
    <div className="grid-container" style={{ padding: "12px 0" }}>
      {((edgeState.info && !edgeState.info[Edge.Fields.records]) ||
        (edgeState.info &&
          edgeState.info[Edge.Fields.records].length === 0)) && (
        <EdgePanel>
          <h4 style={{ textAlign: "center", color: Colors.$colorWhiteOp3 }}>
            {counterpart.translate("edge.records.no_data")}
          </h4>
        </EdgePanel>
      )}
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
