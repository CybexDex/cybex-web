export const blockTradesAPIs = {
    BASE: "https://api.blocktrades.us/v2",
    BASE_OL: "https://ol-api1.openledger.info/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "timate-output-amount"
};

export const rudexAPIs = {
    BASE: "https://gateway.rudex.org/api/v0_1",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
};

const TEST_NODE = "ws://121.40.109.65:11011";
const BITSHARES_NODE = "wss://fake.automatic-selection.com";
const DEFAULT_WS_NODE = TEST_NODE;
const DEFAULT_FAUCET = "http://121.40.109.65:3000";

export const settingsAPIs = {
    DEFAULT_WS_NODE,
    WS_NODE_LIST: [
        {url: BITSHARES_NODE, location: {translate: "settings.api_closest"}},
        {url: TEST_NODE, location: "Cybex Test"},
        {url: "ws://121.40.95.24:8090", location: "Cybex Test Node Backup"},
        {url: "ws://127.0.0.1:8090", location: "Locally hosted"},
    ],
    DEFAULT_FAUCET,
    TESTNET_FAUCET: "https://faucet.testnet.bitshares.eu",
    RPC_URL: "ws://121.40.109.65:8092/api/"
};
