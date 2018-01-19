export const calcAmount =
  (value: string, precision: number) =>
    Math.floor(parseFloat(value) * Math.pow(10, precision));
export const calcValue =
  (amount: number, precision: number, addition: number = 0) =>
    (amount / Math.pow(10, precision) + addition).toPrecision(precision);