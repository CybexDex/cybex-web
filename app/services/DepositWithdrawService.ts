const headers = new Headers();
// headers.set("Content-Type", "text/plain");
headers.set("Content-Type", "application/x-www-form-urlencoded");

export const DEPOSIT_WITHDRAW_TYPES = {
  BTC: "BTC",
  ETH: "ETH"
};

export const getDepositAddress = async (type: string) => {

  let res = await fetch("http://121.40.109.65:7001/api/v1/addresses/new", {
    mode: "cors",
    headers,
    method: "POST",
    body: `type=${type}&callback=http://dex.cybex.io/`
  }).then(res => res.json());

  return res;
}


export const DepositWithdrawService = {
  getDepositAddress
};
