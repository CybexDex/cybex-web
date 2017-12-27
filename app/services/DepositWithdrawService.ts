export const getDepositAddress = async (type: string) => {
  let res = await fetch("http://121.40.109.65:7001/api/v1/addresses/new", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      type: "BTC",
      callback: "http://test.com"
    })
  }).then(res => res.json());
  console.debug("RES: ", res);
}