import * as moment from "moment";
import BigNumber from "bignumber.js";
export const zonePoints = [
  { value: 1.35, point: moment("2019-06-30T00:00:00.000Z") },
  { value: 1.23, point: moment("2019-07-14T23:59:59.999Z") }
];
let con = new BigNumber(0.97);
export const calcBonusCoefficient = (moment: moment.Moment, weight: number) => {
  let coefficient = zonePoints.find(v => v.point.isAfter(moment));
  if (!coefficient) {
    return 1;
  }
  return new BigNumber(weight)
    .times(new BigNumber(coefficient.value))
    .times(con)
    .toFixed(2, BigNumber.ROUND_DOWN);
};
