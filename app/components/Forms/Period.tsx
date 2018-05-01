import * as React from "react"; import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import { PeriodSelect, COMMON_PERIODS } from "components/Forms/PeriodSelect";

export type PeriodProps = {
  className?: any;
  disabled?: boolean;
  name: string;
  tabIndex?: number;
  defaultPeriod: number;
  onPeriodChange: (period: number) => any
};

export class Period extends React.Component<PeriodProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      vestingPeriod: this.props.defaultPeriod,
      vestingAmount: this.props.defaultPeriod,
      vestingUnit: 1
    };
    this.getIds = this.getIds.bind(this);
  }

  getIds() {
    return {
      amount: `vestingAmount-${this.props.name}`,
      unit: `vestingUnit-${this.props.name}`
    };
  }

  onVestingChanged(e) {
    let { amount, unit } = this.getIds();
    let { onPeriodChange } = this.props;
    let vestingAmount = (document.getElementById(amount) as HTMLInputElement).value;
    let vestingUnit = (document.getElementById(unit) as HTMLInputElement).value;
    let vestingPeriod = (vestingAmount as any) * (vestingUnit as any);
    onPeriodChange(vestingPeriod);
    this.setState({
      vestingUnit,
      vestingAmount,
      vestingPeriod
    });
  }
  onVestingUnitChanged(e) {
    let { amount, unit } = this.getIds();
    let vestingPeriod = this.state.vestingPeriod
    let vestingUnit = (document.getElementById(unit) as HTMLInputElement).value;
    this.setState({
      vestingAmount: vestingPeriod / (vestingUnit as any),
      vestingUnit
    });
  }
  render() {
    let { tabIndex, className, disabled } = this.props;
    return (
      <div className={className}>
        <input
          tabIndex={tabIndex? tabIndex - 1: -1}
          id={this.getIds().amount}
          name={this.getIds().amount}
          type="number"
          min="0"
          value={this.state.vestingAmount}
          onChange={this.onVestingChanged.bind(this)}
          disabled={disabled}
        />
        <PeriodSelect
          tabIndex={tabIndex? tabIndex - 1: -1}
          id={this.getIds().unit}
          disabled={disabled}          
          name={this.getIds().unit}
          value={this.state.vestingUnit}
          onChange={this.onVestingUnitChanged.bind(this)}
          items={COMMON_PERIODS}
        />
      </div>
    )
  }
}