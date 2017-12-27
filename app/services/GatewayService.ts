import { JadePool, CALLBACK_URL, JadeBody } from "./GatewayConfig";
import { debugGen } from "utils";

const debug = debugGen("GatewayService");

// Config Headers
const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");

// Convert Params Object to serilized string;
const serilize: (params: { [key: string]: any }) => string =
  params =>
    Object
      .keys(params)
      .reduce((paramsArray, nextParam) =>
        [...paramsArray, `${nextParam}=${params[nextParam]}`], [])
      .join("&");

// Generate common request will be used to communicate with Jadepool
const genRequestInit: (body: any) => RequestInit =
  body => ({
    mode: "cors",
    headers,
    method: "POST",
    body
  });


export async function getDepositAddress(type: string): Promise<string> {
  let originRes: JadeBody =
    await fetch(
      JadePool.API_URLS.GET_NEW_ADDRESS,
      genRequestInit(serilize({
        type,
        callback: CALLBACK_URL
      }))
    ).then(res => res.json());

  if (originRes.status !== 0) {
    throw new Error(originRes.message);
  }
  return originRes.result.address;
};


export const GatewayService = {
  getDepositAddress
};
