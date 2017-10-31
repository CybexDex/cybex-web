function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import assert from "assert";
import { Signature, PublicKey, hash } from "../../ecc";
import { ops } from "../../serializer";
import { Apis, ChainConfig } from 'cybexjs-ws';

import ChainTypes from './ChainTypes';
var head_block_time_string, committee_min_review;

var TransactionBuilder = function () {
    function TransactionBuilder() {
        _classCallCheck(this, TransactionBuilder);

        this.ref_block_num = 0;
        this.ref_block_prefix = 0;
        this.expiration = 0;
        this.operations = [];
        this.signatures = [];
        this.signer_private_keys = [];

        // semi-private method bindings
        this._broadcast = _broadcast.bind(this);
    }

    /**
        @arg {string} name - like "transfer"
        @arg {object} operation - JSON matchching the operation's format
    */

    // todos
    TransactionBuilder.prototype.add_type_operation = function add_type_operation(name, operation) {
        this.add_operation(this.get_type_operation(name, operation));
        return;
    };

    /**
        This does it all: set fees, finalize, sign, and broadcast (if wanted).
         @arg {ConfidentialWallet} cwallet - must be unlocked, used to gather signing keys
         @arg {array<string>} [signer_pubkeys = null] - Optional ["GPHAbc9Def0...", ...].  These are additional signing keys.  Some balance claims require propritary address formats, the witness node can't tell us which ones are needed so they must be passed in.  If the witness node can figure out a signing key (mostly all other transactions), it should not be passed in here.
         @arg {boolean} [broadcast = false]
    */


    TransactionBuilder.prototype.process_transaction = function process_transaction(cwallet) {
        var _this = this;

        var signer_pubkeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


        var wallet_object = cwallet.wallet.wallet_object;
        if (Apis.instance().chain_id !== wallet_object.get("chain_id")) return Promise.reject("Mismatched chain_id; expecting " + wallet_object.get("chain_id") + ", but got " + Apis.instance().chain_id);

        return this.set_required_fees().then(function () {
            var signer_pubkeys_added = {};
            if (signer_pubkeys) {

                // Balance claims are by address, only the private
                // key holder can know about these additional
                // potential keys.
                var pubkeys = cwallet.getPubkeys_having_PrivateKey(signer_pubkeys);
                if (!pubkeys.length) throw new Error("Missing signing key");

                for (var _iterator = pubkeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var pubkey_string = _ref;

                    var private_key = cwallet.getPrivateKey(pubkey_string);
                    _this.add_signer(private_key, pubkey_string);
                    signer_pubkeys_added[pubkey_string] = true;
                }
            }

            return _this.get_potential_signatures().then(function (_ref2) {
                var pubkeys = _ref2.pubkeys,
                    addys = _ref2.addys;

                var my_pubkeys = cwallet.getPubkeys_having_PrivateKey(pubkeys, addys);

                //{//Testing only, don't send All public keys!
                //    var pubkeys_all = PrivateKeyStore.getPubkeys() // All public keys
                //    this.get_required_signatures(pubkeys_all).then( required_pubkey_strings =>
                //        console.log('get_required_signatures all\t',required_pubkey_strings.sort(), pubkeys_all))
                //    this.get_required_signatures(my_pubkeys).then( required_pubkey_strings =>
                //        console.log('get_required_signatures normal\t',required_pubkey_strings.sort(), pubkeys))
                //}

                return _this.get_required_signatures(my_pubkeys).then(function (required_pubkeys) {
                    for (var _iterator2 = required_pubkeys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref3;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref3 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref3 = _i2.value;
                        }

                        var _pubkey_string = _ref3;

                        if (signer_pubkeys_added[_pubkey_string]) continue;
                        var private_key = cwallet.getPrivateKey(_pubkey_string);
                        if (!private_key)
                            // This should not happen, get_required_signatures will only
                            // returned keys from my_pubkeys
                            throw new Error("Missing signing key for " + _pubkey_string);
                        _this.add_signer(private_key, _pubkey_string);
                    }
                });
            }).then(function () {
                return broadcast ? _this.broadcast() : _this.serialize();
            });
        });
    };

    /** Typically this is called automatically just prior to signing.  Once finalized this transaction can not be changed. */


    TransactionBuilder.prototype.finalize = function finalize() {
        var _this2 = this;

        return new Promise(function (resolve, reject) {

            if (_this2.tr_buffer) {
                throw new Error("already finalized");
            }

            resolve(Apis.instance().db_api().exec("get_objects", [["2.1.0"]]).then(function (r) {
                head_block_time_string = r[0].time;
                if (_this2.expiration === 0) _this2.expiration = base_expiration_sec() + ChainConfig.expire_in_secs;
                _this2.ref_block_num = r[0].head_block_number & 0xFFFF;
                _this2.ref_block_prefix = new Buffer(r[0].head_block_id, 'hex').readUInt32LE(4);
                //DEBUG console.log("ref_block",@ref_block_num,@ref_block_prefix,r)

                var iterable = _this2.operations;
                for (var i = 0, op; i < iterable.length; i++) {
                    op = iterable[i];
                    if (op[1]["finalize"]) {
                        op[1].finalize();
                    }
                }
                _this2.tr_buffer = ops.transaction.toBuffer(_this2);
            }));
        });
    };

    /** @return {string} hex transaction ID */


    TransactionBuilder.prototype.id = function id() {
        if (!this.tr_buffer) {
            throw new Error("not finalized");
        }
        return hash.sha256(this.tr_buffer).toString('hex').substring(0, 40);
    };

    /**
        Typically one will use {@link this.add_type_operation} instead.
        @arg {array} operation - [operation_id, operation]
    */


    TransactionBuilder.prototype.add_operation = function add_operation(operation) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        assert(operation, "operation");
        if (!Array.isArray(operation)) {
            throw new Error("Expecting array [operation_id, operation]");
        }
        this.operations.push(operation);
        return;
    };

    TransactionBuilder.prototype.get_type_operation = function get_type_operation(name, operation) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        assert(name, "name");
        assert(operation, "operation");
        var _type = ops[name];
        assert(_type, "Unknown operation " + name);
        var operation_id = ChainTypes.operations[_type.operation_name];
        if (operation_id === undefined) {
            throw new Error("unknown operation: " + _type.operation_name);
        }
        if (!operation.fee) {
            operation.fee = { amount: 0, asset_id: 0 };
        }
        if (name === 'proposal_create') {
            /*
            * Proposals involving the committee account require a review
            * period to be set, look for them here
            */
            var requiresReview = false,
                extraReview = 0;
            operation.proposed_ops.forEach(function (op) {
                var COMMITTE_ACCOUNT = 0;
                var key = void 0;

                switch (op.op[0]) {
                    case 0:
                        // transfer
                        key = "from";
                        break;

                    case 6: //account_update
                    case 17:
                        // asset_settle
                        key = "account";
                        break;

                    case 10: // asset_create
                    case 11: // asset_update
                    case 12: // asset_update_bitasset
                    case 13: // asset_update_feed_producers
                    case 14: // asset_issue
                    case 18: // asset_global_settle
                    case 43:
                        // asset_claim_fees
                        key = "issuer";
                        break;

                    case 15:
                        // asset_reserve
                        key = "payer";
                        break;

                    case 16:
                        // asset_fund_fee_pool
                        key = "from_account";
                        break;

                    case 22: // proposal_create
                    case 23: // proposal_update
                    case 24:
                        // proposal_delete
                        key = "fee_paying_account";
                        break;

                    case 31:
                        // committee_member_update_global_parameters
                        requiresReview = true;
                        extraReview = 60 * 60 * 24 * 13; // Make the review period 2 weeks total
                        break;
                }
                if (key in op.op[1] && op.op[1][key] === COMMITTE_ACCOUNT) {
                    requiresReview = true;
                }
            });
            operation.expiration_time || (operation.expiration_time = base_expiration_sec() + ChainConfig.expire_in_secs_proposal);
            if (requiresReview) {
                operation.review_period_seconds = extraReview + Math.max(committee_min_review, 24 * 60 * 60 || ChainConfig.review_in_secs_committee);
                /*
                * Expiration time must be at least equal to
                * now + review_period_seconds, so we add one hour to make sure
                */
                operation.expiration_time += 60 * 60 + extraReview;
            }
        }
        var operation_instance = _type.fromObject(operation);
        return [operation_id, operation_instance];
    };

    /* optional: fetch the current head block */

    TransactionBuilder.prototype.update_head_block = function update_head_block() {
        return Promise.all([Apis.instance().db_api().exec("get_objects", [["2.0.0"]]), Apis.instance().db_api().exec("get_objects", [["2.1.0"]])]).then(function (res) {
            var g = res[0],
                r = res[1];

            head_block_time_string = r[0].time;
            committee_min_review = g[0].parameters.committee_proposal_review_period;
        });
    };

    /** optional: there is a deafult expiration */


    TransactionBuilder.prototype.set_expire_seconds = function set_expire_seconds(sec) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        return this.expiration = base_expiration_sec() + sec;
    };

    /* Wraps this transaction in a proposal_create transaction */


    TransactionBuilder.prototype.propose = function propose(proposal_create_options) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        if (!this.operations.length) {
            throw new Error("add operation first");
        }

        assert(proposal_create_options, "proposal_create_options");
        assert(proposal_create_options.fee_paying_account, "proposal_create_options.fee_paying_account");

        var proposed_ops = this.operations.map(function (op) {
            return { op: op };
        });

        this.operations = [];
        this.signatures = [];
        this.signer_private_keys = [];
        proposal_create_options.proposed_ops = proposed_ops;
        this.add_type_operation("proposal_create", proposal_create_options);
        return this;
    };

    TransactionBuilder.prototype.has_proposed_operation = function has_proposed_operation() {
        var hasProposed = false;
        for (var i = 0; i < this.operations.length; i++) {
            if ("proposed_ops" in this.operations[i][1]) {
                hasProposed = true;
                break;
            }
        }

        return hasProposed;
    };

    /** optional: the fees can be obtained from the witness node */


    TransactionBuilder.prototype.set_required_fees = function set_required_fees(asset_id) {
        var _this3 = this;

        var fee_pool;
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        if (!this.operations.length) {
            throw new Error("add operations first");
        }
        var operations = [];
        for (var i = 0, op; i < this.operations.length; i++) {
            op = this.operations[i];
            operations.push(ops.operation.toObject(op));
        }

        if (!asset_id) {
            var op1_fee = operations[0][1].fee;
            if (op1_fee && op1_fee.asset_id !== null) {
                asset_id = op1_fee.asset_id;
            } else {
                asset_id = "1.3.0";
            }
        }
        var promises = [Apis.instance().db_api().exec("get_required_fees", [operations, asset_id])];

        var feeAssetPromise = null;
        if (asset_id !== "1.3.0") {
            // This handles the fallback to paying fees in BTS if the fee pool is empty.
            promises.push(Apis.instance().db_api().exec("get_required_fees", [operations, "1.3.0"]));
            promises.push(Apis.instance().db_api().exec("get_objects", [[asset_id]]));
        }

        return Promise.all(promises).then(function (results) {
            var fees = results[0],
                coreFees = results[1],
                asset = results[2];

            asset = asset ? asset[0] : null;

            var dynamicPromise = asset_id !== "1.3.0" && asset ? Apis.instance().db_api().exec("get_objects", [[asset.dynamic_asset_data_id]]) : new Promise(function (resolve, reject) {
                resolve();
            });

            dynamicPromise.then(function (dynamicObject) {
                if (asset_id !== "1.3.0") {
                    fee_pool = dynamicObject ? dynamicObject[0].fee_pool : 0;
                    var totalFees = 0;
                    for (var j = 0, fee; j < coreFees.length; j++) {
                        fee = coreFees[j];
                        totalFees += fee.amount;
                    }

                    if (totalFees > parseInt(fee_pool, 10)) {
                        fees = coreFees;
                        asset_id = "1.3.0";
                    }
                }

                // Proposed transactions need to be flattened
                var flat_assets = [];
                var flatten = function flatten(obj) {
                    if (Array.isArray(obj)) {
                        for (var k = 0, item; k < obj.length; k++) {
                            item = obj[k];
                            flatten(item);
                        }
                    } else {
                        flat_assets.push(obj);
                    }
                    return;
                };
                flatten(fees);

                var asset_index = 0;

                var set_fee = function set_fee(operation) {
                    if (!operation.fee || operation.fee.amount === 0 || operation.fee.amount.toString && operation.fee.amount.toString() === "0" // Long
                    ) {
                            operation.fee = flat_assets[asset_index];
                            // console.log("new operation.fee", operation.fee)
                        } else {
                            // console.log("old operation.fee", operation.fee)
                        }
                    asset_index++;
                    if (operation.proposed_ops) {
                        var result = [];
                        for (var y = 0; y < operation.proposed_ops.length; y++) {
                            result.push(set_fee(operation.proposed_ops[y].op[1]));
                        }return result;
                    }
                };
                for (var _i3 = 0; _i3 < _this3.operations.length; _i3++) {
                    set_fee(_this3.operations[_i3][1]);
                }
            });
            //DEBUG console.log('... get_required_fees',operations,asset_id,flat_assets)
        });
    };

    TransactionBuilder.prototype.get_potential_signatures = function get_potential_signatures() {
        var tr_object = ops.signed_transaction.toObject(this);
        return Promise.all([Apis.instance().db_api().exec("get_potential_signatures", [tr_object]), Apis.instance().db_api().exec("get_potential_address_signatures", [tr_object])]).then(function (results) {
            return { pubkeys: results[0], addys: results[1] };
        });
    };

    TransactionBuilder.prototype.get_required_signatures = function get_required_signatures(available_keys) {
        if (!available_keys.length) {
            return Promise.resolve([]);
        }
        var tr_object = ops.signed_transaction.toObject(this);
        //DEBUG console.log('... tr_object',tr_object)
        return Apis.instance().db_api().exec("get_required_signatures", [tr_object, available_keys]).then(function (required_public_keys) {
            //DEBUG console.log('... get_required_signatures',required_public_keys)
            return required_public_keys;
        });
    };

    TransactionBuilder.prototype.add_signer = function add_signer(private_key) {
        var public_key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : private_key.toPublicKey();


        assert(private_key.d, "required PrivateKey object");

        if (this.signed) {
            throw new Error("already signed");
        }
        if (!public_key.Q) {
            public_key = PublicKey.fromPublicKeyString(public_key);
        }
        // prevent duplicates
        var spHex = private_key.toHex();
        for (var _iterator3 = this.signer_private_keys, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray3) {
                if (_i4 >= _iterator3.length) break;
                _ref4 = _iterator3[_i4++];
            } else {
                _i4 = _iterator3.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var sp = _ref4;

            if (sp[0].toHex() === spHex) return;
        }
        this.signer_private_keys.push([private_key, public_key]);
    };

    TransactionBuilder.prototype.sign = function sign() {
        var chain_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Apis.instance().chain_id;

        if (!this.tr_buffer) {
            throw new Error("not finalized");
        }
        if (this.signed) {
            throw new Error("already signed");
        }
        if (!this.signer_private_keys.length) {
            throw new Error("Transaction was not signed. Do you have a private key? [no_signers]");
        }
        var end = this.signer_private_keys.length;
        for (var i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i++) {
            var _signer_private_keys$ = this.signer_private_keys[i],
                private_key = _signer_private_keys$[0],
                public_key = _signer_private_keys$[1];

            var sig = Signature.signBuffer(Buffer.concat([new Buffer(chain_id, 'hex'), this.tr_buffer]), private_key, public_key);
            this.signatures.push(sig.toBuffer());
        }
        this.signer_private_keys = [];
        this.signed = true;
        return;
    };

    TransactionBuilder.prototype.serialize = function serialize() {
        return ops.signed_transaction.toObject(this);
    };

    TransactionBuilder.prototype.toObject = function toObject() {
        return ops.signed_transaction.toObject(this);
    };

    TransactionBuilder.prototype.broadcast = function broadcast(was_broadcast_callback) {
        var _this4 = this;

        if (this.tr_buffer) {
            return this._broadcast(was_broadcast_callback);
        } else {
            return this.finalize().then(function () {
                return _this4._broadcast(was_broadcast_callback);
            });
        }
    };

    return TransactionBuilder;
}();

