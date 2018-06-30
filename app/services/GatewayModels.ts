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
  records: any[];
  offset: number;
  size: number;
}
export class QueryResult implements Result {
  constructor(public data: FundRecordRes, public code = 200) {}
}
export class LoginResult implements Result {
  constructor(public data: LoginBody, public code = 200) {}
}
