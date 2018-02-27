declare var __DEV__;
export const JadePool = __DEV__ ? {
  "CYBEX_ACCOUNT": "jadepool",
  // Cybex资产: 外部资产
  "ADDRESS_TYPES": {
    "TEST.ETH": "ETH",
    "TEST.BTC": "BTC"
  }
} : {
    "CYBEX_ACCOUNT": "jadepool",
    // Cybex资产: 外部资产
    "ADDRESS_TYPES": {
      "TEST.ETH": "ETH",
      "TEST.BTC": "BTC"
    }
  };

export const GATEWAY_URI = __DEV__ ? "https://gatewaytest.cybex.io/gateway" : "https://gateway.cybex.io/gateway";
export const GATEWAY_ID = __DEV__ ? "CybexGatewayDev" : "CybexGateway";

export type JadeBody = {
  status: JadeStatus,
  message: string,
  result: JadeBodyResult
};

type JadeBodyResult = {
  id: string,
  state: JadeState,
  coinType: JadeCoinType,
  bizType: JadeBizType,
  to: string,
  value: string,
  fee: number,
  extraData: string,
  create_at: number,
  update_at: number,
  data:
  {
    type: JadeDataType,
    hash: string,
    state: JadeState,
    from: [JadeResultAddress],
    to: [JadeResultAddress],
    fee: number,
    blockNumber: number,
    blockHash: string,
    confirmations: number,
    timestampBegin: number,
    timestampFinish: number
  }
} & {
    type: string,
    address: string,
    state: string
  };

type JadeResultAddress = {
  address: string;
  value: string;
  txid: string | null;
  n: string | null;
};

type JadeState = 'done' | 'pending' | 'init' | 'online' | 'failed';

type JadeBizType = 'DEPOSIT' | 'WITHDRAW';

type JadeCoinType = 'BTC' | 'ETH';

type JadeDataType = 'Bitcoin';

type JadeStatus =
  0 | //成功
  10000 | //必选参数不能为空
  10001 | //系统错误
  10002 | //非法参数
  20000 | //不支持该地址类型
  20001 | //地址错误，首字母不对
  20002 | //地址错误，长度不对
  20000; // 提币地址与类型不匹配

export const CALLBACK_URL = "http://cybex.io";