var base_expiration_sec = function base_expiration_sec() {
    var head_block_sec = Math.ceil(getHeadBlockDate().getTime() / 1000);
    var now_sec = Math.ceil(Date.now() / 1000);
    // The head block time should be updated every 3 seconds.  If it isn't
    // then help the transaction to expire (use head_block_sec)
    if (now_sec - head_block_sec > 30) {
        return head_block_sec;
    }
    // If the user's clock is very far behind, use the head block time.
    return Math.max(now_sec, head_block_sec);
};

function _broadcast(was_broadcast_callback) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {

        if (!_this5.signed) {
            _this5.sign();
        }
        if (!_this5.tr_buffer) {
            throw new Error("not finalized");
        }
        if (!_this5.signatures.length) {
            throw new Error("not signed");
        }
        if (!_this5.operations.length) {
            throw new Error("no operations");
        }

        var tr_object = ops.signed_transaction.toObject(_this5);
        // console.log('... broadcast_transaction_with_callback !!!')
        Apis.instance().network_api().exec("broadcast_transaction_with_callback", [function (res) {
            return resolve(res);
        }, tr_object]).then(function () {
            //console.log('... broadcast success, waiting for callback')
            if (was_broadcast_callback) was_broadcast_callback();
            return;
        }).catch(function (error) {
            // console.log may be redundant for network errors, other errors could occur
            console.log(error);
            var message = error.message;
            if (!message) {
                message = "";
            }
            reject(new Error(message + "\n" + 'bitshares-crypto ' + ' digest ' + hash.sha256(_this5.tr_buffer).toString('hex') + ' transaction ' + _this5.tr_buffer.toString('hex') + ' ' + JSON.stringify(tr_object)));
            return;
        });
        return;
    });
}

function getHeadBlockDate() {
    return timeStringToDate(head_block_time_string);
}

function timeStringToDate(time_string) {
    if (!time_string) return new Date("1970-01-01T00:00:00.000Z");
    if (!/Z$/.test(time_string)) //does not end in Z
        // https://github.com/cryptonomex/graphene/issues/368
        time_string = time_string + "Z";
    return new Date(time_string);
}

export default TransactionBuilder;