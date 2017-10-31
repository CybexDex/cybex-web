function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import assert from 'assert';
import { ChainConfig } from 'cybexjs-ws';
import { sha256, sha512, ripemd160 } from './hash';
import { encode, decode } from 'bs58';
import deepEqual from "deep-equal";

/** Addresses are shortened non-reversable hashes of a public key.  The full PublicKey is preferred.
    @deprecated
*/

var Address = function () {
    function Address(addy) {
        _classCallCheck(this, Address);

        this.addy = addy;
    }

    Address.fromBuffer = function fromBuffer(buffer) {
        var _hash = sha512(buffer);
        var addy = ripemd160(_hash);
        return new Address(addy);
    };

    Address.fromString = function fromString(string) {
        var address_prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ChainConfig.address_prefix;

        var prefix = string.slice(0, address_prefix.length);
        assert.equal(address_prefix, prefix, 'Expecting key to begin with ' + address_prefix + ', instead got ' + prefix);
        var addy = string.slice(address_prefix.length);
        addy = new Buffer(decode(addy), 'binary');
        var checksum = addy.slice(-4);
        addy = addy.slice(0, -4);
        var new_checksum = ripemd160(addy);
        new_checksum = new_checksum.slice(0, 4);
        var isEqual = deepEqual(checksum, new_checksum); //, 'Invalid checksum'
        if (!isEqual) {
            throw new Error("Checksum did not match");
        }
        return new Address(addy);
    };

    /** @return Address - Compressed PTS format (by default) */
    Address.fromPublic = function fromPublic(public_key) {
        var compressed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 56;

        var sha2 = sha256(public_key.toBuffer(compressed));
        var rep = ripemd160(sha2);
        var versionBuffer = new Buffer(1);
        versionBuffer.writeUInt8(0xFF & version, 0);
        var addr = Buffer.concat([versionBuffer, rep]);
        var check = sha256(addr);
        check = sha256(check);
        var buffer = Buffer.concat([addr, check.slice(0, 4)]);
        return new Address(ripemd160(buffer));
    };

    Address.prototype.toBuffer = function toBuffer() {
        return this.addy;
    };

    Address.prototype.toString = function toString() {
        var address_prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChainConfig.address_prefix;

        var checksum = ripemd160(this.addy);
        var addy = Buffer.concat([this.addy, checksum.slice(0, 4)]);
        return address_prefix + encode(addy);
    };

    return Address;
}();

export default Address;