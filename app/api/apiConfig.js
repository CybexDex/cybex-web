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
const DEFAULT_FAUCET = "http://118.190.209.196:3000";

class ApiNode {
    constructor(url, name) {
        this.url = url;
        this.location = name;
    }
};


const WS_NODE_LIST = [
    new ApiNode("ws://tokyo-01.cybex.io/", "Tokyo"),
    new ApiNode("ws://singapore-01.cybex.io/", "Singapore"),
    new ApiNode("ws://korea-01.cybex.io/", "Korea"),
    new ApiNode("ws://usa-01.cybex.io/", "USA"),
    new ApiNode("ws://chengdou-01.cybex.io/", "Chengdou"),
    new ApiNode("ws://qingdao-01.cybex.io/", "Qingdao"),
    new ApiNode("ws://hangzhou-01.cybex.io/", "Hangzhou"),
    new ApiNode("ws://shenzhen-01.cybex.io/", "Shenzhen"),
    new ApiNode("ws://hongkong-01.cybex.io/", "Hongkong"),
    new ApiNode("ws://121.40.95.24:8090/", "Develop"),
];

export const settingsAPIs = {
    DEFAULT_WS_NODE: BITSHARES_NODE,
    WS_NODE_LIST,
    DEFAULT_FAUCET,
    TESTNET_FAUCET: "http://118.190.209.196:3000",
    RPC_URL: "ws://hongkong-01.cybex.io:8092/api/"
};