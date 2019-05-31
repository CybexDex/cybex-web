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
      USDT: "https://www.omniexplorer.info/tx/#{txid}",
      ETH: "https://etherscan.io/tx/#{txid}",
      XRP: "https://xrpcharts.ripple.com/#/transactions/#{txid}",
      GAS: "https://neoscan.io/transaction/#{txid}",
      EOS: "https://eosflare.io/tx/#{txid}",
      LTC: "https://chain.so/tx/LTC/#{txid}",
      VET: "https://explore.veforge.com/transactions/#{txid}",
      QTUM: "https://explorer.qtum.org/tx/#{txid}"
    };

export const CONTRACT_URLS = __TEST__
  ? {
      ERC20: "https://kovan.etherscan.io/token/#{contract}"
    }
  : {
      ERC20: "https://etherscan.io/token/#{contract}"
    };

declare const __TEST__;
export const GATEWAY_URI = __TEST__
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
  USDT,
  EOS,
  LTC,
  QTUM,
  NEO,
  XRP,
  COSMOS,
  IRIS,
  VET
}

export class GatewayAssetOptions {
  specificExplorer?: string;
  specificContractExplorer?: string;
  name?: string;
  contractAddress?;
  allowDeposit? = true;
  allowWithdraw? = true;
  isDisabled? = false;
}

export class GatewayAsset {
  static ExplorerAddress = {
    [ProtocolType.BTC]: EXPLORER_URLS.BTC,
    [ProtocolType.USDT]: EXPLORER_URLS.USDT,
    [ProtocolType.ERC20]: EXPLORER_URLS.ETH,
    [ProtocolType.ETH]: EXPLORER_URLS.ETH,
    [ProtocolType.EOS]: EXPLORER_URLS.EOS,
    [ProtocolType.LTC]: EXPLORER_URLS.LTC,
    [ProtocolType.QTUM]: EXPLORER_URLS.QTUM,
    [ProtocolType.XRP]: EXPLORER_URLS.XRP,
    [ProtocolType.NEO]: EXPLORER_URLS.GAS
  };
  static ContractAddress = {
    [ProtocolType.ERC20]: CONTRACT_URLS.ERC20
    // [ProtocolType.NEO]: EXPLORER_URLS.GAS
  };
  isDisabled = false;
  contractExplorer: string;
  allowDeposit = true;
  allowWithdraw = true;
  constructor(
    public asset: string,
    public type: string,
    public protocol: ProtocolType,
    public options: GatewayAssetOptions = new GatewayAssetOptions()
  ) {
    this.contractExplorer = options.contractAddress
      ? this.getExplorerUrlByContract(options.contractAddress)
      : "";
    this.allowDeposit =
      options.allowDeposit !== undefined
        ? options.allowDeposit
        : this.allowDeposit;
    this.allowWithdraw =
      options.allowWithdraw !== undefined
        ? options.allowWithdraw
        : this.allowWithdraw;
    this.isDisabled =
      options.isDisabled !== undefined ? options.isDisabled : this.isDisabled;
  }

