function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import BigInteger from 'bigi';
import { Point, getCurveByName } from 'ecurve';
var secp256k1 = getCurveByName('secp256k1');
import { encode, decode } from 'bs58';
import { sha256, sha512, ripemd160 } from './hash';
import { ChainConfig } from 'cybexjs-ws';
import assert from "assert";
import deepEqual from "deep-equal";

var G = secp256k1.G,
    n = secp256k1.n;

var PublicKey = function () {

    /** @param {Point} public key */
    function PublicKey(Q) {
        _classCallCheck(this, PublicKey);

        this.Q = Q;
    }

    PublicKey.fromBinary = function fromBinary(bin) {
        return PublicKey.fromBuffer(new Buffer(bin, 'binary'));
    };

    PublicKey.fromBuffer = function fromBuffer(buffer) {
        if (buffer.toString('hex') === '000000000000000000000000000000000000000000000000000000000000000000') return new PublicKey(null);
        return new PublicKey(Point.decodeFrom(secp256k1, buffer));
    };

    PublicKey.prototype.toBuffer = function toBuffer() {
        var compressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.Q ? this.Q.compressed : null;

        if (this.Q === null) return new Buffer('000000000000000000000000000000000000000000000000000000000000000000', 'hex');
        return this.Q.getEncoded(compressed);
    };

    PublicKey.fromPoint = function fromPoint(point) {
        return new PublicKey(point);
    };

    PublicKey.prototype.toUncompressed = function toUncompressed() {
        var buf = this.Q.getEncoded(false);
        var point = Point.decodeFrom(secp256k1, buf);
        return PublicKey.fromPoint(point);
    };

    /** bts::blockchain::address (unique but not a full public key) */


    PublicKey.prototype.toBlockchainAddress = function toBlockchainAddress() {
        var pub_buf = this.toBuffer();
        var pub_sha = sha512(pub_buf);
        return ripemd160(pub_sha);
    };

    /** Alias for {@link toPublicKeyString} */


    PublicKey.prototype.toString = function toString() {
        var address_prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChainConfig.address_prefix;

        return this.toPublicKeyString(address_prefix);
    };

    /**
        Full public key
        {return} string
    */


    PublicKey.prototype.toPublicKeyString = function toPublicKeyString() {
        var address_prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChainConfig.address_prefix;

        var pub_buf = this.toBuffer();
        var checksum = ripemd160(pub_buf);
        var addy = Buffer.concat([pub_buf, checksum.slice(0, 4)]);
        return address_prefix + encode(addy);
    };

    /**
        @arg {string} public_key - like GPHXyz...
        @arg {string} address_prefix - like GPH
        @return PublicKey or `null` (if the public_key string is invalid)
    */


    PublicKey.fromPublicKeyString = function fromPublicKeyString(public_key) {
        var address_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ChainConfig.address_prefix;

        try {
            return PublicKey.fromStringOrThrow(public_key, address_prefix);
        } catch (e) {
            return null;
        }
    };

    /**
        @arg {string} public_key - like GPHXyz...
        @arg {string} address_prefix - like GPH
        @throws {Error} if public key is invalid
        @return PublicKey
    */


    PublicKey.fromStringOrThrow = function fromStringOrThrow(public_key) {
        var address_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ChainConfig.address_prefix;

        var prefix = public_key.slice(0, address_prefix.length);
        assert.equal(address_prefix, prefix, 'Expecting key to begin with ' + address_prefix + ', instead got ' + prefix);
        public_key = public_key.slice(address_prefix.length);

        public_key = new Buffer(decode(public_key), 'binary');
        var checksum = public_key.slice(-4);
        public_key = public_key.slice(0, -4);
        var new_checksum = ripemd160(public_key);
        new_checksum = new_checksum.slice(0, 4);
        var isEqual = deepEqual(checksum, new_checksum); //, 'Invalid checksum'
        if (!isEqual) {
            throw new Error("Checksum did not match");
        }
        return PublicKey.fromBuffer(public_key);
    };

    PublicKey.prototype.toAddressString = function toAddressString() {
        var address_prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChainConfig.address_prefix;

        var pub_buf = this.toBuffer();
        var pub_sha = sha512(pub_buf);
        var addy = ripemd160(pub_sha);
        var checksum = ripemd160(addy);
        addy = Buffer.concat([addy, checksum.slice(0, 4)]);
        return address_prefix + encode(addy);
    };

    PublicKey.prototype.toPtsAddy = function toPtsAddy() {
        var pub_buf = this.toBuffer();
        var pub_sha = sha256(pub_buf);
        var addy = ripemd160(pub_sha);
        addy = Buffer.concat([new Buffer([0x38]), addy]); //version 56(decimal)

        var checksum = sha256(addy);
        checksum = sha256(checksum);

        addy = Buffer.concat([addy, checksum.slice(0, 4)]);
        return encode(addy);
    };

    PublicKey.prototype.child = function child(offset) {

        assert(Buffer.isBuffer(offset), "Buffer required: offset");
        assert.equal(offset.length, 32, "offset length");

        offset = Buffer.concat([this.toBuffer(), offset]);
        offset = sha256(offset);

        var c = BigInteger.fromBuffer(offset);

        if (c.compareTo(n) >= 0) throw new Error("Child offset went out of bounds, try again");

        var cG = G.multiply(c);
        var Qprime = this.Q.add(cG);

        if (secp256k1.isInfinity(Qprime)) throw new Error("Child offset derived to an invalid key, try again");

        return PublicKey.fromPoint(Qprime);
    };

    /* <HEX> */

    PublicKey.prototype.toByteBuffer = function toByteBuffer() {
        var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
        this.appendByteBuffer(b);
        return b.copy(0, b.offset);
    };

    PublicKey.fromHex = function fromHex(hex) {
        return PublicKey.fromBuffer(new Buffer(hex, 'hex'));
    };

    PublicKey.prototype.toHex = function toHex() {
        return this.toBuffer().toString('hex');
    };

    PublicKey.fromPublicKeyStringHex = function fromPublicKeyStringHex(hex) {
        return PublicKey.fromPublicKeyString(new Buffer(hex, 'hex'));
    };

    /* </HEX> */


    return PublicKey;
}();

export default PublicKey;