const BITSHARES_NODE = "wss://fake.automatic-selection.com";
const DEFAULT_FAUCET = __TEST__
  ? "http://uatfaucet.51nebula.com"
  : "https://faucet.cybex.io/";

class ApiNode {
  url = "";
  location = "";
  constructor(host, name) {
    // let schema =
    //   location && location.protocol.indexOf("https") !== -1
    //     ? "wss://"
    //     : "wss://";
    let schema = "wss://";
    let url = schema + host;
    this.url = url;
    this.location = name;
  }
}

const WS_NODE_LIST =
  __TEST__ || __FOR_SECURITY__
    ? [new ApiNode("uatfn.51nebula.com/", "UAT")]
    : [
        // new ApiNode("shanghai.51nebula.com/", "shanghai"),
        // new ApiNode("shanghai.51nebula.com/", "Shanghai"),
        // new ApiNode("beijing.51nebula.com/", "Beijing"),
        new ApiNode("hongkong.cybex.io/", "Hongkong"),
        new ApiNode("tokyo-01.cybex.io/", "Tokyo"),
        new ApiNode("singapore-01.cybex.io/", "Singapore"),
        new ApiNode("europe01.cybex.io/", "Europe"),
        new ApiNode("korea-01.cybex.io/", "Korea")
      ];

export const blockTradesAPIs = {
  BASE: "https://api.blocktrades.us/v2",
  BASE_OL: "https://ol-api1.openledger.info/api/v0/ol/support",
  COINS_LIST: "/coins",
  ACTIVE_WALLETS: "/active-wallets",
  TRADING_PAIRS: "/trading-pairs",
  DEPOSIT_LIMIT: "/deposit-limits",
  ESTIMATE_OUTPUT: "/estimate-output-amount",
  ESTIMATE_INPUT: "/estimate-input-amount"
};

export const rudexAPIs = {
  BASE: "https://gateway.rudex.org/api/v0_1",
  COINS_LIST: "/coins",
  NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
};

export const IEO_API = __FOR_SECURITY__
  ? "//eto-pre.cybex.io/api"
  : __STAGING__
  ? "///eto.cybex.io/api"
  : __DEV__ || __TEST__
  ? "https://ieo-apitest.cybex.io/api"
  : "///eto.cybex.io/api";
export const ETO_LOCK = __FOR_SECURITY__
  ? "https://eto-lock.cybex.io/"
  : __STAGING__
  ? "https://eto-lock.cybex.io/"
  : __DEV__ || __TEST__
  ? // ? "https://eto-lock.cybex.io/"
    "http://127.0.0.1:5557/"
  : "https://eto-lock.cybex.io/";
export const EDGE_LOCK = __FOR_SECURITY__
  ? "https://edge-lock.cybex.io/"
  : __STAGING__
  ? "https://edge-lock.cybex.io/"
  : __DEV__ || __TEST__
  ? // ? "https://eto-lock.cybex.io/"
    "https://edge-lock.cybex.io/"
  : // "http://10.18.120.155:5558/"
    // "http://10.18.120.155:5558/"
    "https://edge-lock.cybex.io/";

export const PRICE_API = "https://app.cybex.io/price";

export const settingsAPIs = {
  DEFAULT_WS_NODE: BITSHARES_NODE,
  WS_NODE_LIST,
  DEFAULT_FAUCET,
  TESTNET_FAUCET: DEFAULT_FAUCET,
  RPC_URL: __TEST__
    ? "wss://shenzhen.51nebula.com:8092/api/"
    : "wss://hongkong.cybex.io:8092/api/"
};
