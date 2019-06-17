import * as React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import { EtoPanel } from "./EtoPanel";
import { Input, Button } from "../Common";
import counterpart from "counterpart";
import { calcValue } from "../../utils/Asset";

const { useState } = React;

type EtoLockFormProps = { balance: string; onLock: (value: number) => void };

const BtnPreset = [
  { label: "5,000CYB", value: 5000 },
  { label: "25,000CYB", value: 25000 },
  { label: "250,000CYB", value: 250000 }
];

const EtoLockFormImpl = ({
  balanceValue,
  onLock
}: {
  balanceValue: number;
  onLock: any;
}) => {
  const [value, setValue] = useState(0);
  const formatter = value => (value ? +(value | 0) : value);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <EtoPanel style={{ marginBottom: "12px" }}>
        <h4 className="color-steel" style={{ marginBottom: "8px" }}>
          {counterpart.translate("eto_apply.amount")}
        </h4>
        <Input
          append="CYB"
          onChange={e => setValue(formatter(e.target.valueAsNumber))}
          type="number"
          value={value}
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
          <span>{balanceValue} CYB</span>
        </h4>
        <Button
          disabled={
            value > balanceValue || balanceValue === 0 || value <= 0 || !value
          }
          type="primary"
          style={{ width: "100%" }}
          onClick={() => onLock(value)}
        >
          {counterpart.translate("eto_apply.lock.lock")}
        </Button>
      </EtoPanel>
    </form>
  );
};

let EtoLockForm = class extends React.Component<EtoLockFormProps> {
  static propTypes = {
    balance: ChainTypes.ChainAsset
  };

  render() {
    return (
      <EtoLockFormImpl
        onLock={this.props.onLock}
        balanceValue={+calcValue((this.props.balance as any).get("balance"), 5)}
      />
    );
  }
};
EtoLockForm = BindToChainState(EtoLockForm, { keep_updating: true });

const EtoLockFormWrapper = ({ balance, onLock }: EtoLockFormProps) =>
  balance ? (
    <EtoLockForm balance={balance} onLock={onLock} />
  ) : (
    <EtoLockFormImpl onLock={onLock} balanceValue={0} />
  );

export { EtoLockFormWrapper as EtoLockForm };
export default EtoLockFormWrapper;
