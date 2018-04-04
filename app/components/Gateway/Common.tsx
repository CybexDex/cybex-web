import * as React from "react";
import counterpart from "counterpart";
import utils from "lib/common/utils";
import LoadingIndicator from "../LoadingIndicator";

export const CurrentBalance = ({ currentBalance, asset }) => {
  const { name: assetName } = utils.replaceName(asset.get("symbol"), !!asset.get("bitasset"));

  const applyBalanceButton =
    <span style={{ border: "2px solid black", borderLeft: "none" }} className="form-label">{assetName}</span>;

  return (
    <div className="SimpleTrade__withdraw-row" style={{ fontSize: "1rem" }}>
      <label style={{ fontSize: "1rem" }}>
        {counterpart.translate("gateway.balance_asset", { asset: assetName })}:
                <span className="inline-label">
          <input
            disabled
            style={{ color: "white", border: "2px solid black", padding: 10, width: "100%" }}
            value={currentBalance && currentBalance.getAmount ? currentBalance.getAmount({ real: true }) : 0}
          />
          {applyBalanceButton}
        </span>
      </label>
    </div>
  );
}
