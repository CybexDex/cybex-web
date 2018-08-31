declare var __DEV__;

export const EXPLORER_URLS = __TEST__
  ? {
    BTC: "https://live.blockcypher.com/btc-testnet/tx/#{txid}",
    ETH: "https://kovan.etherscan.io/tx/#{txid}",
    GAS: "https://scan.nel.group/#testnet/transaction/#{txid}",
    LTC: "https://chain.so/tx/LTCTEST/#{txid}",
    QTUM: "https://testnet.qtum.org/tx/#{txid}"
  }
  : {
    BTC: "https://live.blockcypher.com/btc/tx/#{txid}",
    ETH: "https://etherscan.io/tx/#{txid}",
    GAS: "https://neoscan.io/transaction/#{txid}",
    EOS: "https://eosflare.io/tx/#{txid}",
    LTC: "https://chain.so/tx/LTC/#{txid}",
    QTUM: "https://explorer.qtum.org/tx/#{txid}"
  };

declare const __TEST__;
export const GATEWAY_URI =
  __TEST__ || __DEV__
    ? "https://gatewaytest.cybex.io/gateway"
    : "https://gateway.cybex.io/gateway";
export const GATEWAY_QUERY_URI = !__DEV__
  ? "https://gateway-query.cybex.io/"
  : "///localhost:5684/";
export const GATEWAY_ID = __TEST__ ? "CybexGatewayDev" : "CybexGateway";

export type JadeBody = {
  status: JadeStatus;
  message: string;
  result: JadeBodyResult;
};

type JadeBodyResult = {
  id: string;
  state: JadeState;
  coinType: JadeCoinType;
  bizType: JadeBizType;
  to: string;
  value: string;
  fee: number;
  extraData: string;
  create_at: number;
  update_at: number;
  data: {
    type: JadeDataType;
    hash: string;
    state: JadeState;
    from: [JadeResultAddress];
    to: [JadeResultAddress];
    fee: number;
    blockNumber: number;
    blockHash: string;
    confirmations: number;
    timestampBegin: number;
    timestampFinish: number;
  };
} & {
  type: string;
  address: string;
  state: string;
};

type JadeResultAddress = {
  address: string;
  value: string;
  txid: string | null;
  n: string | null;
};

type JadeState = "done" | "pending" | "init" | "online" | "failed";

type JadeBizType = "DEPOSIT" | "WITHDRAW";

type JadeCoinType = "BTC" | "ETH";

type JadeDataType = "Bitcoin";

type JadeStatus =
  | 0 //成功
  | 10000 //必选参数不能为空
  | 10001 //系统错误
  | 10002 //非法参数
  | 20000 //不支持该地址类型
  | 20001 //地址错误，首字母不对
  | 20002 //地址错误，长度不对
  | 20000; // 提币地址与类型不匹配

export const CALLBACK_URL = "http://cybex.io";

export enum ProtocolType {
  ERC20,
  ETH,
  BTC,
  EOS,
  LTC,
  QTUM,
  NEO
}

export class GatewayAssetOptions {
  specificExplorer?;
}

export class GatewayAsset {
  static ExplorerAddress = {
    [ProtocolType.BTC]: EXPLORER_URLS.BTC,
    [ProtocolType.ERC20]: EXPLORER_URLS.ETH,
    [ProtocolType.ETH]: EXPLORER_URLS.ETH,
    [ProtocolType.EOS]: EXPLORER_URLS.EOS,
    [ProtocolType.LTC]: EXPLORER_URLS.LTC,
    [ProtocolType.QTUM]: EXPLORER_URLS.QTUM,
    [ProtocolType.NEO]: EXPLORER_URLS.GAS
  };

  constructor(
    public asset: string,
    public type: string,
    public protocol: ProtocolType,
    public options: GatewayAssetOptions = {}
  ) {}

  getExplorerUrlByTx(tx: string): string | null {
    if (!GatewayAsset.ExplorerAddress[this.protocol]) return null;
    try {
      return (
        this.options.specificExplorer ||
        GatewayAsset.ExplorerAddress[this.protocol].replace("#{txid}", tx)
      );
    } catch {
      return null;
    }
  }
}

