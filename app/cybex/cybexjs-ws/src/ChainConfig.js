let _this;

const ADDRESS_PREFIX = "CYB"; // 修改此处会修改包括各种key生成在内的前缀；

const PREFIX_OF_CHAIN = {
  "90be01e82b981c8f201c9a78a3d31f655743b29ff3274727b1439b093d04aa23": "CYB",
  "59e27e3883fc5ec4dbff68855f83961303157df9a64a3ecf49982affd8e8d490": "CYB"
};

const Network = class {
  constructor(chain_id, core_asset) {
    this.chain_id = chain_id;
    this.core_asset = core_asset;
  }

  get address_prefix() {
    let _global = global || window || {};
    return (
      (_global &&
        _global.localStorage &&
        _global.localStorage.getItem(`PREFIX_${this.chain_id}`)) ||
      PREFIX_OF_CHAIN[this.chain_id] ||
      this.core_asset
    );
  }
};

let ecc_config = {
  address_prefix: ADDRESS_PREFIX
};

_this = {
  core_asset: "CORE",
  address_prefix: ADDRESS_PREFIX,
  expire_in_secs: 30,
  expire_in_secs_proposal: 24 * 60 * 60,
  review_in_secs_committee: 24 * 60 * 60,
  networks: {
    Cybex: new Network(
      "90be01e82b981c8f201c9a78a3d31f655743b29ff3274727b1439b093d04aa23",
      "CYB"
    ),
    CybexOpen: new Network(
      "59e27e3883fc5ec4dbff68855f83961303157df9a64a3ecf49982affd8e8d490",
      "CYB"
    )
  },

  /** Set a few properties for known chain IDs. */
  setChainId: function(chain_id) {
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

  reset: function() {
    _this.core_asset = "CORE";
    _this.address_prefix = ADDRESS_PREFIX;
    ecc_config.address_prefix = ADDRESS_PREFIX;
    _this.expire_in_secs = 30;
    _this.expire_in_secs_proposal = 24 * 60 * 60;

    console.log("Chain config reset");
  },

  setProposalExpire: function(time) {
    if (!time) return;
    return (_this.expire_in_secs_proposal = time);
  },

  setPrefix: function(prefix = ADDRESS_PREFIX) {
    _this.address_prefix = prefix;
    ecc_config.address_prefix = prefix;
  }
};

export default _this;
