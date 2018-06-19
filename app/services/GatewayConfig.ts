declare var __DEV__;
export const JadePool = __TEST__ ?
  {
    "GATEWAY_ACCOUNT": "jade-gateway",
    // Cybex资产: 外部资产
    "ADDRESS_TYPES": {
      "TEST.ETH": "ETH",
      "TEST.BTC": "BTC",
      // "TEST.EOS": "EOS",
      "TEST.USDT": "USDT",
      "TEST.BAT": "BAT",
      "TEST.VEN": "VEN",
      "TEST.OMG": "OMG",
      "TEST.SNT": "SNT",
      "TEST.NAS": "NAS",
      "TEST.KNC": "KNC",
      "TEST.MT": "MT",
      "TEST.PAY": "PAY",
      "TEST.GET": "GET",
      "TEST.TCT": "TCT",
      // "TEST.GNT": "GNT",
      // "TEST.BTM": "BTM",
      "TEST.DPY": "DPY",
      "TEST.MAD": "MAD",
      "TEST.GNX": "GNX",
      "TEST.KEY": "KEY",
      // "TEST.LST": "LST",
      // "TEST.ENG": "ENG"
    },
    "ADDRESS_ASSETS": {
      "ETH": "TEST.ETH",
      "BTC": "TEST.BTC",
      // ERC20
      // "EOS": "TEST.EOS",
      "USDT": "TEST.USDT",
      "BAT": "TEST.BAT",
      "VEN": "TEST.VEN",
      "OMG": "TEST.OMG",
      "SNT": "TEST.SNT",
      "NAS": "TEST.NAS",
      "KNC": "TEST.KNC",
      "PAY": "TEST.PAY",
      "MT": "TEST.MT",
      "GET": "TEST.GET",
      "MAD": "TEST.MAD",
      "TCT": "TEST.TCT",
      // "GNT": "TEST.GNT",
      // "BTM": "TEST.BTM",
      "DPY": "TEST.DPY",
      "GNX": "TEST.GNX",
      "KEY": "TEST.KEY",
      // "LST": "TEST.LST",
      // "ENG": "TEST.ENG",
    }
  } : {
    "GATEWAY_ACCOUNT": "cybex-jadegateway",
    // Cybex资产: 外部资产
    "ADDRESS_TYPES": {
      "JADE.ETH": "ETH",
      "JADE.BTC": "BTC",
      "JADE.LTC": "LTC",
      // "JADE.EOS": "EOS",
      "JADE.USDT": "USDT",
      "JADE.LHT": "LHT",
      "JADE.INK": "INK",
      "JADE.BAT": "BAT",
      "JADE.VEN": "VEN",
      "JADE.OMG": "OMG",
      "JADE.SNT": "SNT",
      "JADE.NAS": "NAS",
      "JADE.KNC": "KNC",
      "JADE.PAY": "PAY",
      "JADE.GET": "GET",
      "JADE.MAD": "MAD",
      "JADE.TCT": "TCT",
      "JADE.MVP": "MVP",
      // "JADE.ICX": "ICX",
      "JADE.GNT": "GNT",
      // "JADE.BTM": "BTM",
      "JADE.DPY": "DPY",
      "JADE.GNX": "GNX",
      "JADE.KEY": "KEY",
      "JADE.MT": "MT",
      // "JADE.LST": "LST",
      // "JADE.ENG": "ENG"
    },
    "ADDRESS_ASSETS": {
      "ETH": "JADE.ETH",
      "BTC": "JADE.BTC",
      // ERC20
      // "EOS": "JADE.EOS",
      "USDT": "JADE.USDT",
      "LTC": "JADE.LTC",
      "LHT": "JADE.LHT",
      "BAT": "JADE.BAT",
      "INK": "JADE.INK",
      "VEN": "JADE.VEN",
      "OMG": "JADE.OMG",
      "SNT": "JADE.SNT",
      "NAS": "JADE.NAS",
      "KNC": "JADE.KNC",
      "PAY": "JADE.PAY",
      "GET": "JADE.GET",
      "MAD": "JADE.MAD",
      "TCT": "JADE.TCT",
      "MVP": "JADE.MVP",
      // "ICX": "JADE.ICX",
      // "BTM": "JADE.BTM",
      "GNT": "JADE.GNT",
      "DPY": "JADE.DPY",
      "GNX": "JADE.GNX",
      "KEY": "JADE.KEY",
      "MT": "JADE.MT",
      // "LST": "JADE.LST",
      // "ENG": "JADE.ENG"
    }
  };

declare const __TEST__;
export const GATEWAY_URI = __TEST__ ? "https://gatewaytest.cybex.io/gateway" : "https://gateway.cybex.io/gateway";
export const GATEWAY_ID = __TEST__ ? "CybexGatewayDev" : "CybexGateway";

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