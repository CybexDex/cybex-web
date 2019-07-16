import * as React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import { EdgePanel } from "./EdgePanel";
import { Input, Button } from "../Common";
import counterpart from "counterpart";
import { calcValue } from "../../utils/Asset";

const { useState } = React;

type EdgeLockFormProps = {
  balance: string;
  onLock: ({ value, period }: { value: number; period: number }) => void;
};

const BtnPreset = [
  { label: "0.05 BTC", value: 0.05 },
  { label: "0.5 BTC", value: 0.5 },
  { label: "1 BTC", value: 1 }
];
const PeriodPreset = [
  { label: "edge.lockup_period_3", value: 3 },
  { label: "edge.lockup_period_6", value: 6 },
  { label: "edge.lockup_period_12", value: 12 }
];

const EdgeLockFormImpl = ({
  balanceValue,
  onLock
}: {
  balanceValue: number;
  onLock: any;
}) => {
  const [value, setValue] = useState(0);
  const [period, setPeriod] = useState(3);
  const formatter = value =>
    /\.$/.test(value.toString()) ? value : parseFloat(value);
  // const formatter = value => (value ? +(value | 0) : value);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <EdgePanel style={{ marginBottom: "12px" }}>
        <h4
          className="color-steel"
          style={{ marginBottom: "8px", fontSize: "14px" }}
        >
          {counterpart.translate("edge.lockup_period")}
        </h4>
        {/* <div
          className="btn-group"
          style={{ display: "flex", marginTop: "12px" }}
        >
          {PeriodPreset.map((preset, i) => (
            <Button
              style={{
                marginLeft: i === 0 ? 0 : "8px",
                flexBasis: "33%",
                fontSize: "14px"
              }}
              size="small"
              key={preset.value}
              onClick={() => setPeriod(preset.value)}
              type={period === preset.value ? "primary" : "hollow-secondary"}
            >
              {counterpart.translate(preset.label)}
            </Button>
          ))}
        </div> */}
        <h4
          className="color-steel"
          style={{ marginBottom: "8px", fontSize: "14px", marginTop: "12px" }}
        >
          {counterpart.translate("edge.lockup_amount")}
          <small style={{ marginLeft: "12px" }}>
            ({counterpart.translate("edge.lockup_tip")})
          </small>
        </h4>
        <Input
          append="BTC"
          onChange={e => setValue(formatter(e.target.value))}
          type="number"
          value={value}
          style={{ fontSize: "14px" }}
          valueFromOuter
        />
        <div
          className="btn-group"
          style={{ display: "flex", marginTop: "12px" }}
        >
          {BtnPreset.map((preset, i) => (
            <Button
              style={{
                marginLeft: i === 0 ? 0 : "8px",
                flexBasis: "33%",
                fontSize: "14px"
              }}
              size="small"
              key={preset.value}
              onClick={() => setValue(preset.value)}
              type={value === preset.value ? "primary" : "hollow-secondary"}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <h4
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            margin: "12px auto"
          }}
        >
          <span className="color-steel">
            {counterpart.translate("eto_apply.lock.balance")}
          </span>
          <span>{balanceValue} BTC</span>
        </h4>
        <Button
          disabled={value > balanceValue || balanceValue === 0 || !value}
          type="primary"
          style={{ width: "100%" }}
          onClick={() => onLock({ value, period })}
        >
          {counterpart.translate("eto_apply.lock.lock")}
        </Button>
      </EdgePanel>
    </form>
  );
};

let EdgeLockForm = class extends React.Component<EdgeLockFormProps> {
  static propTypes = {
    balance: ChainTypes.ChainAsset
  };

  render() {
    return (
      <EdgeLockFormImpl
        onLock={this.props.onLock}
        balanceValue={+calcValue((this.props.balance as any).get("balance"), 8)}
      />
    );
  }
};
EdgeLockForm = BindToChainState(EdgeLockForm, { keep_updating: true });

const EdgeLockFormWrapper = ({ balance, onLock }: EdgeLockFormProps) =>
  balance ? (
    <EdgeLockForm balance={balance} onLock={onLock} />
  ) : (
    <EdgeLockFormImpl onLock={onLock} balanceValue={0} />
  );

export { EdgeLockFormWrapper as EdgeLockForm };
export default EdgeLockFormWrapper;