export const JadePool: {
  GATEWAY_ACCOUNT: string;
  ADDRESS_TYPES: { [asset: string]: GatewayAsset };
} = __TEST__
  ? {
    GATEWAY_ACCOUNT: "jade-gateway",
      // Cybex资产: 外部资产
    ADDRESS_TYPES: {
      "TEST.ETH": new GatewayAsset("TEST.ETH", "ETH", ProtocolType.ETH),
      "TEST.BTC": new GatewayAsset("TEST.BTC", "BTC", ProtocolType.BTC),
      "TEST.VET": new GatewayAsset("TEST.VET", "VET", ProtocolType.ETH),
        // "TEST.EOS": new GatewayAsset("TEST.EOS", "EOS", ProtocolType.ETH),
      "TEST.USDT": new GatewayAsset("TEST.USDT", "USDT", ProtocolType.BTC),
      "TEST.BAT": new GatewayAsset("TEST.BAT", "BAT", ProtocolType.ETH),
      "TEST.OMG": new GatewayAsset("TEST.OMG", "OMG", ProtocolType.ETH),
      "TEST.SNT": new GatewayAsset("TEST.SNT", "SNT", ProtocolType.ETH),
      "TEST.NAS": new GatewayAsset("TEST.NAS", "NAS", ProtocolType.ETH),
      "TEST.KNC": new GatewayAsset("TEST.KNC", "KNC", ProtocolType.ETH),
      "TEST.MT": new GatewayAsset("TEST.MT", "MT", ProtocolType.ETH),
      "TEST.PAY": new GatewayAsset("TEST.PAY", "PAY", ProtocolType.ETH),
      "TEST.GET": new GatewayAsset("TEST.GET", "GET", ProtocolType.ETH),
      "TEST.TCT": new GatewayAsset("TEST.TCT", "TCT", ProtocolType.ETH),
        // "TEST.SDT": new GatewayAsset("TEST.SDT", "SDT", ProtocolType.ETH),
        // "TEST.GNT": new GatewayAsset("TEST.GNT", "GNT", ProtocolType.ETH),
        // "TEST.BTM": new GatewayAsset("TEST.BTM", "BTM", ProtocolType.ETH),
      "TEST.DPY": new GatewayAsset("TEST.DPY", "DPY", ProtocolType.ETH),
      "TEST.MAD": new GatewayAsset("TEST.MAD", "MAD", ProtocolType.ETH),
      "TEST.GNX": new GatewayAsset("TEST.GNX", "GNX", ProtocolType.ETH),
      "TEST.KEY": new GatewayAsset("TEST.KEY", "KEY", ProtocolType.ETH),
        // "TEST.LST": new GatewayAsset("TEST.LST", "LST", ProtocolType.ETH),
      "TEST.ENG": new GatewayAsset("TEST.ENG", "ENG", ProtocolType.ETH)
    }
  }
  : {
    GATEWAY_ACCOUNT: "cybex-jadegateway",
      // Cybex资产: 外部资产
    ADDRESS_TYPES: {
      "JADE.ETH": new GatewayAsset("JADE.ETH", "ETH", ProtocolType.ETH),
      "JADE.BTC": new GatewayAsset("JADE.BTC", "BTC", ProtocolType.BTC),
      "JADE.LTC": new GatewayAsset("JADE.LTC", "LTC", ProtocolType.LTC),
      "JADE.EOS": new GatewayAsset("JADE.EOS", "EOS", ProtocolType.EOS),
      "JADE.USDT": new GatewayAsset("JADE.USDT", "USDT", ProtocolType.BTC),
      "JADE.LHT": new GatewayAsset("JADE.LHT", "LHT", ProtocolType.ETH),
      "JADE.INK": new GatewayAsset("JADE.INK", "INK", ProtocolType.ETH),
      "JADE.BAT": new GatewayAsset("JADE.BAT", "BAT", ProtocolType.ETH),
      "JADE.OMG": new GatewayAsset("JADE.OMG", "OMG", ProtocolType.ETH),
      "JADE.SNT": new GatewayAsset("JADE.SNT", "SNT", ProtocolType.ETH),
      "JADE.NAS": new GatewayAsset("JADE.NAS", "NAS", ProtocolType.ETH),
      "JADE.KNC": new GatewayAsset("JADE.KNC", "KNC", ProtocolType.ETH),
      "JADE.PAY": new GatewayAsset("JADE.PAY", "PAY", ProtocolType.ETH),
      "JADE.GET": new GatewayAsset("JADE.GET", "GET", ProtocolType.ETH),
      "JADE.MAD": new GatewayAsset("JADE.MAD", "MAD", ProtocolType.ETH),
      "JADE.TCT": new GatewayAsset("JADE.TCT", "TCT", ProtocolType.ETH),
      "JADE.MCO": new GatewayAsset("JADE.MCO", "MCO", ProtocolType.ETH),
      "JADE.JCT": new GatewayAsset("JADE.JCT", "JCT", ProtocolType.ETH),
      "JADE.HER": new GatewayAsset("JADE.HER", "HER", ProtocolType.ETH),
      "JADE.CTXC": new GatewayAsset("JADE.CTXC", "CTXC", ProtocolType.ETH),
      "JADE.NES": new GatewayAsset("JADE.NES", "NES", ProtocolType.ETH),
      "JADE.PPT": new GatewayAsset("JADE.PPT", "PPT", ProtocolType.ETH),
      "JADE.RHOC": new GatewayAsset("JADE.RHOC", "RHOC", ProtocolType.ETH),
      "JADE.MKR": new GatewayAsset("JADE.MKR", "MKR", ProtocolType.ETH),
      "JADE.FUN": new GatewayAsset("JADE.FUN", "FUN", ProtocolType.ETH),
        // "JADE.VEN": new GatewayAsset("JADE.VEN", "VEN", ProtocolType.ETH),
      "JADE.MVP": new GatewayAsset("JADE.MVP", "MVP", ProtocolType.ETH),
        // "JADE.ICX": new GatewayAsset("JADE.ICX", "ICX", ProtocolType.ETH),
      "JADE.GNT": new GatewayAsset("JADE.GNT", "GNT", ProtocolType.ETH),
        // "JADE.NKN": new GatewayAsset("JADE.NKN", "NKN", ProtocolType.ETH),
        // "JADE.BTM": new GatewayAsset("JADE.BTM", "BTM", ProtocolType.ETH),
      "JADE.DPY": new GatewayAsset("JADE.DPY", "DPY", ProtocolType.ETH),
      "JADE.GNX": new GatewayAsset("JADE.GNX", "GNX", ProtocolType.ETH),
      "JADE.KEY": new GatewayAsset("JADE.KEY", "KEY", ProtocolType.ETH),
      "JADE.MT": new GatewayAsset("JADE.MT", "MT", ProtocolType.ETH),
        // "JADE.LST": new GatewayAsset("JADE.LST", "LST", ProtocolType.ETH),
      "JADE.ENG": new GatewayAsset("JADE.ENG", "ENG", ProtocolType.ETH)
    }
  };