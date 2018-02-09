import * as React from "react";
import Translate from "react-translate-component";

export type PeriodOption = {
  label: string;
  value: any;
  translate?: string;
};

export type PeriodOptions = PeriodOption[];

const SECOND_BASE = 1;
export const COMMON_PERIODS: PeriodOptions = [
  {
    label: "Seconds",
    translate: "period.seconds",
    value: SECOND_BASE * 1
  },
  {
    label: "Minutes",
    translate: "period.minutes",
    value: SECOND_BASE * 60
  },
  {
    label: "Hours",
    translate: "period.hours",
    value: SECOND_BASE * 60 * 60
  },
  {
    label: "Days",
    translate: "period.days",
    value: SECOND_BASE * 60 * 60 * 24
  }
];

type PeriodSelectProps = {
  tabIndex, className?, value, name, id, items, onChange, disabled
};

export const PeriodSelect = ({ disabled ,tabIndex, className, value, name, id, items, onChange }: PeriodSelectProps) => (
  <select disabled={disabled} tabIndex={tabIndex} className={className} value={value} name={name} id={id} onChange={onChange}>
    {
      (items as PeriodOptions).map(item =>
        !item.translate ?
          <option key={item.label} value={item.value} >
            {item.label}
          </option> :
          <Translate component="option" key={item.label} value={item.value} content={item.translate} />
      )
    }
  </select>
);