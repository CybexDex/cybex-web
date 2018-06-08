export * from "./constants";
import { QTB_ASSETS, OPERATIONS } from "./constants";
export const pickPrefix = str =>
  str.indexOf(".") === -1 ? null : str.slice(0, str.indexOf("."));
export const pickContent = (marketSymbol: string, operation, fallback) => {
  if (QTB_ASSETS.has(pickPrefix(marketSymbol))) {
    return OPERATIONS[operation] || fallback;
  }
  return fallback;
};
