let _this;

const ADDRESS_PREFIX = "CYB"; // 修改此处会修改包括各种key生成在内的前缀；

const PREFIX_OF_CHAIN = {
    "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8": "BTS",
    "d3011619ed40beb302e3ef32b527fa36b89594d93b885fb226230988b47a12c5": "BTS",
    "a42af4f55e76505b97529e8be59ed549065fb9bf8d2edf2bb3707df231b0e5e0": "CYB",
    "133572a395d5b12c7db7f2d5f0dadd347b68ccbd996defafcb5768954c6d46c5": "CYB",
    "45ad2d3f9ef92a49b55c2227eb06123f613bb35dd08bd876f2aea21925a67a67": "MUSE",
    "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447": "TEST"
};

const Network = class {
    constructor(chain_id, core_asset) {
        this.chain_id = chain_id;
        this.core_asset = core_asset;
    }

    get address_prefix() {
        let _global = global || window || {};
        return _global && _global.localStorage &&
            _global.localStorage.getItem(`PREFIX_${this.chain_id}`) ||
            PREFIX_OF_CHAIN[this.chain_id] ||
            this.core_asset;
    };
};

let ecc_config = {
    address_prefix: ADDRESS_PREFIX
};

_this = {
    core_asset: "CORE",
    address_prefix: ADDRESS_PREFIX,
    expire_in_secs: 15,
    expire_in_secs_proposal: 24 * 60 * 60,
    review_in_secs_committee: 24 * 60 * 60,
    networks: {
        BitShares: new Network(
            "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8",
            "BTS"
        ),
        CybexOpen: new Network(
            "d3011619ed40beb302e3ef32b527fa36b89594d93b885fb226230988b47a12c5",
            "BTS"
        ),
        Cybex: new Network(
            "a42af4f55e76505b97529e8be59ed549065fb9bf8d2edf2bb3707df231b0e5e0",
            ADDRESS_PREFIX
        ),
        Cybex: new Network(
            "90be01e82b981c8f201c9a78a3d31f655743b29ff3274727b1439b093d04aa23",
            ADDRESS_PREFIX
        ),
        CybexTest: new Network(
            "133572a395d5b12c7db7f2d5f0dadd347b68ccbd996defafcb5768954c6d46c5",
            ADDRESS_PREFIX
        ),
        Muse: new Network(
            "45ad2d3f9ef92a49b55c2227eb06123f613bb35dd08bd876f2aea21925a67a67",
            "MUSE"
        ),
        Test: new Network(
            "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447",
            "TEST"
        ),
        Obelisk: {
            core_asset: "GOV",
            address_prefix: "FEW",
            chain_id: "1cfde7c388b9e8ac06462d68aadbd966b58f88797637d9af805b4560b0e9661e"
        }
    },

    /** Set a few properties for known chain IDs. */
    setChainId: function (chain_id) {

        let i, len, network, network_name, ref;
        ref = Object.keys(_this.networks);

        for (i = 0, len = ref.length; i < len; i++) {

            network_name = ref[i];
            network = _this.networks[network_name];

            if (network.chain_id === chain_id) {

                _this.network_name = network_name;

                if (network.address_prefix) {
                    _this.address_prefix = network.address_prefix;
                    ecc_config.address_prefix = network.address_prefix;
                }

                // console.log("INFO    Configured for", network_name, ":", network.address_prefix, "\n");

                return {
                    network_name: network_name,
                    network: network
                };
            }
        }

        if (!_this.network_name) {
            console.log("Unknown chain id (this may be a testnet)", chain_id);
        }

    },

    reset: function () {
        _this.core_asset = "CORE";
        _this.address_prefix = ADDRESS_PREFIX;
        ecc_config.address_prefix = ADDRESS_PREFIX;
        _this.expire_in_secs = 15;
        _this.expire_in_secs_proposal = 24 * 60 * 60;

        console.log("Chain config reset");
    },

    setPrefix: function (prefix = ADDRESS_PREFIX) {
        _this.address_prefix = prefix;
        ecc_config.address_prefix = prefix;
    }
};

export default _this;