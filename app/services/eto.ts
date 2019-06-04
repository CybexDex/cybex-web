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
    records = "records"
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
  export type FullInfo = {
    [Fields.basic]: Info;
    [Fields.accountID]: string;
    [Fields.accountName]: string;
    [Fields.token]: Token;
    [Fields.survey]: Survey;
    [Fields.records]: Records;
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
                new BigNumber(sum).add(next.op[1].amount.amount).toNumber(),
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
