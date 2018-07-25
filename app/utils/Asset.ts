import BigNumber from "bignumber.js";
export const calcAmount = (value: string, precision: number) =>
  Math.floor(parseFloat(value) * Math.pow(10, precision));
export const calcValue = (
  amount: number,
  precision: number,
  addition: number = 0
) =>
  new BigNumber(amount)
    .dividedBy(Math.pow(10, precision))
    .plus(addition)
    .toPrecision(precision);
