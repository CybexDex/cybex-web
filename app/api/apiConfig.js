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

const TEST_NODE = "ws://121.40.109.65:11011";
const BITSHARES_NODE = "wss://fake.automatic-selection.com";
const DEFAULT_WS_NODE = TEST_NODE;
const DEFAULT_FAUCET = "https://faucet.cybex.io/";

class ApiNode {
    constructor(host, name) {
        let schema = location && location.protocol.indexOf("https") !== -1 ? "wss://" : "wss://";
        let url = schema + host;
        this.url = url;
        this.location = name;
    }
};


const WS_NODE_LIST = [
    new ApiNode("shanghai.51nebula.com/", "Shanghai"),
    new ApiNode("beijing.51nebula.com/", "Beijing"),
    new ApiNode("hongkong.cybex.io/", "Hongkong"),
    new ApiNode("tokyo-01.cybex.io/", "Tokyo"),
    new ApiNode("singapore-01.cybex.io/", "Singapore"),
    new ApiNode("korea-01.cybex.io/", "Korea"),
];

export const settingsAPIs = {
    DEFAULT_WS_NODE: BITSHARES_NODE,
    WS_NODE_LIST,
    DEFAULT_FAUCET,
    TESTNET_FAUCET: "https://faucet.cybex.io",
    RPC_URL: "wss://hongkong.cybex.io:8092/api/"
};