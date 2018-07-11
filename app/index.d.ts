///<reference types="immutable"  />


declare const __TEST__;
declare const __DEV__;
declare namespace IEO {
  type IEORecord = {
    token: string;
    project_id: string;
    block_num: number;
    memo?: string;
    user_id: string;
    created_at: string;
    update_at: string;
    ieo_type: string;
    id: string;
    ieo_status: string;
    trade_num: 0; //block里面的第几个index
    token_count: number;
    reason: string;
  };
  type ProjectDetail = {
    name: string;
    token_name: string;
    status: string;
    control_status: string;
    adds_keyword: string;
    adds_advantage: string;
    adds_website: string;
    adds_detail: string;
    adds_banner: string;
    adds_logo: string;
    adds_token_total: number;
    adds_ico_total: number;
    adds_kyc_require: string;
    adds_erc20: string;
    adds_on_market_time: string;
    type: string;
    base_soft_cap: number;
    base_token_count: string;
    start_at: string;
    end_at: string;
    rate: number;
    base_token_name: string;
    base_min_quota: number;
    base_max_quota: number;
    current_base_token_count: number;
    current_user_count: number;
    current_percent: string;
    finish_at: string;
    all_take_time: string;
    offer_at: string;
    lock_time: string;
    close_at: string;
    token: string;
    base_token: string;
    address_key: string;
    recieve_address: string;
    base_accuracy: number;
  };
}

declare namespace Cybex {
  type AccountProperty =
    | "id"
    | "name"
    | "active"
    | "active_special_authority"
    | "assets"
    | "balances"
    | "blacklisted_accounts";
  type Account = Map<AccountProperty, any>;
}

type Auth = [string, number];
type AccountOptions = {
  memo_key: string;
  num_committee: number;
  num_witness: number;
  votes: any[];
  voting_account: AccountId;
};
type AccountAuth = {
  account_auths: Auth[];
  address_auths: Auth[];
  key_auths: Auth[];
  weight_threshold: number;
};
type AccountId = string;

type Account = {
  active: AccountAuth;
  active_special_authority: any;
  assets: any[];
  balances: { [asset_id: string]: string };
  blacklisted_accounts: AccountId[];
  blacklisting_accounts: AccountId[];
  call_orders: any[];
  history: any[];
  id: AccountId;
  level: 2;
  lifetime_referrer: AccountId;
  lifetime_referrer_fee_percentage: number;
  lifetime_referrer_name: AccountId;
  membership_expiration_date: string;
  name: string;
  network_fee_percentage: number;
  options: AccountOptions;
  orders: any[];
  owner: AccountAuth;
  owner_special_authority: any;
  proposals: any[];
  referrer: AccountId;
  referrer_name: AccountId;
  referrer_rewards_percentage: 0;
  registrar: string;
  registrar_name: AccountId;
  statistics: string;
  top_n_control_flags: number;
  vesting_balances: any[];
  whitelisted_accounts: any[];
  whitelisting_accounts: AccountId[];
};