  getExplorerUrlByTx(tx: string): string {
    if (!GatewayAsset.ExplorerAddress[this.protocol]) return "";
    try {
      return (
        this.options.specificExplorer ||
        GatewayAsset.ExplorerAddress[this.protocol] ||
        ""
      ).replace("#{txid}", tx);
    } catch {
      return "";
    }
  }
  getExplorerUrlByContract(contractAddress: string): string {
    if (!GatewayAsset.ContractAddress[this.protocol]) return "";
    try {
      return (
        this.options.specificContractExplorer ||
        GatewayAsset.ContractAddress[this.protocol]
      ).replace("#{contract}", contractAddress);
    } catch {
      return "";
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
        "TEST.ETH": new GatewayAsset("TEST.ETH", "ETH", ProtocolType.ETH, {
          name: "Ethereum"
        }),
        "TEST.BTC": new GatewayAsset("TEST.BTC", "BTC", ProtocolType.BTC, {
          name: "Bitcoin"
        }),
        "TEST.VET": new GatewayAsset("TEST.VET", "VET", ProtocolType.ETH, {
          name: "VeChain"
        }),
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
        "TEST.LTC": new GatewayAsset("TEST.LTC", "LTC", ProtocolType.LTC, {
          name: "Litecoin"
        }),
        "TEST.EOS": new GatewayAsset("TEST.EOS", "EOS", ProtocolType.EOS, {
          name: "EOS"
        }),
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
        "JADE.ETH": new GatewayAsset("JADE.ETH", "ETH", ProtocolType.ETH, {
          name: "Ethereum"
        }),
        "JADE.BTC": new GatewayAsset("JADE.BTC", "BTC", ProtocolType.BTC, {
          name: "Bitcoin"
        }),
        "JADE.LTC": new GatewayAsset("JADE.LTC", "LTC", ProtocolType.LTC, {
          name: "Litecoin"
        }),
        "JADE.EOS": new GatewayAsset("JADE.EOS", "EOS", ProtocolType.EOS, {
          name: "EOS"
        }),
        "JADE.XRP": new GatewayAsset("JADE.XRP", "XRP", ProtocolType.XRP, {
          name: "Ripple"
        }),
        "JADE.USDT": new GatewayAsset("JADE.USDT", "USDT", ProtocolType.USDT, {
          name: "Tether"
        }),
        "JADE.LHT": new GatewayAsset("JADE.LHT", "LHT", ProtocolType.ERC20, {
          name: "LongHash"
        }),
        "JADE.INK": new GatewayAsset("JADE.INK", "INK", ProtocolType.ERC20, {
          name: "Ink [QTUM]",
          contractAddress: "0xf4c90e18727c5c76499ea6369c856a6d61d3e92e"
        }),
        "JADE.BAT": new GatewayAsset("JADE.BAT", "BAT", ProtocolType.ERC20, {
          name: "Basic Attention Token",
          contractAddress: "0x0d8775f648430679a709e98d2b0cb6250d2887ef"
        }),
        "JADE.OMG": new GatewayAsset("JADE.OMG", "OMG", ProtocolType.ERC20, {
          name: "OmiseGO",
          contractAddress: "0xd26114cd6ee289accf82350c8d8487fedb8a0c07"
        }),
        "JADE.SNT": new GatewayAsset("JADE.SNT", "SNT", ProtocolType.ERC20, {
          name: "Status",
          contractAddress: "0x744d70fdbe2ba4cf95131626614a1763df805b9e"
        }),
        "JADE.NAS": new GatewayAsset("JADE.NAS", "NAS", ProtocolType.ERC20, {
          name: "Nebulas",
          contractAddress: "0x5d65d971895edc438f465c17db6992698a52318d"
        }),
        "JADE.KNC": new GatewayAsset("JADE.KNC", "KNC", ProtocolType.ERC20, {
          name: "Kyber Network",
          contractAddress: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200"
        }),
        "JADE.PAY": new GatewayAsset("JADE.PAY", "PAY", ProtocolType.ERC20, {
          name: "TenX",
          contractAddress: "0xb97048628db6b661d4c2aa833e95dbe1a905b280"
        }),
        "JADE.GET": new GatewayAsset("JADE.GET", "GET", ProtocolType.ERC20, {
          name: "Global Escrow Token, Themis",
          contractAddress: "0x60c68a87be1e8a84144b543aacfa77199cd3d024"
        }),
        "JADE.MAD": new GatewayAsset("JADE.MAD", "MAD", ProtocolType.ERC20, {
          name: "MAD Network",
          contractAddress: "0x5b09a0371c1da44a8e24d36bf5deb1141a84d875"
        }),
        "JADE.TCT": new GatewayAsset("JADE.TCT", "TCT", ProtocolType.ERC20, {
          name: "TokenClub",
          contractAddress: "0x4824a7b64e3966b0133f4f4ffb1b9d6beb75fff7"
        }),
        "JADE.ATOM": new GatewayAsset(
          "JADE.ATOM",
          "ATOM",
          ProtocolType.COSMOS,
          {
            name: "COSMOS(ATOM)",
            isDisabled: true
          }
        ),
        "JADE.IRIS": new GatewayAsset("JADE.IRIS", "IRIS", ProtocolType.IRIS, {
          name: "IRIS Network (IRIS)"
          // allowWithdraw: false
        }),
        "JADE.RING": new GatewayAsset("JADE.RING", "RING", ProtocolType.ERC20, {
          name: "Evolution Land Global Token",
          contractAddress: "0x9469D013805bFfB7D3DEBe5E7839237e535ec483"
        }),
        "JADE.MXC": new GatewayAsset("JADE.MXC", "MXC", ProtocolType.ERC20, {
          name: "Machine Xchange Coin",
          contractAddress: "0x5Ca381bBfb58f0092df149bD3D243b08B9a8386e"
        }),
        "JADE.CENNZ": new GatewayAsset(
          "JADE.CENNZ",
          "CENNZ",
          ProtocolType.ERC20,
          {
            name: "Centrality",
            contractAddress: "0x1122b6a0e00dce0563082b6e2953f3a943855c1f"
          }
        ),
        "JADE.NASH": new GatewayAsset("JADE.NASH", "NASH", ProtocolType.ERC20, {
          name: "NeoWorld Cash",
          contractAddress: "0x4b94c8567763654101f690cf4d54957206383b75"
        }),
        "JADE.NWT": new GatewayAsset("JADE.NWT", "NWT", ProtocolType.ERC20, {
          name: "NeoWorld Token",
          contractAddress: "0x179201b6d8f1d984fae733313a5035e20d4f4869"
        }),
        "JADE.POLY": new GatewayAsset("JADE.POLY", "POLY", ProtocolType.ERC20, {
          name: "Polymath",
          contractAddress: "0x9992eC3cF6A55b00978cdDF2b27BC6882d88D1eC"
        }),
        "JADE.MCO": new GatewayAsset("JADE.MCO", "MCO", ProtocolType.ERC20, {
          name: "Monaco",
          contractAddress: "0xb63b606ac810a52cca15e44bb630fd42d8d1d83d"
        }),
        "JADE.JCT": new GatewayAsset("JADE.JCT", "JCT", ProtocolType.ERC20, {
          name: "JCT",
          contractAddress: "0x7Fe92EC600F15cD25253b421bc151c51b0276b7D"
        }),
        "JADE.HER": new GatewayAsset("JADE.HER", "HER", ProtocolType.ERC20, {
          name: "Herdius",
          contractAddress: "0x9ae559ac062de221eb5198d90c27e45e85fcaab2"
        }),
        "JADE.CTXC": new GatewayAsset("JADE.CTXC", "CTXC", ProtocolType.ERC20, {
          name: "Cortex",
          contractAddress: "0xea11755ae41d889ceec39a63e6ff75a02bc1c00d"
        }),
        "JADE.NES": new GatewayAsset("JADE.NES", "NES", ProtocolType.ERC20, {
          name: "Genesis Space",
          contractAddress: "0xa74ae2d3a4c3f6d9454634fee91dc7aab6724cf9"
        }),
        "JADE.PPT": new GatewayAsset("JADE.PPT", "PPT", ProtocolType.ERC20, {
          name: "Populous",
          contractAddress: "0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a"
        }),
        "JADE.RHOC": new GatewayAsset("JADE.RHOC", "RHOC", ProtocolType.ERC20, {
          name: "RChain",
          contractAddress: "0x168296bb09e24a88805cb9c33356536b980d3fc5"
        }),
        "JADE.MKR": new GatewayAsset("JADE.MKR", "MKR", ProtocolType.ERC20, {
          name: "Maker",
          contractAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
        }),
        "JADE.FUN": new GatewayAsset("JADE.FUN", "FUN", ProtocolType.ERC20, {
          name: "FunFair",
          contractAddress: "0x419d0d8bdd9af5e606ae2232ed285aff190e711b"
        }),
        "JADE.VET": new GatewayAsset("JADE.VET", "VET", ProtocolType.VET, {
          name: "VeChain"
        }),
        "JADE.MVP": new GatewayAsset("JADE.MVP", "MVP", ProtocolType.ERC20, {
          name: "Merculet",
          contractAddress: "0x8a77e40936bbc27e80e9a3f526368c967869c86d"
        }),
        "JADE.GNT": new GatewayAsset("JADE.GNT", "GNT", ProtocolType.ERC20, {
          name: "Golem",
          contractAddress: "0xa74476443119a942de498590fe1f2454d7d4ac0d"
        }),
        "JADE.DPY": new GatewayAsset("JADE.DPY", "DPY", ProtocolType.ERC20, {
          name: "Delphy",
          contractAddress: "0x6c2adc2073994fb2ccc5032cc2906fa221e9b391"
        }),
        "JADE.GNX": new GatewayAsset("JADE.GNX", "GNX", ProtocolType.ERC20, {
          name: "Genaro Network",
          contractAddress: "0x6ec8a24cabdc339a06a172f8223ea557055adaa5"
        }),
        "JADE.KEY": new GatewayAsset("JADE.KEY", "KEY", ProtocolType.ERC20, {
          name: "Bihu KEY",
          contractAddress: "0x4cd988afbad37289baaf53c13e98e2bd46aaea8c"
        }),
        "JADE.MT": new GatewayAsset("JADE.MT", "MT", ProtocolType.ERC20, {
          name: "MyToken",
          contractAddress: "0x9b4e2b4b13d125238aa0480dd42b4f6fc71b37cc"
        }),
        // "JADE.LST": new GatewayAsset("JADE.LST", "LST", ProtocolType.ETH),
        "JADE.ENG": new GatewayAsset("JADE.ENG", "ENG", ProtocolType.ERC20, {
          name: "Enigma",
          contractAddress: "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4"
        })
      }
    };
