import { CustomTx } from "CustomTx";
import { API_ROOT } from "./GameConfig";

export interface Result {
  code: number;
  data?: any;
  error?: string;
}

export interface LoginBody {
  accountName: string;
  signer: string;
}
export interface LoginRes {
  url: string
}

export async function gameLogin(tx: CustomTx): Promise<LoginRes> {
  return await queryImpl("login", tx).then(res => res.data);
}

export async function gameWithdraw(tx: CustomTx): Promise<LoginBody> {
  return await queryImpl("withdraw", tx).then(res => res.data);
}

async function queryImpl(
  api: string,
  tx: CustomTx
): Promise<Result> {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let init = {
    headers,
    method: "POST",
    body: JSON.stringify(tx)
  };
  return await fetch(`${API_ROOT}${api}`, init)
    .then(res => res.json())
    .catch(e => {
      return {
        code: 400,
        error: e.message
      };
    });
}