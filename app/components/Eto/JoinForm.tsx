import * as React from "react";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import { EtoPanel } from "./EtoPanel";
import { Input, Button } from "../Common";
import counterpart from "counterpart";
import { calcValue } from "../../utils/Asset";

const { useState } = React;

type EtoJoinFormProps = { balance: string; onLock: (value: number) => void };

let EtoJoinFormImpl = ({
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
EtoJoinFormImpl = BindToChainState(EtoJoinFormImpl, { keep_updating: true });

let EtoJoinForm = class extends React.Component<EtoJoinFormProps> {
  static propTypes = {
    asset: ChainTypes.ChainAsset.isRequired,
    account: ChainTypes.ChainAccount.isRequired
  };

  render() {
    return (
      <EtoJoinFormImpl
        onLock={this.props.onLock}
        balanceValue={+calcValue((this.props.balance as any).get("balance"), 5)}
      />
    );
  }
};
EtoJoinForm = BindToChainState(EtoJoinForm, { keep_updating: true });

export { EtoJoinForm };
export default EtoJoinForm;
