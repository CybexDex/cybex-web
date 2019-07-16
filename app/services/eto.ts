import { Serializer, types } from "cybexjs";
import { calcValue } from "../utils/Asset";
import { BigNumber } from "bignumber.js";
const {
  static_variant,
  string,
  time_point_sec,
  array,
  bool,
  optional,
  uint64
} = types;

export namespace Eto {
  export enum Fields {
    basic = "basic",
    accountName = "accountName",
    accountID = "accountID",
    token = "token",
    survey = "survey",
    records = "records",
    result = "result"
  }
  export enum Token {
    CYB = "CYB",
    USDT = "USDT"
  }
  export enum EtoPersonalState {
    Uninit,
    Basic,
    Survey,
    Lock,
    ApplyDone
  }
  export type Info = {
    email: string;
    wechat: string;
    refer: string;
  };
  export type Survey = any[];
  export type Records = any[];
  export type Result = [boolean, boolean, boolean, boolean];
  export type FullInfo = {
    [Fields.basic]: Info;
    [Fields.accountID]: string;
    [Fields.accountName]: string;
    [Fields.token]: Token;
    [Fields.survey]: Survey;
    [Fields.records]: Records;
    [Fields.result]?: Result;
  };
  export type LockApply = { pubKey: string; value: number };
  export type Query = "query";
  export type Ops = Query | Info | Survey | Token | LockApply;
  export enum OpsOrder {
    Query = 0,
    Info,
    Survey,
    Token,
    LockApply
  }
  export interface Request<T = Ops> {
    op: [number, T];
    expiration: number;
  }
  export interface RequestWithSigner<T = Ops> {
    op: [number, T];
    expiration: number;
    signer: string;
  }
  export type Rank = {
    coinAge: [string, number][];
    lock: [string, number][];
    timeStamp: Date;
  };

  export class EtoInfo {
    state: EtoPersonalState = EtoPersonalState.Basic;
    sum = 0;
    info: FullInfo | null = null;
    constructor(info?: FullInfo) {
      if (info) {
        this.info = info;
        if (info[Fields.basic]) {
          this.state = EtoPersonalState.Survey;
        }
        if (info[Fields.survey]) {
          this.state = EtoPersonalState.Lock;
        }
        try {
          this.sum = calcValue(
            (info.records || []).reduce(
              (sum, next) =>
                new BigNumber(sum).add(next.transfer.amount).toNumber(),
              0
            ),
            5
          );
        } catch (e) {
          this.sum = 0;
        }
      }
    }
  }
}

export namespace EtoProject {
  export type Banner = {
    adds_banner: string;
    adds_banner__lang_en: string;
    adds_banner_mobile: string;
    adds_banner_mobile__lang_en: string;
    banner: number; // 排序
    id: string; // 关联项目
    index: number;
  };
  export type SelectedBanner = {
    imgUrl: string;
    projectLink: string;
  };

  export interface ProjectDetail {
    eto_rate: string;
    quote_accuracy: number;
    user_buy_token: string;
    lock_at: null;
    update_at: string;
    base_token: string;
    type: string;
    base_soft_cap: null;
    base_min_quota: number;
    status: string;
    token: string;
    quote_token_count: string;
    receive_address: string;
    offer_at: null;
    current_user_count: number;
    id: string;
    base_token_count: number;
    base_token_name: string;
    finish_at: string;
    close_at: null;
    token_name: string;
    start_at: string;
    token_count: number;
    base_accuracy: number;
    base_max_quota: number;
    end_at: string;
    control_status: string;
    current_base_token_count: number;
    deleted: number;
    created_at: string;
    name: string;
    score: number;
    control: string;
    banner: number;
    is_user_in: string;
    _id: string;
    account: string;
    project: string;
    timestamp: string;
    __v: number;
    parent: string;
    t_total_time: string;
    create_user_type: string;
    adds_logo: string;
    adds_advantage: string;
    adds_advantage__lang_en: string;
    adds_token_total__lang_en: string;
    adds_website__lang_en: string;
    adds_whitepaper: string;
    adds_website: string;
    adds_banner_mobile: string;
    adds_banner__lang_en: string;
    adds_logo_mobile: string;
    adds_keyword: string;
    adds_buy_desc__lang_en: string;
    adds_detail: string;
    adds_buy_desc: string;
    adds_whitepaper__lang_en: string;
    adds_token_total: string;
    adds_logo__lang_en: string;
    adds_keyword__lang_en: string;
    adds_detail__lang_en: string;
    adds_logo_mobile__lang_en: string;
    adds_banner: string;
    adds_banner_mobile__lang_en: string;
    current_percent: number;
    index: number;
    rate: string;
    current_remain_quota_count: number;
  }

