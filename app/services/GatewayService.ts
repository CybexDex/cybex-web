import { JadePool, CALLBACK_URL, JadeBody, GATEWAY_URI, GATEWAY_ID } from "./GatewayConfig";
import { debugGen } from "utils";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

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
// Configure Apollo
const httpLink = new HttpLink({ uri: GATEWAY_URI });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


export async function getDepositInfo(accountName, type: string): Promise<{ address, accountName, type, time }> {
  let mutation = gql`
  mutation Mutation($accountName: String!, $type: String!) {
    newDepositAddress(
      accountName: $accountName,
      asset: $type
    ) {
      address
      account: accountName
      type: asset
      asset: cybexAsset
      timestamp
    }
  }
`;

  return await impl("mutate", {
    mutation,
    variables: { accountName, type },
  }, "newDepositAddress");

};


export async function getWithdrawInfo(type: string): Promise<{ fee, minValue }> {
  let query = gql`
  query WithdrawInfo($type: String!) {
    withdrawInfo(type:$type) {
      fee,
      minValue,
      type,
      gatewayAccount
    }
  }
`;
  return await impl("query", {
    query,
    variables: { type },
  }, "withdrawInfo");
};


export async function verifyAddress(address: string, accountName: string, type: string): Promise<{ valid, error?}> {
  let query = gql`
  query VerifyAddress($type: String!, $accountName: String!, $address: String!) {
    verifyAddress(asset:$type, accountName: $accountName, address: $address) {
      valid,
      asset
    }
  }
`;
  return await impl("query", {
    query,
    variables: { type, accountName, address },
  }, "verifyAddress");
};

async function impl(method: string, params: any, dataName: string) {
  try {
    return (await client[method](params)).data[dataName];
  } catch (error) {
    console.error("GatewayError: ", error);
    throw error;
  }
}


export const GatewayService = {
  getDepositInfo,
  getWithdrawInfo,
  verifyAddress
};
