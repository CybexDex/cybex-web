import counterpart from "counterpart";

const ERROR_MAP = {
  is_lifetime_member: "is_lifetime_member",
  is_authorized_asset: "is_authorized_asset",
  is_market_issued: "is_market_issued",
  unknown_error: "unknown_error",
  insufficient_balance: "insufficient_balance",
  faucet_is_out_of_money: "faucet_is_out_of_money",
  incorrect_verify_code: "incorrect_verify_code",
  only_one_account: "only_one_account",
  max_supply: "max_supply",
};

const ERROR_LIST = Object.getOwnPropertyNames(ERROR_MAP);

const findKey = (str: string) => {
  for (let key of ERROR_LIST) {
    if (str.indexOf(key) !== -1) return key;
  }
  return null;
};

export const getErrorTrans: (errStr: string | undefined) => string = errStr =>
  !errStr ? null : findKey(errStr.toLowerCase().replace(/\s/g, "_"));
export const getErrorTranslated: (errStr: string | undefined) => string = errStr => {
  let key = getErrorTrans(errStr);
  return key ? counterpart.translate("error_details." + key) : key;
}
  