  export type UserInStatus = {
    kyc_status: string;
    status: string;
    reason: string;
  };

  export type UserProjectStatus = { current_base_token_count: number };

  export const enum EtoStatus {
    Unstart = "pre",
    Running = "ok",
    Finished = "finish",
    Failed = "fail"
  }
}

const etoOps = {
  Query: string,
  Token: string,
  Survey: array(bool),
  Info: new Serializer("Info", {
    email: string,
    wechat: optional(string),
    refer: optional(string)
  }),
  Lock: new Serializer("LockApply", {
    pubKey: string,
    value: uint64
  })
};

const etoOp = static_variant([
  etoOps.Query,
  etoOps.Info,
  etoOps.Survey,
  etoOps.Token,
  etoOps.Lock
]);
export const etoTx = new Serializer("EtoTx", {
  op: etoOp,
  expiration: time_point_sec
});
export const EtoRefer = "$#ETO_REFER";
// import { Serializer } from "../cybex/serializer";

export namespace EtoOps {
  export enum exchange_owner_permission_flags {
    exchange_allow_quote_to_base = 1 << 0 /** allow get base */,
    exchange_allow_base_to_quote = 1 << 1 /** allow get quote */,
    exchange_allow_deposit_base = 1 << 2 /** allow can deposit base */,
    exchange_allow_withdraw_base = 1 << 3 /** allow can withdraw base */,
    exchange_allow_deposit_quote = 1 << 4 /** allow can deposit quote */,
    exchange_allow_withdraw_quote = 1 << 5 /** allow can withdraw quote */,
    exchange_allow_charge_market_fee = 1 <<
      6 /** allow charge market fee when pays out */,
    exchange_allow_modify_rate = 1 << 7 /** allow modify rate */,
    exchange_allow_only_white_list = 1 <<
      8 /** allow only account in whitelist to participate */
  }

  export const EXCHANGE_OWNER_PERMISSION_MASK =
    exchange_owner_permission_flags.exchange_allow_quote_to_base |
    exchange_owner_permission_flags.exchange_allow_base_to_quote |
    exchange_owner_permission_flags.exchange_allow_deposit_base |
    exchange_owner_permission_flags.exchange_allow_withdraw_base |
    exchange_owner_permission_flags.exchange_allow_deposit_quote |
    exchange_owner_permission_flags.exchange_allow_withdraw_quote |
    exchange_owner_permission_flags.exchange_allow_charge_market_fee |
    exchange_owner_permission_flags.exchange_allow_modify_rate |
    exchange_owner_permission_flags.exchange_allow_only_white_list;
  export enum EtoOpsOrder {
    "create_exchange" = 58,
    "update_exchange" = 59,
    "withdraw_exchange" = 60,
    "deposit_exchange" = 61,
    "remove_exchange" = 62,
    "participate_exchange" = 63
  }
  export type Asset = {
    asset_id: string;
    amount: number | string;
  };
  export type Price = {
    base: Asset;
    quote: Asset;
  };
  export type ExchangeCheckAmount = {
    asset_id: string;
    floor: number;
    ceil: number;
  };
  export type ExchangeVestingPolicyWrapper = {
    policy: any;
  };
  export type ExchangeCheckOnceAmount = ExchangeCheckAmount;
  export type ExchangeCheckDivisible = { divisor: Asset };
  export type Extensions =
    | [0, ExchangeCheckAmount]
    | [1, ExchangeCheckOnceAmount]
    | [2, ExchangeCheckDivisible]
    | [3, ExchangeVestingPolicyWrapper];
  export type ExchangeOptions = {
    rate: Price;
    owner_permissions: number;
    flags: number;
    whitelist_authorities: string[];
    blacklist_authorities: string[];
    extensions: Extensions[];
    description: string;
  };
  export type exchange_create = {
    name: string;
    owner?: string;
    options: ExchangeOptions;
  };
  export type ExchangeObj = exchange_create & {
    id: string;
    dynamic_exchange_data_id: string;
    baseAsset: Cybex.Asset;
    quoteAsset: Cybex.Asset;
  };
  export type ExchangeObjDym = {
    id: string;
    base_balance: string | number;
    base_balance_value: number;
    quote_balance: string | number;
    quote_balance_value: number;
    rate: number;
  };
  export type Exchange = { ex: ExchangeObj; exd: ExchangeObjDym };
  export const DefaultFee = {
    asset_id: "1.3.0",
    amount: 0
  };

  export type exchange_update = {
    owner?: string;
    options: ExchangeOptions;
  };
  export type exchange_withdraw = {
    name: string;
    owner?: string;
    exchange_to_withdraw: string;
    amount: Asset;
  };
  export type exchange_deposit = {
    name: string;
    owner?: string;
    exchange_to_deposit: string;
    amount: Asset;
  };
}
