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
  updateAt: string;
};

export class QueryResult implements Result {
  constructor(public data: FundRecordRes, public code = 200) {}
}
export class LoginResult implements Result {
  constructor(public data: LoginBody, public code = 200) {}
}
