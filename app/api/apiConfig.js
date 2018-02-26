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

const BITSHARES_NODE = "wss://fake.automatic-selection.com";
const DEFAULT_FAUCET = "https://faucet.51nebula.com";

class ApiNode {
    constructor(host, name) {
        let schema = location && location.protocol.indexOf("https") !== -1 ? "wss://" : "wss://";
        let url = schema + host;
        this.url = url;
        this.location = name;
    }
};


const WS_NODE_LIST = [
    new ApiNode("hangzhou.51nebula.com/", "Hangzhou"),
    new ApiNode("shenzhen.51nebula.com/", "Shenzhen"),
];

export const settingsAPIs = {
    DEFAULT_WS_NODE: BITSHARES_NODE,
    WS_NODE_LIST,
    DEFAULT_FAUCET,
    TESTNET_FAUCET: "https://faucet.51nebula.com",
    RPC_URL: "wss://shenzhen.51nebula.com:8092/api/"
};