export interface Result {
  code: number;
  data?: any;
  error?: string;
}
export interface LoginBody {
  accountName: string;
  signer: string;
}
export interface FundRecordRes {
  total: number;
  records: FundRecordEntry[];
  offset: number;
  size: number;
}

export type FundRecordEntry = {
  accountName: string;
  address: string;
  amount: number;
  asset: string;
  coinType: string;
  fee: number;
  fundType: string;
  state: string;
  hash?: string;
  updateAt: string;
  details: FundRecordDetail[];
};

export type FundRecordDetail = {
  bizType: "WITHDRAW" | "DEPOSIT";
  coinType: string;
  confirmations: number;
  create_at: number;
  data: {};
  extraData: any;
  fee: string;
  from: string;
  hash: string;
  id: string;
  sendAgain: boolean;
  state: string;
  to: string;
  update_at: number;
  value: string;
};

export class QueryResult implements Result {
  constructor(public data: FundRecordRes, public code = 200) {}
}
export class LoginResult implements Result {
  constructor(public data: LoginBody, public code = 200) {}
}
