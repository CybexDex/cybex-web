import * as React from "react";
import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import FormattedAsset from "./FormattedAsset";
import FloatingDropdown from "./FloatingDropdown";
import * as Immutable from "immutable";
import counterpart from "counterpart";
import { Input, TipMark, Colors } from "components/Common";
import { EtoRate } from "../Eto/EtoSelectors";
import utils from "common/utils";

let MultiAmountSelector = class extends React.Component<{
  onChange;
  isNumber?;
  display_balance?;
  asset;
  amount;
  style?;
  label;
  placeholder?;
  tabIndex?;
  disabled?;
  refCallback?;
  labelTooltip?;
  error?;
  rate: EtoRate;
}> {
  static propTypes = {
    label: PropTypes.string, // a translation key for the label
    asset: ChainTypes.ChainAsset.isRequired, // selected asset by default
    assets: PropTypes.array,
    amount: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    tabIndex: PropTypes.number,
    error: PropTypes.string
  };

  static defaultProps = {
    disabled: false
  };

  formatAmount(v) {
    /*// TODO: use asset's precision to format the number*/
    if (!v) v = "";
    if (typeof v === "number") v = v.toString();
    let value = v.trim().replace(/,/g, "");

    return value;
  }

  _onChange(event) {
    let amount = event.target.value;
    this.props.onChange({ amount: amount, asset: this.props.asset });
  }

  onAssetChange(selected_asset) {
    this.props.onChange({ amount: this.props.amount, asset: selected_asset });
  }

  render() {
    let value = this.props.error
      ? counterpart.translate(this.props.error)
      : this.formatAmount(this.props.amount);
    let { isNumber, rate, asset } = this.props;
    return (
      <div className="amount-selector" style={this.props.style}>
        <label className="right-label">{this.props.display_balance}</label>
        <label className="left-label">
          <Translate content={this.props.label} />
          {this.props.labelTooltip && (
            <TipMark id={this.props.labelTooltip.id}>
              {this.props.labelTooltip.component}
            </TipMark>
          )}
        </label>
        <div className="inline-label input-wrapper">
          {isNumber ? (
            <Input
              disabled={this.props.disabled}
              type="number"
              valueFromOuter
              value={value}
              size="small"
              placeholder={this.props.placeholder}
              onChange={this._onChange.bind(this)}
              style={{ width: "100%", marginBottom: 0 }}
            />
          ) : (
            <Input
              disabled={this.props.disabled}
              type="text"
              valueFromOuter
              size="small"
              value={value || ""}
              placeholder={this.props.placeholder}
              onChange={this._onChange.bind(this)}
              style={{ width: "100%", marginBottom: 0 }}
            />
          )}
          <div
            className="form-label select floating-dropdown"
            style={{ marginRight: "12px", color: Colors.$colorWhiteOp8 }}
          >
            {rate.project.token_name} = {rate.convertQuoteToBase(value || 0)}{" "}
            {utils.replaceName(asset.get("symbol")).name}
          </div>
        </div>
      </div>
    );
  }
};
MultiAmountSelector = BindToChainState(MultiAmountSelector);

export default MultiAmountSelector;
