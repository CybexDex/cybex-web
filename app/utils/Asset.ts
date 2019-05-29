import BigNumber from "bignumber.js";
export const calcAmount = (value: string, precision: number) =>
  Math.floor(parseFloat(value) * Math.pow(10, precision));
export const calcValue = (amount: number, precision: number) =>
  new BigNumber(amount).dividedBy(new BigNumber(10).pow(precision)).toNumber();
