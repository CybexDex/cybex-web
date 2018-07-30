///<reference types="immutable"  />

declare const __TEST__;
declare const __DEV__;
declare const __GATEWAY_URL__;
declare const __ICOAPE__;
declare namespace ETO {
  type IEORecord = {
    token: string;
    project_id: string;
    project_name: string;
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
  
  type Optional = string | number | null;

  type EtoBase = {
    base_token: string;
    base_min: number;
    accuracy: number;
    rate: number;
    base_token_name: string;
  };
  type ProjectDetail = {
    soft_cap: Optional;
    created_at: string;
    token_name: string;
    lock_at: Optional;
    base_tokens: EtoBase[];
    update_at: string;
    status: "ok";
    close_at: Optional;
    max: number;
    current_user_count: number;
    type: string;
    end_at: string;
    receive_address: string;
    current_token_count: number;
    control_status: "ok";
    start_at: string;
    id: string;
    offer_at: Optional;
    name: string;
    default_base_token: string;
    finish_at: Optional;
    token_count: number;
    token: string;
    deleted: 0;
    score: 0;
    control: string;
    banner: 0;
    is_user_in: "1" ;
    _id: string;
    project: string;
    timestamp: string;
    __v: 0;
    adds_erc20: boolean;
    current_percent: number;
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
