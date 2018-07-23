(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cybexjs-ws"));
	else if(typeof define === 'function' && define.amd)
		define("cybexjs", ["cybexjs-ws"], factory);
	else if(typeof exports === 'object')
		exports["cybexjs"] = factory(require("cybexjs-ws"));
	else
		root["cybexjs"] = factory(root["cybexjs-ws"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var BigInteger = __webpack_require__(23)

//addons
__webpack_require__(43)

module.exports = BigInteger

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha1", function() { return sha1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha512", function() { return sha512; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HmacSHA256", function() { return HmacSHA256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ripemd160", function() { return ripemd160; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_hash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_hash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_create_hash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_create_hmac__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_create_hmac___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_create_hmac__);



/** @arg {string|Buffer} data
    @arg {string} [digest = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when digest is null, or string
*/
function sha1(data, encoding) {
    return __WEBPACK_IMPORTED_MODULE_0_create_hash___default()('sha1').update(data).digest(encoding)
}

/** @arg {string|Buffer} data
    @arg {string} [digest = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when digest is null, or string
*/
function sha256(data, encoding) {
    return __WEBPACK_IMPORTED_MODULE_0_create_hash___default()('sha256').update(data).digest(encoding)
}

/** @arg {string|Buffer} data
    @arg {string} [digest = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when digest is null, or string
*/
function sha512(data, encoding) {
    return __WEBPACK_IMPORTED_MODULE_0_create_hash___default()('sha512').update(data).digest(encoding)
}

function HmacSHA256(buffer, secret) {
    return __WEBPACK_IMPORTED_MODULE_1_create_hmac___default()('sha256', secret).update(buffer).digest()
}

function ripemd160(data) {
    return __WEBPACK_IMPORTED_MODULE_0_create_hash___default()('rmd160').update(data).digest()
}

// function hash160(buffer) {
//   return ripemd160(sha256(buffer))
// }
//
// function hash256(buffer) {
//   return sha256(sha256(buffer))
// }

//
// function HmacSHA512(buffer, secret) {
//   return crypto.createHmac('sha512', secret).update(buffer).digest()
// }




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bigi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ecurve__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ecurve___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ecurve__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bs58__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bs58___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bs58__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_deep_equal__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_deep_equal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_deep_equal__);


const secp256k1 = Object(__WEBPACK_IMPORTED_MODULE_1_ecurve__["getCurveByName"])('secp256k1');






const {G, n} = secp256k1;

class PublicKey {

    /** @param {Point} public key */
    constructor(Q) { this.Q = Q; }

    static fromBinary(bin) {
        return PublicKey.fromBuffer(new Buffer(bin, 'binary'));
    }

    static fromBuffer(buffer) {
        if (buffer.toString('hex') === '000000000000000000000000000000000000000000000000000000000000000000')
            return new PublicKey(null);
        return new PublicKey(__WEBPACK_IMPORTED_MODULE_1_ecurve__["Point"].decodeFrom(secp256k1, buffer));
    }

    toBuffer(compressed = this.Q? this.Q.compressed : null) {
        if (this.Q === null)
            return new Buffer('000000000000000000000000000000000000000000000000000000000000000000', 'hex');
        return this.Q.getEncoded(compressed);
    }

    static fromPoint(point) {
        return new PublicKey(point);
    }

    toUncompressed() {
        var buf = this.Q.getEncoded(false);
        var point = __WEBPACK_IMPORTED_MODULE_1_ecurve__["Point"].decodeFrom(secp256k1, buf);
        return PublicKey.fromPoint(point);
    }

    /** cyb::blockchain::address (unique but not a full public key) */
    toBlockchainAddress() {
        var pub_buf = this.toBuffer();
        var pub_sha = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha512"])(pub_buf);
        return Object(__WEBPACK_IMPORTED_MODULE_3__hash__["ripemd160"])(pub_sha);
    }

    /** Alias for {@link toPublicKeyString} */
    toString(address_prefix = __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__["ChainConfig"].address_prefix) {
        return this.toPublicKeyString(address_prefix)
    }

    /**
        Full public key
        {return} string
    */
    toPublicKeyString(address_prefix = __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__["ChainConfig"].address_prefix) {
        var pub_buf = this.toBuffer();
        var checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["ripemd160"])(pub_buf);
        var addy = Buffer.concat([pub_buf, checksum.slice(0, 4)]);
        return address_prefix + Object(__WEBPACK_IMPORTED_MODULE_2_bs58__["encode"])(addy);
    }

    /**
        @arg {string} public_key - like GPHXyz...
        @arg {string} address_prefix - like GPH
        @return PublicKey or `null` (if the public_key string is invalid)
    */
    static fromPublicKeyString(public_key, address_prefix = __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__["ChainConfig"].address_prefix) {
        try {
            return PublicKey.fromStringOrThrow(public_key, address_prefix)
        } catch (e) {
            return null;
        }
    }

    /**
        @arg {string} public_key - like GPHXyz...
        @arg {string} address_prefix - like GPH
        @throws {Error} if public key is invalid
        @return PublicKey
    */
    static fromStringOrThrow(public_key, address_prefix = __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__["ChainConfig"].address_prefix) {
        var prefix = public_key.slice(0, address_prefix.length);
        __WEBPACK_IMPORTED_MODULE_5_assert___default.a.equal(
            address_prefix, prefix,
            `Expecting key to begin with ${address_prefix}, instead got ${prefix}`);
            public_key = public_key.slice(address_prefix.length);

        public_key = new Buffer(Object(__WEBPACK_IMPORTED_MODULE_2_bs58__["decode"])(public_key), 'binary');
        var checksum = public_key.slice(-4);
        public_key = public_key.slice(0, -4);
        var new_checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["ripemd160"])(public_key);
        new_checksum = new_checksum.slice(0, 4);
        var isEqual = __WEBPACK_IMPORTED_MODULE_6_deep_equal___default()(checksum, new_checksum); //, 'Invalid checksum'
        if (!isEqual) {
            throw new Error("Checksum did not match");
        }
        return PublicKey.fromBuffer(public_key);
    }

    toAddressString(address_prefix = __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__["ChainConfig"].address_prefix) {
        var pub_buf = this.toBuffer();
        var pub_sha = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha512"])(pub_buf);
        var addy = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["ripemd160"])(pub_sha);
        var checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["ripemd160"])(addy);
        addy = Buffer.concat([addy, checksum.slice(0, 4)]);
        console.debug("ADDY: ", addy);
        return address_prefix + Object(__WEBPACK_IMPORTED_MODULE_2_bs58__["encode"])(addy);
    }

    toPtsAddy() {
        var pub_buf = this.toBuffer();
        var pub_sha = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(pub_buf);
        var addy = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["ripemd160"])(pub_sha);
        addy = Buffer.concat([new Buffer([0x38]), addy]); //version 56(decimal)

        var checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(addy);
        checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(checksum);

        addy = Buffer.concat([addy, checksum.slice(0, 4)]);
        return Object(__WEBPACK_IMPORTED_MODULE_2_bs58__["encode"])(addy);
    }

    child( offset ) {

        __WEBPACK_IMPORTED_MODULE_5_assert___default()(Buffer.isBuffer(offset), "Buffer required: offset")
        __WEBPACK_IMPORTED_MODULE_5_assert___default.a.equal(offset.length, 32, "offset length")

        offset = Buffer.concat([ this.toBuffer(), offset ])
        offset = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])( offset )

        let c = __WEBPACK_IMPORTED_MODULE_0_bigi___default.a.fromBuffer( offset )

        if (c.compareTo(n) >= 0)
            throw new Error("Child offset went out of bounds, try again")


        let cG = G.multiply(c)
        let Qprime = this.Q.add(cG)

        if( secp256k1.isInfinity(Qprime) )
            throw new Error("Child offset derived to an invalid key, try again")

        return PublicKey.fromPoint(Qprime)
    }

    /* <HEX> */

    toByteBuffer() {
        var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
        this.appendByteBuffer(b);
        return b.copy(0, b.offset);
    }

    static fromHex(hex) {
        return PublicKey.fromBuffer(new Buffer(hex, 'hex'));
    }

    toHex() {
        return this.toBuffer().toString('hex');
    }

    static fromPublicKeyStringHex(hex) {
        return PublicKey.fromPublicKeyString(new Buffer(hex, 'hex'));
    }

    /* </HEX> */
}


/* harmony default export */ __webpack_exports__["a"] = (PublicKey);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
 Copyright 2013-2014 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
 * Backing buffer / Accessor: node Buffer
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/bytebuffer.js for details
 */
module.exports = (function() {
    "use strict";

    var buffer = __webpack_require__(22),
        Buffer = buffer["Buffer"],
        Long = __webpack_require__(40),
        memcpy = null; try { memcpy = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"memcpy\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())); } catch (e) {}

    /**
     * Constructs a new ByteBuffer.
     * @class The swiss army knife for binary data in JavaScript.
     * @exports ByteBuffer
     * @constructor
     * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @expose
     */
    var ByteBuffer = function(capacity, littleEndian, noAssert) {
        if (typeof capacity === 'undefined')
            capacity = ByteBuffer.DEFAULT_CAPACITY;
        if (typeof littleEndian === 'undefined')
            littleEndian = ByteBuffer.DEFAULT_ENDIAN;
        if (typeof noAssert === 'undefined')
            noAssert = ByteBuffer.DEFAULT_NOASSERT;
        if (!noAssert) {
            capacity = capacity | 0;
            if (capacity < 0)
                throw RangeError("Illegal capacity");
            littleEndian = !!littleEndian;
            noAssert = !!noAssert;
        }

        /**
         * Backing node Buffer.
         * @type {!Buffer}
         * @expose
         */
        this.buffer = capacity === 0 ? EMPTY_BUFFER : new Buffer(capacity);

        /**
         * Absolute read/write offset.
         * @type {number}
         * @expose
         * @see ByteBuffer#flip
         * @see ByteBuffer#clear
         */
        this.offset = 0;

        /**
         * Marked offset.
         * @type {number}
         * @expose
         * @see ByteBuffer#mark
         * @see ByteBuffer#reset
         */
        this.markedOffset = -1;

        /**
         * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
         * @type {number}
         * @expose
         * @see ByteBuffer#flip
         * @see ByteBuffer#clear
         */
        this.limit = capacity;

        /**
         * Whether to use little endian byte order, defaults to `false` for big endian.
         * @type {boolean}
         * @expose
         */
        this.littleEndian = littleEndian;

        /**
         * Whether to skip assertions of offsets and values, defaults to `false`.
         * @type {boolean}
         * @expose
         */
        this.noAssert = noAssert;
    };

    /**
     * ByteBuffer version.
     * @type {string}
     * @const
     * @expose
     */
    ByteBuffer.VERSION = "5.0.1";

    /**
     * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
     * @type {boolean}
     * @const
     * @expose
     */
    ByteBuffer.LITTLE_ENDIAN = true;

    /**
     * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
     * @type {boolean}
     * @const
     * @expose
     */
    ByteBuffer.BIG_ENDIAN = false;

    /**
     * Default initial capacity of `16`.
     * @type {number}
     * @expose
     */
    ByteBuffer.DEFAULT_CAPACITY = 16;

    /**
     * Default endianess of `false` for big endian.
     * @type {boolean}
     * @expose
     */
    ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;

    /**
     * Default no assertions flag of `false`.
     * @type {boolean}
     * @expose
     */
    ByteBuffer.DEFAULT_NOASSERT = false;

    /**
     * A `Long` class for representing a 64-bit two's-complement integer value.
     * @type {!Long}
     * @const
     * @see https://npmjs.org/package/long
     * @expose
     */
    ByteBuffer.Long = Long;

    /**
     * @alias ByteBuffer.prototype
     * @inner
     */
    var ByteBufferPrototype = ByteBuffer.prototype;

    /**
     * An indicator used to reliably determine if an object is a ByteBuffer or not.
     * @type {boolean}
     * @const
     * @expose
     * @private
     */
    ByteBufferPrototype.__isByteBuffer__;

    Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    // helpers

    /**
     * @type {!Buffer}
     * @inner
     */
    var EMPTY_BUFFER = new Buffer(0);

    /**
     * String.fromCharCode reference for compile-time renaming.
     * @type {function(...number):string}
     * @inner
     */
    var stringFromCharCode = String.fromCharCode;

    /**
     * Creates a source function for a string.
     * @param {string} s String to read from
     * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
     *  no more characters left.
     * @throws {TypeError} If the argument is invalid
     * @inner
     */
    function stringSource(s) {
        var i=0; return function() {
            return i < s.length ? s.charCodeAt(i++) : null;
        };
    }

    /**
     * Creates a destination function for a string.
     * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
     *  Returns the final string when called without arguments.
     * @inner
     */
    function stringDestination() {
        var cs = [], ps = []; return function() {
            if (arguments.length === 0)
                return ps.join('')+stringFromCharCode.apply(String, cs);
            if (cs.length + arguments.length > 1024)
                ps.push(stringFromCharCode.apply(String, cs)),
                    cs.length = 0;
            Array.prototype.push.apply(cs, arguments);
        };
    }

    /**
     * Gets the accessor type.
     * @returns {Function} `Buffer` under node.js, `Uint8Array` respectively `DataView` in the browser (classes)
     * @expose
     */
    ByteBuffer.accessor = function() {
        return Buffer;
    };
    /**
     * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
     * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer}
     * @expose
     */
    ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
        return new ByteBuffer(capacity, littleEndian, noAssert);
    };

    /**
     * Concatenates multiple ByteBuffers into one.
     * @param {!Array.<!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string>} buffers Buffers to concatenate
     * @param {(string|boolean)=} encoding String encoding if `buffers` contains a string ("base64", "hex", "binary",
     *  defaults to "utf8")
     * @param {boolean=} littleEndian Whether to use little or big endian byte order for the resulting ByteBuffer. Defaults
     *  to {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values for the resulting ByteBuffer. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} Concatenated ByteBuffer
     * @expose
     */
    ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
        if (typeof encoding === 'boolean' || typeof encoding !== 'string') {
            noAssert = littleEndian;
            littleEndian = encoding;
            encoding = undefined;
        }
        var capacity = 0;
        for (var i=0, k=buffers.length, length; i<k; ++i) {
            if (!ByteBuffer.isByteBuffer(buffers[i]))
                buffers[i] = ByteBuffer.wrap(buffers[i], encoding);
            length = buffers[i].limit - buffers[i].offset;
            if (length > 0) capacity += length;
        }
        if (capacity === 0)
            return new ByteBuffer(0, littleEndian, noAssert);
        var bb = new ByteBuffer(capacity, littleEndian, noAssert),
            bi;
        i=0; while (i<k) {
            bi = buffers[i++];
            length = bi.limit - bi.offset;
            if (length <= 0) continue;
            bi.buffer.copy(bb.buffer, bb.offset, bi.offset, bi.limit);
            bb.offset += length;
        }
        bb.limit = bb.offset;
        bb.offset = 0;
        return bb;
    };

    /**
     * Tests if the specified type is a ByteBuffer.
     * @param {*} bb ByteBuffer to test
     * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
     * @expose
     */
    ByteBuffer.isByteBuffer = function(bb) {
        return (bb && bb["__isByteBuffer__"]) === true;
    };
    /**
     * Gets the backing buffer type.
     * @returns {Function} `Buffer` under node.js, `ArrayBuffer` in the browser (classes)
     * @expose
     */
    ByteBuffer.type = function() {
        return Buffer;
    };
    /**
     * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
     *  {@link ByteBuffer#limit} to the length of the wrapped data.
     * @param {!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
     * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
     *  "utf8")
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
     * @expose
     */
    ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
        if (typeof encoding !== 'string') {
            noAssert = littleEndian;
            littleEndian = encoding;
            encoding = undefined;
        }
        if (typeof buffer === 'string') {
            if (typeof encoding === 'undefined')
                encoding = "utf8";
            switch (encoding) {
                case "base64":
                    return ByteBuffer.fromBase64(buffer, littleEndian);
                case "hex":
                    return ByteBuffer.fromHex(buffer, littleEndian);
                case "binary":
                    return ByteBuffer.fromBinary(buffer, littleEndian);
                case "utf8":
                    return ByteBuffer.fromUTF8(buffer, littleEndian);
                case "debug":
                    return ByteBuffer.fromDebug(buffer, littleEndian);
                default:
                    throw Error("Unsupported encoding: "+encoding);
            }
        }
        if (buffer === null || typeof buffer !== 'object')
            throw TypeError("Illegal buffer");
        var bb;
        if (ByteBuffer.isByteBuffer(buffer)) {
            bb = ByteBufferPrototype.clone.call(buffer);
            bb.markedOffset = -1;
            return bb;
        }
        var i = 0,
            k = 0,
            b;
        if (buffer instanceof Uint8Array) { // Extract bytes from Uint8Array
            b = new Buffer(buffer.length);
            if (memcpy) { // Fast
                memcpy(b, 0, buffer.buffer, buffer.byteOffset, buffer.byteOffset + buffer.length);
            } else { // Slow
                for (i=0, k=buffer.length; i<k; ++i)
                    b[i] = buffer[i];
            }
            buffer = b;
        } else if (buffer instanceof ArrayBuffer) { // Convert ArrayBuffer to Buffer
            b = new Buffer(buffer.byteLength);
            if (memcpy) { // Fast
                memcpy(b, 0, buffer, 0, buffer.byteLength);
            } else { // Slow
                buffer = new Uint8Array(buffer);
                for (i=0, k=buffer.length; i<k; ++i) {
                    b[i] = buffer[i];
                }
            }
            buffer = b;
        } else if (!(buffer instanceof Buffer)) { // Create from octets if it is an error, otherwise fail
            if (Object.prototype.toString.call(buffer) !== "[object Array]")
                throw TypeError("Illegal buffer");
            buffer = new Buffer(buffer);
        }
        bb = new ByteBuffer(0, littleEndian, noAssert);
        if (buffer.length > 0) { // Avoid references to more than one EMPTY_BUFFER
            bb.buffer = buffer;
            bb.limit = buffer.length;
        }
        return bb;
    };

    /**
     * Writes the array as a bitset.
     * @param {Array<boolean>} value Array of booleans to write
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
     * @returns {!ByteBuffer}
     * @expose
     */
    ByteBufferPrototype.writeBitSet = function(value, offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;
      if (!this.noAssert) {
        if (!(value instanceof Array))
          throw TypeError("Illegal BitSet: Not an array");
        if (typeof offset !== 'number' || offset % 1 !== 0)
            throw TypeError("Illegal offset: "+offset+" (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.length)
            throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
      }

      var start = offset,
          bits = value.length,
          bytes = (bits >> 3),
          bit = 0,
          k;

      offset += this.writeVarint32(bits,offset);

      while(bytes--) {
        k = (!!value[bit++] & 1) |
            ((!!value[bit++] & 1) << 1) |
            ((!!value[bit++] & 1) << 2) |
            ((!!value[bit++] & 1) << 3) |
            ((!!value[bit++] & 1) << 4) |
            ((!!value[bit++] & 1) << 5) |
            ((!!value[bit++] & 1) << 6) |
            ((!!value[bit++] & 1) << 7);
        this.writeByte(k,offset++);
      }

      if(bit < bits) {
        var m = 0; k = 0;
        while(bit < bits) k = k | ((!!value[bit++] & 1) << (m++));
        this.writeByte(k,offset++);
      }

      if (relative) {
        this.offset = offset;
        return this;
      }
      return offset - start;
    }

    /**
     * Reads a BitSet as an array of booleans.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
     * @returns {Array<boolean>
     * @expose
     */
    ByteBufferPrototype.readBitSet = function(offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      var ret = this.readVarint32(offset),
          bits = ret.value,
          bytes = (bits >> 3),
          bit = 0,
          value = [],
          k;

      offset += ret.length;

      while(bytes--) {
        k = this.readByte(offset++);
        value[bit++] = !!(k & 0x01);
        value[bit++] = !!(k & 0x02);
        value[bit++] = !!(k & 0x04);
        value[bit++] = !!(k & 0x08);
        value[bit++] = !!(k & 0x10);
        value[bit++] = !!(k & 0x20);
        value[bit++] = !!(k & 0x40);
        value[bit++] = !!(k & 0x80);
      }

      if(bit < bits) {
        var m = 0;
        k = this.readByte(offset++);
        while(bit < bits) value[bit++] = !!((k >> (m++)) & 1);
      }

      if (relative) {
        this.offset = offset;
      }
      return value;
    }
    /**
     * Reads the specified number of bytes.
     * @param {number} length Number of bytes to read
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
     * @returns {!ByteBuffer}
     * @expose
     */
    ByteBufferPrototype.readBytes = function(length, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + length > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.length);
        }
        var slice = this.slice(offset, offset + length);
        if (relative) this.offset += length;
        return slice;
    };

    /**
     * Writes a payload of bytes. This is an alias of {@link ByteBuffer#append}.
     * @function
     * @param {!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string} source Data to write. If `source` is a ByteBuffer, its
     * offsets will be modified according to the performed read operation.
     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;

    // types/ints/int8

    /**
     * Writes an 8bit signed integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeInt8 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 1;
        var capacity0 = this.buffer.length;
        if (offset > capacity0)
            this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
        offset -= 1;
        this.buffer[offset] = value;
        if (relative) this.offset += 1;
        return this;
    };

    /**
     * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;

    /**
     * Reads an 8bit signed integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readInt8 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.length);
        }
        var value = this.buffer[offset];
        if ((value & 0x80) === 0x80) value = -(0xFF - value + 1); // Cast to signed
        if (relative) this.offset += 1;
        return value;
    };

    /**
     * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;

    /**
     * Writes an 8bit unsigned integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeUint8 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value >>>= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 1;
        var capacity1 = this.buffer.length;
        if (offset > capacity1)
            this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
        offset -= 1;
        this.buffer[offset] = value;
        if (relative) this.offset += 1;
        return this;
    };

    /**
     * Writes an 8bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint8}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;

    /**
     * Reads an 8bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUint8 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.length);
        }
        var value = this.buffer[offset];
        if (relative) this.offset += 1;
        return value;
    };

    /**
     * Reads an 8bit unsigned integer. This is an alias of {@link ByteBuffer#readUint8}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;

    // types/ints/int16

    /**
     * Writes a 16bit signed integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeInt16 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 2;
        var capacity2 = this.buffer.length;
        if (offset > capacity2)
            this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
        offset -= 2;
        if (this.littleEndian) {
            this.buffer[offset+1] = (value & 0xFF00) >>> 8;
            this.buffer[offset  ] =  value & 0x00FF;
        } else {
            this.buffer[offset]   = (value & 0xFF00) >>> 8;
            this.buffer[offset+1] =  value & 0x00FF;
        }
        if (relative) this.offset += 2;
        return this;
    };

    /**
     * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;

    /**
     * Reads a 16bit signed integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readInt16 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 2 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.length);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.buffer[offset  ];
            value |= this.buffer[offset+1] << 8;
        } else {
            value  = this.buffer[offset  ] << 8;
            value |= this.buffer[offset+1];
        }
        if ((value & 0x8000) === 0x8000) value = -(0xFFFF - value + 1); // Cast to signed
        if (relative) this.offset += 2;
        return value;
    };

    /**
     * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;

    /**
     * Writes a 16bit unsigned integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeUint16 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value >>>= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 2;
        var capacity3 = this.buffer.length;
        if (offset > capacity3)
            this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
        offset -= 2;
        if (this.littleEndian) {
            this.buffer[offset+1] = (value & 0xFF00) >>> 8;
            this.buffer[offset  ] =  value & 0x00FF;
        } else {
            this.buffer[offset]   = (value & 0xFF00) >>> 8;
            this.buffer[offset+1] =  value & 0x00FF;
        }
        if (relative) this.offset += 2;
        return this;
    };

    /**
     * Writes a 16bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint16}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @throws {TypeError} If `offset` or `value` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;

    /**
     * Reads a 16bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readUint16 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 2 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.length);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.buffer[offset  ];
            value |= this.buffer[offset+1] << 8;
        } else {
            value  = this.buffer[offset  ] << 8;
            value |= this.buffer[offset+1];
        }
        if (relative) this.offset += 2;
        return value;
    };

    /**
     * Reads a 16bit unsigned integer. This is an alias of {@link ByteBuffer#readUint16}.
     * @function
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
     * @returns {number} Value read
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @expose
     */
    ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;

    // types/ints/int32

    /**
     * Writes a 32bit signed integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeInt32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 4;
        var capacity4 = this.buffer.length;
        if (offset > capacity4)
            this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
        offset -= 4;
        if (this.littleEndian) {
            this.buffer[offset+3] = (value >>> 24) & 0xFF;
            this.buffer[offset+2] = (value >>> 16) & 0xFF;
            this.buffer[offset+1] = (value >>>  8) & 0xFF;
            this.buffer[offset  ] =  value         & 0xFF;
        } else {
            this.buffer[offset  ] = (value >>> 24) & 0xFF;
            this.buffer[offset+1] = (value >>> 16) & 0xFF;
            this.buffer[offset+2] = (value >>>  8) & 0xFF;
            this.buffer[offset+3] =  value         & 0xFF;
        }
        if (relative) this.offset += 4;
        return this;
    };

    /**
     * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;

    /**
     * Reads a 32bit signed integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readInt32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.length);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.buffer[offset+2] << 16;
            value |= this.buffer[offset+1] <<  8;
            value |= this.buffer[offset  ];
            value += this.buffer[offset+3] << 24 >>> 0;
        } else {
            value  = this.buffer[offset+1] << 16;
            value |= this.buffer[offset+2] <<  8;
            value |= this.buffer[offset+3];
            value += this.buffer[offset  ] << 24 >>> 0;
        }
        value |= 0; // Cast to signed
        if (relative) this.offset += 4;
        return value;
    };

    /**
     * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
     * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;

    /**
     * Writes a 32bit unsigned integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeUint32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value >>>= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 4;
        var capacity5 = this.buffer.length;
        if (offset > capacity5)
            this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
        offset -= 4;
        if (this.littleEndian) {
            this.buffer[offset+3] = (value >>> 24) & 0xFF;
            this.buffer[offset+2] = (value >>> 16) & 0xFF;
            this.buffer[offset+1] = (value >>>  8) & 0xFF;
            this.buffer[offset  ] =  value         & 0xFF;
        } else {
            this.buffer[offset  ] = (value >>> 24) & 0xFF;
            this.buffer[offset+1] = (value >>> 16) & 0xFF;
            this.buffer[offset+2] = (value >>>  8) & 0xFF;
            this.buffer[offset+3] =  value         & 0xFF;
        }
        if (relative) this.offset += 4;
        return this;
    };

    /**
     * Writes a 32bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint32}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @expose
     */
    ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;

    /**
     * Reads a 32bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUint32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.length);
        }
        var value = 0;
        if (this.littleEndian) {
            value  = this.buffer[offset+2] << 16;
            value |= this.buffer[offset+1] <<  8;
            value |= this.buffer[offset  ];
            value += this.buffer[offset+3] << 24 >>> 0;
        } else {
            value  = this.buffer[offset+1] << 16;
            value |= this.buffer[offset+2] <<  8;
            value |= this.buffer[offset+3];
            value += this.buffer[offset  ] << 24 >>> 0;
        }
        if (relative) this.offset += 4;
        return value;
    };

    /**
     * Reads a 32bit unsigned integer. This is an alias of {@link ByteBuffer#readUint32}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number} Value read
     * @expose
     */
    ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;

    // types/ints/int64

    if (Long) {

        /**
         * Writes a 64bit signed integer.
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeInt64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                else if (!(value && value instanceof Long))
                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
            }
            if (typeof value === 'number')
                value = Long.fromNumber(value);
            else if (typeof value === 'string')
                value = Long.fromString(value);
            offset += 8;
            var capacity6 = this.buffer.length;
            if (offset > capacity6)
                this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
            offset -= 8;
            var lo = value.low,
                hi = value.high;
            if (this.littleEndian) {
                this.buffer[offset+3] = (lo >>> 24) & 0xFF;
                this.buffer[offset+2] = (lo >>> 16) & 0xFF;
                this.buffer[offset+1] = (lo >>>  8) & 0xFF;
                this.buffer[offset  ] =  lo         & 0xFF;
                offset += 4;
                this.buffer[offset+3] = (hi >>> 24) & 0xFF;
                this.buffer[offset+2] = (hi >>> 16) & 0xFF;
                this.buffer[offset+1] = (hi >>>  8) & 0xFF;
                this.buffer[offset  ] =  hi         & 0xFF;
            } else {
                this.buffer[offset  ] = (hi >>> 24) & 0xFF;
                this.buffer[offset+1] = (hi >>> 16) & 0xFF;
                this.buffer[offset+2] = (hi >>>  8) & 0xFF;
                this.buffer[offset+3] =  hi         & 0xFF;
                offset += 4;
                this.buffer[offset  ] = (lo >>> 24) & 0xFF;
                this.buffer[offset+1] = (lo >>> 16) & 0xFF;
                this.buffer[offset+2] = (lo >>>  8) & 0xFF;
                this.buffer[offset+3] =  lo         & 0xFF;
            }
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit signed integer. This is an alias of {@link ByteBuffer#writeInt64}.
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;

        /**
         * Reads a 64bit signed integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readInt64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.length);
            }
            var lo = 0,
                hi = 0;
            if (this.littleEndian) {
                lo  = this.buffer[offset+2] << 16;
                lo |= this.buffer[offset+1] <<  8;
                lo |= this.buffer[offset  ];
                lo += this.buffer[offset+3] << 24 >>> 0;
                offset += 4;
                hi  = this.buffer[offset+2] << 16;
                hi |= this.buffer[offset+1] <<  8;
                hi |= this.buffer[offset  ];
                hi += this.buffer[offset+3] << 24 >>> 0;
            } else {
                hi  = this.buffer[offset+1] << 16;
                hi |= this.buffer[offset+2] <<  8;
                hi |= this.buffer[offset+3];
                hi += this.buffer[offset  ] << 24 >>> 0;
                offset += 4;
                lo  = this.buffer[offset+1] << 16;
                lo |= this.buffer[offset+2] <<  8;
                lo |= this.buffer[offset+3];
                lo += this.buffer[offset  ] << 24 >>> 0;
            }
            var value = new Long(lo, hi, false);
            if (relative) this.offset += 8;
            return value;
        };

        /**
         * Reads a 64bit signed integer. This is an alias of {@link ByteBuffer#readInt64}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;

        /**
         * Writes a 64bit unsigned integer.
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUint64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                else if (!(value && value instanceof Long))
                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
            }
            if (typeof value === 'number')
                value = Long.fromNumber(value);
            else if (typeof value === 'string')
                value = Long.fromString(value);
            offset += 8;
            var capacity7 = this.buffer.length;
            if (offset > capacity7)
                this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
            offset -= 8;
            var lo = value.low,
                hi = value.high;
            if (this.littleEndian) {
                this.buffer[offset+3] = (lo >>> 24) & 0xFF;
                this.buffer[offset+2] = (lo >>> 16) & 0xFF;
                this.buffer[offset+1] = (lo >>>  8) & 0xFF;
                this.buffer[offset  ] =  lo         & 0xFF;
                offset += 4;
                this.buffer[offset+3] = (hi >>> 24) & 0xFF;
                this.buffer[offset+2] = (hi >>> 16) & 0xFF;
                this.buffer[offset+1] = (hi >>>  8) & 0xFF;
                this.buffer[offset  ] =  hi         & 0xFF;
            } else {
                this.buffer[offset  ] = (hi >>> 24) & 0xFF;
                this.buffer[offset+1] = (hi >>> 16) & 0xFF;
                this.buffer[offset+2] = (hi >>>  8) & 0xFF;
                this.buffer[offset+3] =  hi         & 0xFF;
                offset += 4;
                this.buffer[offset  ] = (lo >>> 24) & 0xFF;
                this.buffer[offset+1] = (lo >>> 16) & 0xFF;
                this.buffer[offset+2] = (lo >>>  8) & 0xFF;
                this.buffer[offset+3] =  lo         & 0xFF;
            }
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint64}.
         * @function
         * @param {number|!Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;

        /**
         * Reads a 64bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readUint64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.length);
            }
            var lo = 0,
                hi = 0;
            if (this.littleEndian) {
                lo  = this.buffer[offset+2] << 16;
                lo |= this.buffer[offset+1] <<  8;
                lo |= this.buffer[offset  ];
                lo += this.buffer[offset+3] << 24 >>> 0;
                offset += 4;
                hi  = this.buffer[offset+2] << 16;
                hi |= this.buffer[offset+1] <<  8;
                hi |= this.buffer[offset  ];
                hi += this.buffer[offset+3] << 24 >>> 0;
            } else {
                hi  = this.buffer[offset+1] << 16;
                hi |= this.buffer[offset+2] <<  8;
                hi |= this.buffer[offset+3];
                hi += this.buffer[offset  ] << 24 >>> 0;
                offset += 4;
                lo  = this.buffer[offset+1] << 16;
                lo |= this.buffer[offset+2] <<  8;
                lo |= this.buffer[offset+3];
                lo += this.buffer[offset  ] << 24 >>> 0;
            }
            var value = new Long(lo, hi, true);
            if (relative) this.offset += 8;
            return value;
        };

        /**
         * Reads a 64bit unsigned integer. This is an alias of {@link ByteBuffer#readUint64}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!Long}
         * @expose
         */
        ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;

    } // Long


    // types/floats/float32

    /**
     * Writes a 32bit float.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeFloat32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number')
                throw TypeError("Illegal value: "+value+" (not a number)");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 4;
        var capacity8 = this.buffer.length;
        if (offset > capacity8)
            this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
        offset -= 4;
        this.littleEndian
            ? this.buffer.writeFloatLE(value, offset, true)
            : this.buffer.writeFloatBE(value, offset, true);
        if (relative) this.offset += 4;
        return this;
    };

    /**
     * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;

    /**
     * Reads a 32bit float.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readFloat32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.length);
        }
        var value = this.littleEndian
            ? this.buffer.readFloatLE(offset, true)
            : this.buffer.readFloatBE(offset, true);
        if (relative) this.offset += 4;
        return value;
    };

    /**
     * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;

    // types/floats/float64

    /**
     * Writes a 64bit float.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeFloat64 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number')
                throw TypeError("Illegal value: "+value+" (not a number)");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        offset += 8;
        var capacity9 = this.buffer.length;
        if (offset > capacity9)
            this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
        offset -= 8;
        this.littleEndian
            ? this.buffer.writeDoubleLE(value, offset, true)
            : this.buffer.writeDoubleBE(value, offset, true);
        if (relative) this.offset += 8;
        return this;
    };

    /**
     * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
     * @function
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;

    /**
     * Reads a 64bit float.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readFloat64 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.length);
        }
        var value = this.littleEndian
            ? this.buffer.readDoubleLE(offset, true)
            : this.buffer.readDoubleBE(offset, true);
        if (relative) this.offset += 8;
        return value;
    };

    /**
     * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {number}
     * @expose
     */
    ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;


    // types/varints/varint32

    /**
     * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
     * @type {number}
     * @const
     * @expose
     */
    ByteBuffer.MAX_VARINT32_BYTES = 5;

    /**
     * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
     * @param {number} value Value to encode
     * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
     * @expose
     */
    ByteBuffer.calculateVarint32 = function(value) {
        // ref: src/google/protobuf/io/coded_stream.cc
        value = value >>> 0;
             if (value < 1 << 7 ) return 1;
        else if (value < 1 << 14) return 2;
        else if (value < 1 << 21) return 3;
        else if (value < 1 << 28) return 4;
        else                      return 5;
    };

    /**
     * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
     * @param {number} n Signed 32bit integer
     * @returns {number} Unsigned zigzag encoded 32bit integer
     * @expose
     */
    ByteBuffer.zigZagEncode32 = function(n) {
        return (((n |= 0) << 1) ^ (n >> 31)) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
    };

    /**
     * Decodes a zigzag encoded signed 32bit integer.
     * @param {number} n Unsigned zigzag encoded 32bit integer
     * @returns {number} Signed 32bit integer
     * @expose
     */
    ByteBuffer.zigZagDecode32 = function(n) {
        return ((n >>> 1) ^ -(n & 1)) | 0; // // ref: src/google/protobuf/wire_format_lite.h
    };

    /**
     * Writes a 32bit base 128 variable-length integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
     * @expose
     */
    ByteBufferPrototype.writeVarint32 = function(value, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        var size = ByteBuffer.calculateVarint32(value),
            b;
        offset += size;
        var capacity10 = this.buffer.length;
        if (offset > capacity10)
            this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
        offset -= size;
        value >>>= 0;
        while (value >= 0x80) {
            b = (value & 0x7f) | 0x80;
            this.buffer[offset++] = b;
            value >>>= 7;
        }
        this.buffer[offset++] = value;
        if (relative) {
            this.offset = offset;
            return this;
        }
        return size;
    };

    /**
     * Writes a zig-zag encoded (signed) 32bit base 128 variable-length integer.
     * @param {number} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
     * @expose
     */
    ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
        return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
    };

    /**
     * Reads a 32bit base 128 variable-length integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
     *  and the actual number of bytes read.
     * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
     *  to fully decode the varint.
     * @expose
     */
    ByteBufferPrototype.readVarint32 = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.length);
        }
        var c = 0,
            value = 0 >>> 0,
            b;
        do {
            if (!this.noAssert && offset > this.limit) {
                var err = Error("Truncated");
                err['truncated'] = true;
                throw err;
            }
            b = this.buffer[offset++];
            if (c < 5)
                value |= (b & 0x7f) << (7*c);
            ++c;
        } while ((b & 0x80) !== 0);
        value |= 0;
        if (relative) {
            this.offset = offset;
            return value;
        }
        return {
            "value": value,
            "length": c
        };
    };

    /**
     * Reads a zig-zag encoded (signed) 32bit base 128 variable-length integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
     *  and the actual number of bytes read.
     * @throws {Error} If it's not a valid varint
     * @expose
     */
    ByteBufferPrototype.readVarint32ZigZag = function(offset) {
        var val = this.readVarint32(offset);
        if (typeof val === 'object')
            val["value"] = ByteBuffer.zigZagDecode32(val["value"]);
        else
            val = ByteBuffer.zigZagDecode32(val);
        return val;
    };

    // types/varints/varint64

    if (Long) {

        /**
         * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
         * @type {number}
         * @const
         * @expose
         */
        ByteBuffer.MAX_VARINT64_BYTES = 10;

        /**
         * Calculates the actual number of bytes required to store a 64bit base 128 variable-length integer.
         * @param {number|!Long} value Value to encode
         * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT64_BYTES}
         * @expose
         */
        ByteBuffer.calculateVarint64 = function(value) {
            if (typeof value === 'number')
                value = Long.fromNumber(value);
            else if (typeof value === 'string')
                value = Long.fromString(value);
            // ref: src/google/protobuf/io/coded_stream.cc
            var part0 = value.toInt() >>> 0,
                part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
            if (part2 == 0) {
                if (part1 == 0) {
                    if (part0 < 1 << 14)
                        return part0 < 1 << 7 ? 1 : 2;
                    else
                        return part0 < 1 << 21 ? 3 : 4;
                } else {
                    if (part1 < 1 << 14)
                        return part1 < 1 << 7 ? 5 : 6;
                    else
                        return part1 < 1 << 21 ? 7 : 8;
                }
            } else
                return part2 < 1 << 7 ? 9 : 10;
        };

        /**
         * Zigzag encodes a signed 64bit integer so that it can be effectively used with varint encoding.
         * @param {number|!Long} value Signed long
         * @returns {!Long} Unsigned zigzag encoded long
         * @expose
         */
        ByteBuffer.zigZagEncode64 = function(value) {
            if (typeof value === 'number')
                value = Long.fromNumber(value, false);
            else if (typeof value === 'string')
                value = Long.fromString(value, false);
            else if (value.unsigned !== false) value = value.toSigned();
            // ref: src/google/protobuf/wire_format_lite.h
            return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
        };

        /**
         * Decodes a zigzag encoded signed 64bit integer.
         * @param {!Long|number} value Unsigned zigzag encoded long or JavaScript number
         * @returns {!Long} Signed long
         * @expose
         */
        ByteBuffer.zigZagDecode64 = function(value) {
            if (typeof value === 'number')
                value = Long.fromNumber(value, false);
            else if (typeof value === 'string')
                value = Long.fromString(value, false);
            else if (value.unsigned !== false) value = value.toSigned();
            // ref: src/google/protobuf/wire_format_lite.h
            return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
        };

        /**
         * Writes a 64bit base 128 variable-length integer.
         * @param {number|Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeVarint64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                else if (!(value && value instanceof Long))
                    throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
            }
            if (typeof value === 'number')
                value = Long.fromNumber(value, false);
            else if (typeof value === 'string')
                value = Long.fromString(value, false);
            else if (value.unsigned !== false) value = value.toSigned();
            var size = ByteBuffer.calculateVarint64(value),
                part0 = value.toInt() >>> 0,
                part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
            offset += size;
            var capacity11 = this.buffer.length;
            if (offset > capacity11)
                this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
            offset -= size;
            switch (size) {
                case 10: this.buffer[offset+9] = (part2 >>>  7) & 0x01;
                case 9 : this.buffer[offset+8] = size !== 9 ? (part2       ) | 0x80 : (part2       ) & 0x7F;
                case 8 : this.buffer[offset+7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
                case 7 : this.buffer[offset+6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
                case 6 : this.buffer[offset+5] = size !== 6 ? (part1 >>>  7) | 0x80 : (part1 >>>  7) & 0x7F;
                case 5 : this.buffer[offset+4] = size !== 5 ? (part1       ) | 0x80 : (part1       ) & 0x7F;
                case 4 : this.buffer[offset+3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
                case 3 : this.buffer[offset+2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
                case 2 : this.buffer[offset+1] = size !== 2 ? (part0 >>>  7) | 0x80 : (part0 >>>  7) & 0x7F;
                case 1 : this.buffer[offset  ] = size !== 1 ? (part0       ) | 0x80 : (part0       ) & 0x7F;
            }
            if (relative) {
                this.offset += size;
                return this;
            } else {
                return size;
            }
        };

        /**
         * Writes a zig-zag encoded 64bit base 128 variable-length integer.
         * @param {number|Long} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
            return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
        };

        /**
         * Reads a 64bit base 128 variable-length integer. Requires Long.js.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
         *  the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         */
        ByteBufferPrototype.readVarint64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.length);
            }
            // ref: src/google/protobuf/io/coded_stream.cc
            var start = offset,
                part0 = 0,
                part1 = 0,
                part2 = 0,
                b  = 0;
            b = this.buffer[offset++]; part0  = (b & 0x7F)      ; if ( b & 0x80                                                   ) {
            b = this.buffer[offset++]; part0 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part0 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part0 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part1  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part1 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part1 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part1 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part2  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            b = this.buffer[offset++]; part2 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
            throw Error("Buffer overrun"); }}}}}}}}}}
            var value = Long.fromBits(part0 | (part1 << 28), (part1 >>> 4) | (part2) << 24, false);
            if (relative) {
                this.offset = offset;
                return value;
            } else {
                return {
                    'value': value,
                    'length': offset-start
                };
            }
        };

        /**
         * Reads a zig-zag encoded 64bit base 128 variable-length integer. Requires Long.js.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
         *  the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         */
        ByteBufferPrototype.readVarint64ZigZag = function(offset) {
            var val = this.readVarint64(offset);
            if (val && val['value'] instanceof Long)
                val["value"] = ByteBuffer.zigZagDecode64(val["value"]);
            else
                val = ByteBuffer.zigZagDecode64(val);
            return val;
        };

    } // Long


    // types/strings/cstring

    /**
     * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
     *  characters itself.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  contained in `str` + 1 if omitted.
     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
     * @expose
     */
    ByteBufferPrototype.writeCString = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        var i,
            k = str.length;
        if (!this.noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            for (i=0; i<k; ++i) {
                if (str.charCodeAt(i) === 0)
                    throw RangeError("Illegal str: Contains NULL-characters");
            }
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        // UTF8 strings do not contain zero bytes in between except for the zero character, so:
        k = Buffer.byteLength(str, "utf8");
        offset += k+1;
        var capacity12 = this.buffer.length;
        if (offset > capacity12)
            this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
        offset -= k+1;
        offset += this.buffer.write(str, offset, k, "utf8");
        this.buffer[offset++] = 0;
        if (relative) {
            this.offset = offset;
            return this;
        }
        return k;
    };

    /**
     * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
     *  itself.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     */
    ByteBufferPrototype.readCString = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.length);
        }
        var start = offset,
            temp;
        // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:
        do {
            if (offset >= this.buffer.length)
                throw RangeError("Index out of range: "+offset+" <= "+this.buffer.length);
            temp = this.buffer[offset++];
        } while (temp !== 0);
        var str = this.buffer.toString("utf8", start, offset-1);
        if (relative) {
            this.offset = offset;
            return str;
        } else {
            return {
                "string": str,
                "length": offset - start
            };
        }
    };

    // types/strings/istring

    /**
     * Writes a length as uint32 prefixed UTF8 encoded string.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
     * @expose
     * @see ByteBuffer#writeVarint32
     */
    ByteBufferPrototype.writeIString = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        var start = offset,
            k;
        k = Buffer.byteLength(str, "utf8");
        offset += 4+k;
        var capacity13 = this.buffer.length;
        if (offset > capacity13)
            this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
        offset -= 4+k;
        if (this.littleEndian) {
            this.buffer[offset+3] = (k >>> 24) & 0xFF;
            this.buffer[offset+2] = (k >>> 16) & 0xFF;
            this.buffer[offset+1] = (k >>>  8) & 0xFF;
            this.buffer[offset  ] =  k         & 0xFF;
        } else {
            this.buffer[offset  ] = (k >>> 24) & 0xFF;
            this.buffer[offset+1] = (k >>> 16) & 0xFF;
            this.buffer[offset+2] = (k >>>  8) & 0xFF;
            this.buffer[offset+3] =  k         & 0xFF;
        }
        offset += 4;
        offset += this.buffer.write(str, offset, k, "utf8");
        if (relative) {
            this.offset = offset;
            return this;
        }
        return offset - start;
    };

    /**
     * Reads a length as uint32 prefixed UTF8 encoded string.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     * @see ByteBuffer#readVarint32
     */
    ByteBufferPrototype.readIString = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 4 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.length);
        }
        var start = offset;
        var len = this.readUint32(offset);
        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
        offset += str['length'];
        if (relative) {
            this.offset = offset;
            return str['string'];
        } else {
            return {
                'string': str['string'],
                'length': offset - start
            };
        }
    };

    // types/strings/utf8string

    /**
     * Metrics representing number of UTF8 characters. Evaluates to `c`.
     * @type {string}
     * @const
     * @expose
     */
    ByteBuffer.METRICS_CHARS = 'c';

    /**
     * Metrics representing number of bytes. Evaluates to `b`.
     * @type {string}
     * @const
     * @expose
     */
    ByteBuffer.METRICS_BYTES = 'b';

    /**
     * Writes an UTF8 encoded string.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
     * @expose
     */
    ByteBufferPrototype.writeUTF8String = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        var k;
        k = Buffer.byteLength(str, "utf8");
        offset += k;
        var capacity14 = this.buffer.length;
        if (offset > capacity14)
            this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
        offset -= k;
        offset += this.buffer.write(str, offset, k, "utf8");
        if (relative) {
            this.offset = offset;
            return this;
        }
        return k;
    };

    /**
     * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
     * @function
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
     * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
     * @expose
     */
    ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;

    /**
     * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
     *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
     * @param {string} str String to calculate
     * @returns {number} Number of UTF8 characters
     * @expose
     */
    ByteBuffer.calculateUTF8Chars = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[0];
    };

    /**
     * Calculates the number of UTF8 bytes of a string.
     * @param {string} str String to calculate
     * @returns {number} Number of UTF8 bytes
     * @expose
     */
    ByteBuffer.calculateUTF8Bytes = function(str) {
        if (typeof str !== 'string')
            throw TypeError("Illegal argument: "+(typeof str));
        return Buffer.byteLength(str, "utf8");
    };

    /**
     * Calculates the number of UTF8 bytes of a string. This is an alias of {@link ByteBuffer.calculateUTF8Bytes}.
     * @function
     * @param {string} str String to calculate
     * @returns {number} Number of UTF8 bytes
     * @expose
     */
    ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;

    /**
     * Reads an UTF8 encoded string.
     * @param {number} length Number of characters or bytes to read.
     * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
     *  {@link ByteBuffer.METRICS_CHARS}.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     */
    ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
        if (typeof metrics === 'number') {
            offset = metrics;
            metrics = undefined;
        }
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
        if (!this.noAssert) {
            if (typeof length !== 'number' || length % 1 !== 0)
                throw TypeError("Illegal length: "+length+" (not an integer)");
            length |= 0;
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        var i = 0,
            start = offset,
            temp,
            sd;
        if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
            sd = stringDestination();
            utfx.decodeUTF8(function() {
                return i < length && offset < this.limit ? this.buffer[offset++] : null;
            }.bind(this), function(cp) {
                ++i; utfx.UTF8toUTF16(cp, sd);
            });
            if (i !== length)
                throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
            if (relative) {
                this.offset = offset;
                return sd();
            } else {
                return {
                    "string": sd(),
                    "length": offset - start
                };
            }
        } else if (metrics === ByteBuffer.METRICS_BYTES) {
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + length > this.buffer.length)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.length);
            }
            temp = this.buffer.toString("utf8", offset, offset+length);
            if (relative) {
                this.offset += length;
                return temp;
            } else {
                return {
                    'string': temp,
                    'length': length
                };
            }
        } else
            throw TypeError("Unsupported metrics: "+metrics);
    };

    /**
     * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
     * @function
     * @param {number} length Number of characters or bytes to read
     * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
     *  {@link ByteBuffer.METRICS_CHARS}.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     */
    ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;

    // types/strings/vstring

    /**
     * Writes a length as varint32 prefixed UTF8 encoded string.
     * @param {string} str String to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
     * @expose
     * @see ByteBuffer#writeVarint32
     */
    ByteBufferPrototype.writeVString = function(str, offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        var start = offset,
            k, l;
        k = Buffer.byteLength(str, "utf8");
        l = ByteBuffer.calculateVarint32(k);
        offset += l+k;
        var capacity15 = this.buffer.length;
        if (offset > capacity15)
            this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
        offset -= l+k;
        offset += this.writeVarint32(k, offset);
        offset += this.buffer.write(str, offset, k, "utf8");
        if (relative) {
            this.offset = offset;
            return this;
        }
        return offset - start;
    };

    /**
     * Reads a length as varint32 prefixed UTF8 encoded string.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
     *  read and the actual number of bytes read.
     * @expose
     * @see ByteBuffer#readVarint32
     */
    ByteBufferPrototype.readVString = function(offset) {
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.length);
        }
        var start = offset;
        var len = this.readVarint32(offset);
        var str = this.readUTF8String(len['value'], ByteBuffer.METRICS_BYTES, offset += len['length']);
        offset += str['length'];
        if (relative) {
            this.offset = offset;
            return str['string'];
        } else {
            return {
                'string': str['string'],
                'length': offset - start
            };
        }
    };


    /**
     * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
     *  data's length.
     * @param {!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its
     * offsets will be modified according to the performed read operation.
     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
     * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
     */
    ByteBufferPrototype.append = function(source, encoding, offset) {
        if (typeof encoding === 'number' || typeof encoding !== 'string') {
            offset = encoding;
            encoding = undefined;
        }
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        if (!(source instanceof ByteBuffer))
            source = ByteBuffer.wrap(source, encoding);
        var length = source.limit - source.offset;
        if (length <= 0) return this; // Nothing to append
        offset += length;
        var capacity16 = this.buffer.length;
        if (offset > capacity16)
            this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
        offset -= length;
        source.buffer.copy(this.buffer, offset, source.offset, source.limit);
        source.offset += length;
        if (relative) this.offset += length;
        return this;
    };

    /**
     * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents at and after the
        specified offset up to the length of this ByteBuffer's data.
     * @param {!ByteBuffer} target Target ByteBuffer
     * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @see ByteBuffer#append
     */
    ByteBufferPrototype.appendTo = function(target, offset) {
        target.append(this, offset);
        return this;
    };

    /**
     * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
     *  disable them if your code already makes sure that everything is valid.
     * @param {boolean} assert `true` to enable assertions, otherwise `false`
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.assert = function(assert) {
        this.noAssert = !assert;
        return this;
    };

    /**
     * Gets the capacity of this ByteBuffer's backing buffer.
     * @returns {number} Capacity of the backing buffer
     * @expose
     */
    ByteBufferPrototype.capacity = function() {
        return this.buffer.length;
    };
    /**
     * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
     *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.clear = function() {
        this.offset = 0;
        this.limit = this.buffer.length;
        this.markedOffset = -1;
        return this;
    };

    /**
     * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
     *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
     * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
     * @returns {!ByteBuffer} Cloned instance
     * @expose
     */
    ByteBufferPrototype.clone = function(copy) {
        var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
        if (copy) {
            var buffer = new Buffer(this.buffer.length);
            this.buffer.copy(buffer);
            bb.buffer = buffer;
        } else {
            bb.buffer = this.buffer;
        }
        bb.offset = this.offset;
        bb.markedOffset = this.markedOffset;
        bb.limit = this.limit;
        return bb;
    };

    /**
     * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
     *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
     *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
     * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.compact = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        if (begin === 0 && end === this.buffer.length)
            return this; // Already compacted
        var len = end - begin;
        if (len === 0) {
            this.buffer = EMPTY_BUFFER;
            if (this.markedOffset >= 0) this.markedOffset -= begin;
            this.offset = 0;
            this.limit = 0;
            return this;
        }
        var buffer = new Buffer(len);
        this.buffer.copy(buffer, 0, begin, end);
        this.buffer = buffer;
        if (this.markedOffset >= 0) this.markedOffset -= begin;
        this.offset = 0;
        this.limit = len;
        return this;
    };

    /**
     * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
     *  {@link ByteBuffer#limit}.
     * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
     * @returns {!ByteBuffer} Copy
     * @expose
     */
    ByteBufferPrototype.copy = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        if (begin === end)
            return new ByteBuffer(0, this.littleEndian, this.noAssert);
        var capacity = end - begin,
            bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
        bb.offset = 0;
        bb.limit = capacity;
        if (bb.markedOffset >= 0) bb.markedOffset -= begin;
        this.copyTo(bb, 0, begin, end);
        return bb;
    };

    /**
     * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
     *  {@link ByteBuffer#limit}.
     * @param {!ByteBuffer} target Target ByteBuffer
     * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
     *  by the number of bytes copied if omitted.
     * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
     *  number of bytes copied if omitted.
     * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
        var relative,
            targetRelative;
        if (!this.noAssert) {
            if (!ByteBuffer.isByteBuffer(target))
                throw TypeError("Illegal target: Not a ByteBuffer");
        }
        targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
        sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
        sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;

        if (targetOffset < 0 || targetOffset > target.buffer.length)
            throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.length);
        if (sourceOffset < 0 || sourceLimit > this.buffer.length)
            throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.length);

        var len = sourceLimit - sourceOffset;
        if (len === 0)
            return target; // Nothing to copy

        target.ensureCapacity(targetOffset + len);

        this.buffer.copy(target.buffer, targetOffset, sourceOffset, sourceLimit);

        if (relative) this.offset += len;
        if (targetRelative) target.offset += len;

        return this;
    };

    /**
     * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
     *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
     *  the required capacity will be used instead.
     * @param {number} capacity Required capacity
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.ensureCapacity = function(capacity) {
        var current = this.buffer.length;
        if (current < capacity)
            return this.resize((current *= 2) > capacity ? current : capacity);
        return this;
    };

    /**
     * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
     * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
     * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted. defaults to {@link ByteBuffer#offset}.
     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
     * @returns {!ByteBuffer} this
     * @expose
     * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
     */
    ByteBufferPrototype.fill = function(value, begin, end) {
        var relative = typeof begin === 'undefined';
        if (relative) begin = this.offset;
        if (typeof value === 'string' && value.length > 0)
            value = value.charCodeAt(0);
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof value !== 'number' || value % 1 !== 0)
                throw TypeError("Illegal value: "+value+" (not an integer)");
            value |= 0;
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        if (begin >= end)
            return this; // Nothing to fill
        this.buffer.fill(value, begin, end);
        begin = end;
        if (relative) this.offset = begin;
        return this;
    };

    /**
     * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
     *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.flip = function() {
        this.limit = this.offset;
        this.offset = 0;
        return this;
    };
    /**
     * Marks an offset on this ByteBuffer to be used later.
     * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
     * @returns {!ByteBuffer} this
     * @throws {TypeError} If `offset` is not a valid number
     * @throws {RangeError} If `offset` is out of bounds
     * @see ByteBuffer#reset
     * @expose
     */
    ByteBufferPrototype.mark = function(offset) {
        offset = typeof offset === 'undefined' ? this.offset : offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        this.markedOffset = offset;
        return this;
    };
    /**
     * Sets the byte order.
     * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.order = function(littleEndian) {
        if (!this.noAssert) {
            if (typeof littleEndian !== 'boolean')
                throw TypeError("Illegal littleEndian: Not a boolean");
        }
        this.littleEndian = !!littleEndian;
        return this;
    };

    /**
     * Switches (to) little endian byte order.
     * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.LE = function(littleEndian) {
        this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
        return this;
    };

    /**
     * Switches (to) big endian byte order.
     * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.BE = function(bigEndian) {
        this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
        return this;
    };
    /**
     * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
     *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
     *  will be resized and its contents moved accordingly.
     * @param {!ByteBuffer|string||!Buffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be modified
     *  according to the performed read operation.
     * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
     *  prepended if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
     * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
     */
    ByteBufferPrototype.prepend = function(source, encoding, offset) {
        if (typeof encoding === 'number' || typeof encoding !== 'string') {
            offset = encoding;
            encoding = undefined;
        }
        var relative = typeof offset === 'undefined';
        if (relative) offset = this.offset;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.length)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.length);
        }
        if (!(source instanceof ByteBuffer))
            source = ByteBuffer.wrap(source, encoding);
        var len = source.limit - source.offset;
        if (len <= 0) return this; // Nothing to prepend
        var diff = len - offset;
        if (diff > 0) { // Not enough space before offset, so resize + move
            var buffer = new Buffer(this.buffer.length + diff);
            this.buffer.copy(buffer, len, offset, this.buffer.length);
            this.buffer = buffer;
            this.offset += diff;
            if (this.markedOffset >= 0) this.markedOffset += diff;
            this.limit += diff;
            offset += diff;
        }        source.buffer.copy(this.buffer, offset - len, source.offset, source.limit);

        source.offset = source.limit;
        if (relative)
            this.offset -= len;
        return this;
    };

    /**
     * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
     *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
     *  will be resized and its contents moved accordingly.
     * @param {!ByteBuffer} target Target ByteBuffer
     * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
     *  prepended if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     * @see ByteBuffer#prepend
     */
    ByteBufferPrototype.prependTo = function(target, offset) {
        target.prepend(this, offset);
        return this;
    };
    /**
     * Prints debug information about this ByteBuffer's contents.
     * @param {function(string)=} out Output function to call, defaults to console.log
     * @expose
     */
    ByteBufferPrototype.printDebug = function(out) {
        if (typeof out !== 'function') out = console.log.bind(console);
        out(
            this.toString()+"\n"+
            "-------------------------------------------------------------------\n"+
            this.toDebug(/* columns */ true)
        );
    };

    /**
     * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
     *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
     * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
     * @expose
     */
    ByteBufferPrototype.remaining = function() {
        return this.limit - this.offset;
    };
    /**
     * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
     *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
     *  marked, sets `offset = 0`.
     * @returns {!ByteBuffer} this
     * @see ByteBuffer#mark
     * @expose
     */
    ByteBufferPrototype.reset = function() {
        if (this.markedOffset >= 0) {
            this.offset = this.markedOffset;
            this.markedOffset = -1;
        } else {
            this.offset = 0;
        }
        return this;
    };
    /**
     * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
     *  large or larger.
     * @param {number} capacity Capacity required
     * @returns {!ByteBuffer} this
     * @throws {TypeError} If `capacity` is not a number
     * @throws {RangeError} If `capacity < 0`
     * @expose
     */
    ByteBufferPrototype.resize = function(capacity) {
        if (!this.noAssert) {
            if (typeof capacity !== 'number' || capacity % 1 !== 0)
                throw TypeError("Illegal capacity: "+capacity+" (not an integer)");
            capacity |= 0;
            if (capacity < 0)
                throw RangeError("Illegal capacity: 0 <= "+capacity);
        }
        if (this.buffer.length < capacity) {
            var buffer = new Buffer(capacity);
            this.buffer.copy(buffer);
            this.buffer = buffer;
        }
        return this;
    };
    /**
     * Reverses this ByteBuffer's contents.
     * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.reverse = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        if (begin === end)
            return this; // Nothing to reverse
        Array.prototype.reverse.call(this.buffer.slice(begin, end));
        return this;
    };
    /**
     * Skips the next `length` bytes. This will just advance
     * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.skip = function(length) {
        if (!this.noAssert) {
            if (typeof length !== 'number' || length % 1 !== 0)
                throw TypeError("Illegal length: "+length+" (not an integer)");
            length |= 0;
        }
        var offset = this.offset + length;
        if (!this.noAssert) {
            if (offset < 0 || offset > this.buffer.length)
                throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.length);
        }
        this.offset = offset;
        return this;
    };

    /**
     * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
     * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
     * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
     * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
     * @expose
     */
    ByteBufferPrototype.slice = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        var bb = this.clone();
        bb.offset = begin;
        bb.limit = end;
        return bb;
    };
    /**
     * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
     * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
     *  possible. Defaults to `false`
     * @returns {!Buffer} Contents as a Buffer
     * @expose
     */
    ByteBufferPrototype.toBuffer = function(forceCopy) {
        var offset = this.offset,
            limit = this.limit;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: Not an integer");
            offset >>>= 0;
            if (typeof limit !== 'number' || limit % 1 !== 0)
                throw TypeError("Illegal limit: Not an integer");
            limit >>>= 0;
            if (offset < 0 || offset > limit || limit > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.length);
        }
        if (forceCopy) {
            var buffer = new Buffer(limit - offset);
            this.buffer.copy(buffer, 0, offset, limit);
            return buffer;
        } else {
            if (offset === 0 && limit === this.buffer.length)
                return this.buffer;
            else
                return this.buffer.slice(offset, limit);
        }
    };

    /**
     * Returns a copy of the backing buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
     *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
     * @returns {!ArrayBuffer} Contents as an ArrayBuffer
     */
    ByteBufferPrototype.toArrayBuffer = function() {
        var offset = this.offset,
            limit = this.limit;
        if (!this.noAssert) {
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: Not an integer");
            offset >>>= 0;
            if (typeof limit !== 'number' || limit % 1 !== 0)
                throw TypeError("Illegal limit: Not an integer");
            limit >>>= 0;
            if (offset < 0 || offset > limit || limit > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.length);
        }
        var ab = new ArrayBuffer(limit - offset);
        if (memcpy) { // Fast
            memcpy(ab, 0, this.buffer, offset, limit);
        } else { // Slow
            var dst = new Uint8Array(ab);
            for (var i=offset; i<limit; ++i)
                dst[i-offset] = this.buffer[i];
        }
        return ab;
    };

    /**
     * Converts the ByteBuffer's contents to a string.
     * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
     *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
     *  highlighted offsets.
     * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
     * @returns {string} String representation
     * @throws {Error} If `encoding` is invalid
     * @expose
     */
    ByteBufferPrototype.toString = function(encoding, begin, end) {
        if (typeof encoding === 'undefined')
            return "ByteBufferNB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";
        if (typeof encoding === 'number')
            encoding = "utf8",
            begin = encoding,
            end = begin;
        switch (encoding) {
            case "utf8":
                return this.toUTF8(begin, end);
            case "base64":
                return this.toBase64(begin, end);
            case "hex":
                return this.toHex(begin, end);
            case "binary":
                return this.toBinary(begin, end);
            case "debug":
                return this.toDebug();
            case "columns":
                return this.toColumns();
            default:
                throw Error("Unsupported encoding: "+encoding);
        }
    };

    // encodings/base64

    /**
     * Encodes this ByteBuffer's contents to a base64 encoded string.
     * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
     * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
     * @returns {string} Base64 encoded string
     * @throws {RangeError} If `begin` or `end` is out of bounds
     * @expose
     */
    ByteBufferPrototype.toBase64 = function(begin, end) {
        if (typeof begin === 'undefined')
            begin = this.offset;
        if (typeof end === 'undefined')
            end = this.limit;
        begin = begin | 0; end = end | 0;
        if (begin < 0 || end > this.capacity || begin > end)
            throw RangeError("begin, end");
        return this.buffer.toString("base64", begin, end);
    };

    /**
     * Decodes a base64 encoded string to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromBase64 = function(str, littleEndian) {
        return ByteBuffer.wrap(new Buffer(str, "base64"), littleEndian);
        return bb;
    };

    /**
     * Encodes a binary string to base64 like `window.btoa` does.
     * @param {string} str Binary string
     * @returns {string} Base64 encoded string
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
     * @expose
     */
    ByteBuffer.btoa = function(str) {
        return ByteBuffer.fromBinary(str).toBase64();
    };

    /**
     * Decodes a base64 encoded string to binary like `window.atob` does.
     * @param {string} b64 Base64 encoded string
     * @returns {string} Binary string
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
     * @expose
     */
    ByteBuffer.atob = function(b64) {
        return ByteBuffer.fromBase64(b64).toBinary();
    };

    // encodings/binary

    /**
     * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
     * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
     * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
     * @returns {string} Binary encoded string
     * @throws {RangeError} If `offset > limit`
     * @expose
     */
    ByteBufferPrototype.toBinary = function(begin, end) {
        if (typeof begin === 'undefined')
            begin = this.offset;
        if (typeof end === 'undefined')
            end = this.limit;
        begin |= 0; end |= 0;
        if (begin < 0 || end > this.capacity() || begin > end)
            throw RangeError("begin, end");
        return this.buffer.toString("binary", begin, end);
    };

    /**
     * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromBinary = function(str, littleEndian) {
        return ByteBuffer.wrap(new Buffer(str, "binary"), littleEndian);
        return bb;
    };

    // encodings/debug

    /**
     * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
     * * `<` : offset,
     * * `'` : markedOffset,
     * * `>` : limit,
     * * `|` : offset and limit,
     * * `[` : offset and markedOffset,
     * * `]` : markedOffset and limit,
     * * `!` : offset, markedOffset and limit
     * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
     * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
     * @expose
     * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
     * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
     * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
     * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
     */
    ByteBufferPrototype.toDebug = function(columns) {
        var i = -1,
            k = this.buffer.length,
            b,
            hex = "",
            asc = "",
            out = "";
        while (i<k) {
            if (i !== -1) {
                b = this.buffer[i];
                if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
                else hex += b.toString(16).toUpperCase();
                if (columns)
                    asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
            }
            ++i;
            if (columns) {
                if (i > 0 && i % 16 === 0 && i !== k) {
                    while (hex.length < 3*16+3) hex += " ";
                    out += hex+asc+"\n";
                    hex = asc = "";
                }
            }
            if (i === this.offset && i === this.limit)
                hex += i === this.markedOffset ? "!" : "|";
            else if (i === this.offset)
                hex += i === this.markedOffset ? "[" : "<";
            else if (i === this.limit)
                hex += i === this.markedOffset ? "]" : ">";
            else
                hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
        }
        if (columns && hex !== " ") {
            while (hex.length < 3*16+3)
                hex += " ";
            out += hex + asc + "\n";
        }
        return columns ? out : hex;
    };

    /**
     * Decodes a hex encoded string with marked offsets to a ByteBuffer.
     * @param {string} str Debug string to decode (not be generated with `columns = true`)
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     * @see ByteBuffer#toDebug
     */
    ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
        var k = str.length,
            bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
        var i = 0, j = 0, ch, b,
            rs = false, // Require symbol next
            ho = false, hm = false, hl = false, // Already has offset (ho), markedOffset (hm), limit (hl)?
            fail = false;
        while (i<k) {
            switch (ch = str.charAt(i++)) {
                case '!':
                    if (!noAssert) {
                        if (ho || hm || hl) {
                            fail = true;
                            break;
                        }
                        ho = hm = hl = true;
                    }
                    bb.offset = bb.markedOffset = bb.limit = j;
                    rs = false;
                    break;
                case '|':
                    if (!noAssert) {
                        if (ho || hl) {
                            fail = true;
                            break;
                        }
                        ho = hl = true;
                    }
                    bb.offset = bb.limit = j;
                    rs = false;
                    break;
                case '[':
                    if (!noAssert) {
                        if (ho || hm) {
                            fail = true;
                            break;
                        }
                        ho = hm = true;
                    }
                    bb.offset = bb.markedOffset = j;
                    rs = false;
                    break;
                case '<':
                    if (!noAssert) {
                        if (ho) {
                            fail = true;
                            break;
                        }
                        ho = true;
                    }
                    bb.offset = j;
                    rs = false;
                    break;
                case ']':
                    if (!noAssert) {
                        if (hl || hm) {
                            fail = true;
                            break;
                        }
                        hl = hm = true;
                    }
                    bb.limit = bb.markedOffset = j;
                    rs = false;
                    break;
                case '>':
                    if (!noAssert) {
                        if (hl) {
                            fail = true;
                            break;
                        }
                        hl = true;
                    }
                    bb.limit = j;
                    rs = false;
                    break;
                case "'":
                    if (!noAssert) {
                        if (hm) {
                            fail = true;
                            break;
                        }
                        hm = true;
                    }
                    bb.markedOffset = j;
                    rs = false;
                    break;
                case ' ':
                    rs = false;
                    break;
                default:
                    if (!noAssert) {
                        if (rs) {
                            fail = true;
                            break;
                        }
                    }
                    b = parseInt(ch+str.charAt(i++), 16);
                    if (!noAssert) {
                        if (isNaN(b) || b < 0 || b > 255)
                            throw TypeError("Illegal str: Not a debug encoded string");
                    }
                    bb.buffer[j++] = b;
                    rs = true;
            }
            if (fail)
                throw TypeError("Illegal str: Invalid symbol at "+i);
        }
        if (!noAssert) {
            if (!ho || !hl)
                throw TypeError("Illegal str: Missing offset or limit");
            if (j<bb.buffer.length)
                throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
        }
        return bb;
    };

    // encodings/hex

    /**
     * Encodes this ByteBuffer's contents to a hex encoded string.
     * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
     * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
     * @returns {string} Hex encoded string
     * @expose
     */
    ByteBufferPrototype.toHex = function(begin, end) {
        begin = typeof begin === 'undefined' ? this.offset : begin;
        end = typeof end === 'undefined' ? this.limit : end;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        return this.buffer.toString("hex", begin, end);
    };

    /**
     * Decodes a hex encoded string to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
        if (!noAssert) {
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
            if (str.length % 2 !== 0)
                throw TypeError("Illegal str: Length not a multiple of 2");
        }
        var bb = new ByteBuffer(0, littleEndian, true);
        bb.buffer = new Buffer(str, "hex");
        bb.limit = bb.buffer.length;
        return bb;
    };

    // utfx-embeddable

    /**
     * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/utfx for details
     */
    var utfx = function() {
        "use strict";

        /**
         * utfx namespace.
         * @inner
         * @type {!Object.<string,*>}
         */
        var utfx = {};

        /**
         * Maximum valid code point.
         * @type {number}
         * @const
         */
        utfx.MAX_CODEPOINT = 0x10FFFF;

        /**
         * Encodes UTF8 code points to UTF8 bytes.
         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
         *  respectively `null` if there are no more code points left or a single numeric code point.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
         */
        utfx.encodeUTF8 = function(src, dst) {
            var cp = null;
            if (typeof src === 'number')
                cp = src,
                src = function() { return null; };
            while (cp !== null || (cp = src()) !== null) {
                if (cp < 0x80)
                    dst(cp&0x7F);
                else if (cp < 0x800)
                    dst(((cp>>6)&0x1F)|0xC0),
                    dst((cp&0x3F)|0x80);
                else if (cp < 0x10000)
                    dst(((cp>>12)&0x0F)|0xE0),
                    dst(((cp>>6)&0x3F)|0x80),
                    dst((cp&0x3F)|0x80);
                else
                    dst(((cp>>18)&0x07)|0xF0),
                    dst(((cp>>12)&0x3F)|0x80),
                    dst(((cp>>6)&0x3F)|0x80),
                    dst((cp&0x3F)|0x80);
                cp = null;
            }
        };

        /**
         * Decodes UTF8 bytes to UTF8 code points.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
         *  are no more bytes left.
         * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
         * @throws {RangeError} If a starting byte is invalid in UTF8
         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
         *  remaining bytes.
         */
        utfx.decodeUTF8 = function(src, dst) {
            var a, b, c, d, fail = function(b) {
                b = b.slice(0, b.indexOf(null));
                var err = Error(b.toString());
                err.name = "TruncatedError";
                err['bytes'] = b;
                throw err;
            };
            while ((a = src()) !== null) {
                if ((a&0x80) === 0)
                    dst(a);
                else if ((a&0xE0) === 0xC0)
                    ((b = src()) === null) && fail([a, b]),
                    dst(((a&0x1F)<<6) | (b&0x3F));
                else if ((a&0xF0) === 0xE0)
                    ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
                    dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
                else if ((a&0xF8) === 0xF0)
                    ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
                    dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
                else throw RangeError("Illegal starting byte: "+a);
            }
        };

        /**
         * Converts UTF16 characters to UTF8 code points.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @param {!function(number)} dst Code points destination as a function successively called with each converted code
         *  point.
         */
        utfx.UTF16toUTF8 = function(src, dst) {
            var c1, c2 = null;
            while (true) {
                if ((c1 = c2 !== null ? c2 : src()) === null)
                    break;
                if (c1 >= 0xD800 && c1 <= 0xDFFF) {
                    if ((c2 = src()) !== null) {
                        if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                            dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
                            c2 = null; continue;
                        }
                    }
                }
                dst(c1);
            }
            if (c2 !== null) dst(c2);
        };

        /**
         * Converts UTF8 code points to UTF16 characters.
         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
         *  respectively `null` if there are no more code points left or a single numeric code point.
         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
         * @throws {RangeError} If a code point is out of range
         */
        utfx.UTF8toUTF16 = function(src, dst) {
            var cp = null;
            if (typeof src === 'number')
                cp = src, src = function() { return null; };
            while (cp !== null || (cp = src()) !== null) {
                if (cp <= 0xFFFF)
                    dst(cp);
                else
                    cp -= 0x10000,
                    dst((cp>>10)+0xD800),
                    dst((cp%0x400)+0xDC00);
                cp = null;
            }
        };

        /**
         * Converts and encodes UTF16 characters to UTF8 bytes.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
         *  if there are no more characters left.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
         */
        utfx.encodeUTF16toUTF8 = function(src, dst) {
            utfx.UTF16toUTF8(src, function(cp) {
                utfx.encodeUTF8(cp, dst);
            });
        };

        /**
         * Decodes and converts UTF8 bytes to UTF16 characters.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
         *  are no more bytes left.
         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
         * @throws {RangeError} If a starting byte is invalid in UTF8
         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
         */
        utfx.decodeUTF8toUTF16 = function(src, dst) {
            utfx.decodeUTF8(src, function(cp) {
                utfx.UTF8toUTF16(cp, dst);
            });
        };

        /**
         * Calculates the byte length of an UTF8 code point.
         * @param {number} cp UTF8 code point
         * @returns {number} Byte length
         */
        utfx.calculateCodePoint = function(cp) {
            return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
        };

        /**
         * Calculates the number of UTF8 bytes required to store UTF8 code points.
         * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
         *  `null` if there are no more code points left.
         * @returns {number} The number of UTF8 bytes required
         */
        utfx.calculateUTF8 = function(src) {
            var cp, l=0;
            while ((cp = src()) !== null)
                l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            return l;
        };

        /**
         * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
         * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
         */
        utfx.calculateUTF16asUTF8 = function(src) {
            var n=0, l=0;
            utfx.UTF16toUTF8(src, function(cp) {
                ++n; l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            });
            return [n,l];
        };

        return utfx;
    }();

    // encodings/utf8

    /**
     * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
     *  string.
     * @returns {string} Hex encoded string
     * @throws {RangeError} If `offset > limit`
     * @expose
     */
    ByteBufferPrototype.toUTF8 = function(begin, end) {
        if (typeof begin === 'undefined') begin = this.offset;
        if (typeof end === 'undefined') end = this.limit;
        if (!this.noAssert) {
            if (typeof begin !== 'number' || begin % 1 !== 0)
                throw TypeError("Illegal begin: Not an integer");
            begin >>>= 0;
            if (typeof end !== 'number' || end % 1 !== 0)
                throw TypeError("Illegal end: Not an integer");
            end >>>= 0;
            if (begin < 0 || begin > end || end > this.buffer.length)
                throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.length);
        }
        return this.buffer.toString("utf8", begin, end);
    };

    /**
     * Decodes an UTF8 encoded string to a ByteBuffer.
     * @param {string} str String to decode
     * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
     *  {@link ByteBuffer.DEFAULT_ENDIAN}.
     * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
     *  {@link ByteBuffer.DEFAULT_NOASSERT}.
     * @returns {!ByteBuffer} ByteBuffer
     * @expose
     */
    ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
        if (!noAssert)
            if (typeof str !== 'string')
                throw TypeError("Illegal str: Not a string");
        var bb = new ByteBuffer(0, littleEndian, noAssert);
        bb.buffer = new Buffer(str, "utf8");
        bb.limit = bb.buffer.length;
        return bb;
    };


    /**
     * node-memcpy. This is an optional binding dependency and may not be present.
     * @function
     * @param {!(Buffer|ArrayBuffer|Uint8Array)} target Destination
     * @param {number|!(Buffer|ArrayBuffer)} targetStart Destination start, defaults to 0.
     * @param {(!(Buffer|ArrayBuffer|Uint8Array)|number)=} source Source
     * @param {number=} sourceStart Source start, defaults to 0.
     * @param {number=} sourceEnd Source end, defaults to capacity.
     * @returns {number} Number of bytes copied
     * @throws {Error} If any index is out of bounds
     * @expose
     */
    ByteBuffer.memcpy = memcpy;

    return ByteBuffer;

})();


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let ChainTypes = {};

ChainTypes.reserved_spaces = {
    relative_protocol_ids: 0,
    protocol_ids: 1,
    implementation_ids: 2
};

ChainTypes.object_type = {
    "null": 0,
    base: 1,
    account: 2,
    asset: 3,
    force_settlement: 4,
    committee_member: 5,
    witness: 6,
    limit_order: 7,
    call_order: 8,
    custom: 9,
    proposal: 10,
    operation_history: 11,
    withdraw_permission: 12,
    vesting_balance: 13,
    worker: 14,
    balance: 15,
    crowdfund: 16,
    crowdfund_contract: 17
};

ChainTypes.impl_object_type = {
    global_property: 0,
    dynamic_global_property: 1,
    index_meta: 2,
    asset_dynamic_data: 3,
    asset_bitasset_data: 4,
    account_balance: 5,
    account_statistics: 6,
    transaction: 7,
    block_summary: 8,
    account_transaction_history: 9,
    blinded_balance: 10,
    chain_property: 11,
    witness_schedule: 12,
    budget_record: 13
};

ChainTypes.vote_type = {
    committee: 0,
    witness: 1,
    worker: 2
};

ChainTypes.operations = {
    transfer: 0,
    limit_order_create: 1,
    limit_order_cancel: 2,
    call_order_update: 3,
    fill_order: 4,
    account_create: 5,
    account_update: 6,
    account_whitelist: 7,
    account_upgrade: 8,
    account_transfer: 9,
    asset_create: 10,
    asset_update: 11,
    asset_update_bitasset: 12,
    asset_update_feed_producers: 13,
    asset_issue: 14,
    asset_reserve: 15,
    asset_fund_fee_pool: 16,
    asset_settle: 17,
    asset_global_settle: 18,
    asset_publish_feed: 19,
    witness_create: 20,
    witness_update: 21,
    proposal_create: 22,
    proposal_update: 23,
    proposal_delete: 24,
    withdraw_permission_create: 25,
    withdraw_permission_update: 26,
    withdraw_permission_claim: 27,
    withdraw_permission_delete: 28,
    committee_member_create: 29,
    committee_member_update: 30,
    committee_member_update_global_parameters: 31,
    vesting_balance_create: 32,
    vesting_balance_withdraw: 33,
    worker_create: 34,
    custom: 35,
    assert: 36,
    balance_claim: 37,
    override_transfer: 38,
    transfer_to_blind: 39,
    blind_transfer: 40,
    transfer_from_blind: 41,
    asset_settle_cancel: 42,
    asset_claim_fees: 43,
    asset_settle_cancel_demo: 44,    
    initiate_crowdfund: 45,
    participate_crowdfund: 46,
    withdraw_crowdfund: 47,
};

/* harmony default export */ __webpack_exports__["a"] = (ChainTypes);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Point = __webpack_require__(24)
var Curve = __webpack_require__(26)

var getCurveByName = __webpack_require__(44)

module.exports = {
  Curve: Curve,
  Point: Point,
  getCurveByName: getCurveByName
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chain_src_ChainTypes__ = __webpack_require__(7);



var MAX_SAFE_INT = 9007199254740991;
var MIN_SAFE_INT =-9007199254740991;

/**
    Most validations are skipped and the value returned unchanged when an empty string, null, or undefined is encountered (except "required").

    Validations support a string format for dealing with large numbers.
*/
var _my = {

    is_empty: function(value){
        return value === null || value === undefined;
    },

    required(value, field_name=""){
        if (this.is_empty(value) ){
            throw new Error(`value required ${field_name} ${value}`);
        }
        return value;
    },

    require_long(value, field_name=""){
        if (!__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].isLong(value)) {
            throw new Error(`Long value required ${field_name} ${value}`);
        }
        return value;
    },

    string(value){
        if (this.is_empty(value) ){ return value; }
        if (typeof value !== "string") {
            throw new Error(`string required: ${value}`);
        }
        return value;
    },

    number(value){
        if (this.is_empty(value) ){ return value; }
        if (typeof value !== "number") {
            throw new Error(`number required: ${value}`);
        }
        return value;
    },

    whole_number(value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        if (/\./.test(value) ){
            throw new Error(`whole number required ${field_name} ${value}`);
        }
        return value;
    },

    unsigned(value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        if (/-/.test(value) ){
            throw new Error(`unsigned required ${field_name} ${value}`);
        }
        return value;
    },

    is_digits: function(value){
        if (typeof value === "numeric") { return true; }
        return /^[0-9]+$/.test(value);
    },

    to_number: function(value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        this.no_overflow53(value, field_name);
        var int_value = (() => {
            if (typeof value === "number") {
                return value;
            } else {
                return parseInt(value);
            }
        })();
        return int_value;
    },

    to_long(value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        if (__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].isLong(value) ){ return value; }

        this.no_overflow64(value, field_name);
        if (typeof value === "number") {
            value = ""+value;
        }
        return __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromString(value);
    },

    to_string(value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        if (typeof value === "string") { return value; }
        if (typeof value === "number") {
            this.no_overflow53(value, field_name);
            return ""+value;
        }
        if (__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].isLong(value) ){
            return value.toString();
        }
        throw `unsupported type ${field_name}: (${typeof value}) ${value}`;
    },

    require_test(regex, value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        if (!regex.test(value)) {
            throw new Error(`unmatched ${regex} ${field_name} ${value}`);
        }
        return value;
    },

    require_match: function(regex, value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        var match = value.match(regex);
        if (match === null) {
            throw new Error(`unmatched ${regex} ${field_name} ${value}`);
        }
        return match;
    },

    require_object_id: function(value, field_name){
        return require_match(
            /^([0-9]+)\.([0-9]+)\.([0-9]+)$/,
            value,
            field_name
        );
    },

    // Does not support over 53 bits
    require_range(min,max,value, field_name=""){
        if (this.is_empty(value) ){ return value; }
        var number = this.to_number(value);
        if (value < min || value > max) {
            throw new Error(`out of range ${value} ${field_name} ${value}`);
        }
        return value;
    },

    require_object_type: function(
        reserved_spaces = 1, type, value,
        field_name=""
    ){
        if (this.is_empty(value) ){ return value; }
        var object_type = __WEBPACK_IMPORTED_MODULE_1__chain_src_ChainTypes__["a" /* default */].object_type[type];
        if (!object_type) {
            throw new Error(`Unknown object type ${type} ${field_name} ${value}`);
        }
        var re = new RegExp(`${reserved_spaces}\.${object_type}\.[0-9]+$`);
        if (!re.test(value)) {
            throw new Error(`Expecting ${type} in format `+ `${reserved_spaces}.${object_type}.[0-9]+ `+ `instead of ${value} ${field_name} ${value}`);
        }
        return value;
    },

    get_instance: function(reserve_spaces, type, value, field_name){
        if (this.is_empty(value) ){ return value; }
        this.require_object_type(reserve_spaces, type, value, field_name);
        return this.to_number(value.split('.')[2]);
    },

    require_relative_type: function(type, value, field_name){
        this.require_object_type(0, type, value, field_name);
        return value;
    },

    get_relative_instance: function(type, value, field_name){
        if (this.is_empty(value) ){ return value; }
        this.require_object_type(0, type, value, field_name);
        return this.to_number(value.split('.')[2]);
    },

    require_protocol_type: function(type, value, field_name){
        this.require_object_type(1, type, value, field_name);
        return value;
    },

    get_protocol_instance: function(type, value, field_name){
        if (this.is_empty(value) ){ return value; }
        this.require_object_type(1, type, value, field_name);
        return this.to_number(value.split('.')[2]);
    },

    get_protocol_type: function(value, field_name){
        if (this.is_empty(value) ){ return value; }
        this.require_object_id(value, field_name);
        var values = value.split('.');
        return this.to_number(values[1]);
    },

    get_protocol_type_name(value, field_name){
        if (this.is_empty(value) ){ return value; }
        var type_id = this.get_protocol_type(value, field_name);
        return (Object.keys(__WEBPACK_IMPORTED_MODULE_1__chain_src_ChainTypes__["a" /* default */].object_type))[type_id];
    },

    require_implementation_type: function(type, value, field_name){
        this.require_object_type(2, type, value, field_name);
        return value;
    },

    get_implementation_instance: function(type, value, field_name){
        if (this.is_empty(value) ){ return value; }
        this.require_object_type(2, type, value, field_name);
        return this.to_number(value.split('.')[2]);
    },

    // signed / unsigned decimal
    no_overflow53(value, field_name=""){
        if (typeof value === "number") {
            if (value > MAX_SAFE_INT || value < MIN_SAFE_INT) {
                throw new Error(`overflow ${field_name} ${value}`);
            }
            return;
        }
        if (typeof value === "string") {
            var int = parseInt(value);
            if (value > MAX_SAFE_INT || value < MIN_SAFE_INT) {
                throw new Error(`overflow ${field_name} ${value}`);
            }
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].isLong(value) ){
            // typeof value.toInt() is 'number'
            this.no_overflow53(value.toInt(), field_name);
            return;
        }
        throw `unsupported type ${field_name}: (${typeof value}) ${value}`;
    },

    // signed / unsigned whole numbers only
    no_overflow64(value, field_name=""){
        // https://github.com/dcodeIO/Long.js/issues/20
        if (__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].isLong(value) ){ return; }

        // BigInteger#isBigInteger https://github.com/cryptocoinjs/bigi/issues/20
        if (value.t !== undefined && value.s !== undefined) {
            this.no_overflow64(value.toString(), field_name);
            return;
        }

        if (typeof value === "string") {
            // remove leading zeros, will cause a false positive
            value = value.replace(/^0+/,'');
            // remove trailing zeros
            while (/0$/.test(value) ){
                value = value.substring(0, value.length - 1);
            }
            if (/\.$/.test(value) ){
                // remove trailing dot
                value = value.substring(0, value.length - 1);
            }
            if (value === "") { value = "0"; }
            var long_string = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromString(value).toString();
            if (long_string !== value.trim()) {
                throw new Error(`overflow ${field_name} ${value}`);
            }
            return;
        }
        if (typeof value === "number") {
            if (value > MAX_SAFE_INT || value < MIN_SAFE_INT) {
                throw new Error(`overflow ${field_name} ${value}`);
            }
            return;
        }

        throw `unsupported type ${field_name}: (${typeof value}) ${value}`;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (_my);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ecurve__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ecurve___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ecurve__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bigi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bs58__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bs58___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bs58__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PublicKey__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_deep_equal__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_deep_equal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_deep_equal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_assert__);









const secp256k1 = Object(__WEBPACK_IMPORTED_MODULE_0_ecurve__["getCurveByName"])('secp256k1');
const {G, n} = secp256k1;

class PrivateKey {

    /**
        @private see static functions
        @param {BigInteger}
    */
    constructor(d) { this.d = d; }

    static fromBuffer(buf) {
        if (!Buffer.isBuffer(buf)) {
            throw new Error("Expecting paramter to be a Buffer type");
        }
        if (32 !== buf.length) {
            console.log(`WARN: Expecting 32 bytes, instead got ${buf.length}, stack trace:`, new Error().stack);
        }
        if (buf.length === 0) {
            throw new Error("Empty buffer");
        }
        return new PrivateKey(__WEBPACK_IMPORTED_MODULE_1_bigi___default.a.fromBuffer(buf));
    }

    /** @arg {string} seed - any length string.  This is private, the same seed produces the same private key every time.  */
    static fromSeed(seed) { // generate_private_key
        if (!(typeof seed === 'string')) {
            throw new Error('seed must be of type string');
        }
        return PrivateKey.fromBuffer(Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(seed));
    }

    /** @return {string} Wallet Import Format (still a secret, Not encrypted) */
    static fromWif(_private_wif) {
        var private_wif = new Buffer(Object(__WEBPACK_IMPORTED_MODULE_2_bs58__["decode"])(_private_wif));
        var version = private_wif.readUInt8(0);
        __WEBPACK_IMPORTED_MODULE_6_assert___default.a.equal(0x80, version, `Expected version ${0x80}, instead got ${version}`);
        // checksum includes the version
        var private_key = private_wif.slice(0, -4);
        var checksum = private_wif.slice(-4);
        var new_checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(private_key);
        new_checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(new_checksum);
        new_checksum = new_checksum.slice(0, 4);
        var isEqual = __WEBPACK_IMPORTED_MODULE_5_deep_equal___default()(checksum, new_checksum); //, 'Invalid checksum'
        if (!isEqual) {
            throw new Error("Checksum did not match");
        }
        private_key = private_key.slice(1);
        return PrivateKey.fromBuffer(private_key);
    }

    toWif() {
        var private_key = this.toBuffer();
        // checksum includes the version
        private_key = Buffer.concat([new Buffer([0x80]), private_key]);
        var checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(private_key);
        checksum = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])(checksum);
        checksum = checksum.slice(0, 4);
        var private_wif = Buffer.concat([private_key, checksum]);
        return Object(__WEBPACK_IMPORTED_MODULE_2_bs58__["encode"])(private_wif);
    }

    /**
        @return {Point}
    */
    toPublicKeyPoint() {
        var Q;
        return Q = secp256k1.G.multiply(this.d);
    }

    toPublicKey() {
        if (this.public_key) { return this.public_key; }
        return this.public_key = __WEBPACK_IMPORTED_MODULE_4__PublicKey__["a" /* default */].fromPoint(this.toPublicKeyPoint());
    }

    toBuffer() {
        return this.d.toBuffer(32);
    }


    /** ECIES */
    get_shared_secret(public_key, legacy = false) {
        public_key = toPublic(public_key)
        let KB = public_key.toUncompressed().toBuffer()
        let KBP = __WEBPACK_IMPORTED_MODULE_0_ecurve__["Point"].fromAffine(
            secp256k1,
            __WEBPACK_IMPORTED_MODULE_1_bigi___default.a.fromBuffer( KB.slice( 1,33 )), // x
            __WEBPACK_IMPORTED_MODULE_1_bigi___default.a.fromBuffer( KB.slice( 33,65 )) // y
        )
        let r = this.toBuffer()
        let P = KBP.multiply(__WEBPACK_IMPORTED_MODULE_1_bigi___default.a.fromBuffer(r))
        let S = P.affineX.toBuffer({size: 32})
        /*
        the input to sha512 must be exactly 32-bytes, to match the c++ implementation
        of get_shared_secret.  Right now S will be shorter if the most significant
        byte(s) is zero.  Pad it back to the full 32-bytes
        */
        if (!legacy && S.length < 32) {
           let pad = new Buffer(32 - S.length).fill(0);
           S = Buffer.concat([pad, S]);
        }

        // SHA512 used in ECIES
        return Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha512"])(S)
    }

    // /** ECIES (does not always match the Point.fromAffine version above) */
    // get_shared_secret(public_key){
    //     public_key = toPublic(public_key)
    //     var P = public_key.Q.multiply( this.d );
    //     var S = P.affineX.toBuffer({size: 32});
    //     // ECIES, adds an extra sha512
    //     return sha512(S);
    // }

    /** @throws {Error} - overflow of the key could not be derived */
    child( offset ) {
        offset = Buffer.concat([ this.toPublicKey().toBuffer(), offset ])
        offset = Object(__WEBPACK_IMPORTED_MODULE_3__hash__["sha256"])( offset )
        let c = __WEBPACK_IMPORTED_MODULE_1_bigi___default.a.fromBuffer(offset)

        if (c.compareTo(n) >= 0)
            throw new Error("Child offset went out of bounds, try again")

        let derived = this.d.add(c)//.mod(n)

        if( derived.signum() === 0 )
            throw new Error("Child offset derived to an invalid key, try again")

        return new PrivateKey( derived )
    }

    /* <helper_functions> */

    toByteBuffer() {
        var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
        this.appendByteBuffer(b);
        return b.copy(0, b.offset);
    }

    static fromHex(hex) {
        return PrivateKey.fromBuffer(new Buffer(hex, 'hex'));
    }

    toHex() {
        return this.toBuffer().toString('hex');
    }

    /* </helper_functions> */
}

/* harmony default export */ __webpack_exports__["a"] = (PrivateKey);

let toPublic = data => data == null ? data :
    data.Q ? data : __WEBPACK_IMPORTED_MODULE_4__PublicKey__["a" /* default */].fromStringOrThrow(data)


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_with_cause__ = __webpack_require__(41);



const HEX_DUMP = process.env.npm_config__graphene_serializer_hex_dump

class Serializer {

    constructor(operation_name, types) {
        this.operation_name = operation_name
        this.types = types
        if(this.types)
            this.keys = Object.keys(this.types)

        Serializer.printDebug = true
    }

    fromByteBuffer(b) {
        var object = {};
        var field = null;
        try {
            var iterable = this.keys;
            for (var i = 0, field; i < iterable.length; i++) {
                field = iterable[i];
                var type = this.types[field];
                try {
                    if (HEX_DUMP) {
                        if (type.operation_name) {
                            console.error(type.operation_name);
                        } else {
                            var o1 = b.offset;
                            type.fromByteBuffer(b);
                            var o2 = b.offset;
                            b.offset = o1;
                            //b.reset()
                            var _b = b.copy(o1, o2);
                            console.error(
                                `${this.operation_name}.${field}\t`,
                                _b.toHex()
                            );
                        }
                    }
                    object[field] = type.fromByteBuffer(b);
                } catch (e) {
                    if(Serializer.printDebug) {
                        console.error(`Error reading ${this.operation_name}.${field} in data:`);
                        b.printDebug();
                    }
                    throw e;
                }
            }

        } catch (error) {
            __WEBPACK_IMPORTED_MODULE_1__error_with_cause__["a" /* default */].throw(this.operation_name+'.'+field, error);
        }

        return object;
    }

    appendByteBuffer(b, object) {
        var field = null;
        try {
            var iterable = this.keys;
            for (var i = 0, field; i < iterable.length; i++) {
                field = iterable[i];
                var type = this.types[field];
                type.appendByteBuffer(b, object[field]);
            }

        } catch (error) {
            try {
                __WEBPACK_IMPORTED_MODULE_1__error_with_cause__["a" /* default */].throw(this.operation_name+'.'+field+" = "+ JSON.stringify(object[field]), error);
            } catch (e) { // circular ref
                __WEBPACK_IMPORTED_MODULE_1__error_with_cause__["a" /* default */].throw(this.operation_name+'.'+field+" = "+ object[field], error);
            }
        }
        return;
    }

    fromObject(serialized_object){
        var result = {};
        var field = null;
        try {
            var iterable = this.keys;
            for (var i = 0, field; i < iterable.length; i++) {
                field = iterable[i];
                var type = this.types[field];
                var value = serialized_object[field];
                //DEBUG value = value.resolve if value.resolve
                //DEBUG console.log('... value',field,value)
                var object = type.fromObject(value);
                result[field] = object;
            }

        } catch (error) {
            __WEBPACK_IMPORTED_MODULE_1__error_with_cause__["a" /* default */].throw(this.operation_name+'.'+field, error);
        }

        return result;
    }

    /**
        @arg {boolean} [debug.use_default = false] - more template friendly
        @arg {boolean} [debug.annotate = false] - add user-friendly information
    */
    toObject(serialized_object = {}, debug = { use_default: false, annotate: false }){
        var result = {};
        var field = null;
        try {
            if( ! this.types )
                return result;

            var iterable = this.keys;
            for (var i = 0, field; i < iterable.length; i++) {
                field = iterable[i];
                var type = this.types[field];
                var object = type.toObject(((typeof serialized_object !== "undefined" && serialized_object !== null) ? serialized_object[field] : undefined), debug);
                result[field] = object;
                if(HEX_DUMP) {
                    var b = new __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a(__WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.DEFAULT_CAPACITY, __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.LITTLE_ENDIAN);
                    type.appendByteBuffer(b, ((typeof serialized_object !== "undefined" && serialized_object !== null) ? serialized_object[field] : undefined));
                    b = b.copy(0, b.offset);
                    console.error(
                        this.operation_name+'.'+field,
                        b.toHex()
                    );
                }
            }
        } catch (error) {
            __WEBPACK_IMPORTED_MODULE_1__error_with_cause__["a" /* default */].throw(this.operation_name+'.'+field, error);
        }

        return result;
    }

    /** Sort by the first element in a operation */
    compare(a, b) {

        let first_key = this.keys[0]
        let first_type = this.types[first_key]

        let valA = a[first_key]
        let valB = b[first_key]

        if(first_type.compare)
            return first_type.compare(valA, valB)

        if(typeof valA === "number" && typeof valB === "number")
            return valA - valB

        let encoding
        if(Buffer.isBuffer(valA) && Buffer.isBuffer(valB)) {
            // A binary string compare does not work.  If localeCompare is well supported that could replace HEX.  Performanance is very good so comparing HEX works.
            encoding = "hex"
        }

        let strA = valA.toString(encoding)
        let strB = valB.toString(encoding)
        return strA > strB ? 1 : strA < strB ? -1 : 0
    }

    // <helper_functions>

    fromHex(hex) {
        var b = __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.fromHex(hex, __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.LITTLE_ENDIAN);
        return this.fromByteBuffer(b);
    }

    fromBuffer(buffer){
        var b = __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.fromBinary(buffer.toString("binary"), __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.LITTLE_ENDIAN);
        return this.fromByteBuffer(b);
    }

    toHex(object) {
        // return this.toBuffer(object).toString("hex")
        var b=this.toByteBuffer(object);
        return b.toHex();
    }

    toByteBuffer(object) {
        var b = new __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a(__WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.DEFAULT_CAPACITY, __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.LITTLE_ENDIAN);
        this.appendByteBuffer(b, object);
        return b.copy(0, b.offset);
    }

    toBuffer(object){
        return new Buffer(this.toByteBuffer(object).toBinary(), 'binary');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Serializer);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecc_src_PublicKey__ = __webpack_require__(5);


class FastParser {

    static fixed_data(b, len, buffer) {
        if (!b) {
            return;
        }
        if (buffer) {
            let data = buffer.slice(0, len).toString('binary');
            b.append(data, 'binary');
            while (len-- > data.length) {
                b.writeUint8(0);
            }
        } else {
            let b_copy = b.copy(b.offset, b.offset + len);
            b.skip(len);
            return new Buffer(b_copy.toBinary(), 'binary');
        }
    }


    static public_key(b, public_key) {
        if (!b) { return; }
        if (public_key) {
            var buffer = public_key.toBuffer();
            b.append(buffer.toString('binary'), 'binary');
            return;
        } else {
            buffer = FastParser.fixed_data(b, 33);
            return __WEBPACK_IMPORTED_MODULE_0__ecc_src_PublicKey__["a" /* default */].fromBuffer(buffer);
        }
    }

    static ripemd160(b, ripemd160) {
        if (!b) { return; }
        if (ripemd160) {
            FastParser.fixed_data(b, 20, ripemd160);
            return;
        } else {
            return FastParser.fixed_data(b, 20);
        }
    }

    static time_point_sec(b, epoch) {
        if (epoch) {
            epoch = Math.ceil(epoch / 1000);
            b.writeInt32(epoch);
            return;
        } else {
            epoch = b.readInt32(); // fc::time_point_sec
            return new Date(epoch * 1000);
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FastParser);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var basex = __webpack_require__(46)
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(49);
var isArguments = __webpack_require__(50);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FastParser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chain_src_ChainTypes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chain_src_ObjectId__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ecc__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cybexjs_ws__);


// Low-level types that make up operations










var Types = {};

const HEX_DUMP = process.env.npm_config__graphene_serializer_hex_dump


Types.uint8 = {

    fromByteBuffer(b){
        return b.readUint8();
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFF,object, `uint8 ${object}`);
        b.writeUint8(object);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFF,object, `uint8 ${object}`);
        return object;
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return 0; }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFF,object, `uint8 ${object}`);
        return parseInt(object);
    }
    };

Types.uint16 =
    {fromByteBuffer(b){
        return b.readUint16();
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFF,object, `uint16 ${object}`);
        b.writeUint16(object);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFF,object, `uint16 ${object}`);
        return object;
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return 0; }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFF,object, `uint16 ${object}`);
        return parseInt(object);
    }
    };

Types.uint32 =
    {fromByteBuffer(b){
        return b.readUint32();
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFFFFFF,object, `uint32 ${object}`);
        b.writeUint32(object);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFFFFFF,object, `uint32 ${object}`);
        return object;
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return 0; }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFFFFFF,object, `uint32 ${object}`);
        return parseInt(object);
    }
    };

var MIN_SIGNED_32 = -1 * Math.pow(2,31);
var MAX_SIGNED_32 = Math.pow(2,31) - 1;

Types.varint32 =
    {fromByteBuffer(b){
        return b.readVarint32();
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(
            MIN_SIGNED_32,
            MAX_SIGNED_32,
            object,
            `uint32 ${object}`
        );
        b.writeVarint32(object);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(
            MIN_SIGNED_32,
            MAX_SIGNED_32,
            object,
            `uint32 ${object}`
        );
        return object;
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return 0; }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(
            MIN_SIGNED_32,
            MAX_SIGNED_32,
            object,
            `uint32 ${object}`
        );
        return parseInt(object);
    }
    };

Types.int64 =
    {fromByteBuffer(b){
        return b.readInt64();
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        b.writeInt64(__WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_long(object));
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        return __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_long(object);
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return "0"; }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        return __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_long(object).toString();
    }
    };

Types.uint64 =
    {fromByteBuffer(b){
        return b.readUint64();
    },
    appendByteBuffer(b, object){
        b.writeUint64(__WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_long(__WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].unsigned(object)));
        return;
    },
    fromObject(object){
        return __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_long(__WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].unsigned(object));
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return "0"; }
        return __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_long(object).toString();
    }
    };

Types.string =
    {fromByteBuffer(b){
        var b_copy;
        var len = b.readVarint32();
        b_copy = b.copy(b.offset, b.offset + len), b.skip(len);
        return new Buffer(b_copy.toBinary(), 'binary');
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        b.writeVarint32(object.length);
        b.append(object.toString('binary'), 'binary');
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        return new Buffer(object);
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return ""; }
        return object.toString();
    }
    };

Types.bytes = function(size){
    return {fromByteBuffer(b){
        if (size === undefined) {
            var b_copy;
            var len = b.readVarint32();
            b_copy = b.copy(b.offset, b.offset + len), b.skip(len);
            return new Buffer(b_copy.toBinary(), 'binary');
        } else {
            b_copy = b.copy(b.offset, b.offset + size), b.skip(size);
            return new Buffer(b_copy.toBinary(), 'binary');
        }
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if(typeof object === "string")
            object = new Buffer(object, "hex")

        if (size === undefined) {
            b.writeVarint32(object.length);
        }
        b.append(object.toString('binary'), 'binary');
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if( Buffer.isBuffer(object) )
            return object

        return new Buffer(object, 'hex');
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            var zeros=function(num){ return new Array( num ).join( "00" ); };
            return zeros(size);
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        return object.toString('hex');
    }
    };
};

Types.bool =
    {fromByteBuffer(b){
        return b.readUint8() === 1
    },
    appendByteBuffer(b, object){
        // supports boolean or integer
        b.writeUint8(JSON.parse(object) ? 1 : 0);
        return;
    },
    fromObject(object){
        return JSON.parse(object) ? true : false
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) { return false; }
        return JSON.parse(object) ? true : false
    }
};

Types.void =
    {fromByteBuffer(b){
        throw new Error("(void) undefined type");
    },
    appendByteBuffer(b, object){
        throw new Error("(void) undefined type");
    },
    fromObject(object){
        throw new Error("(void) undefined type");
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return undefined;
        }
        throw new Error("(void) undefined type");
    }
    };

Types.array = function(st_operation){
    return {fromByteBuffer(b){
        var size = b.readVarint32();
        if (HEX_DUMP) {
            console.log("varint32 size = " + size.toString(16));
        }
        var result = [];
        for (var i = 0; 0 < size ? i < size : i > size; 0 < size ? i++ : i++) {
            result.push(st_operation.fromByteBuffer(b));
        }
        return sortOperation(result, st_operation);
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object)
        object = sortOperation(object, st_operation)
        b.writeVarint32(object.length);
        for (var i = 0, o; i < object.length; i++) {
            o = object[i];
            st_operation.appendByteBuffer(b, o);
        }
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object)
        object = sortOperation(object, st_operation)
        var result = [];
        for (var i = 0, o; i < object.length; i++) {
            o = object[i];
            result.push(st_operation.fromObject(o));
        }
        return result;
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return [ st_operation.toObject(object, debug) ];
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object)
        object = sortOperation(object, st_operation)

        var result = [];
        for (var i = 0, o; i < object.length; i++) {
            o = object[i];
            result.push(st_operation.toObject(o, debug));
        }
        return result;
    }
    };
};

Types.time_point_sec = {
    fromByteBuffer(b){ return b.readUint32(); },
    appendByteBuffer(b, object){
        if(typeof object !== "number")
            object = Types.time_point_sec.fromObject(object)

        b.writeUint32(object);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object)

        if(typeof object === "number")
            return object

        if(object.getTime)
            return Math.floor( object.getTime() / 1000 );

        if(typeof object !== "string")
            throw new Error("Unknown date type: " + object)

        // if(typeof object === "string" && !/Z$/.test(object))
        //     object = object + "Z"

        return Math.floor( new Date(object).getTime() / 1000 );
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined)
            return (new Date(0)).toISOString().split('.')[0];

        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object)

        if(typeof object === "string")
            return object

        if(object.getTime)
            return object.toISOString().split('.')[0]

        var int = parseInt(object);
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xFFFFFFFF,int, `uint32 ${object}`);
        return (new Date( int * 1000 )).toISOString().split('.')[0];
    }
}

Types.set = function(st_operation){
    return {validate(array){
        var dup_map = {};
        for (var i = 0, o; i < array.length; i++) {
            o = array[i];
            var ref;
            if (ref = typeof o, ['string', 'number'].indexOf(ref) >= 0) {
                if (dup_map[o] !== undefined) {
                    throw new Error("duplicate (set)");
                }
                dup_map[o] = true;
            }
        }
        return sortOperation(array, st_operation);
    },
    fromByteBuffer(b){
        var size = b.readVarint32();
        if (HEX_DUMP) {
            console.log("varint32 size = " + size.toString(16));
        }
        return this.validate(((() => {
            var result = [];
            for (var i = 0; 0 < size ? i < size : i > size; 0 < size ? i++ : i++) {
                result.push(st_operation.fromByteBuffer(b));
            }
            return result;
        })()));
    },
    appendByteBuffer(b, object){
        if (!object) { object = []; }
        b.writeVarint32(object.length);
        var iterable = this.validate(object);
        for (var i = 0, o; i < iterable.length; i++) {
            o = iterable[i];
            st_operation.appendByteBuffer(b, o);
        }
        return;
    },
    fromObject(object){
        if (!object) { object = []; }
        return this.validate(((() => {
            var result = [];
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                result.push(st_operation.fromObject(o));
            }
            return result;
        })()));
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return [ st_operation.toObject(object, debug) ];
        }
        if (!object) { object = []; }
        return this.validate(((() => {
            var result = [];
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                result.push(st_operation.toObject(o, debug));
            }
            return result;
        })()));
    }
    };
};

// global_parameters_update_operation current_fees
Types.fixed_array = function(count, st_operation) {
  return {
    fromByteBuffer: function(b) {
      var i, j, ref, results;
      results = [];
      for (i = j = 0, ref = count; j < ref; i = j += 1) {
        results.push(st_operation.fromByteBuffer(b));
      }
      return sortOperation(results, st_operation);
    },
    appendByteBuffer: function(b, object) {
      var i, j, ref;
      if (count !== 0) {
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        object = sortOperation(object, st_operation)
      }
      for (i = j = 0, ref = count; j < ref; i = j += 1) {
        st_operation.appendByteBuffer(b, object[i]);
      }
    },
    fromObject: function(object) {
      var i, j, ref, results;
      if (count !== 0) {
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
      }
      results = [];
      for (i = j = 0, ref = count; j < ref; i = j += 1) {
        results.push(st_operation.fromObject(object[i]));
      }
      return results;
    },
    toObject: function(object, debug) {
      var i, j, k, ref, ref1, results, results1;
      if (debug == null) {
        debug = {};
      }
      if (debug.use_default && object === void 0) {
        results = [];
        for (i = j = 0, ref = count; j < ref; i = j += 1) {
          results.push(st_operation.toObject(void 0, debug));
        }
        return results;
      }
      if (count !== 0) {
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
      }
      results1 = [];
      for (i = k = 0, ref1 = count; k < ref1; i = k += 1) {
        results1.push(st_operation.toObject(object[i], debug));
      }
      return results1;
    }
  };
};

/* Supports instance numbers (11) or object types (1.2.11).  Object type
Validation is enforced when an object type is used. */
var id_type = function(reserved_spaces, object_type){
    __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(reserved_spaces, "reserved_spaces");
    __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object_type, "object_type");
    return {fromByteBuffer(b){
        return b.readVarint32();
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.resolve !== undefined) { object = object.resolve; }
        // convert 1.2.n into just n
        if (/^[0-9]+\.[0-9]+\.[0-9]+$/.test(object)) {
            object = __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].get_instance(reserved_spaces, object_type, object);
        }
        b.writeVarint32(__WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_number(object));
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.resolve !== undefined) { object = object.resolve; }
        if (__WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].is_digits(object)) {
            return __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].to_number(object);
        }
        return __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].get_instance(reserved_spaces, object_type, object);
    },
    toObject(object, debug = {}){
        var object_type_id = __WEBPACK_IMPORTED_MODULE_2__chain_src_ChainTypes__["a" /* default */].object_type[object_type];
        if (debug.use_default && object === undefined) {
            return `${reserved_spaces}.${object_type_id}.0`;
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.resolve !== undefined) { object = object.resolve; }
        if (/^[0-9]+\.[0-9]+\.[0-9]+$/.test(object)) {
            object = __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].get_instance(reserved_spaces, object_type, object);
        }

        return `${reserved_spaces}.${object_type_id}.`+object;
    },
    };
};

Types.protocol_id_type = function(name){
    __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(name, "name")
    return id_type(__WEBPACK_IMPORTED_MODULE_2__chain_src_ChainTypes__["a" /* default */].reserved_spaces.protocol_ids, name);
};

Types.object_id_type =
    {fromByteBuffer(b){
        return __WEBPACK_IMPORTED_MODULE_3__chain_src_ObjectId__["a" /* default */].fromByteBuffer(b);
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.resolve !== undefined) { object = object.resolve; }
        object = __WEBPACK_IMPORTED_MODULE_3__chain_src_ObjectId__["a" /* default */].fromString(object);
        object.appendByteBuffer(b);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.resolve !== undefined) { object = object.resolve; }
        return __WEBPACK_IMPORTED_MODULE_3__chain_src_ObjectId__["a" /* default */].fromString(object);
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return "0.0.0";
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.resolve !== undefined) {
            object = object.resolve;
        }
        object = __WEBPACK_IMPORTED_MODULE_3__chain_src_ObjectId__["a" /* default */].fromString(object);
        return object.toString();
    }
};

Types.vote_id =
    {TYPE: 0x000000FF,
    ID:   0xFFFFFF00,
    fromByteBuffer(b){
        var value = b.readUint32();
        return {
            type: value & this.TYPE,
            id: value & this.ID
        };
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if(object === "string")
            object = Types.vote_id.fromObject(object)

        var value = object.id << 8 | object.type
        b.writeUint32(value);
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object, "(type vote_id)");
        if(typeof object === "object") {
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object.type, "type")
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object.id, "id")
            return object
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_test(/^[0-9]+:[0-9]+$/, object, `vote_id format ${object}`);
        var [type, id] = object.split(':');
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xff,type,`vote type ${object}`);
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].require_range(0,0xffffff,id,`vote id ${object}`);
        return { type, id };
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return "0:0";
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if(typeof object === "string")
            object = Types.vote_id.fromObject(object)

        return object.type + ":" + object.id;
    },
    compare(a, b) {
        if(typeof a !== "object") a = Types.vote_id.fromObject(a)
        if(typeof b !== "object") b = Types.vote_id.fromObject(b)
        return parseInt(a.id) - parseInt(b.id);
    }
};

Types.optional = function(st_operation){
    __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(st_operation, "st_operation");
    return {fromByteBuffer(b){
        if (!(b.readUint8() === 1)) {
            return undefined;
        }
        return st_operation.fromByteBuffer(b);
    },
    appendByteBuffer(b, object){
        if (object !== null && object !== undefined) {
            b.writeUint8(1);
            st_operation.appendByteBuffer(b, object);
        } else {
            b.writeUint8(0);
        }
        return;
    },
    fromObject(object){
        if (object === undefined) { return undefined; }
        return st_operation.fromObject(object);
    },
    toObject(object, debug = {}){
        // toObject is only null save if use_default is true
        var result_object = (() => {
            if (!debug.use_default && object === undefined) {
                return undefined;
            } else {
                return st_operation.toObject(object, debug);
            }
        })();

        if (debug.annotate) {
            if (typeof result_object === "object") {
                result_object.__optional = "parent is optional";
            } else {
                result_object = {__optional: result_object};
            }
        }
        return result_object;
    }
    };
};

Types.static_variant = function(_st_operations){
    return {
        nosort: true,
        st_operations: _st_operations,
        fromByteBuffer(b){
            var type_id = b.readVarint32();
            var st_operation = this.st_operations[type_id];
            if (HEX_DUMP) {
                console.error(`static_variant id 0x${type_id.toString(16)} (${type_id})`);
            }
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(st_operation, `operation ${type_id}`);
            return [
                type_id,
                st_operation.fromByteBuffer(b)
            ];
        },
        appendByteBuffer(b, object){
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
            var type_id = object[0];
            var st_operation = this.st_operations[type_id];
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(st_operation, `operation ${type_id}`);
            b.writeVarint32(type_id);
            st_operation.appendByteBuffer(b, object[1]);
            return;
        },
        fromObject(object){
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
            var type_id = object[0];
            var st_operation = this.st_operations[type_id];
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(st_operation, `operation ${type_id}`);
            return [
                type_id,
                st_operation.fromObject(object[1])
            ];
        },
        toObject(object, debug = {}){
            if (debug.use_default && object === undefined) {
                return [0, this.st_operations[0].toObject(undefined, debug)];
            }
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
            var type_id = object[0];
            var st_operation = this.st_operations[type_id];
            __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(st_operation, `operation ${type_id}`);
            return [
                type_id,
                st_operation.toObject(object[1], debug)
            ];
        }
    };
};

Types.map = function(key_st_operation, value_st_operation){
    return {validate(array){
        if (!Array.isArray(array)) {
            throw new Error("expecting array");
        }
        var dup_map = {};
        for (var i = 0, o; i < array.length; i++) {
            o = array[i];
            var ref;
            if (!(o.length === 2)) {
                throw new Error("expecting two elements");
            }
            if (ref = typeof o[0], ['number', 'string'].indexOf(ref) >= 0) {
                if (dup_map[o[0]] !== undefined) {
                    throw new Error("duplicate (map)");
                }
                dup_map[o[0]] = true;
            }
        }
        return sortOperation(array, key_st_operation);
    },

    fromByteBuffer(b){
        var result = [];
        var end = b.readVarint32();
        for (var i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i++) {
            result.push([
                key_st_operation.fromByteBuffer(b),
                value_st_operation.fromByteBuffer(b)
            ]);
        }
        return this.validate(result);
    },

    appendByteBuffer(b, object){
        this.validate(object);
        b.writeVarint32(object.length);
        for (var i = 0, o; i < object.length; i++) {
            o = object[i];
            key_st_operation.appendByteBuffer(b, o[0]);
            value_st_operation.appendByteBuffer(b, o[1]);
        }
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        var result = [];
        for (var i = 0, o; i < object.length; i++) {
            o = object[i];
            result.push([
                key_st_operation.fromObject(o[0]),
                value_st_operation.fromObject(o[1])
            ]);
        }
        return this.validate(result)
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return [
                [
                    key_st_operation.toObject(undefined, debug),
                    value_st_operation.toObject(undefined, debug)
                ]
            ];
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        object = this.validate(object);
        var result = []
        for (var i = 0, o; i < object.length; i++) {
            o = object[i];
            result.push([
                key_st_operation.toObject(o[0], debug),
                value_st_operation.toObject(o[1], debug)
            ]);
        }
        return result
    }
    };
};

Types.public_key = {
    toPublic(object){
        if (object.resolve !== undefined) { object = object.resolve; }
        return object == null ? object :
            object.Q ? object : __WEBPACK_IMPORTED_MODULE_4__ecc__["b" /* PublicKey */].fromStringOrThrow(object)
    },
    fromByteBuffer(b){
        return __WEBPACK_IMPORTED_MODULE_1__FastParser__["a" /* default */].public_key(b);
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        __WEBPACK_IMPORTED_MODULE_1__FastParser__["a" /* default */].public_key(b, Types.public_key.toPublic(object));
        return;
    },
    fromObject(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.Q) { return object; }
        return Types.public_key.toPublic(object);
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return __WEBPACK_IMPORTED_MODULE_5_cybexjs_ws__["ChainConfig"].address_prefix + "859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM";
        }
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        return object.toString()
    },
    compare(a, b) {
        return strCmp(a.toAddressString(), b.toAddressString())
    }
};

Types.address =
    {_to_address(object){
        __WEBPACK_IMPORTED_MODULE_0__SerializerValidation__["a" /* default */].required(object);
        if (object.addy) { return object; }
        return __WEBPACK_IMPORTED_MODULE_4__ecc__["a" /* Address */].fromString(object);
    },
    fromByteBuffer(b){
        return new __WEBPACK_IMPORTED_MODULE_4__ecc__["a" /* Address */](__WEBPACK_IMPORTED_MODULE_1__FastParser__["a" /* default */].ripemd160(b));
    },
    appendByteBuffer(b, object){
        __WEBPACK_IMPORTED_MODULE_1__FastParser__["a" /* default */].ripemd160(b, Types.address._to_address(object).toBuffer());
        return;
    },
    fromObject(object){
        return Types.address._to_address(object);
    },
    toObject(object, debug = {}){
        if (debug.use_default && object === undefined) {
            return __WEBPACK_IMPORTED_MODULE_5_cybexjs_ws__["ChainConfig"].address_prefix + "664KmHxSuQyDsfwo4WEJvWpzg1QKdg67S";
        }
        return Types.address._to_address(object).toString();
    },
    compare(a, b) {
        return strCmp(a.toString(), b.toString())
    }
}

let strCmp = (a, b) => a > b ? 1 : a < b ? -1 : 0
let firstEl = el => Array.isArray(el) ? el[0] : el
let sortOperation = (array, st_operation) =>
    st_operation.nosort ? array :
    st_operation.compare ? array.sort((a,b)=> st_operation.compare(firstEl(a), firstEl(b))) : // custom compare operation
    array.sort((a,b)=>
        typeof firstEl(a) === "number" && typeof firstEl(b) === "number" ? firstEl(a) - firstEl(b) :
        // A binary string compare does not work. Performanance is very good so HEX is used..  localeCompare is another option.
        Buffer.isBuffer(firstEl(a)) && Buffer.isBuffer(firstEl(b)) ? strCmp(firstEl(a).toString("hex"), firstEl(b).toString("hex")) :
        strCmp(firstEl(a).toString(), firstEl(b).toString())
    )

/* harmony default export */ __webpack_exports__["a"] = (Types);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_address__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_aes__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_PrivateKey__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_PublicKey__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_signature__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_BrainKey__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_KeyUtils__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_address__["a"]; });
/* unused harmony reexport Aes */
/* unused harmony reexport PrivateKey */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__src_PublicKey__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__src_signature__["a"]; });
/* unused harmony reexport brainKey */
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__src_hash__; });
/* unused harmony reexport key */












/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bs58__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bs58___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bs58__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_deep_equal__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_deep_equal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_deep_equal__);






/** Addresses are shortened non-reversable hashes of a public key.  The full PublicKey is preferred.
    @deprecated
*/
class Address {

    constructor(addy) { this.addy = addy; }

    static fromBuffer(buffer) {
        var _hash = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["sha512"])(buffer);
        var addy = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["ripemd160"])(_hash);
        return new Address(addy);
    };

    static fromString(string, address_prefix = __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["ChainConfig"].address_prefix) {
        var prefix = string.slice(0, address_prefix.length);
        __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(address_prefix, prefix, `Expecting key to begin with ${address_prefix}, instead got ${prefix}`);
        var addy = string.slice(address_prefix.length);
        addy = new Buffer(Object(__WEBPACK_IMPORTED_MODULE_3_bs58__["decode"])(addy), 'binary');
        var checksum = addy.slice(-4);
        addy = addy.slice(0, -4);
        var new_checksum = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["ripemd160"])(addy);
        new_checksum = new_checksum.slice(0, 4);
        var isEqual = __WEBPACK_IMPORTED_MODULE_4_deep_equal___default()(checksum, new_checksum); //, 'Invalid checksum'
        if (!isEqual) {
            throw new Error("Checksum did not match");
        }
        return new Address(addy);
    };

    /** @return Address - Compressed PTS format (by default) */
    static fromPublic(public_key, compressed = true, version = 56) {
        var sha2 = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["sha256"])(public_key.toBuffer(compressed));
        var rep = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["ripemd160"])(sha2);
        var versionBuffer = new Buffer(1);
        versionBuffer.writeUInt8((0xFF & version), 0);
        var addr = Buffer.concat([versionBuffer, rep]);
        var check = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["sha256"])(addr);
        check = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["sha256"])(check);
        var buffer = Buffer.concat([addr, check.slice(0, 4)]);
        return new Address(Object(__WEBPACK_IMPORTED_MODULE_2__hash__["ripemd160"])(buffer));
    };

    toBuffer() {
        return this.addy;
    }

    toString(address_prefix = __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["ChainConfig"].address_prefix) {

        console.log("AddY:");
        console.log(this.addy);
        var checksum = Object(__WEBPACK_IMPORTED_MODULE_2__hash__["ripemd160"])(this.addy);
        var addy = Buffer.concat([this.addy, checksum.slice(0, 4)]);
        return address_prefix + Object(__WEBPACK_IMPORTED_MODULE_3_bs58__["encode"])(addy);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Address);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js_aes__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js_aes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto_js_aes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js_enc_base64__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js_enc_base64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_crypto_js_enc_base64__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bytebuffer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bytebuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bytebuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hash__ = __webpack_require__(2);
// https://code.google.com/p/crypto-js







/** Provides symetric encrypt and decrypt via AES. */
class Aes {

    /** @private */
    constructor(iv, key) { this.iv = iv, this.key = key; }

    /** This is an excellent way to ensure that all references to Aes can not operate anymore (example: a wallet becomes locked).  An application should ensure there is only one Aes object instance for a given secret `seed`. */
    clear() {return this.iv = this.key = undefined; }

    /** @arg {string} seed - secret seed may be used to encrypt or decrypt. */
    static fromSeed(seed) {
        if (seed === undefined) { throw new Error("seed is required"); }
        var _hash = Object(__WEBPACK_IMPORTED_MODULE_5__hash__["sha512"])(seed);
        _hash = _hash.toString('hex');
        // DEBUG console.log('... fromSeed _hash',_hash)
        return Aes.fromSha512(_hash);
    };

    /** @arg {string} hash - A 128 byte hex string, typically one would call {@link fromSeed} instead. */
    static fromSha512(hash) {
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(hash.length, 128, `A Sha512 in HEX should be 128 characters long, instead got ${hash.length}`);
        var iv = __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.parse(hash.substring(64, 96));
        var key = __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.parse(hash.substring(0, 64));
        return new Aes(iv, key);
    };

    static fromBuffer(buf) {
        __WEBPACK_IMPORTED_MODULE_3_assert___default()(Buffer.isBuffer(buf), "Expecting Buffer")
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(buf.length, 64, `A Sha512 Buffer should be 64 characters long, instead got ${buf.length}`);
        return Aes.fromSha512( buf.toString("hex") )
    }
    /**
        @throws {Error} - "Invalid Key, ..."
        @arg {PrivateKey} private_key - required and used for decryption
        @arg {PublicKey} public_key - required and used to calcualte the shared secret
        @arg {string} [nonce = ""] optional but should always be provided and be unique when re-using the same private/public keys more than once.  This nonce is not a secret.
        @arg {string|Buffer} message - Encrypted message containing a checksum
        @return {Buffer}
    */
    static decrypt_with_checksum(private_key, public_key, nonce, message, legacy = false) {

        // Warning: Do not put `nonce = ""` in the arguments, in es6 this will not convert "null" into an emtpy string
        if( nonce == null ) // null or undefined
            nonce = ""

        if (!Buffer.isBuffer(message)) {
            message = new Buffer(message, 'hex');
        }

        var S = private_key.get_shared_secret(public_key, legacy);
        // D E B U G
        // console.log('decrypt_with_checksum', {
        //     priv_to_pub: private_key.toPublicKey().toString(),
        //     pub: public_key.toPublicKeyString(),
        //     nonce: nonce,
        //     message: message.length,
        //     S: S.toString('hex')
        // })

        var aes = Aes.fromSeed(Buffer.concat([
            // A null or empty string nonce will not effect the hash
            new Buffer(""+nonce),
            new Buffer(S.toString('hex'))
        ]))

        var planebuffer = aes.decrypt(message);
        if (!(planebuffer.length >= 4)) {
            throw new Error("Invalid key, could not decrypt message(1)");
        }

        // DEBUG console.log('... planebuffer',planebuffer)
        var checksum = planebuffer.slice(0, 4);
        var plaintext = planebuffer.slice(4);

        // console.log('... checksum',checksum.toString('hex'))
        // console.log('... plaintext',plaintext.toString())

        var new_checksum = Object(__WEBPACK_IMPORTED_MODULE_5__hash__["sha256"])(plaintext);
        new_checksum = new_checksum.slice(0, 4);
        new_checksum = new_checksum.toString('hex');

        if (!(checksum.toString('hex') === new_checksum)) {
            throw new Error("Invalid key, could not decrypt message(2)");
        }

        return plaintext;
    };

    /** Identical to {@link decrypt_with_checksum} but used to encrypt.  Should not throw an error.
        @return {Buffer} message - Encrypted message which includes a checksum
    */
    static encrypt_with_checksum(private_key, public_key, nonce, message) {

        // Warning: Do not put `nonce = ""` in the arguments, in es6 this will not convert "null" into an emtpy string

        if( nonce == null) // null or undefined
            nonce = ""

        if (!Buffer.isBuffer(message)) {
            message = new Buffer(message, 'binary');
        }

        var S = private_key.get_shared_secret(public_key);

        // D E B U G
        // console.log('encrypt_with_checksum', {
        //     priv_to_pub: private_key.toPublicKey().toString()
        //     pub: public_key.toPublicKeyString()
        //     nonce: nonce
        //     message: message.length
        //     S: S.toString('hex')
        // })

        var aes = Aes.fromSeed(Buffer.concat([
            // A null or empty string nonce will not effect the hash
            new Buffer(""+nonce),
            new Buffer(S.toString('hex'))
        ]));
        // DEBUG console.log('... S',S.toString('hex'))
        var checksum = Object(__WEBPACK_IMPORTED_MODULE_5__hash__["sha256"])(message).slice(0,4);
        var payload = Buffer.concat([checksum, message]);
        // DEBUG console.log('... payload',payload.toString())
        return aes.encrypt(payload);
    };

    /** @private */
    _decrypt_word_array(cipher) {
        // https://code.google.com/p/crypto-js/#Custom_Key_and_IV
        // see wallet_records.cpp master_key::decrypt_key
        return __WEBPACK_IMPORTED_MODULE_0_crypto_js_aes___default.a.decrypt({ ciphertext: cipher, salt: null}, this.key, {iv: this.iv});
    }

    /** @private */
    _encrypt_word_array(plaintext) {
        //https://code.google.com/p/crypto-js/issues/detail?id=85
        var cipher = __WEBPACK_IMPORTED_MODULE_0_crypto_js_aes___default.a.encrypt(plaintext, this.key, {iv: this.iv});
        return __WEBPACK_IMPORTED_MODULE_2_crypto_js_enc_base64___default.a.parse(cipher.toString());
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string} ciphertext
        @return {Buffer} binary
    */
    decrypt(ciphertext) {
        if (typeof ciphertext === "string") {
            ciphertext = new Buffer(ciphertext, 'binary');
        }
        if (!Buffer.isBuffer(ciphertext)) {
            throw new Error("buffer required");
        }
        __WEBPACK_IMPORTED_MODULE_3_assert___default()(ciphertext, "Missing cipher text");
        // hex is the only common format
        var hex = this.decryptHex(ciphertext.toString('hex'));
        return new Buffer(hex, 'hex');
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string} plaintext
        @return {Buffer} binary
    */
    encrypt(plaintext) {
        if (typeof plaintext === "string") {
            plaintext = new Buffer(plaintext, 'binary');
        }
        if (!Buffer.isBuffer(plaintext)) {
            throw new Error("buffer required");
        }
        //assert plaintext, "Missing plain text"
        // hex is the only common format
        var hex = this.encryptHex(plaintext.toString('hex'));
        return new Buffer(hex, 'hex');
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string|Buffer} plaintext
        @return {string} hex
    */
    encryptToHex(plaintext) {
        if (typeof plaintext === "string") {
            plaintext = new Buffer(plaintext, 'binary');
        }
        if (!Buffer.isBuffer(plaintext)) {
            throw new Error("buffer required");
        }
        //assert plaintext, "Missing plain text"
        // hex is the only common format
        return this.encryptHex(plaintext.toString('hex'));
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string} cipher - hex
        @return {string} binary (could easily be readable text)
    */
    decryptHex(cipher) {
        __WEBPACK_IMPORTED_MODULE_3_assert___default()(cipher, "Missing cipher text");
        // Convert data into word arrays (used by Crypto)
        var cipher_array = __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.parse(cipher);
        var plainwords = this._decrypt_word_array(cipher_array);
        return __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.stringify(plainwords);
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string} cipher - hex
        @return {Buffer} encoded as specified by the parameter
    */
    decryptHexToBuffer(cipher) {
        __WEBPACK_IMPORTED_MODULE_3_assert___default()(cipher, "Missing cipher text");
        // Convert data into word arrays (used by Crypto)
        var cipher_array = __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.parse(cipher);
        var plainwords = this._decrypt_word_array(cipher_array);
        var plainhex = __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.stringify(plainwords);
        return new Buffer(plainhex, 'hex');
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string} cipher - hex
        @arg {string} [encoding = 'binary'] - a valid Buffer encoding
        @return {String} encoded as specified by the parameter
    */
    decryptHexToText(cipher, encoding = 'binary') {
        return this.decryptHexToBuffer(cipher).toString(encoding);
    }

    /** This method does not use a checksum, the returned data must be validated some other way.
        @arg {string} plainhex - hex format
        @return {String} hex
    */
    encryptHex(plainhex) {
        var plain_array = __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.parse(plainhex);
        var cipher_array = this._encrypt_word_array(plain_array);
        return __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_hex___default.a.stringify(cipher_array);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Aes);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PrivateKey__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PublicKey__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__address__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__aes__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_secure_random__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_secure_random___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_secure_random__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_cybexjs_ws__);






// import dictionary from './dictionary_en';



// hash for .25 second
var HASH_POWER_MILLS = 250;

const key = {

    /** Uses 1 second of hashing power to create a key/password checksum.  An
    implementation can re-call this method with the same password to re-match
    the strength of the CPU (either after moving from a desktop to a mobile,
    mobile to desktop, or N years from now when CPUs are presumably stronger).

    A salt is used for all the normal reasons...

    @return object {
        aes_private: Aes,
        checksum: "{hash_iteration_count},{salt},{checksum}"
    }
    */
    aes_checksum(password){
        if (!(typeof password === "string")) { throw new "password string required"(); }
        var salt = __WEBPACK_IMPORTED_MODULE_5_secure_random___default.a.randomBuffer(4).toString('hex');
        var iterations = 0;
        var secret = salt + password;
        // hash for .1 second
        var start_t = Date.now();
        while (Date.now() - start_t < HASH_POWER_MILLS) {
            secret = Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(secret);
            iterations += 1;
        }

        var checksum = Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(secret);
        var checksum_string = [
            iterations,
            salt.toString('hex'),
            checksum.slice(0, 4).toString('hex')
        ].join( ',' );

        return {aes_private: __WEBPACK_IMPORTED_MODULE_3__aes__["a" /* default */].fromSeed(secret),
        checksum: checksum_string
        };
    },

    /** Provide a matching password and key_checksum.  A "wrong password"
    error is thrown if the password does not match.  If this method takes
    much more or less than 1 second to return, one should consider updating
    all encyrpted fields using a new key.key_checksum.
    */
    aes_private(password, key_checksum){
        var [iterations, salt, checksum] = key_checksum.split(',');
        var secret = salt + password;
        for (var i = 0; 0 < iterations ? i < iterations : i > iterations; 0 < iterations ? i++ : i++) {
            secret = Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(secret);
        }
        var new_checksum = Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(secret);
        if (!(new_checksum.slice(0, 4).toString('hex') === checksum)) {
            throw new Error("wrong password");
        }
        return __WEBPACK_IMPORTED_MODULE_3__aes__["a" /* default */].fromSeed(secret);
    },

    /**
        A week random number generator can run out of entropy.  This should ensure even the worst random number implementation will be reasonably safe.

        @param1 string entropy of at least 32 bytes
    */
    random32ByteBuffer(entropy = this.browserEntropy()) {

        if (!(typeof entropy === 'string')) {
            throw new Error("string required for entropy");
        }

        if (entropy.length < 32) {
            throw new Error("expecting at least 32 bytes of entropy");
        }

        var start_t = Date.now();

        while (Date.now() - start_t < HASH_POWER_MILLS)
            entropy = Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(entropy);

        var hash_array = [];
        hash_array.push(entropy);

        // Hashing for 1 second may helps the computer is not low on entropy (this method may be called back-to-back).
        hash_array.push(__WEBPACK_IMPORTED_MODULE_5_secure_random___default.a.randomBuffer(32));

        return Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(Buffer.concat(hash_array));
    },

    suggest_brain_key: function(dictionary = ",", entropy = this.browserEntropy()) {

        var randomBuffer = this.random32ByteBuffer(entropy);

        var word_count = 16;
        var dictionary_lines = dictionary.split(',');

        if (!(dictionary_lines.length === 49744)) {
            throw new Error(`expecting ${49744} but got ${dictionary_lines.length} dictionary words`);
        }

        var brainkey = [];
        var end = word_count * 2;

        for(let i = 0; i < end; i += 2) {

            // randomBuffer has 256 bits / 16 bits per word == 16 words
            var num = (randomBuffer[i]<<8) + randomBuffer[i+1];

            // convert into a number between 0 and 1 (inclusive)
            var rndMultiplier = num / Math.pow(2,16);
            var wordIndex = Math.round(dictionary_lines.length * rndMultiplier);

            brainkey.push(dictionary_lines[wordIndex]);
        }
        return this.normalize_brainKey(brainkey.join(' '));
    },

    get_random_key(entropy) {
        return __WEBPACK_IMPORTED_MODULE_0__PrivateKey__["a" /* default */].fromBuffer(this.random32ByteBuffer(entropy));
    },

    get_brainPrivateKey(brainKey, sequence = 0){
        if (sequence < 0) { throw new Error("invalid sequence"); }
        brainKey = key.normalize_brainKey(brainKey);
        return __WEBPACK_IMPORTED_MODULE_0__PrivateKey__["a" /* default */].fromBuffer( Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])(Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha512"])(
            brainKey + " " + sequence
        )) );
    },

    // Turn invisible space like characters into a single space
    normalize_brainKey(brainKey){
        if (!(typeof brainKey === 'string')) {
            throw new Error("string required for brainKey");
        }

        brainKey = brainKey.trim();
        return brainKey.split(/[\t\n\v\f\r ]+/).join(' ');
    },

    browserEntropy() {

        var entropyStr = ""
        try {
            entropyStr = (new Date()).toString() + " "+ window.screen.height + " " + window.screen.width + " " + window.screen.colorDepth + " " + " " + window.screen.availHeight + " " + window.screen.availWidth + " " + window.screen.pixelDepth+ navigator.language + " " + window.location + " " + window.history.length;

            for (var i = 0, mimeType; i < navigator.mimeTypes.length; i++) {
                mimeType = navigator.mimeTypes[i];
                entropyStr += mimeType.description + " " + mimeType.type + " " + mimeType.suffixes + " ";
            }
            console.log("INFO\tbrowserEntropy gathered")
        } catch(error) {
            //nodejs:ReferenceError: window is not defined
            entropyStr = Object(__WEBPACK_IMPORTED_MODULE_4__hash__["sha256"])((new Date()).toString())
        }

        var b = new Buffer(entropyStr);
        entropyStr += b.toString('binary') + " " + (new Date()).toString();
        return entropyStr;
    },

    // @return array of 5 legacy addresses for a pubkey string parameter.
    addresses(pubkey, address_prefix = __WEBPACK_IMPORTED_MODULE_6_cybexjs_ws__["ChainConfig"].address_prefix) {
        var public_key = __WEBPACK_IMPORTED_MODULE_1__PublicKey__["a" /* default */].fromPublicKeyString(pubkey, address_prefix);
        // S L O W
        var address_string = [
            __WEBPACK_IMPORTED_MODULE_2__address__["a" /* default */].fromPublic(public_key, false, 0).toString(address_prefix), // btc_uncompressed
            __WEBPACK_IMPORTED_MODULE_2__address__["a" /* default */].fromPublic(public_key, true, 0).toString(address_prefix),  // btc_compressed
            __WEBPACK_IMPORTED_MODULE_2__address__["a" /* default */].fromPublic(public_key, false, 56).toString(address_prefix),// pts_uncompressed
            __WEBPACK_IMPORTED_MODULE_2__address__["a" /* default */].fromPublic(public_key, true, 56).toString(address_prefix), // pts_compressed
            public_key.toAddressString(address_prefix) // bts_short, most recent format
        ];
        return address_string;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (key);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(69)(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// (public) Constructor
function BigInteger(a, b, c) {
  if (!(this instanceof BigInteger))
    return new BigInteger(a, b, c)

  if (a != null) {
    if ("number" == typeof a) this.fromNumber(a, b, c)
    else if (b == null && "string" != typeof a) this.fromString(a, 256)
    else this.fromString(a, b)
  }
}

var proto = BigInteger.prototype

// duck-typed isBigInteger
proto.__bigi = __webpack_require__(42).version
BigInteger.isBigInteger = function (obj, check_ver) {
  return obj && obj.__bigi && (!check_ver || obj.__bigi === proto.__bigi)
}

// Bits per digit
var dbits

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n) {
  while (--n >= 0) {
    var v = x * this[i++] + w[j] + c
    c = Math.floor(v / 0x4000000)
    w[j++] = v & 0x3ffffff
  }
  return c
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n) {
  var xl = x & 0x7fff,
    xh = x >> 15
  while (--n >= 0) {
    var l = this[i] & 0x7fff
    var h = this[i++] >> 15
    var m = xh * l + h * xl
    l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff)
    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30)
    w[j++] = l & 0x3fffffff
  }
  return c
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n) {
  var xl = x & 0x3fff,
    xh = x >> 14
  while (--n >= 0) {
    var l = this[i] & 0x3fff
    var h = this[i++] >> 14
    var m = xh * l + h * xl
    l = xl * l + ((m & 0x3fff) << 14) + w[j] + c
    c = (l >> 28) + (m >> 14) + xh * h
    w[j++] = l & 0xfffffff
  }
  return c
}

// wtf?
BigInteger.prototype.am = am1
dbits = 26

BigInteger.prototype.DB = dbits
BigInteger.prototype.DM = ((1 << dbits) - 1)
var DV = BigInteger.prototype.DV = (1 << dbits)

var BI_FP = 52
BigInteger.prototype.FV = Math.pow(2, BI_FP)
BigInteger.prototype.F1 = BI_FP - dbits
BigInteger.prototype.F2 = 2 * dbits - BI_FP

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz"
var BI_RC = new Array()
var rr, vv
rr = "0".charCodeAt(0)
for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv
rr = "a".charCodeAt(0)
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv
rr = "A".charCodeAt(0)
for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv

function int2char(n) {
  return BI_RM.charAt(n)
}

function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)]
  return (c == null) ? -1 : c
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for (var i = this.t - 1; i >= 0; --i) r[i] = this[i]
  r.t = this.t
  r.s = this.s
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1
  this.s = (x < 0) ? -1 : 0
  if (x > 0) this[0] = x
  else if (x < -1) this[0] = x + DV
  else this.t = 0
}

// return bigint initialized to value
function nbv(i) {
  var r = new BigInteger()
  r.fromInt(i)
  return r
}

// (protected) set from string and radix
function bnpFromString(s, b) {
  var self = this

  var k
  if (b == 16) k = 4
  else if (b == 8) k = 3
  else if (b == 256) k = 8; // byte array
  else if (b == 2) k = 1
  else if (b == 32) k = 5
  else if (b == 4) k = 2
  else {
    self.fromRadix(s, b)
    return
  }
  self.t = 0
  self.s = 0
  var i = s.length,
    mi = false,
    sh = 0
  while (--i >= 0) {
    var x = (k == 8) ? s[i] & 0xff : intAt(s, i)
    if (x < 0) {
      if (s.charAt(i) == "-") mi = true
      continue
    }
    mi = false
    if (sh == 0)
      self[self.t++] = x
    else if (sh + k > self.DB) {
      self[self.t - 1] |= (x & ((1 << (self.DB - sh)) - 1)) << sh
      self[self.t++] = (x >> (self.DB - sh))
    } else
      self[self.t - 1] |= x << sh
    sh += k
    if (sh >= self.DB) sh -= self.DB
  }
  if (k == 8 && (s[0] & 0x80) != 0) {
    self.s = -1
    if (sh > 0) self[self.t - 1] |= ((1 << (self.DB - sh)) - 1) << sh
  }
  self.clamp()
  if (mi) BigInteger.ZERO.subTo(self, self)
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s & this.DM
  while (this.t > 0 && this[this.t - 1] == c)--this.t
}

// (public) return string representation in given radix
function bnToString(b) {
  var self = this
  if (self.s < 0) return "-" + self.negate()
    .toString(b)
  var k
  if (b == 16) k = 4
  else if (b == 8) k = 3
  else if (b == 2) k = 1
  else if (b == 32) k = 5
  else if (b == 4) k = 2
  else return self.toRadix(b)
  var km = (1 << k) - 1,
    d, m = false,
    r = "",
    i = self.t
  var p = self.DB - (i * self.DB) % k
  if (i-- > 0) {
    if (p < self.DB && (d = self[i] >> p) > 0) {
      m = true
      r = int2char(d)
    }
    while (i >= 0) {
      if (p < k) {
        d = (self[i] & ((1 << p) - 1)) << (k - p)
        d |= self[--i] >> (p += self.DB - k)
      } else {
        d = (self[i] >> (p -= k)) & km
        if (p <= 0) {
          p += self.DB
          --i
        }
      }
      if (d > 0) m = true
      if (m) r += int2char(d)
    }
  }
  return m ? r : "0"
}

// (public) -this
function bnNegate() {
  var r = new BigInteger()
  BigInteger.ZERO.subTo(this, r)
  return r
}

// (public) |this|
function bnAbs() {
  return (this.s < 0) ? this.negate() : this
}

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s - a.s
  if (r != 0) return r
  var i = this.t
  r = i - a.t
  if (r != 0) return (this.s < 0) ? -r : r
  while (--i >= 0)
    if ((r = this[i] - a[i]) != 0) return r
  return 0
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1,
    t
  if ((t = x >>> 16) != 0) {
    x = t
    r += 16
  }
  if ((t = x >> 8) != 0) {
    x = t
    r += 8
  }
  if ((t = x >> 4) != 0) {
    x = t
    r += 4
  }
  if ((t = x >> 2) != 0) {
    x = t
    r += 2
  }
  if ((t = x >> 1) != 0) {
    x = t
    r += 1
  }
  return r
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if (this.t <= 0) return 0
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
}

// (public) return the number of bytes in "this"
function bnByteLength() {
  return this.bitLength() >> 3
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n, r) {
  var i
  for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i]
  for (i = n - 1; i >= 0; --i) r[i] = 0
  r.t = this.t + n
  r.s = this.s
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n, r) {
  for (var i = n; i < this.t; ++i) r[i - n] = this[i]
  r.t = Math.max(this.t - n, 0)
  r.s = this.s
}

// (protected) r = this << n
function bnpLShiftTo(n, r) {
  var self = this
  var bs = n % self.DB
  var cbs = self.DB - bs
  var bm = (1 << cbs) - 1
  var ds = Math.floor(n / self.DB),
    c = (self.s << bs) & self.DM,
    i
  for (i = self.t - 1; i >= 0; --i) {
    r[i + ds + 1] = (self[i] >> cbs) | c
    c = (self[i] & bm) << bs
  }
  for (i = ds - 1; i >= 0; --i) r[i] = 0
  r[ds] = c
  r.t = self.t + ds + 1
  r.s = self.s
  r.clamp()
}

// (protected) r = this >> n
function bnpRShiftTo(n, r) {
  var self = this
  r.s = self.s
  var ds = Math.floor(n / self.DB)
  if (ds >= self.t) {
    r.t = 0
    return
  }
  var bs = n % self.DB
  var cbs = self.DB - bs
  var bm = (1 << bs) - 1
  r[0] = self[ds] >> bs
  for (var i = ds + 1; i < self.t; ++i) {
    r[i - ds - 1] |= (self[i] & bm) << cbs
    r[i - ds] = self[i] >> bs
  }
  if (bs > 0) r[self.t - ds - 1] |= (self.s & bm) << cbs
  r.t = self.t - ds
  r.clamp()
}

// (protected) r = this - a
function bnpSubTo(a, r) {
  var self = this
  var i = 0,
    c = 0,
    m = Math.min(a.t, self.t)
  while (i < m) {
    c += self[i] - a[i]
    r[i++] = c & self.DM
    c >>= self.DB
  }
  if (a.t < self.t) {
    c -= a.s
    while (i < self.t) {
      c += self[i]
      r[i++] = c & self.DM
      c >>= self.DB
    }
    c += self.s
  } else {
    c += self.s
    while (i < a.t) {
      c -= a[i]
      r[i++] = c & self.DM
      c >>= self.DB
    }
    c -= a.s
  }
  r.s = (c < 0) ? -1 : 0
  if (c < -1) r[i++] = self.DV + c
  else if (c > 0) r[i++] = c
  r.t = i
  r.clamp()
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a, r) {
  var x = this.abs(),
    y = a.abs()
  var i = x.t
  r.t = i + y.t
  while (--i >= 0) r[i] = 0
  for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t)
  r.s = 0
  r.clamp()
  if (this.s != a.s) BigInteger.ZERO.subTo(r, r)
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs()
  var i = r.t = 2 * x.t
  while (--i >= 0) r[i] = 0
  for (i = 0; i < x.t - 1; ++i) {
    var c = x.am(i, x[i], r, 2 * i, 0, 1)
    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
      r[i + x.t] -= x.DV
      r[i + x.t + 1] = 1
    }
  }
  if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1)
  r.s = 0
  r.clamp()
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m, q, r) {
  var self = this
  var pm = m.abs()
  if (pm.t <= 0) return
  var pt = self.abs()
  if (pt.t < pm.t) {
    if (q != null) q.fromInt(0)
    if (r != null) self.copyTo(r)
    return
  }
  if (r == null) r = new BigInteger()
  var y = new BigInteger(),
    ts = self.s,
    ms = m.s
  var nsh = self.DB - nbits(pm[pm.t - 1]); // normalize modulus
  if (nsh > 0) {
    pm.lShiftTo(nsh, y)
    pt.lShiftTo(nsh, r)
  } else {
    pm.copyTo(y)
    pt.copyTo(r)
  }
  var ys = y.t
  var y0 = y[ys - 1]
  if (y0 == 0) return
  var yt = y0 * (1 << self.F1) + ((ys > 1) ? y[ys - 2] >> self.F2 : 0)
  var d1 = self.FV / yt,
    d2 = (1 << self.F1) / yt,
    e = 1 << self.F2
  var i = r.t,
    j = i - ys,
    t = (q == null) ? new BigInteger() : q
  y.dlShiftTo(j, t)
  if (r.compareTo(t) >= 0) {
    r[r.t++] = 1
    r.subTo(t, r)
  }
  BigInteger.ONE.dlShiftTo(ys, t)
  t.subTo(y, y); // "negative" y so we can replace sub with am later
  while (y.t < ys) y[y.t++] = 0
  while (--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i] == y0) ? self.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2)
    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
      y.dlShiftTo(j, t)
      r.subTo(t, r)
      while (r[i] < --qd) r.subTo(t, r)
    }
  }
  if (q != null) {
    r.drShiftTo(ys, q)
    if (ts != ms) BigInteger.ZERO.subTo(q, q)
  }
  r.t = ys
  r.clamp()
  if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
  if (ts < 0) BigInteger.ZERO.subTo(r, r)
}

// (public) this mod a
function bnMod(a) {
  var r = new BigInteger()
  this.abs()
    .divRemTo(a, null, r)
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r)
  return r
}

// Modular reduction using "classic" algorithm
function Classic(m) {
  this.m = m
}

function cConvert(x) {
  if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m)
  else return x
}

function cRevert(x) {
  return x
}

function cReduce(x) {
  x.divRemTo(this.m, null, x)
}

function cMulTo(x, y, r) {
  x.multiplyTo(y, r)
  this.reduce(r)
}

function cSqrTo(x, r) {
  x.squareTo(r)
  this.reduce(r)
}

Classic.prototype.convert = cConvert
Classic.prototype.revert = cRevert
Classic.prototype.reduce = cReduce
Classic.prototype.mulTo = cMulTo
Classic.prototype.sqrTo = cSqrTo

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if (this.t < 1) return 0
  var x = this[0]
  if ((x & 1) == 0) return 0
  var y = x & 3; // y == 1/x mod 2^2
  y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
  y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
  y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y > 0) ? this.DV - y : -y
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m
  this.mp = m.invDigit()
  this.mpl = this.mp & 0x7fff
  this.mph = this.mp >> 15
  this.um = (1 << (m.DB - 15)) - 1
  this.mt2 = 2 * m.t
}

// xR mod m
function montConvert(x) {
  var r = new BigInteger()
  x.abs()
    .dlShiftTo(this.m.t, r)
  r.divRemTo(this.m, null, r)
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r)
  return r
}

// x/R mod m
function montRevert(x) {
  var r = new BigInteger()
  x.copyTo(r)
  this.reduce(r)
  return r
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while (x.t <= this.mt2) // pad x so am has enough room later
    x[x.t++] = 0
  for (var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i] & 0x7fff
    var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM
    // use am to combine the multiply-shift-add into one call
    j = i + this.m.t
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t)
    // propagate carry
    while (x[j] >= x.DV) {
      x[j] -= x.DV
      x[++j]++
    }
  }
  x.clamp()
  x.drShiftTo(this.m.t, x)
  if (x.compareTo(this.m) >= 0) x.subTo(this.m, x)
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x, r) {
  x.squareTo(r)
  this.reduce(r)
}

// r = "xy/R mod m"; x,y != r
function montMulTo(x, y, r) {
  x.multiplyTo(y, r)
  this.reduce(r)
}

Montgomery.prototype.convert = montConvert
Montgomery.prototype.revert = montRevert
Montgomery.prototype.reduce = montReduce
Montgomery.prototype.mulTo = montMulTo
Montgomery.prototype.sqrTo = montSqrTo

// (protected) true iff this is even
function bnpIsEven() {
  return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
}

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e, z) {
  if (e > 0xffffffff || e < 1) return BigInteger.ONE
  var r = new BigInteger(),
    r2 = new BigInteger(),
    g = z.convert(this),
    i = nbits(e) - 1
  g.copyTo(r)
  while (--i >= 0) {
    z.sqrTo(r, r2)
    if ((e & (1 << i)) > 0) z.mulTo(r2, g, r)
    else {
      var t = r
      r = r2
      r2 = t
    }
  }
  return z.revert(r)
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e, m) {
  var z
  if (e < 256 || m.isEven()) z = new Classic(m)
  else z = new Montgomery(m)
  return this.exp(e, z)
}

// protected
proto.copyTo = bnpCopyTo
proto.fromInt = bnpFromInt
proto.fromString = bnpFromString
proto.clamp = bnpClamp
proto.dlShiftTo = bnpDLShiftTo
proto.drShiftTo = bnpDRShiftTo
proto.lShiftTo = bnpLShiftTo
proto.rShiftTo = bnpRShiftTo
proto.subTo = bnpSubTo
proto.multiplyTo = bnpMultiplyTo
proto.squareTo = bnpSquareTo
proto.divRemTo = bnpDivRemTo
proto.invDigit = bnpInvDigit
proto.isEven = bnpIsEven
proto.exp = bnpExp

// public
proto.toString = bnToString
proto.negate = bnNegate
proto.abs = bnAbs
proto.compareTo = bnCompareTo
proto.bitLength = bnBitLength
proto.byteLength = bnByteLength
proto.mod = bnMod
proto.modPowInt = bnModPowInt

// (public)
function bnClone() {
  var r = new BigInteger()
  this.copyTo(r)
  return r
}

// (public) return value as integer
function bnIntValue() {
  if (this.s < 0) {
    if (this.t == 1) return this[0] - this.DV
    else if (this.t == 0) return -1
  } else if (this.t == 1) return this[0]
  else if (this.t == 0) return 0
  // assumes 16 < DB < 32
  return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0]
}

// (public) return value as byte
function bnByteValue() {
  return (this.t == 0) ? this.s : (this[0] << 24) >> 24
}

// (public) return value as short (assumes DB>=16)
function bnShortValue() {
  return (this.t == 0) ? this.s : (this[0] << 16) >> 16
}

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) {
  return Math.floor(Math.LN2 * this.DB / Math.log(r))
}

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if (this.s < 0) return -1
  else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0
  else return 1
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if (b == null) b = 10
  if (this.signum() == 0 || b < 2 || b > 36) return "0"
  var cs = this.chunkSize(b)
  var a = Math.pow(b, cs)
  var d = nbv(a),
    y = new BigInteger(),
    z = new BigInteger(),
    r = ""
  this.divRemTo(d, y, z)
  while (y.signum() > 0) {
    r = (a + z.intValue())
      .toString(b)
      .substr(1) + r
    y.divRemTo(d, y, z)
  }
  return z.intValue()
    .toString(b) + r
}

// (protected) convert from radix string
function bnpFromRadix(s, b) {
  var self = this
  self.fromInt(0)
  if (b == null) b = 10
  var cs = self.chunkSize(b)
  var d = Math.pow(b, cs),
    mi = false,
    j = 0,
    w = 0
  for (var i = 0; i < s.length; ++i) {
    var x = intAt(s, i)
    if (x < 0) {
      if (s.charAt(i) == "-" && self.signum() == 0) mi = true
      continue
    }
    w = b * w + x
    if (++j >= cs) {
      self.dMultiply(d)
      self.dAddOffset(w, 0)
      j = 0
      w = 0
    }
  }
  if (j > 0) {
    self.dMultiply(Math.pow(b, j))
    self.dAddOffset(w, 0)
  }
  if (mi) BigInteger.ZERO.subTo(self, self)
}

// (protected) alternate constructor
function bnpFromNumber(a, b, c) {
  var self = this
  if ("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if (a < 2) self.fromInt(1)
    else {
      self.fromNumber(a, c)
      if (!self.testBit(a - 1)) // force MSB set
        self.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, self)
      if (self.isEven()) self.dAddOffset(1, 0); // force odd
      while (!self.isProbablePrime(b)) {
        self.dAddOffset(2, 0)
        if (self.bitLength() > a) self.subTo(BigInteger.ONE.shiftLeft(a - 1), self)
      }
    }
  } else {
    // new BigInteger(int,RNG)
    var x = new Array(),
      t = a & 7
    x.length = (a >> 3) + 1
    b.nextBytes(x)
    if (t > 0) x[0] &= ((1 << t) - 1)
    else x[0] = 0
    self.fromString(x, 256)
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var self = this
  var i = self.t,
    r = new Array()
  r[0] = self.s
  var p = self.DB - (i * self.DB) % 8,
    d, k = 0
  if (i-- > 0) {
    if (p < self.DB && (d = self[i] >> p) != (self.s & self.DM) >> p)
      r[k++] = d | (self.s << (self.DB - p))
    while (i >= 0) {
      if (p < 8) {
        d = (self[i] & ((1 << p) - 1)) << (8 - p)
        d |= self[--i] >> (p += self.DB - 8)
      } else {
        d = (self[i] >> (p -= 8)) & 0xff
        if (p <= 0) {
          p += self.DB
          --i
        }
      }
      if ((d & 0x80) != 0) d |= -256
      if (k === 0 && (self.s & 0x80) != (d & 0x80))++k
      if (k > 0 || d != self.s) r[k++] = d
    }
  }
  return r
}

function bnEquals(a) {
  return (this.compareTo(a) == 0)
}

function bnMin(a) {
  return (this.compareTo(a) < 0) ? this : a
}

function bnMax(a) {
  return (this.compareTo(a) > 0) ? this : a
}

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a, op, r) {
  var self = this
  var i, f, m = Math.min(a.t, self.t)
  for (i = 0; i < m; ++i) r[i] = op(self[i], a[i])
  if (a.t < self.t) {
    f = a.s & self.DM
    for (i = m; i < self.t; ++i) r[i] = op(self[i], f)
    r.t = self.t
  } else {
    f = self.s & self.DM
    for (i = m; i < a.t; ++i) r[i] = op(f, a[i])
    r.t = a.t
  }
  r.s = op(self.s, a.s)
  r.clamp()
}

// (public) this & a
function op_and(x, y) {
  return x & y
}

function bnAnd(a) {
  var r = new BigInteger()
  this.bitwiseTo(a, op_and, r)
  return r
}

// (public) this | a
function op_or(x, y) {
  return x | y
}

function bnOr(a) {
  var r = new BigInteger()
  this.bitwiseTo(a, op_or, r)
  return r
}

// (public) this ^ a
function op_xor(x, y) {
  return x ^ y
}

function bnXor(a) {
  var r = new BigInteger()
  this.bitwiseTo(a, op_xor, r)
  return r
}

// (public) this & ~a
function op_andnot(x, y) {
  return x & ~y
}

function bnAndNot(a) {
  var r = new BigInteger()
  this.bitwiseTo(a, op_andnot, r)
  return r
}

// (public) ~this
function bnNot() {
  var r = new BigInteger()
  for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i]
  r.t = this.t
  r.s = ~this.s
  return r
}

// (public) this << n
function bnShiftLeft(n) {
  var r = new BigInteger()
  if (n < 0) this.rShiftTo(-n, r)
  else this.lShiftTo(n, r)
  return r
}

// (public) this >> n
function bnShiftRight(n) {
  var r = new BigInteger()
  if (n < 0) this.lShiftTo(-n, r)
  else this.rShiftTo(n, r)
  return r
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if (x == 0) return -1
  var r = 0
  if ((x & 0xffff) == 0) {
    x >>= 16
    r += 16
  }
  if ((x & 0xff) == 0) {
    x >>= 8
    r += 8
  }
  if ((x & 0xf) == 0) {
    x >>= 4
    r += 4
  }
  if ((x & 3) == 0) {
    x >>= 2
    r += 2
  }
  if ((x & 1) == 0)++r
  return r
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for (var i = 0; i < this.t; ++i)
    if (this[i] != 0) return i * this.DB + lbit(this[i])
  if (this.s < 0) return this.t * this.DB
  return -1
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0
  while (x != 0) {
    x &= x - 1
    ++r
  }
  return r
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0,
    x = this.s & this.DM
  for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x)
  return r
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n / this.DB)
  if (j >= this.t) return (this.s != 0)
  return ((this[j] & (1 << (n % this.DB))) != 0)
}

// (protected) this op (1<<n)
function bnpChangeBit(n, op) {
  var r = BigInteger.ONE.shiftLeft(n)
  this.bitwiseTo(r, op, r)
  return r
}

// (public) this | (1<<n)
function bnSetBit(n) {
  return this.changeBit(n, op_or)
}

// (public) this & ~(1<<n)
function bnClearBit(n) {
  return this.changeBit(n, op_andnot)
}

// (public) this ^ (1<<n)
function bnFlipBit(n) {
  return this.changeBit(n, op_xor)
}

// (protected) r = this + a
function bnpAddTo(a, r) {
  var self = this

  var i = 0,
    c = 0,
    m = Math.min(a.t, self.t)
  while (i < m) {
    c += self[i] + a[i]
    r[i++] = c & self.DM
    c >>= self.DB
  }
  if (a.t < self.t) {
    c += a.s
    while (i < self.t) {
      c += self[i]
      r[i++] = c & self.DM
      c >>= self.DB
    }
    c += self.s
  } else {
    c += self.s
    while (i < a.t) {
      c += a[i]
      r[i++] = c & self.DM
      c >>= self.DB
    }
    c += a.s
  }
  r.s = (c < 0) ? -1 : 0
  if (c > 0) r[i++] = c
  else if (c < -1) r[i++] = self.DV + c
  r.t = i
  r.clamp()
}

// (public) this + a
function bnAdd(a) {
  var r = new BigInteger()
  this.addTo(a, r)
  return r
}

// (public) this - a
function bnSubtract(a) {
  var r = new BigInteger()
  this.subTo(a, r)
  return r
}

// (public) this * a
function bnMultiply(a) {
  var r = new BigInteger()
  this.multiplyTo(a, r)
  return r
}

// (public) this^2
function bnSquare() {
  var r = new BigInteger()
  this.squareTo(r)
  return r
}

// (public) this / a
function bnDivide(a) {
  var r = new BigInteger()
  this.divRemTo(a, r, null)
  return r
}

// (public) this % a
function bnRemainder(a) {
  var r = new BigInteger()
  this.divRemTo(a, null, r)
  return r
}

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = new BigInteger(),
    r = new BigInteger()
  this.divRemTo(a, q, r)
  return new Array(q, r)
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0, n - 1, this, 0, 0, this.t)
  ++this.t
  this.clamp()
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n, w) {
  if (n == 0) return
  while (this.t <= w) this[this.t++] = 0
  this[w] += n
  while (this[w] >= this.DV) {
    this[w] -= this.DV
    if (++w >= this.t) this[this.t++] = 0
    ++this[w]
  }
}

// A "null" reducer
function NullExp() {}

function nNop(x) {
  return x
}

function nMulTo(x, y, r) {
  x.multiplyTo(y, r)
}

function nSqrTo(x, r) {
  x.squareTo(r)
}

NullExp.prototype.convert = nNop
NullExp.prototype.revert = nNop
NullExp.prototype.mulTo = nMulTo
NullExp.prototype.sqrTo = nSqrTo

// (public) this^e
function bnPow(e) {
  return this.exp(e, new NullExp())
}

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a, n, r) {
  var i = Math.min(this.t + a.t, n)
  r.s = 0; // assumes a,this >= 0
  r.t = i
  while (i > 0) r[--i] = 0
  var j
  for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t)
  for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i)
  r.clamp()
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a, n, r) {
  --n
  var i = r.t = this.t + a.t - n
  r.s = 0; // assumes a,this >= 0
  while (--i >= 0) r[i] = 0
  for (i = Math.max(n - this.t, 0); i < a.t; ++i)
    r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n)
  r.clamp()
  r.drShiftTo(1, r)
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = new BigInteger()
  this.q3 = new BigInteger()
  BigInteger.ONE.dlShiftTo(2 * m.t, this.r2)
  this.mu = this.r2.divide(m)
  this.m = m
}

function barrettConvert(x) {
  if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m)
  else if (x.compareTo(this.m) < 0) return x
  else {
    var r = new BigInteger()
    x.copyTo(r)
    this.reduce(r)
    return r
  }
}

function barrettRevert(x) {
  return x
}

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  var self = this
  x.drShiftTo(self.m.t - 1, self.r2)
  if (x.t > self.m.t + 1) {
    x.t = self.m.t + 1
    x.clamp()
  }
  self.mu.multiplyUpperTo(self.r2, self.m.t + 1, self.q3)
  self.m.multiplyLowerTo(self.q3, self.m.t + 1, self.r2)
  while (x.compareTo(self.r2) < 0) x.dAddOffset(1, self.m.t + 1)
  x.subTo(self.r2, x)
  while (x.compareTo(self.m) >= 0) x.subTo(self.m, x)
}

// r = x^2 mod m; x != r
function barrettSqrTo(x, r) {
  x.squareTo(r)
  this.reduce(r)
}

// r = x*y mod m; x,y != r
function barrettMulTo(x, y, r) {
  x.multiplyTo(y, r)
  this.reduce(r)
}

Barrett.prototype.convert = barrettConvert
Barrett.prototype.revert = barrettRevert
Barrett.prototype.reduce = barrettReduce
Barrett.prototype.mulTo = barrettMulTo
Barrett.prototype.sqrTo = barrettSqrTo

// (public) this^e % m (HAC 14.85)
function bnModPow(e, m) {
  var i = e.bitLength(),
    k, r = nbv(1),
    z
  if (i <= 0) return r
  else if (i < 18) k = 1
  else if (i < 48) k = 3
  else if (i < 144) k = 4
  else if (i < 768) k = 5
  else k = 6
  if (i < 8)
    z = new Classic(m)
  else if (m.isEven())
    z = new Barrett(m)
  else
    z = new Montgomery(m)

  // precomputation
  var g = new Array(),
    n = 3,
    k1 = k - 1,
    km = (1 << k) - 1
  g[1] = z.convert(this)
  if (k > 1) {
    var g2 = new BigInteger()
    z.sqrTo(g[1], g2)
    while (n <= km) {
      g[n] = new BigInteger()
      z.mulTo(g2, g[n - 2], g[n])
      n += 2
    }
  }

  var j = e.t - 1,
    w, is1 = true,
    r2 = new BigInteger(),
    t
  i = nbits(e[j]) - 1
  while (j >= 0) {
    if (i >= k1) w = (e[j] >> (i - k1)) & km
    else {
      w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i)
      if (j > 0) w |= e[j - 1] >> (this.DB + i - k1)
    }

    n = k
    while ((w & 1) == 0) {
      w >>= 1
      --n
    }
    if ((i -= n) < 0) {
      i += this.DB
      --j
    }
    if (is1) { // ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r)
      is1 = false
    } else {
      while (n > 1) {
        z.sqrTo(r, r2)
        z.sqrTo(r2, r)
        n -= 2
      }
      if (n > 0) z.sqrTo(r, r2)
      else {
        t = r
        r = r2
        r2 = t
      }
      z.mulTo(r2, g[w], r)
    }

    while (j >= 0 && (e[j] & (1 << i)) == 0) {
      z.sqrTo(r, r2)
      t = r
      r = r2
      r2 = t
      if (--i < 0) {
        i = this.DB - 1
        --j
      }
    }
  }
  return z.revert(r)
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s < 0) ? this.negate() : this.clone()
  var y = (a.s < 0) ? a.negate() : a.clone()
  if (x.compareTo(y) < 0) {
    var t = x
    x = y
    y = t
  }
  var i = x.getLowestSetBit(),
    g = y.getLowestSetBit()
  if (g < 0) return x
  if (i < g) g = i
  if (g > 0) {
    x.rShiftTo(g, x)
    y.rShiftTo(g, y)
  }
  while (x.signum() > 0) {
    if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x)
    if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y)
    if (x.compareTo(y) >= 0) {
      x.subTo(y, x)
      x.rShiftTo(1, x)
    } else {
      y.subTo(x, y)
      y.rShiftTo(1, y)
    }
  }
  if (g > 0) y.lShiftTo(g, y)
  return y
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if (n <= 0) return 0
  var d = this.DV % n,
    r = (this.s < 0) ? n - 1 : 0
  if (this.t > 0)
    if (d == 0) r = this[0] % n
    else
      for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n
  return r
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven()
  if (this.signum() === 0) throw new Error('division by zero')
  if ((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO
  var u = m.clone(),
    v = this.clone()
  var a = nbv(1),
    b = nbv(0),
    c = nbv(0),
    d = nbv(1)
  while (u.signum() != 0) {
    while (u.isEven()) {
      u.rShiftTo(1, u)
      if (ac) {
        if (!a.isEven() || !b.isEven()) {
          a.addTo(this, a)
          b.subTo(m, b)
        }
        a.rShiftTo(1, a)
      } else if (!b.isEven()) b.subTo(m, b)
      b.rShiftTo(1, b)
    }
    while (v.isEven()) {
      v.rShiftTo(1, v)
      if (ac) {
        if (!c.isEven() || !d.isEven()) {
          c.addTo(this, c)
          d.subTo(m, d)
        }
        c.rShiftTo(1, c)
      } else if (!d.isEven()) d.subTo(m, d)
      d.rShiftTo(1, d)
    }
    if (u.compareTo(v) >= 0) {
      u.subTo(v, u)
      if (ac) a.subTo(c, a)
      b.subTo(d, b)
    } else {
      v.subTo(u, v)
      if (ac) c.subTo(a, c)
      d.subTo(b, d)
    }
  }
  if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO
  while (d.compareTo(m) >= 0) d.subTo(m, d)
  while (d.signum() < 0) d.addTo(m, d)
  return d
}

var lowprimes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
  613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
  709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
  821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
  919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
]

var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs()
  if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
    for (i = 0; i < lowprimes.length; ++i)
      if (x[0] == lowprimes[i]) return true
    return false
  }
  if (x.isEven()) return false
  i = 1
  while (i < lowprimes.length) {
    var m = lowprimes[i],
      j = i + 1
    while (j < lowprimes.length && m < lplim) m *= lowprimes[j++]
    m = x.modInt(m)
    while (i < j) if (m % lowprimes[i++] == 0) return false
  }
  return x.millerRabin(t)
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE)
  var k = n1.getLowestSetBit()
  if (k <= 0) return false
  var r = n1.shiftRight(k)
  t = (t + 1) >> 1
  if (t > lowprimes.length) t = lowprimes.length
  var a = new BigInteger(null)
  var j, bases = []
  for (var i = 0; i < t; ++i) {
    for (;;) {
      j = lowprimes[Math.floor(Math.random() * lowprimes.length)]
      if (bases.indexOf(j) == -1) break
    }
    bases.push(j)
    a.fromInt(j)
    var y = a.modPow(r, this)
    if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1
      while (j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2, this)
        if (y.compareTo(BigInteger.ONE) == 0) return false
      }
      if (y.compareTo(n1) != 0) return false
    }
  }
  return true
}

// protected
proto.chunkSize = bnpChunkSize
proto.toRadix = bnpToRadix
proto.fromRadix = bnpFromRadix
proto.fromNumber = bnpFromNumber
proto.bitwiseTo = bnpBitwiseTo
proto.changeBit = bnpChangeBit
proto.addTo = bnpAddTo
proto.dMultiply = bnpDMultiply
proto.dAddOffset = bnpDAddOffset
proto.multiplyLowerTo = bnpMultiplyLowerTo
proto.multiplyUpperTo = bnpMultiplyUpperTo
proto.modInt = bnpModInt
proto.millerRabin = bnpMillerRabin

// public
proto.clone = bnClone
proto.intValue = bnIntValue
proto.byteValue = bnByteValue
proto.shortValue = bnShortValue
proto.signum = bnSigNum
proto.toByteArray = bnToByteArray
proto.equals = bnEquals
proto.min = bnMin
proto.max = bnMax
proto.and = bnAnd
proto.or = bnOr
proto.xor = bnXor
proto.andNot = bnAndNot
proto.not = bnNot
proto.shiftLeft = bnShiftLeft
proto.shiftRight = bnShiftRight
proto.getLowestSetBit = bnGetLowestSetBit
proto.bitCount = bnBitCount
proto.testBit = bnTestBit
proto.setBit = bnSetBit
proto.clearBit = bnClearBit
proto.flipBit = bnFlipBit
proto.add = bnAdd
proto.subtract = bnSubtract
proto.multiply = bnMultiply
proto.divide = bnDivide
proto.remainder = bnRemainder
proto.divideAndRemainder = bnDivideAndRemainder
proto.modPow = bnModPow
proto.modInverse = bnModInverse
proto.pow = bnPow
proto.gcd = bnGCD
proto.isProbablePrime = bnIsProbablePrime

// JSBN-specific extension
proto.square = bnSquare

// constants
BigInteger.ZERO = nbv(0)
BigInteger.ONE = nbv(1)
BigInteger.valueOf = nbv

module.exports = BigInteger


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__(0)
var Buffer = __webpack_require__(25).Buffer
var BigInteger = __webpack_require__(1)

var THREE = BigInteger.valueOf(3)

function Point (curve, x, y, z) {
  assert.notStrictEqual(z, undefined, 'Missing Z coordinate')

  this.curve = curve
  this.x = x
  this.y = y
  this.z = z
  this._zInv = null

  this.compressed = true
}

Object.defineProperty(Point.prototype, 'zInv', {
  get: function () {
    if (this._zInv === null) {
      this._zInv = this.z.modInverse(this.curve.p)
    }

    return this._zInv
  }
})

Object.defineProperty(Point.prototype, 'affineX', {
  get: function () {
    return this.x.multiply(this.zInv).mod(this.curve.p)
  }
})

Object.defineProperty(Point.prototype, 'affineY', {
  get: function () {
    return this.y.multiply(this.zInv).mod(this.curve.p)
  }
})

Point.fromAffine = function (curve, x, y) {
  return new Point(curve, x, y, BigInteger.ONE)
}

Point.prototype.equals = function (other) {
  if (other === this) return true
  if (this.curve.isInfinity(this)) return this.curve.isInfinity(other)
  if (this.curve.isInfinity(other)) return this.curve.isInfinity(this)

  // u = Y2 * Z1 - Y1 * Z2
  var u = other.y.multiply(this.z).subtract(this.y.multiply(other.z)).mod(this.curve.p)

  if (u.signum() !== 0) return false

  // v = X2 * Z1 - X1 * Z2
  var v = other.x.multiply(this.z).subtract(this.x.multiply(other.z)).mod(this.curve.p)

  return v.signum() === 0
}

Point.prototype.negate = function () {
  var y = this.curve.p.subtract(this.y)

  return new Point(this.curve, this.x, y, this.z)
}

Point.prototype.add = function (b) {
  if (this.curve.isInfinity(this)) return b
  if (this.curve.isInfinity(b)) return this

  var x1 = this.x
  var y1 = this.y
  var x2 = b.x
  var y2 = b.y

  // u = Y2 * Z1 - Y1 * Z2
  var u = y2.multiply(this.z).subtract(y1.multiply(b.z)).mod(this.curve.p)
  // v = X2 * Z1 - X1 * Z2
  var v = x2.multiply(this.z).subtract(x1.multiply(b.z)).mod(this.curve.p)

  if (v.signum() === 0) {
    if (u.signum() === 0) {
      return this.twice() // this == b, so double
    }

    return this.curve.infinity // this = -b, so infinity
  }

  var v2 = v.square()
  var v3 = v2.multiply(v)
  var x1v2 = x1.multiply(v2)
  var zu2 = u.square().multiply(this.z)

  // x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
  var x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.p)
  // y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
  var y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.p)
  // z3 = v^3 * z1 * z2
  var z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.p)

  return new Point(this.curve, x3, y3, z3)
}

Point.prototype.twice = function () {
  if (this.curve.isInfinity(this)) return this
  if (this.y.signum() === 0) return this.curve.infinity

  var x1 = this.x
  var y1 = this.y

  var y1z1 = y1.multiply(this.z).mod(this.curve.p)
  var y1sqz1 = y1z1.multiply(y1).mod(this.curve.p)
  var a = this.curve.a

  // w = 3 * x1^2 + a * z1^2
  var w = x1.square().multiply(THREE)

  if (a.signum() !== 0) {
    w = w.add(this.z.square().multiply(a))
  }

  w = w.mod(this.curve.p)
  // x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
  var x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.p)
  // y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
  var y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.pow(3)).mod(this.curve.p)
  // z3 = 8 * (y1 * z1)^3
  var z3 = y1z1.pow(3).shiftLeft(3).mod(this.curve.p)

  return new Point(this.curve, x3, y3, z3)
}

// Simple NAF (Non-Adjacent Form) multiplication algorithm
// TODO: modularize the multiplication algorithm
Point.prototype.multiply = function (k) {
  if (this.curve.isInfinity(this)) return this
  if (k.signum() === 0) return this.curve.infinity

  var e = k
  var h = e.multiply(THREE)

  var neg = this.negate()
  var R = this

  for (var i = h.bitLength() - 2; i > 0; --i) {
    var hBit = h.testBit(i)
    var eBit = e.testBit(i)

    R = R.twice()

    if (hBit !== eBit) {
      R = R.add(hBit ? this : neg)
    }
  }

  return R
}

// Compute this*j + x*k (simultaneous multiplication)
Point.prototype.multiplyTwo = function (j, x, k) {
  var i = Math.max(j.bitLength(), k.bitLength()) - 1
  var R = this.curve.infinity
  var both = this.add(x)

  while (i >= 0) {
    var jBit = j.testBit(i)
    var kBit = k.testBit(i)

    R = R.twice()

    if (jBit) {
      if (kBit) {
        R = R.add(both)
      } else {
        R = R.add(this)
      }
    } else if (kBit) {
      R = R.add(x)
    }
    --i
  }

  return R
}

Point.prototype.getEncoded = function (compressed) {
  if (compressed == null) compressed = this.compressed
  if (this.curve.isInfinity(this)) return Buffer.alloc(1, 0) // Infinity point encoded is simply '00'

  var x = this.affineX
  var y = this.affineY
  var byteLength = this.curve.pLength
  var buffer

  // 0x02/0x03 | X
  if (compressed) {
    buffer = Buffer.allocUnsafe(1 + byteLength)
    buffer.writeUInt8(y.isEven() ? 0x02 : 0x03, 0)

  // 0x04 | X | Y
  } else {
    buffer = Buffer.allocUnsafe(1 + byteLength + byteLength)
    buffer.writeUInt8(0x04, 0)

    y.toBuffer(byteLength).copy(buffer, 1 + byteLength)
  }

  x.toBuffer(byteLength).copy(buffer, 1)

  return buffer
}

Point.decodeFrom = function (curve, buffer) {
  var type = buffer.readUInt8(0)
  var compressed = (type !== 4)

  var byteLength = Math.floor((curve.p.bitLength() + 7) / 8)
  var x = BigInteger.fromBuffer(buffer.slice(1, 1 + byteLength))

  var Q
  if (compressed) {
    assert.equal(buffer.length, byteLength + 1, 'Invalid sequence length')
    assert(type === 0x02 || type === 0x03, 'Invalid sequence tag')

    var isOdd = (type === 0x03)
    Q = curve.pointFromX(isOdd, x)
  } else {
    assert.equal(buffer.length, 1 + byteLength + byteLength, 'Invalid sequence length')

    var y = BigInteger.fromBuffer(buffer.slice(1 + byteLength))
    Q = Point.fromAffine(curve, x, y)
  }

  Q.compressed = compressed
  return Q
}

Point.prototype.toString = function () {
  if (this.curve.isInfinity(this)) return '(INFINITY)'

  return '(' + this.affineX.toString() + ',' + this.affineY.toString() + ')'
}

module.exports = Point


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(22)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__(0)
var BigInteger = __webpack_require__(1)

var Point = __webpack_require__(24)

function Curve (p, a, b, Gx, Gy, n, h) {
  this.p = p
  this.a = a
  this.b = b
  this.G = Point.fromAffine(this, Gx, Gy)
  this.n = n
  this.h = h

  this.infinity = new Point(this, null, null, BigInteger.ZERO)

  // result caching
  this.pOverFour = p.add(BigInteger.ONE).shiftRight(2)

  // determine size of p in bytes
  this.pLength = Math.floor((this.p.bitLength() + 7) / 8)
}

Curve.prototype.pointFromX = function (isOdd, x) {
  var alpha = x.pow(3).add(this.a.multiply(x)).add(this.b).mod(this.p)
  var beta = alpha.modPow(this.pOverFour, this.p) // XXX: not compatible with all curves

  var y = beta
  if (beta.isEven() ^ !isOdd) {
    y = this.p.subtract(y) // -y % p
  }

  return Point.fromAffine(this, x, y)
}

Curve.prototype.isInfinity = function (Q) {
  if (Q === this.infinity) return true

  return Q.z.signum() === 0 && Q.y.signum() !== 0
}

Curve.prototype.isOnCurve = function (Q) {
  if (this.isInfinity(Q)) return true

  var x = Q.affineX
  var y = Q.affineY
  var a = this.a
  var b = this.b
  var p = this.p

  // Check that xQ and yQ are integers in the interval [0, p - 1]
  if (x.signum() < 0 || x.compareTo(p) >= 0) return false
  if (y.signum() < 0 || y.compareTo(p) >= 0) return false

  // and check that y^2 = x^3 + ax + b (mod p)
  var lhs = y.square().mod(p)
  var rhs = x.pow(3).add(a.multiply(x)).add(b).mod(p)
  return lhs.equals(rhs)
}

/**
 * Validate an elliptic curve point.
 *
 * See SEC 1, section 3.2.2.1: Elliptic Curve Public Key Validation Primitive
 */
Curve.prototype.validate = function (Q) {
  // Check Q != O
  assert(!this.isInfinity(Q), 'Point is at infinity')
  assert(this.isOnCurve(Q), 'Point is not on the curve')

  // Check nQ = O (where Q is a scalar multiple of G)
  var nQ = Q.multiply(this.n)
  assert(this.isInfinity(nQ), 'Point is not a scalar multiple of G')

  return true
}

module.exports = Curve


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__serializer_src_SerializerValidation__ = __webpack_require__(9);




var DB_MAX_INSTANCE_ID = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromNumber(((Math.pow(2,48))-1));

class ObjectId {

    constructor(space,type,instance){
        this.space = space;
        this.type = type;
        this.instance = instance;
        var instance_string = this.instance.toString();
        var ObjectId = `${this.space}.${this.type}.${instance_string}`;
        if (!__WEBPACK_IMPORTED_MODULE_1__serializer_src_SerializerValidation__["a" /* default */].is_digits(instance_string)) {
            throw new `Invalid object id ${ObjectId}`();
        }
    }

    static fromString(value){
        if (
            value.space !== undefined &&
            value.type !== undefined &&
            value.instance !== undefined
        ) {
            return value;
        }

        var params = __WEBPACK_IMPORTED_MODULE_1__serializer_src_SerializerValidation__["a" /* default */].require_match(
            /^([0-9]+)\.([0-9]+)\.([0-9]+)$/,
            __WEBPACK_IMPORTED_MODULE_1__serializer_src_SerializerValidation__["a" /* default */].required(value, "ObjectId"),
            "ObjectId"
        );
        return new ObjectId(
            parseInt(params[1]),
            parseInt(params[2]),
            __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromString(params[3])
        );
    }

    static fromLong(long){
        var space = long.shiftRight(56).toInt();
        var type = long.shiftRight(48).toInt() & 0x00ff;
        var instance = long.and(DB_MAX_INSTANCE_ID);
        return new ObjectId(space, type, instance);
    }

    static fromByteBuffer(b){
        return ObjectId.fromLong(b.readUint64());
    }

    toLong() {
        return __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromNumber(this.space).shiftLeft(56).or(
            __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromNumber(this.type).shiftLeft(48).or(this.instance)
        );
    }

    appendByteBuffer(b){
        return b.writeUint64(this.toLong());
    }

    toString() {
        return `${this.space}.${this.type}.${this.instance.toString()}`;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ObjectId);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3), __webpack_require__(53), __webpack_require__(54));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                var block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecdsa__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ecurve__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ecurve___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ecurve__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bigi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PublicKey__ = __webpack_require__(5);



var secp256k1 = Object(__WEBPACK_IMPORTED_MODULE_2_ecurve__["getCurveByName"])('secp256k1');




class Signature {

    constructor(r1, s1, i1) {
        this.r = r1;
        this.s = s1;
        this.i = i1;
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(this.r != null, true, 'Missing parameter');
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(this.s != null, true, 'Missing parameter');
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(this.i != null, true, 'Missing parameter');
    }

    static fromBuffer(buf) {
        var i, r, s;
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(buf.length, 65, 'Invalid signature length');
        i = buf.readUInt8(0);
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(i - 27, i - 27 & 7, 'Invalid signature parameter');
        r = __WEBPACK_IMPORTED_MODULE_4_bigi___default.a.fromBuffer(buf.slice(1, 33));
        s = __WEBPACK_IMPORTED_MODULE_4_bigi___default.a.fromBuffer(buf.slice(33));
        return new Signature(r, s, i);
    };

    toBuffer() {
        var buf;
        buf = new Buffer(65);
        buf.writeUInt8(this.i, 0);
        this.r.toBuffer(32).copy(buf, 1);
        this.s.toBuffer(32).copy(buf, 33);
        return buf;
    };

    recoverPublicKeyFromBuffer(buffer) {
        return this.recoverPublicKey(Object(__WEBPACK_IMPORTED_MODULE_1__hash__["sha256"])(buffer));
    };

    /**
        @return {PublicKey}
    */
    recoverPublicKey(sha256_buffer) {
        let Q, e, i;
        e = __WEBPACK_IMPORTED_MODULE_4_bigi___default.a.fromBuffer(sha256_buffer);
        i = this.i;
        i -= 27;
        i = i & 3;
        Q = Object(__WEBPACK_IMPORTED_MODULE_0__ecdsa__["b" /* recoverPubKey */])(secp256k1, e, this, i);
        return __WEBPACK_IMPORTED_MODULE_5__PublicKey__["a" /* default */].fromPoint(Q);
    };


    /**
        @param {Buffer} buf
        @param {PrivateKey} private_key
        @return {Signature}
    */
    static signBuffer(buf, private_key) {
        var _hash = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["sha256"])(buf);
        return Signature.signBufferSha256(_hash, private_key)
    }

    /** Sign a buffer of exactally 32 bytes in size (sha256(text))
        @param {Buffer} buf - 32 bytes binary
        @param {PrivateKey} private_key
        @return {Signature}
    */
    static signBufferSha256(buf_sha256, private_key) {
        console.debug("Sha256: ", buf_sha256);
        if( buf_sha256.length !== 32 || ! Buffer.isBuffer(buf_sha256) )
            throw new Error("buf_sha256: 32 byte buffer requred")
        var der, e, ecsignature, i, lenR, lenS, nonce;
        i = null;
        nonce = 0;
        e = __WEBPACK_IMPORTED_MODULE_4_bigi___default.a.fromBuffer(buf_sha256);
        while (true) {
          ecsignature = Object(__WEBPACK_IMPORTED_MODULE_0__ecdsa__["c" /* sign */])(secp256k1, buf_sha256, private_key.d, nonce++);
          der = ecsignature.toDER();
          lenR = der[3];
          lenS = der[5 + lenR];
          if (lenR === 32 && lenS === 32) {
            i = Object(__WEBPACK_IMPORTED_MODULE_0__ecdsa__["a" /* calcPubKeyRecoveryParam */])(secp256k1, e, ecsignature, private_key.toPublicKey().Q);
            i += 4;  // compressed
            i += 27; // compact  //  24 or 27 :( forcing odd-y 2nd key candidate)
            break;
          }
          if (nonce % 10 === 0) {
            console.log("WARN: " + nonce + " attempts to find canonical signature");
          }
        }
        return new Signature(ecsignature.r, ecsignature.s, i);
    };

    static sign(string, private_key) {
        return Signature.signBuffer(new Buffer(string), private_key);
    };


    /**
        @param {Buffer} un-hashed
        @param {./PublicKey}
        @return {boolean}
    */
    verifyBuffer(buf, public_key) {
        var _hash = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["sha256"])(buf);
        return this.verifyHash(_hash, public_key);
    };

    verifyHash(hash, public_key) {
        __WEBPACK_IMPORTED_MODULE_3_assert___default.a.equal(hash.length, 32, "A SHA 256 should be 32 bytes long, instead got " + hash.length);
        return Object(__WEBPACK_IMPORTED_MODULE_0__ecdsa__["d" /* verify */])(secp256k1, hash, {
          r: this.r,
          s: this.s
        }, public_key.Q);
    };


    /* <HEX> */

    toByteBuffer() {
        var b;
        b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
        this.appendByteBuffer(b);
        return b.copy(0, b.offset);
    };

    static fromHex(hex) {
        return Signature.fromBuffer(new Buffer(hex, "hex"));
    };

    toHex() {
        return this.toBuffer().toString("hex");
    };

    static signHex(hex, private_key) {
        var buf;
        buf = new Buffer(hex, 'hex');
        return Signature.signBuffer(buf, private_key);
    };

    verifyHex(hex, public_key) {
        var buf;
        buf = new Buffer(hex, 'hex');
        return this.verifyBuffer(buf, public_key);
    };

}

/* harmony default export */ __webpack_exports__["a"] = (Signature);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = enforce;
function enforce(type, value) { // Copied from https://github.com/bitcoinjs/bitcoinjs-lib
  switch (type) {
    case 'Array': {
      if (Array.isArray(value)) return
      break
    }

    case 'Boolean': {
      if (typeof value === 'boolean') return
      break
    }

    case 'Buffer': {
      if (Buffer.isBuffer(value)) return
      break
    }

    case 'Number': {
      if (typeof value === 'number') return
      break
    }

    case 'String': {
      if (typeof value === 'string') return
      break
    }

    default: {
      if (getName(value.constructor) === getName(type)) return
    }
  }

  throw new TypeError('Expected ' + (getName(type) || type) + ', got ' + value)
}

function getName(fn) {
  // Why not fn.name: https://kangax.github.io/compat-table6/#function_name_property
  var match = fn.toString().match(/function (.*?)\(/)
  return match ? match[1] : null
}


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalize;

function normalize(brainKey) {
    if (typeof brainKey !== 'string') {
        throw new Error("string required for brainKey");
    }
    brainKey = brainKey.trim();
    return brainKey.split(/[\t\n\v\f\r ]+/).join(' ');
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(globals){
'use strict'

//*** UMD BEGIN
if (true) { //require.js / AMD
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return secureRandom
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
} else if (typeof module !== 'undefined' && module.exports) { //CommonJS
  module.exports = secureRandom
} else { //script / browser
  globals.secureRandom = secureRandom
}
//*** UMD END

//options.type is the only valid option
function secureRandom(count, options) {
  options = options || {type: 'Array'}
  //we check for process.pid to prevent browserify from tricking us
  if (typeof process != 'undefined' && typeof process.pid == 'number') {
    return nodeRandom(count, options)
  } else {
    var crypto = window.crypto || window.msCrypto
    if (!crypto) throw new Error("Your browser does not support window.crypto.")
    return browserRandom(count, options)
  }
}

function nodeRandom(count, options) {
  var crypto = __webpack_require__(14)
  var buf = crypto.randomBytes(count)

  switch (options.type) {
    case 'Array':
      return [].slice.call(buf)
    case 'Buffer':
      return buf
    case 'Uint8Array':
      var arr = new Uint8Array(count)
      for (var i = 0; i < count; ++i) { arr[i] = buf.readUInt8(i) }
      return arr
    default:
      throw new Error(options.type + " is unsupported.")
  }
}

function browserRandom(count, options) {
  var nativeArr = new Uint8Array(count)
  var crypto = window.crypto || window.msCrypto
  crypto.getRandomValues(nativeArr)

  switch (options.type) {
    case 'Array':
      return [].slice.call(nativeArr)
    case 'Buffer':
      try { var b = new Buffer(1) } catch(e) { throw new Error('Buffer not supported in this environment. Use Node.js or Browserify for browser support.')}
      return new Buffer(nativeArr)
    case 'Uint8Array':
      return nativeArr
    default:
      throw new Error(options.type + " is unsupported.")
  }
}

secureRandom.randomArray = function(byteCount) {
  return secureRandom(byteCount, {type: 'Array'})
}

secureRandom.randomUint8Array = function(byteCount) {
  return secureRandom(byteCount, {type: 'Uint8Array'})
}

secureRandom.randomBuffer = function(byteCount) {
  return secureRandom(byteCount, {type: 'Buffer'})
}


}(this);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operation", function() { return operation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "void_ext", function() { return void_ext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__serializer__ = __webpack_require__(11);



var {
    //id_type,
    //varint32,
    uint8,
    uint16,
    uint32,
    int64,
    uint64,
    string,
    bytes,
    bool,
    array,
    fixed_array,
    protocol_id_type,
    object_id_type,
    vote_id,
    future_extensions,
    static_variant,
    map,
    set,
    public_key,
    address,
    time_point_sec,
    optional,
} = __WEBPACK_IMPORTED_MODULE_0__types__["a" /* default */];

// future_extensions = types.void;

/*
When updating generated code
Replace:  operation = static_variant [
with:     operation.st_operations = [

Delete:
public_key = new Serializer(
    "public_key"
    key_data: bytes 33
)

*/
// Place-holder, their are dependencies on "operation" .. The final list of
// operations is not avialble until the very end of the generated code.
// See: operation.st_operations = ...
var operation = static_variant();
// module.exports["operation"] = operation;


// For module.exports
var Serializer = function (operation_name, serilization_types_object) {
    return new __WEBPACK_IMPORTED_MODULE_1__serializer__["a" /* default */](operation_name, serilization_types_object);
    // return module.exports[operation_name] = s;
}

var void_ext = new Serializer("void_ext");

var cybex_ext_vesting = new Serializer("cybex_ext_vesting", {
    vesting_period: uint64,
    public_key: public_key
});
var cybex_ext_transfer_vesting = new Serializer("cybex_ext_transfer_vesting", {
    vesting_cliff: uint64,
    vesting_duration: uint64
});
var cybex_ext_swap = new Serializer("cybex_ext_swap", {
    cybex_ext_swap: string
});
var cybex_ext_xfer_to_name = new Serializer("cybex_ext_xfer_to_name", {
    name: string,
    asset_sym: string,
    fee_asset_sym: string,
    hw_cookie: uint8
});

var cybex_xfer_item = new Serializer("cybex_xfer_item", {
    name: string,
    amount: string,
});
var cybex_ext_xfer_to_many = new Serializer("cybex_ext_xfer_to_many", {
    list: array(cybex_xfer_item)
});



var future_extensions = static_variant([void_ext, cybex_ext_vesting, cybex_ext_swap, cybex_ext_transfer_vesting, cybex_ext_xfer_to_name, cybex_ext_xfer_to_many]);

// Custom-types follow Generated code:

// ##  Generated code follows
// # programs/js_operation_serializer > npm i -g decaffeinate
// ## -------------------------------
const transfer_operation_fee_parameters = new Serializer(
    "transfer_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["transfer_operation_fee_parameters"] = transfer_operation_fee_parameters;


const limit_order_create_operation_fee_parameters = new Serializer(
    "limit_order_create_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["limit_order_create_operation_fee_parameters"] = limit_order_create_operation_fee_parameters;


const limit_order_cancel_operation_fee_parameters = new Serializer(
    "limit_order_cancel_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["limit_order_cancel_operation_fee_parameters"] = limit_order_cancel_operation_fee_parameters;


const call_order_update_operation_fee_parameters = new Serializer(
    "call_order_update_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["call_order_update_operation_fee_parameters"] = call_order_update_operation_fee_parameters;


const fill_order_operation_fee_parameters = new Serializer(
    "fill_order_operation_fee_parameters"
);
/* harmony export (immutable) */ __webpack_exports__["fill_order_operation_fee_parameters"] = fill_order_operation_fee_parameters;


const account_create_operation_fee_parameters = new Serializer(
    "account_create_operation_fee_parameters", {
        basic_fee: uint64,
        premium_fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_create_operation_fee_parameters"] = account_create_operation_fee_parameters;


const account_update_operation_fee_parameters = new Serializer(
    "account_update_operation_fee_parameters", {
        fee: int64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_update_operation_fee_parameters"] = account_update_operation_fee_parameters;


const account_whitelist_operation_fee_parameters = new Serializer(
    "account_whitelist_operation_fee_parameters", {
        fee: int64
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_whitelist_operation_fee_parameters"] = account_whitelist_operation_fee_parameters;


const account_upgrade_operation_fee_parameters = new Serializer(
    "account_upgrade_operation_fee_parameters", {
        membership_annual_fee: uint64,
        membership_lifetime_fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_upgrade_operation_fee_parameters"] = account_upgrade_operation_fee_parameters;


const account_transfer_operation_fee_parameters = new Serializer(
    "account_transfer_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_transfer_operation_fee_parameters"] = account_transfer_operation_fee_parameters;


const asset_create_operation_fee_parameters = new Serializer(
    "asset_create_operation_fee_parameters", {
        symbol3: uint64,
        symbol4: uint64,
        long_symbol: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_create_operation_fee_parameters"] = asset_create_operation_fee_parameters;


const asset_update_operation_fee_parameters = new Serializer(
    "asset_update_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_update_operation_fee_parameters"] = asset_update_operation_fee_parameters;


const asset_update_bitasset_operation_fee_parameters = new Serializer(
    "asset_update_bitasset_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_update_bitasset_operation_fee_parameters"] = asset_update_bitasset_operation_fee_parameters;


const asset_update_feed_producers_operation_fee_parameters = new Serializer(
    "asset_update_feed_producers_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_update_feed_producers_operation_fee_parameters"] = asset_update_feed_producers_operation_fee_parameters;


const asset_issue_operation_fee_parameters = new Serializer(
    "asset_issue_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_issue_operation_fee_parameters"] = asset_issue_operation_fee_parameters;

const initiate_crowdfund_operation_fee_parameters = new Serializer(
    "initiate_crowdfund_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["initiate_crowdfund_operation_fee_parameters"] = initiate_crowdfund_operation_fee_parameters;

const participate_crowdfund_operation_fee_parameters = new Serializer(
    "participate_crowdfund_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["participate_crowdfund_operation_fee_parameters"] = participate_crowdfund_operation_fee_parameters;

const withdraw_crowdfund_operation_fee_parameters = new Serializer(
    "withdraw_crowdfund_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_crowdfund_operation_fee_parameters"] = withdraw_crowdfund_operation_fee_parameters;


const asset_reserve_operation_fee_parameters = new Serializer(
    "asset_reserve_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_reserve_operation_fee_parameters"] = asset_reserve_operation_fee_parameters;


const asset_fund_fee_pool_operation_fee_parameters = new Serializer(
    "asset_fund_fee_pool_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_fund_fee_pool_operation_fee_parameters"] = asset_fund_fee_pool_operation_fee_parameters;


const asset_settle_operation_fee_parameters = new Serializer(
    "asset_settle_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_settle_operation_fee_parameters"] = asset_settle_operation_fee_parameters;


const asset_global_settle_operation_fee_parameters = new Serializer(
    "asset_global_settle_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_global_settle_operation_fee_parameters"] = asset_global_settle_operation_fee_parameters;


const asset_publish_feed_operation_fee_parameters = new Serializer(
    "asset_publish_feed_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_publish_feed_operation_fee_parameters"] = asset_publish_feed_operation_fee_parameters;


const witness_create_operation_fee_parameters = new Serializer(
    "witness_create_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["witness_create_operation_fee_parameters"] = witness_create_operation_fee_parameters;


const witness_update_operation_fee_parameters = new Serializer(
    "witness_update_operation_fee_parameters", {
        fee: int64
    }
);
/* harmony export (immutable) */ __webpack_exports__["witness_update_operation_fee_parameters"] = witness_update_operation_fee_parameters;


const proposal_create_operation_fee_parameters = new Serializer(
    "proposal_create_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["proposal_create_operation_fee_parameters"] = proposal_create_operation_fee_parameters;


const proposal_update_operation_fee_parameters = new Serializer(
    "proposal_update_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["proposal_update_operation_fee_parameters"] = proposal_update_operation_fee_parameters;


const proposal_delete_operation_fee_parameters = new Serializer(
    "proposal_delete_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["proposal_delete_operation_fee_parameters"] = proposal_delete_operation_fee_parameters;


const withdraw_permission_create_operation_fee_parameters = new Serializer(
    "withdraw_permission_create_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_create_operation_fee_parameters"] = withdraw_permission_create_operation_fee_parameters;


const withdraw_permission_update_operation_fee_parameters = new Serializer(
    "withdraw_permission_update_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_update_operation_fee_parameters"] = withdraw_permission_update_operation_fee_parameters;


const withdraw_permission_claim_operation_fee_parameters = new Serializer(
    "withdraw_permission_claim_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_claim_operation_fee_parameters"] = withdraw_permission_claim_operation_fee_parameters;


const withdraw_permission_delete_operation_fee_parameters = new Serializer(
    "withdraw_permission_delete_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_delete_operation_fee_parameters"] = withdraw_permission_delete_operation_fee_parameters;


const committee_member_create_operation_fee_parameters = new Serializer(
    "committee_member_create_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["committee_member_create_operation_fee_parameters"] = committee_member_create_operation_fee_parameters;


const committee_member_update_operation_fee_parameters = new Serializer(
    "committee_member_update_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["committee_member_update_operation_fee_parameters"] = committee_member_update_operation_fee_parameters;


const committee_member_update_global_parameters_operation_fee_parameters = new Serializer(
    "committee_member_update_global_parameters_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["committee_member_update_global_parameters_operation_fee_parameters"] = committee_member_update_global_parameters_operation_fee_parameters;


const vesting_balance_create_operation_fee_parameters = new Serializer(
    "vesting_balance_create_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["vesting_balance_create_operation_fee_parameters"] = vesting_balance_create_operation_fee_parameters;


const vesting_balance_withdraw_operation_fee_parameters = new Serializer(
    "vesting_balance_withdraw_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["vesting_balance_withdraw_operation_fee_parameters"] = vesting_balance_withdraw_operation_fee_parameters;


const worker_create_operation_fee_parameters = new Serializer(
    "worker_create_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["worker_create_operation_fee_parameters"] = worker_create_operation_fee_parameters;


const custom_operation_fee_parameters = new Serializer(
    "custom_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["custom_operation_fee_parameters"] = custom_operation_fee_parameters;


const assert_operation_fee_parameters = new Serializer(
    "assert_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["assert_operation_fee_parameters"] = assert_operation_fee_parameters;


const balance_claim_operation_fee_parameters = new Serializer(
    "balance_claim_operation_fee_parameters"
);
/* harmony export (immutable) */ __webpack_exports__["balance_claim_operation_fee_parameters"] = balance_claim_operation_fee_parameters;


const override_transfer_operation_fee_parameters = new Serializer(
    "override_transfer_operation_fee_parameters", {
        fee: uint64,
        price_per_kbyte: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["override_transfer_operation_fee_parameters"] = override_transfer_operation_fee_parameters;


const transfer_to_blind_operation_fee_parameters = new Serializer(
    "transfer_to_blind_operation_fee_parameters", {
        fee: uint64,
        price_per_output: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["transfer_to_blind_operation_fee_parameters"] = transfer_to_blind_operation_fee_parameters;


const blind_transfer_operation_fee_parameters = new Serializer(
    "blind_transfer_operation_fee_parameters", {
        fee: uint64,
        price_per_output: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["blind_transfer_operation_fee_parameters"] = blind_transfer_operation_fee_parameters;


const transfer_from_blind_operation_fee_parameters = new Serializer(
    "transfer_from_blind_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["transfer_from_blind_operation_fee_parameters"] = transfer_from_blind_operation_fee_parameters;


const asset_settle_cancel_operation_fee_parameters = new Serializer(
    "asset_settle_cancel_operation_fee_parameters"
);
/* harmony export (immutable) */ __webpack_exports__["asset_settle_cancel_operation_fee_parameters"] = asset_settle_cancel_operation_fee_parameters;


const asset_claim_fees_operation_fee_parameters = new Serializer(
    "asset_claim_fees_operation_fee_parameters", {
        fee: uint64
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_claim_fees_operation_fee_parameters"] = asset_claim_fees_operation_fee_parameters;


var fee_parameters = static_variant([
    transfer_operation_fee_parameters,
    limit_order_create_operation_fee_parameters,
    limit_order_cancel_operation_fee_parameters,
    call_order_update_operation_fee_parameters,
    fill_order_operation_fee_parameters,
    account_create_operation_fee_parameters,
    account_update_operation_fee_parameters,
    account_whitelist_operation_fee_parameters,
    account_upgrade_operation_fee_parameters,
    account_transfer_operation_fee_parameters,
    asset_create_operation_fee_parameters,
    asset_update_operation_fee_parameters,
    asset_update_bitasset_operation_fee_parameters,
    asset_update_feed_producers_operation_fee_parameters,
    asset_issue_operation_fee_parameters,
    asset_reserve_operation_fee_parameters,
    asset_fund_fee_pool_operation_fee_parameters,
    asset_settle_operation_fee_parameters,
    asset_global_settle_operation_fee_parameters,
    asset_publish_feed_operation_fee_parameters,
    witness_create_operation_fee_parameters,
    witness_update_operation_fee_parameters,
    proposal_create_operation_fee_parameters,
    proposal_update_operation_fee_parameters,
    proposal_delete_operation_fee_parameters,
    withdraw_permission_create_operation_fee_parameters,
    withdraw_permission_update_operation_fee_parameters,
    withdraw_permission_claim_operation_fee_parameters,
    withdraw_permission_delete_operation_fee_parameters,
    committee_member_create_operation_fee_parameters,
    committee_member_update_operation_fee_parameters,
    committee_member_update_global_parameters_operation_fee_parameters,
    vesting_balance_create_operation_fee_parameters,
    vesting_balance_withdraw_operation_fee_parameters,
    worker_create_operation_fee_parameters,
    custom_operation_fee_parameters,
    assert_operation_fee_parameters,
    balance_claim_operation_fee_parameters,
    override_transfer_operation_fee_parameters,
    transfer_to_blind_operation_fee_parameters,
    blind_transfer_operation_fee_parameters,
    transfer_from_blind_operation_fee_parameters,
    asset_settle_cancel_operation_fee_parameters,
    asset_claim_fees_operation_fee_parameters,
    asset_settle_cancel_operation_fee_parameters,    
    initiate_crowdfund_operation_fee_parameters,
    participate_crowdfund_operation_fee_parameters,
    withdraw_crowdfund_operation_fee_parameters,
]);

const fee_schedule = new Serializer(
    "fee_schedule", {
        parameters: set(fee_parameters),
        scale: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["fee_schedule"] = fee_schedule;


const void_result = new Serializer(
    "void_result"
);
/* harmony export (immutable) */ __webpack_exports__["void_result"] = void_result;


const asset = new Serializer(
    "asset", {
        amount: int64,
        asset_id: protocol_id_type("asset")
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset"] = asset;


var operation_result = static_variant([
    void_result,
    object_id_type,
    asset
]);

const processed_transaction = new Serializer(
    "processed_transaction", {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions),
        signatures: array(bytes(65)),
        operation_results: array(operation_result)
    }
);
/* harmony export (immutable) */ __webpack_exports__["processed_transaction"] = processed_transaction;


const signed_block = new Serializer(
    "signed_block", {
        previous: bytes(20),
        timestamp: time_point_sec,
        witness: protocol_id_type("witness"),
        transaction_merkle_root: bytes(20),
        extensions: set(future_extensions),
        witness_signature: bytes(65),
        transactions: array(processed_transaction)
    }
);
/* harmony export (immutable) */ __webpack_exports__["signed_block"] = signed_block;


const block_header = new Serializer(
    "block_header", {
        previous: bytes(20),
        timestamp: time_point_sec,
        witness: protocol_id_type("witness"),
        transaction_merkle_root: bytes(20),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["block_header"] = block_header;


const signed_block_header = new Serializer(
    "signed_block_header", {
        previous: bytes(20),
        timestamp: time_point_sec,
        witness: protocol_id_type("witness"),
        transaction_merkle_root: bytes(20),
        extensions: set(future_extensions),
        witness_signature: bytes(65)
    }
);
/* harmony export (immutable) */ __webpack_exports__["signed_block_header"] = signed_block_header;


const memo_data = new Serializer(
    "memo_data", {
        from: public_key,
        to: public_key,
        nonce: uint64,
        message: bytes()
    }
);
/* harmony export (immutable) */ __webpack_exports__["memo_data"] = memo_data;


const transfer = new Serializer(
    "transfer", {
        fee: asset,
        from: protocol_id_type("account"),
        to: protocol_id_type("account"),
        amount: asset,
        memo: optional(memo_data),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["transfer"] = transfer;


const limit_order_create = new Serializer(
    "limit_order_create", {
        fee: asset,
        seller: protocol_id_type("account"),
        amount_to_sell: asset,
        min_to_receive: asset,
        expiration: time_point_sec,
        fill_or_kill: bool,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["limit_order_create"] = limit_order_create;


const limit_order_cancel = new Serializer(
    "limit_order_cancel", {
        fee: asset,
        fee_paying_account: protocol_id_type("account"),
        order: protocol_id_type("limit_order"),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["limit_order_cancel"] = limit_order_cancel;


const call_order_update = new Serializer(
    "call_order_update", {
        fee: asset,
        funding_account: protocol_id_type("account"),
        delta_collateral: asset,
        delta_debt: asset,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["call_order_update"] = call_order_update;


const fill_order = new Serializer(
    "fill_order", {
        fee: asset,
        order_id: object_id_type,
        account_id: protocol_id_type("account"),
        pays: asset,
        receives: asset
    }
);
/* harmony export (immutable) */ __webpack_exports__["fill_order"] = fill_order;


const authority = new Serializer(
    "authority", {
        weight_threshold: uint32,
        account_auths: map((protocol_id_type("account")), (uint16)),
        key_auths: map((public_key), (uint16)),
        address_auths: map((address), (uint16))
    }
);
/* harmony export (immutable) */ __webpack_exports__["authority"] = authority;


const account_options = new Serializer(
    "account_options", {
        memo_key: public_key,
        voting_account: protocol_id_type("account"),
        num_witness: uint16,
        num_committee: uint16,
        votes: set(vote_id),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_options"] = account_options;


const account_create = new Serializer(
    "account_create", {
        fee: asset,
        registrar: protocol_id_type("account"),
        referrer: protocol_id_type("account"),
        referrer_percent: uint16,
        name: string,
        owner: authority,
        active: authority,
        options: account_options,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_create"] = account_create;


const account_update = new Serializer(
    "account_update", {
        fee: asset,
        account: protocol_id_type("account"),
        owner: optional(authority),
        active: optional(authority),
        new_options: optional(account_options),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_update"] = account_update;


const account_whitelist = new Serializer(
    "account_whitelist", {
        fee: asset,
        authorizing_account: protocol_id_type("account"),
        account_to_list: protocol_id_type("account"),
        new_listing: uint8,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_whitelist"] = account_whitelist;


const account_upgrade = new Serializer(
    "account_upgrade", {
        fee: asset,
        account_to_upgrade: protocol_id_type("account"),
        upgrade_to_lifetime_member: bool,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_upgrade"] = account_upgrade;


const account_transfer = new Serializer(
    "account_transfer", {
        fee: asset,
        account_id: protocol_id_type("account"),
        new_owner: protocol_id_type("account"),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_transfer"] = account_transfer;


const price = new Serializer(
    "price", {
        base: asset,
        quote: asset
    }
);
/* harmony export (immutable) */ __webpack_exports__["price"] = price;


const asset_options = new Serializer(
    "asset_options", {
        max_supply: int64,
        market_fee_percent: uint16,
        max_market_fee: int64,
        issuer_permissions: uint16,
        flags: uint16,
        core_exchange_rate: price,
        whitelist_authorities: set(protocol_id_type("account")),
        blacklist_authorities: set(protocol_id_type("account")),
        whitelist_markets: set(protocol_id_type("asset")),
        blacklist_markets: set(protocol_id_type("asset")),
        description: string,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_options"] = asset_options;


const bitasset_options = new Serializer(
    "bitasset_options", {
        feed_lifetime_sec: uint32,
        minimum_feeds: uint8,
        force_settlement_delay_sec: uint32,
        force_settlement_offset_percent: uint16,
        maximum_force_settlement_volume: uint16,
        short_backing_asset: protocol_id_type("asset"),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["bitasset_options"] = bitasset_options;


const asset_create = new Serializer(
    "asset_create", {
        fee: asset,
        issuer: protocol_id_type("account"),
        symbol: string,
        precision: uint8,
        common_options: asset_options,
        bitasset_opts: optional(bitasset_options),
        is_prediction_market: bool,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_create"] = asset_create;


const asset_update = new Serializer(
    "asset_update", {
        fee: asset,
        issuer: protocol_id_type("account"),
        asset_to_update: protocol_id_type("asset"),
        new_issuer: optional(protocol_id_type("account")),
        new_options: asset_options,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_update"] = asset_update;


const asset_update_bitasset = new Serializer(
    "asset_update_bitasset", {
        fee: asset,
        issuer: protocol_id_type("account"),
        asset_to_update: protocol_id_type("asset"),
        new_options: bitasset_options,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_update_bitasset"] = asset_update_bitasset;


const asset_update_feed_producers = new Serializer(
    "asset_update_feed_producers", {
        fee: asset,
        issuer: protocol_id_type("account"),
        asset_to_update: protocol_id_type("asset"),
        new_feed_producers: set(protocol_id_type("account")),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_update_feed_producers"] = asset_update_feed_producers;


const asset_issue = new Serializer(
    "asset_issue", {
        fee: asset,
        issuer: protocol_id_type("account"),
        asset_to_issue: asset,
        issue_to_account: protocol_id_type("account"),
        memo: optional(memo_data),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_issue"] = asset_issue;


const asset_reserve = new Serializer(
    "asset_reserve", {
        fee: asset,
        payer: protocol_id_type("account"),
        amount_to_reserve: asset,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_reserve"] = asset_reserve;


const asset_fund_fee_pool = new Serializer(
    "asset_fund_fee_pool", {
        fee: asset,
        from_account: protocol_id_type("account"),
        asset_id: protocol_id_type("asset"),
        amount: int64,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_fund_fee_pool"] = asset_fund_fee_pool;


const asset_settle = new Serializer(
    "asset_settle", {
        fee: asset,
        account: protocol_id_type("account"),
        amount: asset,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_settle"] = asset_settle;


const asset_global_settle = new Serializer(
    "asset_global_settle", {
        fee: asset,
        issuer: protocol_id_type("account"),
        asset_to_settle: protocol_id_type("asset"),
        settle_price: price,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_global_settle"] = asset_global_settle;


const participate_crowdfund = new Serializer(
    "participate_crowdfund", {
        fee: asset,
        buyer: protocol_id_type("account"),
        valuation: int64,
        cap: int64,
        // pubkey: address,
        crowdfund: protocol_id_type("crowdfund"),
        // extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["participate_crowdfund"] = participate_crowdfund;

const withdraw_crowdfund = new Serializer(
    "withdraw_crowdfund", {
        fee: asset,
        buyer: protocol_id_type("account"),
        crowdfund_contract: protocol_id_type("crowdfund_contract"),
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_crowdfund"] = withdraw_crowdfund;

const initiate_crowdfund  = new Serializer(
    "initiate_crowdfund", {
        fee: asset,
        owner: protocol_id_type("account"),
        asset_id: protocol_id_type("asset"),
        t: uint64,
        u: uint64,
        // v: uint64,
        // extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["initiate_crowdfund"] = initiate_crowdfund;


const price_feed = new Serializer(
    "price_feed", {
        settlement_price: price,
        maintenance_collateral_ratio: uint16,
        maximum_short_squeeze_ratio: uint16,
        core_exchange_rate: price
    }
);
/* harmony export (immutable) */ __webpack_exports__["price_feed"] = price_feed;


const asset_publish_feed = new Serializer(
    "asset_publish_feed", {
        fee: asset,
        publisher: protocol_id_type("account"),
        asset_id: protocol_id_type("asset"),
        feed: price_feed,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_publish_feed"] = asset_publish_feed;


const witness_create = new Serializer(
    "witness_create", {
        fee: asset,
        witness_account: protocol_id_type("account"),
        url: string,
        block_signing_key: public_key
    }
);
/* harmony export (immutable) */ __webpack_exports__["witness_create"] = witness_create;


const witness_update = new Serializer(
    "witness_update", {
        fee: asset,
        witness: protocol_id_type("witness"),
        witness_account: protocol_id_type("account"),
        new_url: optional(string),
        new_signing_key: optional(public_key)
    }
);
/* harmony export (immutable) */ __webpack_exports__["witness_update"] = witness_update;


const op_wrapper = new Serializer(
    "op_wrapper", {
        op: operation
    }
);
/* harmony export (immutable) */ __webpack_exports__["op_wrapper"] = op_wrapper;


const proposal_create = new Serializer(
    "proposal_create", {
        fee: asset,
        fee_paying_account: protocol_id_type("account"),
        expiration_time: time_point_sec,
        proposed_ops: array(op_wrapper),
        review_period_seconds: optional(uint32),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["proposal_create"] = proposal_create;


const proposal_update = new Serializer(
    "proposal_update", {
        fee: asset,
        fee_paying_account: protocol_id_type("account"),
        proposal: protocol_id_type("proposal"),
        active_approvals_to_add: set(protocol_id_type("account")),
        active_approvals_to_remove: set(protocol_id_type("account")),
        owner_approvals_to_add: set(protocol_id_type("account")),
        owner_approvals_to_remove: set(protocol_id_type("account")),
        key_approvals_to_add: set(public_key),
        key_approvals_to_remove: set(public_key),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["proposal_update"] = proposal_update;


const proposal_delete = new Serializer(
    "proposal_delete", {
        fee: asset,
        fee_paying_account: protocol_id_type("account"),
        using_owner_authority: bool,
        proposal: protocol_id_type("proposal"),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["proposal_delete"] = proposal_delete;


const withdraw_permission_create = new Serializer(
    "withdraw_permission_create", {
        fee: asset,
        withdraw_from_account: protocol_id_type("account"),
        authorized_account: protocol_id_type("account"),
        withdrawal_limit: asset,
        withdrawal_period_sec: uint32,
        periods_until_expiration: uint32,
        period_start_time: time_point_sec
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_create"] = withdraw_permission_create;


const withdraw_permission_update = new Serializer(
    "withdraw_permission_update", {
        fee: asset,
        withdraw_from_account: protocol_id_type("account"),
        authorized_account: protocol_id_type("account"),
        permission_to_update: protocol_id_type("withdraw_permission"),
        withdrawal_limit: asset,
        withdrawal_period_sec: uint32,
        period_start_time: time_point_sec,
        periods_until_expiration: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_update"] = withdraw_permission_update;


const withdraw_permission_claim = new Serializer(
    "withdraw_permission_claim", {
        fee: asset,
        withdraw_permission: protocol_id_type("withdraw_permission"),
        withdraw_from_account: protocol_id_type("account"),
        withdraw_to_account: protocol_id_type("account"),
        amount_to_withdraw: asset,
        memo: optional(memo_data)
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_claim"] = withdraw_permission_claim;


const withdraw_permission_delete = new Serializer(
    "withdraw_permission_delete", {
        fee: asset,
        withdraw_from_account: protocol_id_type("account"),
        authorized_account: protocol_id_type("account"),
        withdrawal_permission: protocol_id_type("withdraw_permission")
    }
);
/* harmony export (immutable) */ __webpack_exports__["withdraw_permission_delete"] = withdraw_permission_delete;


const committee_member_create = new Serializer(
    "committee_member_create", {
        fee: asset,
        committee_member_account: protocol_id_type("account"),
        url: string
    }
);
/* harmony export (immutable) */ __webpack_exports__["committee_member_create"] = committee_member_create;


const committee_member_update = new Serializer(
    "committee_member_update", {
        fee: asset,
        committee_member: protocol_id_type("committee_member"),
        committee_member_account: protocol_id_type("account"),
        new_url: optional(string)
    }
);
/* harmony export (immutable) */ __webpack_exports__["committee_member_update"] = committee_member_update;


const chain_parameters = new Serializer(
    "chain_parameters", {
        current_fees: fee_schedule,
        block_interval: uint8,
        maintenance_interval: uint32,
        maintenance_skip_slots: uint8,
        committee_proposal_review_period: uint32,
        maximum_transaction_size: uint32,
        maximum_block_size: uint32,
        maximum_time_until_expiration: uint32,
        maximum_proposal_lifetime: uint32,
        maximum_asset_whitelist_authorities: uint8,
        maximum_asset_feed_publishers: uint8,
        maximum_witness_count: uint16,
        maximum_committee_count: uint16,
        maximum_authority_membership: uint16,
        reserve_percent_of_fee: uint16,
        network_percent_of_fee: uint16,
        lifetime_referrer_percent_of_fee: uint16,
        cashback_vesting_period_seconds: uint32,
        cashback_vesting_threshold: int64,
        count_non_member_votes: bool,
        allow_non_member_whitelists: bool,
        witness_pay_per_block: int64,
        worker_budget_per_day: int64,
        max_predicate_opcode: uint16,
        fee_liquidation_threshold: int64,
        accounts_per_fee_scale: uint16,
        account_fee_scale_bitshifts: uint8,
        max_authority_depth: uint8,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["chain_parameters"] = chain_parameters;


const committee_member_update_global_parameters = new Serializer(
    "committee_member_update_global_parameters", {
        fee: asset,
        new_parameters: chain_parameters
    }
);
/* harmony export (immutable) */ __webpack_exports__["committee_member_update_global_parameters"] = committee_member_update_global_parameters;


const linear_vesting_policy_initializer = new Serializer(
    "linear_vesting_policy_initializer", {
        begin_timestamp: time_point_sec,
        vesting_cliff_seconds: uint32,
        vesting_duration_seconds: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["linear_vesting_policy_initializer"] = linear_vesting_policy_initializer;


const cdd_vesting_policy_initializer = new Serializer(
    "cdd_vesting_policy_initializer", {
        start_claim: time_point_sec,
        vesting_seconds: uint32
    }
);
/* harmony export (immutable) */ __webpack_exports__["cdd_vesting_policy_initializer"] = cdd_vesting_policy_initializer;


var vesting_policy_initializer = static_variant([
    linear_vesting_policy_initializer,
    cdd_vesting_policy_initializer
]);

const vesting_balance_create = new Serializer(
    "vesting_balance_create", {
        fee: asset,
        creator: protocol_id_type("account"),
        owner: protocol_id_type("account"),
        amount: asset,
        policy: vesting_policy_initializer
    }
);
/* harmony export (immutable) */ __webpack_exports__["vesting_balance_create"] = vesting_balance_create;


const vesting_balance_withdraw = new Serializer(
    "vesting_balance_withdraw", {
        fee: asset,
        vesting_balance: protocol_id_type("vesting_balance"),
        owner: protocol_id_type("account"),
        amount: asset
    }
);
/* harmony export (immutable) */ __webpack_exports__["vesting_balance_withdraw"] = vesting_balance_withdraw;


const refund_worker_initializer = new Serializer(
    "refund_worker_initializer"
);
/* harmony export (immutable) */ __webpack_exports__["refund_worker_initializer"] = refund_worker_initializer;


const vesting_balance_worker_initializer = new Serializer(
    "vesting_balance_worker_initializer", {
        pay_vesting_period_days: uint16
    }
);
/* harmony export (immutable) */ __webpack_exports__["vesting_balance_worker_initializer"] = vesting_balance_worker_initializer;


const burn_worker_initializer = new Serializer(
    "burn_worker_initializer"
);
/* harmony export (immutable) */ __webpack_exports__["burn_worker_initializer"] = burn_worker_initializer;


var worker_initializer = static_variant([
    refund_worker_initializer,
    vesting_balance_worker_initializer,
    burn_worker_initializer
]);

const worker_create = new Serializer(
    "worker_create", {
        fee: asset,
        owner: protocol_id_type("account"),
        work_begin_date: time_point_sec,
        work_end_date: time_point_sec,
        daily_pay: int64,
        name: string,
        url: string,
        initializer: worker_initializer
    }
);
/* harmony export (immutable) */ __webpack_exports__["worker_create"] = worker_create;


const custom = new Serializer(
    "custom", {
        fee: asset,
        payer: protocol_id_type("account"),
        required_auths: set(protocol_id_type("account")),
        id: uint16,
        data: bytes()
    }
);
/* harmony export (immutable) */ __webpack_exports__["custom"] = custom;


const account_name_eq_lit_predicate = new Serializer(
    "account_name_eq_lit_predicate", {
        account_id: protocol_id_type("account"),
        name: string
    }
);
/* harmony export (immutable) */ __webpack_exports__["account_name_eq_lit_predicate"] = account_name_eq_lit_predicate;


const asset_symbol_eq_lit_predicate = new Serializer(
    "asset_symbol_eq_lit_predicate", {
        asset_id: protocol_id_type("asset"),
        symbol: string
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_symbol_eq_lit_predicate"] = asset_symbol_eq_lit_predicate;


const block_id_predicate = new Serializer(
    "block_id_predicate", {
        id: bytes(20)
    }
);
/* harmony export (immutable) */ __webpack_exports__["block_id_predicate"] = block_id_predicate;


var predicate = static_variant([
    account_name_eq_lit_predicate,
    asset_symbol_eq_lit_predicate,
    block_id_predicate
]);

const assert = new Serializer(
    "assert", {
        fee: asset,
        fee_paying_account: protocol_id_type("account"),
        predicates: array(predicate),
        required_auths: set(protocol_id_type("account")),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["assert"] = assert;


const balance_claim = new Serializer(
    "balance_claim", {
        fee: asset,
        deposit_to_account: protocol_id_type("account"),
        balance_to_claim: protocol_id_type("balance"),
        balance_owner_key: public_key,
        total_claimed: asset
    }
);
/* harmony export (immutable) */ __webpack_exports__["balance_claim"] = balance_claim;


const override_transfer = new Serializer(
    "override_transfer", {
        fee: asset,
        issuer: protocol_id_type("account"),
        from: protocol_id_type("account"),
        to: protocol_id_type("account"),
        amount: asset,
        memo: optional(memo_data),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["override_transfer"] = override_transfer;


const stealth_confirmation = new Serializer(
    "stealth_confirmation", {
        one_time_key: public_key,
        to: optional(public_key),
        encrypted_memo: bytes()
    }
);
/* harmony export (immutable) */ __webpack_exports__["stealth_confirmation"] = stealth_confirmation;


const blind_output = new Serializer(
    "blind_output", {
        commitment: bytes(33),
        range_proof: bytes(),
        owner: authority,
        stealth_memo: optional(stealth_confirmation)
    }
);
/* harmony export (immutable) */ __webpack_exports__["blind_output"] = blind_output;


const transfer_to_blind = new Serializer(
    "transfer_to_blind", {
        fee: asset,
        amount: asset,
        from: protocol_id_type("account"),
        blinding_factor: bytes(32),
        outputs: array(blind_output)
    }
);
/* harmony export (immutable) */ __webpack_exports__["transfer_to_blind"] = transfer_to_blind;


const blind_input = new Serializer(
    "blind_input", {
        commitment: bytes(33),
        owner: authority
    }
);
/* harmony export (immutable) */ __webpack_exports__["blind_input"] = blind_input;


const blind_transfer = new Serializer(
    "blind_transfer", {
        fee: asset,
        inputs: array(blind_input),
        outputs: array(blind_output)
    }
);
/* harmony export (immutable) */ __webpack_exports__["blind_transfer"] = blind_transfer;


const transfer_from_blind = new Serializer(
    "transfer_from_blind", {
        fee: asset,
        amount: asset,
        to: protocol_id_type("account"),
        blinding_factor: bytes(32),
        inputs: array(blind_input)
    }
);
/* harmony export (immutable) */ __webpack_exports__["transfer_from_blind"] = transfer_from_blind;


const asset_settle_cancel = new Serializer(
    "asset_settle_cancel", {
        fee: asset,
        settlement: protocol_id_type("force_settlement"),
        account: protocol_id_type("account"),
        amount: asset,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_settle_cancel"] = asset_settle_cancel;


const asset_claim_fees = new Serializer(
    "asset_claim_fees", {
        fee: asset,
        issuer: protocol_id_type("account"),
        amount_to_claim: asset,
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["asset_claim_fees"] = asset_claim_fees;


operation.st_operations = [
    transfer,
    limit_order_create,
    limit_order_cancel,
    call_order_update,
    fill_order,
    account_create,
    account_update,
    account_whitelist,
    account_upgrade,
    account_transfer,
    asset_create,
    asset_update,
    asset_update_bitasset,
    asset_update_feed_producers,
    asset_issue,
    asset_reserve,
    asset_fund_fee_pool,
    asset_settle,
    asset_global_settle,
    asset_publish_feed,
    witness_create,
    witness_update,
    proposal_create,
    proposal_update,
    proposal_delete,
    withdraw_permission_create,
    withdraw_permission_update,
    withdraw_permission_claim,
    withdraw_permission_delete,
    committee_member_create,
    committee_member_update,
    committee_member_update_global_parameters,
    vesting_balance_create,
    vesting_balance_withdraw,
    worker_create,
    custom,
    assert,
    balance_claim,
    override_transfer,
    transfer_to_blind,
    blind_transfer,
    transfer_from_blind,
    asset_settle_cancel,
    asset_claim_fees,
    asset_settle_cancel,    
    initiate_crowdfund,
    participate_crowdfund,
    withdraw_crowdfund
];

const transaction = new Serializer(
    "transaction", {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions)
    }
);
/* harmony export (immutable) */ __webpack_exports__["transaction"] = transaction;


const signed_transaction = new Serializer(
    "signed_transaction", {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions),
        signatures: array(bytes(65))
    }
);
/* harmony export (immutable) */ __webpack_exports__["signed_transaction"] = signed_transaction;

//# -------------------------------
//#  Generated code end
//# -------------------------------

// Custom Types

const stealth_memo_data = new Serializer(
    "stealth_memo_data", {
        from: optional(public_key),
        amount: asset,
        blinding_factor: bytes(32),
        commitment: bytes(33),
        check: uint32
    })
/* harmony export (immutable) */ __webpack_exports__["stealth_memo_data"] = stealth_memo_data;

// var stealth_confirmation = new Serializer(
//     "stealth_confirmation", {
//     one_time_key: public_key,
//     to: optional( public_key ),
//     encrypted_memo: stealth_memo_data
// })


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = template;

/** Console print any transaction object with zero default values. */
function template(op) {

    var object = op.toObject(void 0, {use_default: true, annotate: true})

    // visual (with descriptions)
    console.error(JSON.stringify(object,null,4))

    // usable in a copy-paste

    object = op.toObject(void 0, {use_default: true, annotate: false})

    // copy-paste one-lineer
    console.error(JSON.stringify(object))
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
    Account names may contain one or more names separated by a dot.
    Each name needs to start with a letter and may contain
    numbers, or well placed dashes.
    @see is_valid_name graphene/libraries/chain/protocol/account.cpp
*/
let id_regex = /\b\d+\.\d+\.(\d+)\b/;

var chainValidation = {
    is_account_name: function(value, allow_too_short = false) {
        var i, label, len, length, ref;

        if (this.is_empty(value)) {
            return false;
        }

        length = value.length;

        if ((!allow_too_short && length < 3) || length > 63) {
            return false;
        }

        ref = value.split('.');

        for (i = 0, len = ref.length; i < len; i++) {

            label = ref[i];

            if (!(/^[a-z][a-z0-9-]*$/.test(label) && !/--/.test(label) && /[a-z0-9]$/.test(label))) {
                return false;
            }

        }
        return true;
    },


    is_object_id: function(obj_id) {
        if( 'string' != typeof obj_id )
            return false

        let match = id_regex.exec(obj_id)
        return (match !== null && obj_id.split(".").length === 3)
    },

    is_empty: function(value) {
        return value == null || value.length === 0
    },

    is_account_name_error: function(value, allow_too_short) {
        var i, label, len, length, ref, suffix;
        if (allow_too_short == null) {
            allow_too_short = false;
        }
        suffix = "Account name should ";
        if (this.is_empty(value)) {
            return suffix + "not be empty.";
        }
        length = value.length;
        if (!allow_too_short && length < 3) {
            return suffix + "be longer.";
        }
        if (length > 63) {
            return suffix + "be shorter.";
        }
        if (/\./.test(value)) {
            suffix = "Each account segment should ";
        }
        ref = value.split('.');
        for (i = 0, len = ref.length; i < len; i++) {
            label = ref[i];
            if (!/^[~a-z]/.test(label)) {
                return suffix + "start with a letter.";
            }
            if (!/^[~a-z0-9-]*$/.test(label)) {
                return suffix + "have only letters, digits, or dashes.";
            }
            if (/--/.test(label)) {
                return suffix + "have only one dash in a row.";
            }
            if (!/[a-z0-9]$/.test(label)) {
                return suffix + "end with a letter or digit.";
            }
            if (!(label.length >= 3)) {
                return suffix + "be longer";
            }
        }
        return null;
    },

    is_cheap_name: function(account_name) {
        return /[0-9-]/.test(account_name) || !/[aeiouy]/.test(account_name);
    },

    is_empty_user_input: function(value) {
        if (this.is_empty(value)) { return true; }
        if ((value+"").trim() === "") { return true; }
        return false;
    },

    required: function(value, field_name="") {
        if (this.is_empty(value)) {
            throw new Error("value required for " + field_name + ": " +value);
        }
        return value;
    },

    /** @see is_valid_symbol graphene/libraries/chain/protocol/asset_ops.cpp */
    is_valid_symbol_error: function(value) {
        var suffix = "Asset name should ";
        if (this.is_empty(value)) { return suffix + "not be empty."; }
        if (value.split('.').length > 2) { return suffix + "have only one dot."; }
        if (value.length < 3) { return suffix + "be longer."; }
        if (value.length > 16) { return suffix + "be shorter."; }
        if (!/^[A-Z]/.test(value)) { return suffix + "start with a letter"; }
        if (!/[A-Z]$/.test(value)) { return suffix + "end with a letter"; }
        if (/^[A-Z0-9\.]$/.test(value)) { return suffix + "contain only letters numbers and perhaps a dot."; }
        return null;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (chainValidation);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = emitter;
// import ee from "event-emitter";
let ee = __webpack_require__(61);
var _emitter;
function emitter () {
    if ( !_emitter ) {
        _emitter = ee({});
    }
    return _emitter;
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_serializer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_FastParser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_types__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_operations__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_template__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_SerializerValidation__ = __webpack_require__(9);
/* unused harmony reexport Serializer */
/* unused harmony reexport fp */
/* unused harmony reexport types */
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__src_operations__; });
/* unused harmony reexport template */
/* unused harmony reexport SerializerValidation */










/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchChainObjects", function() { return FetchChainObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchChain", function() { return FetchChain; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serializer_src_serializer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__serializer_src_FastParser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__serializer_src_types__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__serializer_src_operations__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__serializer_src_template__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__serializer_src_SerializerValidation__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Serializer", function() { return __WEBPACK_IMPORTED_MODULE_0__serializer_src_serializer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fp", function() { return __WEBPACK_IMPORTED_MODULE_1__serializer_src_FastParser__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "types", function() { return __WEBPACK_IMPORTED_MODULE_2__serializer_src_types__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ops", function() { return __WEBPACK_IMPORTED_MODULE_3__serializer_src_operations__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "template", function() { return __WEBPACK_IMPORTED_MODULE_4__serializer_src_template__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SerializerValidation", function() { return __WEBPACK_IMPORTED_MODULE_5__serializer_src_SerializerValidation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ecc_src_address__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ecc_src_aes__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ecc_src_PrivateKey__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ecc_src_PublicKey__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ecc_src_signature__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ecc_src_BrainKey__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ecc_src_hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ecc_src_KeyUtils__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return __WEBPACK_IMPORTED_MODULE_6__ecc_src_address__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Aes", function() { return __WEBPACK_IMPORTED_MODULE_7__ecc_src_aes__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateKey", function() { return __WEBPACK_IMPORTED_MODULE_8__ecc_src_PrivateKey__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PublicKey", function() { return __WEBPACK_IMPORTED_MODULE_9__ecc_src_PublicKey__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Signature", function() { return __WEBPACK_IMPORTED_MODULE_10__ecc_src_signature__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "brainKey", function() { return __WEBPACK_IMPORTED_MODULE_11__ecc_src_BrainKey__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return __WEBPACK_IMPORTED_MODULE_12__ecc_src_hash__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "key", function() { return __WEBPACK_IMPORTED_MODULE_13__ecc_src_KeyUtils__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__chain_src_ChainStore__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__chain_src_TransactionBuilder__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__chain_src_ChainTypes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__chain_src_ObjectId__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__chain_src_NumberUtils__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__chain_src_TransactionHelper__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__chain_src_ChainValidation__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__chain_src_EmitterInstance__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__chain_src_AccountLogin__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChainStore", function() { return __WEBPACK_IMPORTED_MODULE_14__chain_src_ChainStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionBuilder", function() { return __WEBPACK_IMPORTED_MODULE_15__chain_src_TransactionBuilder__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChainTypes", function() { return __WEBPACK_IMPORTED_MODULE_16__chain_src_ChainTypes__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterInstance", function() { return __WEBPACK_IMPORTED_MODULE_21__chain_src_EmitterInstance__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectId", function() { return __WEBPACK_IMPORTED_MODULE_17__chain_src_ObjectId__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NumberUtils", function() { return __WEBPACK_IMPORTED_MODULE_18__chain_src_NumberUtils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionHelper", function() { return __WEBPACK_IMPORTED_MODULE_19__chain_src_TransactionHelper__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChainValidation", function() { return __WEBPACK_IMPORTED_MODULE_20__chain_src_ChainValidation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return __WEBPACK_IMPORTED_MODULE_22__chain_src_AccountLogin__["a"]; });
/* Serializer */









/* ECC */











/* Chain */










const {FetchChainObjects, FetchChain} = __WEBPACK_IMPORTED_MODULE_14__chain_src_ChainStore__["a" /* default */];




/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

})(this, function() {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Long(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @private
     */
    Long.prototype.__isLong__;

    Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */
    function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
    }

    /**
     * Tests if the specified object is a Long.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     */
    Long.isLong = isLong;

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromInt = fromInt;

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? UZERO : ZERO;
        if (unsigned) {
            if (value < 0)
                return UZERO;
            if (value >= TWO_PWR_64_DBL)
                return MAX_UNSIGNED_VALUE;
        } else {
            if (value <= -TWO_PWR_63_DBL)
                return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromNumber = fromNumber;

    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    }

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromBits = fromBits;

    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */
    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Long}
     * @inner
     */
    function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return ZERO;
        if (typeof unsigned === 'number') {
            // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        } else {
            unsigned = !! unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 8));

        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     */
    Long.fromString = fromString;

    /**
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @returns {!Long}
     * @inner
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return fromNumber(val);
        if (typeof val === 'string')
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return fromBits(val.low, val.high, val.unsigned);
    }

    /**
     * Converts the specified value to a Long.
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     */
    Long.fromValue = fromValue;

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

    /**
     * @type {!Long}
     * @inner
     */
    var ZERO = fromInt(0);

    /**
     * Signed zero.
     * @type {!Long}
     */
    Long.ZERO = ZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var UZERO = fromInt(0, true);

    /**
     * Unsigned zero.
     * @type {!Long}
     */
    Long.UZERO = UZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var ONE = fromInt(1);

    /**
     * Signed one.
     * @type {!Long}
     */
    Long.ONE = ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var UONE = fromInt(1, true);

    /**
     * Unsigned one.
     * @type {!Long}
     */
    Long.UONE = UONE;

    /**
     * @type {!Long}
     * @inner
     */
    var NEG_ONE = fromInt(-1);

    /**
     * Signed negative one.
     * @type {!Long}
     */
    Long.NEG_ONE = NEG_ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum signed value.
     * @type {!Long}
     */
    Long.MAX_VALUE = MAX_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     */
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

    /**
     * Minimum signed value.
     * @type {!Long}
     */
    Long.MIN_VALUE = MIN_VALUE;

    /**
     * @alias Long.prototype
     * @inner
     */
    var LongPrototype = Long.prototype;

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */
    LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     */
    LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     */
    LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.eq(MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            } else
                return '-' + this.neg().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     */
    LongPrototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     */
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     */
    LongPrototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     */
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     */
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     */
    LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     */
    LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     */
    LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     */
    LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     */
    LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.equals = function equals(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.eq = LongPrototype.equals;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(/* validates */ other);
    };

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.neq = LongPrototype.notEquals;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThan = function lessThan(other) {
        return this.comp(/* validates */ other) < 0;
    };

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lt = LongPrototype.lessThan;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lte = LongPrototype.lessThanOrEqual;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(/* validates */ other) > 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gt = LongPrototype.greaterThan;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.compare = function compare(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.comp = LongPrototype.compare;

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     */
    LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     */
    LongPrototype.neg = LongPrototype.negate;

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     */
    LongPrototype.add = function add(addend) {
        if (!isLong(addend))
            addend = fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.sub = LongPrototype.subtract;

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();

        // If both longs are small, use float multiplication
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.mul = LongPrototype.multiply;

    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     *  unsigned if this Long is unsigned.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            } else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            } else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        } else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
            res = UZERO;
        }

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = fromNumber(approx),
                approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = ONE;

            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.div = LongPrototype.divide;

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.mod = LongPrototype.modulo;

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     */
    LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.and = function and(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.or = function or(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.xor = function xor(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shl = LongPrototype.shiftLeft;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shr = LongPrototype.shiftRight;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     */
    LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     */
    LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };

    /**
     * Converts this Long to its byte representation.
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {!Array.<number>} Byte representation
     */
    LongPrototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    }

    /**
     * Converts this Long to its little endian byte representation.
     * @returns {!Array.<number>} Little endian byte representation
     */
    LongPrototype.toBytesLE = function() {
        var hi = this.high,
            lo = this.low;
        return [
             lo         & 0xff,
            (lo >>>  8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
             hi         & 0xff,
            (hi >>>  8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    }

    /**
     * Converts this Long to its big endian byte representation.
     * @returns {!Array.<number>} Big endian byte representation
     */
    LongPrototype.toBytesBE = function() {
        var hi = this.high,
            lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>>  8) & 0xff,
             hi         & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>>  8) & 0xff,
             lo         & 0xff
        ];
    }

    return Long;
});


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Exception nesting.  */
class ErrorWithCause {

    constructor(message, cause){
        this.message = message;
        if ((typeof cause !== "undefined" && cause !== null) ? cause.message : undefined) {
            this.message = `cause\t${cause.message}\t` + this.message;
        }

        var stack = "";//(new Error).stack
        if ((typeof cause !== "undefined" && cause !== null) ? cause.stack : undefined) {
            stack = `caused by\n\t${cause.stack}\t` + stack;
        }

        this.stack = this.message + "\n" + stack;
    }

    static throw(message, cause){
        var msg = message;
        if ((typeof cause !== "undefined" && cause !== null) ? cause.message : undefined) { msg += `\t cause: ${cause.message} `; }
        if ((typeof cause !== "undefined" && cause !== null) ? cause.stack : undefined) { msg += `\n stack: ${cause.stack} `; }
        throw new Error(msg);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ErrorWithCause);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {"name":"bigi","version":"1.4.2","description":"Big integers.","keywords":["cryptography","math","bitcoin","arbitrary","precision","arithmetic","big","integer","int","number","biginteger","bigint","bignumber","decimal","float"],"devDependencies":{"coveralls":"^2.11.2","istanbul":"^0.3.5","jshint":"^2.5.1","mocha":"^2.1.0","mochify":"^2.1.0"},"repository":{"url":"https://github.com/cryptocoinjs/bigi","type":"git"},"main":"./lib/index.js","scripts":{"browser-test":"./node_modules/.bin/mochify --wd -R spec","test":"./node_modules/.bin/_mocha -- test/*.js","jshint":"./node_modules/.bin/jshint --config jshint.json lib/*.js ; true","unit":"./node_modules/.bin/mocha","coverage":"./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js","coveralls":"npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info"},"dependencies":{},"testling":{"files":"test/*.js","harness":"mocha","browsers":["ie/9..latest","firefox/latest","chrome/latest","safari/6.0..latest","iphone/6.0..latest","android-browser/4.2..latest"]}}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// FIXME: Kind of a weird way to throw exceptions, consider removing
var assert = __webpack_require__(0)
var BigInteger = __webpack_require__(23)

/**
 * Turns a byte array into a big integer.
 *
 * This function will interpret a byte array as a big integer in big
 * endian notation.
 */
BigInteger.fromByteArrayUnsigned = function(byteArray) {
  // BigInteger expects a DER integer conformant byte array
  if (byteArray[0] & 0x80) {
    return new BigInteger([0].concat(byteArray))
  }

  return new BigInteger(byteArray)
}

/**
 * Returns a byte array representation of the big integer.
 *
 * This returns the absolute of the contained value in big endian
 * form. A value of zero results in an empty array.
 */
BigInteger.prototype.toByteArrayUnsigned = function() {
  var byteArray = this.toByteArray()
  return byteArray[0] === 0 ? byteArray.slice(1) : byteArray
}

BigInteger.fromDERInteger = function(byteArray) {
  return new BigInteger(byteArray)
}

/*
 * Converts BigInteger to a DER integer representation.
 *
 * The format for this value uses the most significant bit as a sign
 * bit.  If the most significant bit is already set and the integer is
 * positive, a 0x00 is prepended.
 *
 * Examples:
 *
 *      0 =>     0x00
 *      1 =>     0x01
 *     -1 =>     0xff
 *    127 =>     0x7f
 *   -127 =>     0x81
 *    128 =>   0x0080
 *   -128 =>     0x80
 *    255 =>   0x00ff
 *   -255 =>   0xff01
 *  16300 =>   0x3fac
 * -16300 =>   0xc054
 *  62300 => 0x00f35c
 * -62300 => 0xff0ca4
*/
BigInteger.prototype.toDERInteger = BigInteger.prototype.toByteArray

BigInteger.fromBuffer = function(buffer) {
  // BigInteger expects a DER integer conformant byte array
  if (buffer[0] & 0x80) {
    var byteArray = Array.prototype.slice.call(buffer)

    return new BigInteger([0].concat(byteArray))
  }

  return new BigInteger(buffer)
}

BigInteger.fromHex = function(hex) {
  if (hex === '') return BigInteger.ZERO

  assert.equal(hex, hex.match(/^[A-Fa-f0-9]+/), 'Invalid hex string')
  assert.equal(hex.length % 2, 0, 'Incomplete hex')
  return new BigInteger(hex, 16)
}

BigInteger.prototype.toBuffer = function(size) {
  var byteArray = this.toByteArrayUnsigned()
  var zeros = []

  var padding = size - byteArray.length
  while (zeros.length < padding) zeros.push(0)

  return new Buffer(zeros.concat(byteArray))
}

BigInteger.prototype.toHex = function(size) {
  return this.toBuffer(size).toString('hex')
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var BigInteger = __webpack_require__(1)

var curves = __webpack_require__(45)
var Curve = __webpack_require__(26)

function getCurveByName (name) {
  var curve = curves[name]
  if (!curve) return null

  var p = new BigInteger(curve.p, 16)
  var a = new BigInteger(curve.a, 16)
  var b = new BigInteger(curve.b, 16)
  var n = new BigInteger(curve.n, 16)
  var h = new BigInteger(curve.h, 16)
  var Gx = new BigInteger(curve.Gx, 16)
  var Gy = new BigInteger(curve.Gy, 16)

  return new Curve(p, a, b, Gx, Gy, n, h)
}

module.exports = getCurveByName


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {"secp128r1":{"p":"fffffffdffffffffffffffffffffffff","a":"fffffffdfffffffffffffffffffffffc","b":"e87579c11079f43dd824993c2cee5ed3","n":"fffffffe0000000075a30d1b9038a115","h":"01","Gx":"161ff7528b899b2d0c28607ca52c5b86","Gy":"cf5ac8395bafeb13c02da292dded7a83"},"secp160k1":{"p":"fffffffffffffffffffffffffffffffeffffac73","a":"00","b":"07","n":"0100000000000000000001b8fa16dfab9aca16b6b3","h":"01","Gx":"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb","Gy":"938cf935318fdced6bc28286531733c3f03c4fee"},"secp160r1":{"p":"ffffffffffffffffffffffffffffffff7fffffff","a":"ffffffffffffffffffffffffffffffff7ffffffc","b":"1c97befc54bd7a8b65acf89f81d4d4adc565fa45","n":"0100000000000000000001f4c8f927aed3ca752257","h":"01","Gx":"4a96b5688ef573284664698968c38bb913cbfc82","Gy":"23a628553168947d59dcc912042351377ac5fb32"},"secp192k1":{"p":"fffffffffffffffffffffffffffffffffffffffeffffee37","a":"00","b":"03","n":"fffffffffffffffffffffffe26f2fc170f69466a74defd8d","h":"01","Gx":"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d","Gy":"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},"secp192r1":{"p":"fffffffffffffffffffffffffffffffeffffffffffffffff","a":"fffffffffffffffffffffffffffffffefffffffffffffffc","b":"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1","n":"ffffffffffffffffffffffff99def836146bc9b1b4d22831","h":"01","Gx":"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012","Gy":"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},"secp256k1":{"p":"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f","a":"00","b":"07","n":"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141","h":"01","Gx":"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","Gy":"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},"secp256r1":{"p":"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff","a":"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc","b":"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b","n":"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551","h":"01","Gx":"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296","Gy":"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

var Buffer = __webpack_require__(25).Buffer

module.exports = function base (ALPHABET) {
  var ALPHABET_MAP = {}
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)

  // pre-compute lookup table
  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z)

    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
    ALPHABET_MAP[x] = z
  }

  function encode (source) {
    if (source.length === 0) return ''

    var digits = [0]
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8
        digits[j] = carry % BASE
        carry = (carry / BASE) | 0
      }

      while (carry > 0) {
        digits.push(carry % BASE)
        carry = (carry / BASE) | 0
      }
    }

    var string = ''

    // deal with leading zeros
    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += ALPHABET[0]
    // convert digits to a string
    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

    return string
  }

  function decodeUnsafe (string) {
    if (typeof string !== 'string') throw new TypeError('Expected String')
    if (string.length === 0) return Buffer.allocUnsafe(0)

    var bytes = [0]
    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]]
      if (value === undefined) return

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE
        bytes[j] = carry & 0xff
        carry >>= 8
      }

      while (carry > 0) {
        bytes.push(carry & 0xff)
        carry >>= 8
      }
    }

    // deal with leading zeros
    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0)
    }

    return Buffer.from(bytes.reverse())
  }

  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) return buffer

    throw new Error('Non-base' + BASE + ' character')
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14).createHash


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14).createHmac


/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 50 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3), __webpack_require__(28), __webpack_require__(52), __webpack_require__(29), __webpack_require__(55));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3), __webpack_require__(29));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./evpkdf"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(3));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calcPubKeyRecoveryParam; });
/* unused harmony export deterministicGenerateK */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return recoverPubKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return verify; });
/* unused harmony export verifyRaw */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enforce_types__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bigi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ecsignature__ = __webpack_require__(58);
 // from github.com/bitcoinjs/bitcoinjs-lib from github.com/cryptocoinjs/ecdsa






// https://tools.ietf.org/html/rfc6979#section-3.2
function deterministicGenerateK(curve, hash, d, checkSig, nonce) {

  Object(__WEBPACK_IMPORTED_MODULE_2__enforce_types__["a" /* default */])('Buffer', hash)
  Object(__WEBPACK_IMPORTED_MODULE_2__enforce_types__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3_bigi___default.a, d)

  if (nonce) {
    hash = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["sha256"])(Buffer.concat([hash, new Buffer(nonce)]))
  }

  // sanity check
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(hash.length, 32, 'Hash must be 256 bit')

  var x = d.toBuffer(32)
  var k = new Buffer(32)
  var v = new Buffer(32)

  // Step B
  v.fill(1)

  // Step C
  k.fill(0)

  // Step D
  k = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(Buffer.concat([v, new Buffer([0]), x, hash]), k)

  // Step E
  v = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(v, k)

  // Step F
  k = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(Buffer.concat([v, new Buffer([1]), x, hash]), k)

  // Step G
  v = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(v, k)

  // Step H1/H2a, ignored as tlen === qlen (256 bit)
  // Step H2b
  v = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(v, k)

  var T = __WEBPACK_IMPORTED_MODULE_3_bigi___default.a.fromBuffer(v)

  // Step H3, repeat until T is within the interval [1, n - 1]
  while ((T.signum() <= 0) || (T.compareTo(curve.n) >= 0) || !checkSig(T)) {
    k = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(Buffer.concat([v, new Buffer([0])]), k)
    v = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(v, k)

    // Step H1/H2a, again, ignored as tlen === qlen (256 bit)
    // Step H2b again
    v = Object(__WEBPACK_IMPORTED_MODULE_1__hash__["HmacSHA256"])(v, k)

    T = __WEBPACK_IMPORTED_MODULE_3_bigi___default.a.fromBuffer(v)
  }

  return T

}

function sign(curve, hash, d, nonce) {

  var e = __WEBPACK_IMPORTED_MODULE_3_bigi___default.a.fromBuffer(hash)
  var n = curve.n
  var G = curve.G

  var r, s
  var k = deterministicGenerateK(curve, hash, d, function (k) {
    // find canonically valid signature
    var Q = G.multiply(k)

    if (curve.isInfinity(Q)) return false

    r = Q.affineX.mod(n)
    if (r.signum() === 0) return false

    s = k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n)
    if (s.signum() === 0) return false

    return true
  }, nonce)

  var N_OVER_TWO = n.shiftRight(1)

  // enforce low S values, see bip62: 'low s values in signatures'
  if (s.compareTo(N_OVER_TWO) > 0) {
    s = n.subtract(s)
  }

  return new __WEBPACK_IMPORTED_MODULE_4__ecsignature__["a" /* default */](r, s)
}

function verifyRaw(curve, e, signature, Q) {
  var n = curve.n
  var G = curve.G

  var r = signature.r
  var s = signature.s

  // 1.4.1 Enforce r and s are both integers in the interval [1, n − 1]
  if (r.signum() <= 0 || r.compareTo(n) >= 0) return false
  if (s.signum() <= 0 || s.compareTo(n) >= 0) return false

  // c = s^-1 mod n
  var c = s.modInverse(n)

  // 1.4.4 Compute u1 = es^−1 mod n
  //               u2 = rs^−1 mod n
  var u1 = e.multiply(c).mod(n)
  var u2 = r.multiply(c).mod(n)

  // 1.4.5 Compute R = (xR, yR) = u1G + u2Q
  var R = G.multiplyTwo(u1, Q, u2)

  // 1.4.5 (cont.) Enforce R is not at infinity
  if (curve.isInfinity(R)) return false

  // 1.4.6 Convert the field element R.x to an integer
  var xR = R.affineX

  // 1.4.7 Set v = xR mod n
  var v = xR.mod(n)

  // 1.4.8 If v = r, output "valid", and if v != r, output "invalid"
  return v.equals(r)
}

function verify(curve, hash, signature, Q) {
  // 1.4.2 H = Hash(M), already done by the user
  // 1.4.3 e = H
  var e = __WEBPACK_IMPORTED_MODULE_3_bigi___default.a.fromBuffer(hash)
  return verifyRaw(curve, e, signature, Q)
}

/**
  * Recover a public key from a signature.
  *
  * See SEC 1: Elliptic Curve Cryptography, section 4.1.6, "Public
  * Key Recovery Operation".
  *
  * http://www.secg.org/download/aid-780/sec1-v2.pdf
  */
function recoverPubKey(curve, e, signature, i) {
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.strictEqual(i & 3, i, 'Recovery param is more than two bits')

  var n = curve.n
  var G = curve.G

  var r = signature.r
  var s = signature.s

  __WEBPACK_IMPORTED_MODULE_0_assert___default()(r.signum() > 0 && r.compareTo(n) < 0, 'Invalid r value')
  __WEBPACK_IMPORTED_MODULE_0_assert___default()(s.signum() > 0 && s.compareTo(n) < 0, 'Invalid s value')

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = i & 1

  // The more significant bit specifies whether we should use the
  // first or second candidate key.
  var isSecondKey = i >> 1

  // 1.1 Let x = r + jn
  var x = isSecondKey ? r.add(n) : r
  var R = curve.pointFromX(isYOdd, x)

  // 1.4 Check that nR is at infinity
  var nR = R.multiply(n)
  __WEBPACK_IMPORTED_MODULE_0_assert___default()(curve.isInfinity(nR), 'nR is not a valid curve point')

  // Compute -e from e
  var eNeg = e.negate().mod(n)

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  var rInv = r.modInverse(n)

  var Q = R.multiplyTwo(s, G, eNeg).multiply(rInv)
  curve.validate(Q)

  return Q
}

/**
  * Calculate pubkey extraction parameter.
  *
  * When extracting a pubkey from a signature, we have to
  * distinguish four different cases. Rather than putting this
  * burden on the verifier, Bitcoin includes a 2-bit value with the
  * signature.
  *
  * This function simply tries all four cases and returns the value
  * that resulted in a successful pubkey recovery.
  */
function calcPubKeyRecoveryParam(curve, e, signature, Q) {
  for (var i = 0; i < 4; i++) {
    var Qprime = recoverPubKey(curve, e, signature, i)

    // 1.6.2 Verify Q
    if (Qprime.equals(Q)) {
      return i
    }
  }

  throw new Error('Unable to find valid recovery factor')
}




/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enforce_types__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bigi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bigi__);
 // from https://github.com/bitcoinjs/bitcoinjs-lib




function ECSignature(r, s) {
  Object(__WEBPACK_IMPORTED_MODULE_1__enforce_types__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2_bigi___default.a, r)
  Object(__WEBPACK_IMPORTED_MODULE_1__enforce_types__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2_bigi___default.a, s)

  this.r = r
  this.s = s
}

// Import operations
ECSignature.parseCompact = function(buffer) {
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(buffer.length, 65, 'Invalid signature length')
  var i = buffer.readUInt8(0) - 27

  // At most 3 bits
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(i, i & 7, 'Invalid signature parameter')
  var compressed = !!(i & 4)

  // Recovery param only
  i = i & 3

  var r = __WEBPACK_IMPORTED_MODULE_2_bigi___default.a.fromBuffer(buffer.slice(1, 33))
  var s = __WEBPACK_IMPORTED_MODULE_2_bigi___default.a.fromBuffer(buffer.slice(33))

  return {
    compressed: compressed,
    i: i,
    signature: new ECSignature(r, s)
  }
}

ECSignature.fromDER = function(buffer) {
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(buffer.readUInt8(0), 0x30, 'Not a DER sequence')
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(buffer.readUInt8(1), buffer.length - 2, 'Invalid sequence length')
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(buffer.readUInt8(2), 0x02, 'Expected a DER integer')

  var rLen = buffer.readUInt8(3)
  __WEBPACK_IMPORTED_MODULE_0_assert___default()(rLen > 0, 'R length is zero')

  var offset = 4 + rLen
  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(buffer.readUInt8(offset), 0x02, 'Expected a DER integer (2)')

  var sLen = buffer.readUInt8(offset + 1)
  __WEBPACK_IMPORTED_MODULE_0_assert___default()(sLen > 0, 'S length is zero')

  var rB = buffer.slice(4, offset)
  var sB = buffer.slice(offset + 2)
  offset += 2 + sLen

  if (rLen > 1 && rB.readUInt8(0) === 0x00) {
    __WEBPACK_IMPORTED_MODULE_0_assert___default()(rB.readUInt8(1) & 0x80, 'R value excessively padded')
  }

  if (sLen > 1 && sB.readUInt8(0) === 0x00) {
    __WEBPACK_IMPORTED_MODULE_0_assert___default()(sB.readUInt8(1) & 0x80, 'S value excessively padded')
  }

  __WEBPACK_IMPORTED_MODULE_0_assert___default.a.equal(offset, buffer.length, 'Invalid DER encoding')
  var r = __WEBPACK_IMPORTED_MODULE_2_bigi___default.a.fromDERInteger(rB)
  var s = __WEBPACK_IMPORTED_MODULE_2_bigi___default.a.fromDERInteger(sB)

  __WEBPACK_IMPORTED_MODULE_0_assert___default()(r.signum() >= 0, 'R value is negative')
  __WEBPACK_IMPORTED_MODULE_0_assert___default()(s.signum() >= 0, 'S value is negative')

  return new ECSignature(r, s)
}

// FIXME: 0x00, 0x04, 0x80 are SIGHASH_* boundary constants, importing Transaction causes a circular dependency
ECSignature.parseScriptSignature = function(buffer) {
  var hashType = buffer.readUInt8(buffer.length - 1)
  var hashTypeMod = hashType & ~0x80

  __WEBPACK_IMPORTED_MODULE_0_assert___default()(hashTypeMod > 0x00 && hashTypeMod < 0x04, 'Invalid hashType')

  return {
    signature: ECSignature.fromDER(buffer.slice(0, -1)),
    hashType: hashType
  }
}

// Export operations
ECSignature.prototype.toCompact = function(i, compressed) {
  if (compressed) i += 4
  i += 27

  var buffer = new Buffer(65)
  buffer.writeUInt8(i, 0)

  this.r.toBuffer(32).copy(buffer, 1)
  this.s.toBuffer(32).copy(buffer, 33)

  return buffer
}

ECSignature.prototype.toDER = function() {
  var rBa = this.r.toDERInteger()
  var sBa = this.s.toDERInteger()

  var sequence = []

  // INTEGER
  sequence.push(0x02, rBa.length)
  sequence = sequence.concat(rBa)

  // INTEGER
  sequence.push(0x02, sBa.length)
  sequence = sequence.concat(sBa)

  // SEQUENCE
  sequence.unshift(0x30, sequence.length)

  return new Buffer(sequence)
}

ECSignature.prototype.toScriptSignature = function(hashType) {
  var hashTypeBuffer = new Buffer(1)
  hashTypeBuffer.writeUInt8(hashType, 0)

  return Buffer.concat([this.toDER(), hashTypeBuffer])
}

/* harmony default export */ __webpack_exports__["a"] = (ECSignature);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChainTypes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ChainValidation__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bigi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__EmitterInstance__ = __webpack_require__(37);






const {object_type,impl_object_type} = __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */];
let emitter = Object(__WEBPACK_IMPORTED_MODULE_5__EmitterInstance__["a" /* default */])();

let op_history   = parseInt(object_type.operation_history, 10);
let limit_order  = parseInt(object_type.limit_order, 10);
let call_order  = parseInt(object_type.call_order, 10);
let proposal = parseInt(object_type.proposal, 10);
// let balance_type  = parseInt(object_type.balance, 10);
// let vesting_balance_type  = parseInt(object_type.vesting_balance, 10);
let witness_object_type  = parseInt(object_type.witness, 10);
let worker_object_type  = parseInt(object_type.worker, 10);
let committee_member_object_type  = parseInt(object_type.committee_member, 10);
let account_object_type  = parseInt(object_type.account, 10);
let asset_object_type  = parseInt(object_type.asset, 10);

let order_prefix = "1." + limit_order + ".";
let call_order_prefix = "1." + call_order + ".";
let proposal_prefix = "1." + proposal + ".";
let operation_history_prefix = "1." + op_history + ".";
let balance_prefix = "2." + parseInt(impl_object_type.account_balance,10) + ".";
let account_stats_prefix = "2." + parseInt(impl_object_type.account_statistics,10) + ".";
let transaction_prefix = "2." + parseInt(impl_object_type.transaction,10) + ".";
let account_transaction_history_prefix = "2." + parseInt(impl_object_type.account_transaction_history,10) + ".";
let asset_dynamic_data_prefix = "2." + parseInt(impl_object_type.asset_dynamic_data,10) + ".";
let bitasset_data_prefix = "2." + parseInt(impl_object_type.asset_bitasset_data,10) + ".";
let block_summary_prefix = "2." + parseInt(impl_object_type.block_summary,10) + ".";

// let vesting_balance_prefix = "1." + vesting_balance_type + ".";
let witness_prefix = "1." + witness_object_type + ".";
let worker_prefix = "1." + worker_object_type + ".";
let committee_prefix = "1." + committee_member_object_type + ".";
let asset_prefix = "1." + asset_object_type + ".";
let account_prefix = "1." + account_object_type + ".";

const DEBUG = JSON.parse(process.env.npm_config__graphene_chain_chain_debug || false);

/**
*  @brief maintains a local cache of blockchain state
*
*  The ChainStore maintains a local cache of blockchain state and exposes
*  an API that makes it easy to query objects and receive updates when
*  objects are available.
*/
class ChainStore
{
    constructor() {
        /** tracks everyone who wants to receive updates when the cache changes */
        this.subscribers = new Set();
        this.subscribed = false;

        this.clearCache();
        // this.progress = 0;
        // this.chain_time_offset is used to estimate the blockchain time
        this.chain_time_offset = [];
        this.dispatchFrequency = 40;
    }

    /**
    * Clears all cached state.  This should be called any time the network connection is
    * reset.
    */
    clearCache() {
        /*
        * Tracks specific objects such as accounts that can trigger additional
        * fetching that should only happen if we're actually interested in the account
        */
        this.subbed_accounts = new Set();
        this.subbed_witnesses = new Set();
        this.subbed_committee = new Set();

        this.objects_by_id            = new Map();
        this.accounts_by_name         = new Map();
        this.assets_by_symbol         = new Map();
        this.account_ids_by_key       = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map();
        this.account_ids_by_account       = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map();

        this.balance_objects_by_address = new Map();
        this.get_account_refs_of_keys_calls = new Set();
        this.get_account_refs_of_accounts_calls = new Set();
        this.account_history_requests = new Map(); ///< tracks pending history requests
        this.witness_by_account_id    = new Map();
        this.committee_by_account_id  = new Map();
        this.objects_by_vote_id       = new Map();
        this.fetching_get_full_accounts = new Map();
        this.get_full_accounts_subscriptions = new Map();
        clearTimeout(this.timeout);
        this.dispatched = false;
    }

    resetCache() {
        this.subscribed = false;
        this.subError = null;
        this.clearCache();
        this.head_block_time_string = null;
        return this.init().catch(err => {
            console.log("resetCache init error:", err);
        });
    }

    setDispatchFrequency(freq) {
        this.dispatchFrequency = freq;
    }

    init() {
        let reconnectCounter = 0;
        var _init = (resolve, reject) => {
            if (this.subscribed) return resolve();
            let db_api = __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api();
            if (!db_api) {
                return reject(new Error("Api not found, please initialize the api instance before calling the ChainStore"));
            }
            return db_api.exec( "get_objects", [ ["2.1.0"] ] ).then( optional_objects => {
                //if(DEBUG) console.log("... optional_objects",optional_objects ? optional_objects[0].id : null)
                for(let i = 0; i < optional_objects.length; i++) {
                    let optional_object = optional_objects[i];
                    if( optional_object ) {

                        /*
                        ** Because 2.1.0 gets fetched here before the set_subscribe_callback,
                        ** the new witness_node subscription model makes it so we
                        ** never get subscribed to that object, therefore
                        ** this._updateObject is commented out here
                        */
                        // this._updateObject( optional_object, true );

                        let head_time = new Date(optional_object.time+"+00:00").getTime();
                        this.head_block_time_string = optional_object.time;
                        this.chain_time_offset.push( (new Date).getTime() - timeStringToDate(optional_object.time).getTime() );
                        let now = (new Date).getTime();
                        let delta = (now - head_time)/1000;
                        // let start = Date.parse("Sep 1, 2015");
                        // let progress_delta = head_time - start;
                        // this.progress = progress_delta / (now-start);

                        if( delta < 60  ) {
                            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "set_subscribe_callback", [ this.onUpdate.bind(this), true ] )
                            .then(() => {
                                console.log("synced and subscribed, chainstore ready");
                                this.subscribed = true;
                                this.subError = null;
                                this.notifySubscribers();
                                resolve();
                            })
                            .catch( error => {
                                this.subscribed = false;
                                this.subError = error;
                                this.notifySubscribers();
                                reject(error);
                                console.log( "Error: ", error );
                            });
                        } else {
                            console.log("not yet synced, retrying in 1s");
                            this.subscribed = false;
                            reconnectCounter++;
                            this.notifySubscribers();
                            if (reconnectCounter > 5) {
                                this.subError = new Error("ChainStore sync error, please check your system clock");
                                return reject(this.subError);
                            }
                            setTimeout( _init.bind(this, resolve, reject), 1000 );
                        }
                    } else {
                        setTimeout( _init.bind(this, resolve, reject), 1000 );
                    }
                }
            }).catch( error => { // in the event of an error clear the pending state for id
                console.log("!!! Chain API error", error);
                this.objects_by_id.delete("2.1.0");
                reject(error);
            });
        };

        return new Promise((resolve, reject) => _init(resolve, reject));
    }

    _subTo(type, id) {
        let key = "subbed_" + type;
        if (!this[key].has(id)) this[key].add(id);
    }

    unSubFrom(type, id) {
        let key = "subbed_" + type;
        this[key].delete(id);
        this.objects_by_id.delete(id);
    }

    _isSubbedTo(type, id) {
        let key = "subbed_" + type;
        return this[key].has(id);
    }

    onUpdate( updated_objects ) /// map from account id to objects
    {
        let cancelledOrders = [];
        let closedCallOrders = [];
        
        for( let a = 0; a < updated_objects.length; ++a )
        {
            for( let i = 0; i < updated_objects[a].length; ++i )
            {
                let obj = updated_objects[a][i];
                if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id( obj ) ) {
                    // An entry containing only an object ID means that object was removed
                    // console.log("removed obj", obj);
                    // Check if the object exists in the ChainStore
                    let old_obj = this.objects_by_id.get(obj);


                    if( obj.search( order_prefix ) == 0 ) {
                        // Limit orders

                        cancelledOrders.push(obj);
                        if (old_obj) {
                            let account = this.objects_by_id.get(old_obj.get("seller"));
                            if (account && account.has("orders")) {
                                let limit_orders = account.get("orders");
                                if (account.get("orders").has(obj)) {
                                    account = account.set("orders", limit_orders.delete(obj));
                                    this.objects_by_id.set( account.get("id"), account );
                                }
                            }
                        }
                    }

                    if( obj.search( call_order_prefix ) == 0 ) {
                        // Call orders
                        closedCallOrders.push(obj);
                        if (old_obj) {
                            let account = this.objects_by_id.get(old_obj.get("borrower"));
                            if (account && account.has("call_orders")) {
                                let call_orders = account.get("call_orders");
                                if (account.get("call_orders").has(obj)) {
                                    account = account.set("call_orders", call_orders.delete(obj));
                                    this.objects_by_id.set( account.get("id"), account );
                                }
                            }
                        }
                    }

                    // Remove the object (if it already exists), set to null to indicate it does not exist
                    if (old_obj) this.objects_by_id.set( obj, null );
                }
                else {
                    this._updateObject( obj );
                }
            }
        }

        // Cancelled limit order(s), emit event for any listeners to update their state
        if (cancelledOrders.length) emitter.emit("cancel-order", cancelledOrders);
        // Closed call order, emit event for any listeners to update their state
        if (closedCallOrders.length) emitter.emit("close-call", closedCallOrders);

        // console.log("objects in store count:", this.objects_by_id.size, updated_objects[0].reduce((final, o) => {
        //     if (o && o.id) {
        //         final.changed.push(o.id);
        //     } else {
        //         final.removed.push(o);
        //     }
        //     return final;
        // }, {changed: [], removed: []}));
        this.notifySubscribers();
    }

    notifySubscribers()
    {
        // Dispatch at most only once every x milliseconds
        if( ! this.dispatched ) {
            this.dispatched = true;
            this.timeout = setTimeout( () => {
                this.dispatched = false;
                this.subscribers.forEach( (callback) => { callback();} );
            }, this.dispatchFrequency );
        }
    }

    /**
    *  Add a callback that will be called anytime any object in the cache is updated
    */
    subscribe( callback ) {
        if(this.subscribers.has(callback))
            return console.error("Subscribe callback already exists", callback);
        this.subscribers.add( callback );
    }

    /**
    *  Remove a callback that was previously added via subscribe
    */
    unsubscribe( callback ) {
        if( ! this.subscribers.has(callback))
            return console.error("Unsubscribe callback does not exists", callback);
        this.subscribers.delete( callback );
    }

    /** Clear an object from the cache to force it to be fetched again. This may
    * be useful if a query failed the first time and the wallet has reason to believe
    * it may succeede the second time.
    */
    clearObjectCache( id ) {
        this.objects_by_id.delete(id);
    }

    /**
    * There are three states an object id could be in:
    *
    * 1. undefined       - returned if a query is pending
    * 3. defined         - return an object
    * 4. null            - query return null
    *
    */
    getObject( id, force = false, autosubscribe = true )
    {
        if( !__WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(id) )
            throw Error( "argument is not an object id: " + JSON.stringify(id) );

        let result = this.objects_by_id.get( id );
        let subChange = id.substring(0,account_prefix.length) == account_prefix && !this.get_full_accounts_subscriptions.get(id, false) && autosubscribe;

        if( result === undefined || force || subChange )
            return this.fetchObject( id, force, autosubscribe );
        if( result === true )
            return undefined;

        return result;
    }

    /**
    *  @return undefined if a query is pending
    *  @return null if id_or_symbol has been queired and does not exist
    *  @return object if the id_or_symbol exists
    */
    getAsset( id_or_symbol )
    {
        if( !id_or_symbol )
            return null;

        if ( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id( id_or_symbol ) ) {
            let asset = this.getObject( id_or_symbol );

            if (asset && (asset.get("bitasset") && !asset.getIn(["bitasset", "current_feed"]))) {
                return undefined;
            }
            return asset;
        }

        /// TODO: verify id_or_symbol is a valid symbol name

        let asset_id = this.assets_by_symbol.get( id_or_symbol );

        if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(asset_id)) {
            let asset = this.getObject( asset_id );

            if (asset && (asset.get("bitasset") && !asset.getIn(["bitasset", "current_feed"]))) {
                return undefined;
            }
            return asset;
        }

        if( asset_id === null )
            return null;

        if( asset_id === true )
            return undefined;

        __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "lookup_asset_symbols", [ [id_or_symbol] ] )
        .then( asset_objects => {
            // console.log( "lookup symbol ", id_or_symbol )
            if( asset_objects.length && asset_objects[0] )
                this._updateObject( asset_objects[0], true );
            else {
                this.assets_by_symbol.set( id_or_symbol, null );
                this.notifySubscribers();
            }
        }).catch( error => {
            console.log( "Error: ", error );
            this.assets_by_symbol.delete( id_or_symbol );
        });

        return undefined;
    }

    /**
    *  @param the public key to find accounts that reference it
    *
    *  @return Set of account ids that reference the given key
    *  @return a empty Set if no items are found
    *  @return undefined if the result is unknown
    *
    *  If this method returns undefined, then it will send a request to
    *  the server for the current set of accounts after which the
    *  server will notify us of any accounts that reference these keys
    */
    getAccountRefsOfKey( key )
    {
        if( this.get_account_refs_of_keys_calls.has(key) )
            return this.account_ids_by_key.get( key );
        else
        {
            this.get_account_refs_of_keys_calls.add(key);

            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "get_key_references", [ [key] ] )
            .then( vec_account_id => {
                let refs = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set();
                vec_account_id = vec_account_id[0];
                refs = refs.withMutations( r => {
                    for( let i = 0; i < vec_account_id.length; ++i ) {
                        r.add(vec_account_id[i]);
                    }
                });
                this.account_ids_by_key = this.account_ids_by_key.set( key, refs );
                this.notifySubscribers();
            }).catch(err => {
                console.error("get_key_references", err);
                this.account_ids_by_key = this.account_ids_by_key.delete( key );
                this.get_account_refs_of_keys_calls.delete(key);
            });
            return undefined;
        }
        return undefined;
    }

    /**
    *  @param the account id to find accounts that reference it
    *
    *  @return Set of account ids that reference the given key
    *  @return a empty Set if no items are found
    *  @return undefined if the result is unknown
    *
    *  If this method returns undefined, then it will send a request to
    *  the server for the current set of accounts after which the
    *  server will notify us of any accounts that reference these keys
    */
    getAccountRefsOfAccount( account_id )
    {
        if( this.get_account_refs_of_accounts_calls.has(account_id) )
            return this.account_ids_by_account.get( account_id );
        else
        {
            this.get_account_refs_of_accounts_calls.add(account_id);

            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "get_account_references", [ account_id ] )
            .then( vec_account_id => {
                let refs = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set();
                refs = refs.withMutations( r => {
                    for( let i = 0; i < vec_account_id.length; ++i ) {
                        r.add(vec_account_id[i]);
                    }
                });
                this.account_ids_by_account = this.account_ids_by_account.set( account_id, refs );
                this.notifySubscribers();
            }).catch(err => {
                console.error("get_account_references", err);
                this.account_ids_by_account = this.account_ids_by_account.delete( account_id );
                this.get_account_refs_of_accounts_calls.delete(account_id);
            });
            return undefined;
        }
        return undefined;
    }

    /**
    * @return a Set of balance ids that are claimable with the given address
    * @return undefined if a query is pending and the set is not known at this time
    * @return a empty Set if no items are found
    *
    * If this method returns undefined, then it will send a request to the server for
    * the current state after which it will be subscribed to changes to this set.
    */
    getBalanceObjects( address )
    {
        let current = this.balance_objects_by_address.get( address );
        if( current === undefined )
        {
            /** because balance objects are simply part of the genesis state, there is no need to worry about
            * having to update them / merge them or index them in updateObject.
            */
            this.balance_objects_by_address.set( address, __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set() );
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "get_balance_objects", [ [address] ] )
            .then( balance_objects => {
                let set = new Set();
                for( let i = 0; i < balance_objects.length; ++i )
                {
                    this._updateObject( balance_objects[i] );
                    set.add(balance_objects[i].id);
                }
                this.balance_objects_by_address.set( address, __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set(set) );
                this.notifySubscribers();
            },
            () => {
                this.balance_objects_by_address.delete( address );
            });
        }
        return this.balance_objects_by_address.get( address );
    }


    /**
    *  If there is not already a pending request to fetch this object, a new
    *  request will be made.
    *
    *  @return null if the object does not exist,
    *  @return undefined if the object might exist but is not in cache
    *  @return the object if it does exist and is in our cache
    */
    fetchObject( id, force = false, autosubscribe = true )
    {
        if( typeof id !== "string" )
        {
            let result = [];
            for( let i = 0; i < id.length; ++i )
                result.push( this.fetchObject( id[i], force, autosubscribe ) );
            return result;
        }

        if(DEBUG) console.log( "!!! fetchObject: ", id, this.subscribed, !this.subscribed && !force );
        if( !this.subscribed && !force ) return undefined;

        if(DEBUG) console.log( "maybe fetch object: ", id );
        if( !__WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(id) )
            throw Error( "argument is not an object id: " + id );

        if( id.search("1.2.") === 0 ) return this.fetchFullAccount( id, autosubscribe );
        if (id.search(witness_prefix) === 0) this._subTo("witnesses", id);
        if (id.search(committee_prefix) === 0) this._subTo("committee", id);

        let result = this.objects_by_id.get( id );
        if( result === undefined ) { // the fetch
            if(DEBUG) console.log( "fetching object: ", id );
            this.objects_by_id.set( id, true );
            if (!__WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api()) return null;
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "get_objects", [ [id] ] ).then( optional_objects => {
                //if(DEBUG) console.log("... optional_objects",optional_objects ? optional_objects[0].id : null)
                for(let i = 0; i < optional_objects.length; i++) {
                    let optional_object = optional_objects[i];
                    if( optional_object )
                        this._updateObject( optional_object, true );
                    else {
                        this.objects_by_id.set( id, null );
                        this.notifySubscribers();
                    }
                }
            }).catch( error => { // in the event of an error clear the pending state for id
                console.log("!!! Chain API error",error);
                this.objects_by_id.delete(id);
            });
        }
        else if( result === true ) // then we are waiting a response
            return undefined;
        return result; // we have a response, return it
    }

    /**
    *  @return null if no such account exists
    *  @return undefined if such an account may exist, and fetch the the full account if not already pending
    *  @return the account object if it does exist
    */
    getAccount( name_or_id, autosubscribe = true ) {
        if( !name_or_id )
            return null;

        if( typeof name_or_id === "object" )
        {
            if( name_or_id.id ) return this.getAccount( name_or_id.id, autosubscribe );
            else if( name_or_id.get ) return this.getAccount( name_or_id.get("id"), autosubscribe );
            else return undefined;
        }

        if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(name_or_id) )
        {
            let account = this.getObject( name_or_id, false, autosubscribe );
            if (account === null) {
                return null;
            }
            /* If sub status changes from false to true, force full fetch */
            const currentSub = this.get_full_accounts_subscriptions.get(name_or_id, false);
            if( (!currentSub && autosubscribe) || account === undefined || account.get("name") === undefined ) {
                return this.fetchFullAccount( name_or_id, autosubscribe );
            }
            return account;
        }
        else if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_account_name( name_or_id, true ) )
        {
            let account_id = this.accounts_by_name.get( name_or_id );
            if(account_id === null) return null; // already fetched and it wasn't found
            if( account_id === undefined ) // then no query, fetch it
                return this.fetchFullAccount( name_or_id, autosubscribe );

            return this.getObject( account_id, false, autosubscribe ); // return it
        }
        //throw Error( `Argument is not an account name or id: ${name_or_id}` )
    }

    /**
    * This method will attempt to lookup witness by account_id.
    * If witness doesn't exist it will return null, if witness is found it will return witness object,
    * if it's not fetched yet it will return undefined.
    * @param account_id - account id
    */
    getWitnessById(account_id) {
        let witness_id = this.witness_by_account_id.get(account_id);
        if (witness_id === undefined) {
            this.fetchWitnessByAccount(account_id);
            return undefined;
        } else if (witness_id) {
            this._subTo("witnesses", witness_id);
        }

        return witness_id ? this.getObject(witness_id) : null;
    }

    /**
    * This method will attempt to lookup committee member by account_id.
    * If committee member doesn't exist it will return null, if committee member is found it will return committee member object,
    * if it's not fetched yet it will return undefined.
    * @param account_id - account id
    */
    getCommitteeMemberById(account_id) {
        let cm_id = this.committee_by_account_id.get(account_id);
        if (cm_id === undefined) {
            this.fetchCommitteeMemberByAccount(account_id);
            return undefined;
        } else if (cm_id) {
            this._subTo("committee", cm_id);
        }
        return cm_id ? this.getObject(cm_id) : null;
    }

    /**
    * Obsolete! Please use getWitnessById
    * This method will attempt to lookup the account, and then query to see whether or not there is
    * a witness for this account.  If the answer is known, it will return the witness_object, otherwise
    * it will attempt to look it up and return null.   Once the lookup has completed on_update will
    * be called.
    *
    * @param id_or_account may either be an account_id, a witness_id, or an account_name
    */
    // getWitness( id_or_account )
    // {
    //     let account = this.getAccount( id_or_account );
    //     if( !account ) return null;
    //     let account_id = account.get("id");
    //
    //     let witness_id = this.witness_by_account_id.get( account_id );
    //     if( witness_id === undefined )
    //         this.fetchWitnessByAccount( account_id );
    //     return this.getObject( witness_id );
    //
    //     if( ChainValidation.is_account_name(id_or_account, true) || (id_or_account.substring(0,4) == "1.2."))
    //     {
    //         let account = this.getAccount( id_or_account );
    //         if( !account )
    //         {
    //             this.lookupAccountByName( id_or_account ).then ( account => {
    //                 if( !account ) return null;
    //
    //                 let account_id = account.get("id");
    //                 let witness_id = this.witness_by_account_id.get( account_id );
    //                 if( ChainValidation.is_object_id( witness_id ) )
    //                     return this.getObject( witness_id, on_update );
    //
    //                 if( witness_id == undefined )
    //                     this.fetchWitnessByAccount( account_id ).then( witness => {
    //                         this.witness_by_account_id.set( account_id, witness?witness.get("id"):null );
    //                         if( witness && on_update ) on_update();
    //                     })
    //                 }, () => {
    //                     let witness_id = this.witness_by_account_id.set( id_or_account, null )
    //                 } )
    //         }
    //         else
    //         {
    //             let account_id = account.get("id")
    //             let witness_id = this.witness_by_account_id.get( account_id )
    //             if( ChainValidation.is_object_id( witness_id ) )
    //             return this.getObject( witness_id, on_update )
    //
    //             if( witness_id == undefined )
    //             this.fetchWitnessByAccount( account_id ).then( witness => {
    //                 this.witness_by_account_id.set( account_id, witness?witness.get("id"):null )
    //                 if( witness && on_update ) on_update()
    //             })
    //         }
    //         return null
    //     }
    //     return null
    // }

    // Obsolete! Please use getCommitteeMemberById
    // getCommitteeMember( id_or_account, on_update = null )
    // {
    //     if( ChainValidation.is_account_name(id_or_account, true) || (id_or_account.substring(0,4) == "1.2."))
    //     {
    //         let account = this.getAccount( id_or_account )
    //
    //         if( !account )
    //         {
    //             this.lookupAccountByName( id_or_account ).then( account=>{
    //                 let account_id = account.get("id")
    //                 let committee_id = this.committee_by_account_id.get( account_id )
    //                 if( ChainValidation.is_object_id( committee_id ) ) return this.getObject( committee_id, on_update )
    //
    //                 if( committee_id == undefined )
    //                 {
    //                     this.fetchCommitteeMemberByAccount( account_id ).then( committee => {
    //                         this.committee_by_account_id.set( account_id, committee ? committee.get("id") : null )
    //                         if( on_update && committee) on_update()
    //                     } )
    //                 }
    //             }, error => {
    //                 let witness_id = this.committee_by_account_id.set( id_or_account, null )
    //             })
    //         }
    //         else
    //         {
    //             let account_id = account.get("id")
    //             let committee_id = this.committee_by_account_id.get( account_id )
    //             if( ChainValidation.is_object_id( committee_id ) ) return this.getObject( committee_id, on_update )
    //
    //             if( committee_id == undefined )
    //             {
    //                 this.fetchCommitteeMemberByAccount( account_id ).then( committee => {
    //                     this.committee_by_account_id.set( account_id, committee ? committee.get("id") : null )
    //                     if( on_update && committee) on_update()
    //                 } )
    //             }
    //         }
    //     }
    //     return null
    // }

    /**
    *
    * @return a promise with the witness object
    */
    fetchWitnessByAccount( account_id )
    {
        return new Promise( (resolve,reject ) => {
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "get_witness_by_account", [ account_id ] )
            .then( optional_witness_object => {
                if( optional_witness_object )
                {
                    this._subTo("witnesses", optional_witness_object.id);
                    this.witness_by_account_id = this.witness_by_account_id.set( optional_witness_object.witness_account, optional_witness_object.id );
                    let witness_object = this._updateObject( optional_witness_object, true );
                    resolve(witness_object);
                }
                else
                {
                    this.witness_by_account_id = this.witness_by_account_id.set( account_id, null );
                    this.notifySubscribers();
                    resolve(null);
                }
            }, reject );
        });
    }
    /**
    *
    * @return a promise with the witness object
    */
    fetchCommitteeMemberByAccount( account_id )
    {
        return new Promise( (resolve,reject ) => {
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "get_committee_member_by_account", [ account_id ] )
            .then( optional_committee_object => {
                if( optional_committee_object )
                {
                    this._subTo("committee", optional_committee_object.id);
                    this.committee_by_account_id = this.committee_by_account_id.set( optional_committee_object.committee_member_account, optional_committee_object.id );
                    let committee_object = this._updateObject( optional_committee_object, true );
                    resolve(committee_object);
                }
                else
                {
                    this.committee_by_account_id = this.committee_by_account_id.set( account_id, null );
                    this.notifySubscribers();
                    resolve(null);
                }
            }, reject );
        });
    }


    /**
    *  Fetches an account and all of its associated data in a single query
    *
    *  @param an account name or account id
    *
    *  @return undefined if the account in question is in the process of being fetched
    *  @return the object if it has already been fetched
    *  @return null if the object has been queried and was not found
    */
    fetchFullAccount( name_or_id, autosubscribe = true )
    {
        if(DEBUG) console.log( "Fetch full account: ", name_or_id );

        let fetch_account = false;
        const subChanged = this.get_full_accounts_subscriptions.has(name_or_id) && (this.get_full_accounts_subscriptions.get(name_or_id) === false && autosubscribe);

        if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(name_or_id) && !subChanged ) {
            let current = this.objects_by_id.get( name_or_id );
            fetch_account = current === undefined;
            if( !fetch_account && (current && current.get("name")) ) return current;
        } else if (!subChanged) {
            if( !__WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_account_name( name_or_id, true ) )
                throw Error( "argument is not an account name: " + name_or_id );

            let account_id = this.accounts_by_name.get( name_or_id );
            if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id( account_id ) )
                return this.getAccount(account_id, autosubscribe);
        }


        /// only fetch once every 5 seconds if it wasn't found, or if the subscribe status changed to true
        if( subChanged || !this.fetching_get_full_accounts.has(name_or_id) || (Date.now() - this.fetching_get_full_accounts.get(name_or_id)) > 5000  ) {
            this.fetching_get_full_accounts.set(name_or_id, Date.now() );
            // console.log( "FETCHING FULL ACCOUNT: ", name_or_id, autosubscribe );
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec("get_full_accounts", [[name_or_id], autosubscribe])
            .then( results => {
                if(results.length === 0 ) {
                    if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(name_or_id) ) {
                        this.objects_by_id.set( name_or_id, null );
                        this.notifySubscribers();
                    }
                    return;
                }
                let full_account = results[0][1];
                this.get_full_accounts_subscriptions.set(full_account.account.name, autosubscribe);
                this.get_full_accounts_subscriptions.set(full_account.account.id, autosubscribe);
                if(DEBUG) console.log( "full_account: ", full_account );
                /* Add this account to list of subbed accounts */
                this._subTo("accounts", full_account.account.id);
                let {
                    account,
                    assets,
                    vesting_balances,
                    statistics,
                    call_orders,
                    limit_orders,
                    referrer_name, registrar_name, lifetime_referrer_name,
                    votes,
                    proposals
                } = full_account;

                this.accounts_by_name.set( account.name, account.id );
                account.assets = new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.List(assets || []);
                account.referrer_name = referrer_name;
                account.lifetime_referrer_name = lifetime_referrer_name;
                account.registrar_name = registrar_name;
                account.balances = {};
                account.orders = new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set();
                account.vesting_balances = new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set();
                account.balances = new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map();
                account.call_orders = new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set();
                account.proposals = new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set();
                account.vesting_balances = account.vesting_balances.withMutations(set => {
                    vesting_balances.forEach(vb => {
                        this._updateObject( vb );
                        set.add( vb.id );
                    });
                });

                let sub_to_objects = [];

                votes.forEach(v => this._updateObject( v ));

                account.balances = account.balances.withMutations(map => {
                    full_account.balances.forEach(b => {
                        this._updateObject( b );
                        map.set( b.asset_type, b.id );
                        sub_to_objects.push(b.id);
                    });
                });
                account.orders = account.orders.withMutations(set => {
                    limit_orders.forEach(order => {
                        this._updateObject( order );
                        set.add( order.id );
                        sub_to_objects.push(order.id);
                    });
                });
                account.call_orders = account.call_orders.withMutations(set => {
                    call_orders.forEach(co => {
                        this._updateObject( co );
                        set.add( co.id );
                        sub_to_objects.push(co.id);
                    });
                });

                account.proposals = account.proposals.withMutations(set => {
                    proposals.forEach(p => {
                        this._updateObject( p );
                        set.add( p.id );
                        sub_to_objects.push(p.id);
                    });
                });

                if (sub_to_objects.length) __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [sub_to_objects]);

                this._updateObject( statistics );
                let updated_account = this._updateObject( account );
                this.fetchRecentHistory( updated_account );
                this.notifySubscribers();
            }, error => {
                console.log( "Error: ", error );
                if( __WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(name_or_id) )
                    this.objects_by_id.delete( name_or_id );
                else
                    this.accounts_by_name.delete( name_or_id );
            });
        }
        return undefined;
    }

    getAccountMemberStatus( account ) {
        if( account === undefined ) return undefined;
        if( account === null ) return "unknown";
        if( account.get( "lifetime_referrer" ) == account.get( "id" ) )
            return "lifetime";
        let exp = new Date( account.get("membership_expiration_date") ).getTime();
        let now = new Date().getTime();
        if( exp < now )
            return "basic";
        return "annual";
    }

    getAccountBalance( account, asset_type )
    {
        let balances = account.get( "balances" );
        if( !balances )
            return 0;

        let balance_obj_id = balances.get( asset_type );
        if( balance_obj_id )
        {
            let bal_obj = this.objects_by_id.get( balance_obj_id );
            if( bal_obj ) return bal_obj.get( "balance" );
        }
        return 0;
    }

    /**
    * There are two ways to extend the account history, add new more
    * recent history, and extend historic hstory. This method will fetch
    * the most recent account history and prepend it to the list of
    * historic operations.
    *
    *  @param account immutable account object
    *  @return a promise with the account history
    */
    fetchRecentHistory( account, limit = 100 )
    {
        // console.log( "get account history: ", account )
        /// TODO: make sure we do not submit a query if there is already one
        /// in flight...
        let account_id = account;
        if( !__WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(account_id) && account.toJS )
            account_id = account.get("id");

        if( !__WEBPACK_IMPORTED_MODULE_3__ChainValidation__["a" /* default */].is_object_id(account_id)  )
            return;

        account = this.objects_by_id.get(account_id);
        if( !account ) return;


        let pending_request = this.account_history_requests.get(account_id);
        if( pending_request ) {
            pending_request.requests++;
            return pending_request.promise;
        }
        else pending_request = { requests: 0 };


        let most_recent = "1." + op_history + ".0";
        let history = account.get( "history" );

        if( history && history.size )  most_recent = history.first().get("id");


        /// starting at 0 means start at NOW, set this to something other than 0
        /// to skip recent transactions and fetch the tail
        let start = "1." + op_history + ".0";

        pending_request.promise = new Promise( (resolve, reject) => {
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().history_api().exec("get_account_history",
            [ account_id, most_recent, limit, start])
            .then( operations => {
                let current_account = this.objects_by_id.get( account_id );
                if (!current_account) return;
                let current_history = current_account.get( "history" );
                if( !current_history ) current_history = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.List();
                let updated_history = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(operations);
                updated_history = updated_history.withMutations( list => {
                    for( let i = 0; i < current_history.size; ++i )
                        list.push( current_history.get(i) );
                });
                let updated_account = current_account.set( "history", updated_history );
                this.objects_by_id.set( account_id, updated_account );

                //if( current_history != updated_history )
                //   this._notifyAccountSubscribers( account_id )

                let pending_request = this.account_history_requests.get(account_id);
                this.account_history_requests.delete(account_id);
                if( pending_request.requests > 0 )
                {
                    // it looks like some more history may have come in while we were
                    // waiting on the result, lets fetch anything new before we resolve
                    // this query.
                    this.fetchRecentHistory(updated_account, limit ).then( resolve, reject );
                }
                else
                    resolve(updated_account);
            }); // end then
        });

        this.account_history_requests.set( account_id, pending_request );
        return pending_request.promise;
    }

    //_notifyAccountSubscribers( account_id )
    //{
    //   let sub = this.subscriptions_by_account.get( account_id )
    //   let acnt = this.objects_by_id.get(account_id)
    //   if( !sub ) return
    //   for( let item of sub.subscriptions )
    //      item( acnt )
    //}

    /**
    *  Callback that receives notification of objects that have been
    *  added, remove, or changed and are relevant to account_id
    *
    *  This method updates or removes objects from the main index and
    *  then updates the account object with relevant meta-info depending
    *  upon the type of account
    */
    // _updateAccount( account_id, payload )
    // {
    //    let updates = payload[0]

    //    for( let i = 0; i < updates.length; ++i )
    //    {
    //       let update = updates[i]
    //       if( typeof update  == 'string' )
    //       {
    //          let old_obj = this._removeObject( update )

    //          if( update.search( order_prefix ) == 0 )
    //          {
    //                acnt = acnt.setIn( ['orders'], set => set.delete(update) )
    //          }
    //          else if( update.search( vesting_balance_prefix ) == 0 )
    //          {
    //                acnt = acnt.setIn( ['vesting_balances'], set => set.delete(update) )
    //          }
    //       }
    //       else
    //       {
    //          let updated_obj = this._updateObject( update )
    //          if( update.id.search( balance_prefix ) == 0 )
    //          {
    //             if( update.owner == account_id )
    //                acnt = acnt.setIn( ["balances"], map => map.set(update.asset_type,update.id) )
    //          }
    //          else if( update.id.search( order_prefix ) == 0 )
    //          {
    //             if( update.owner == account_id )
    //                acnt = acnt.setIn( ['orders'], set => set.add(update.id) )
    //          }
    //          else if( update.id.search( vesting_balance_prefix ) == 0 )
    //          {
    //             if( update.owner == account_id )
    //                acnt = acnt.setIn( ['vesting_balances'], set => set.add(update.id) )
    //          }

    //          this.objects_by_id.set( acnt.id, acnt )
    //       }
    //    }
    //    this.fetchRecentHistory( acnt )
    // }


    /**
    *  Updates the object in place by only merging the set
    *  properties of object.
    *
    *  This method will create an immutable object with the given ID if
    *  it does not already exist.
    *
    *  This is a "private" method called when data is received from the
    *  server and should not be used by others.
    *
    *  @pre object.id must be a valid object ID
    *  @return an Immutable constructed from object and deep merged with the current state
    */
    _updateObject( object, notify_subscribers = false, emit = true )
    {

        if (!("id" in object)) {
            console.log("object with no id:", object);
            /* Settle order updates look different and need special handling */
            if ("balance" in object && "owner" in object && "settlement_date" in object) {
                // Settle order object
                emitter.emit("settle-order-update", object);
            }
            return;
        }

        /*
        * A lot of objects get spammed by the API that we don't care about, filter these out here
        */
        // Transaction object
        if( object.id.substring(0,transaction_prefix.length) == transaction_prefix ) {
            return; // console.log("not interested in transaction:", object);
        } else if( object.id.substring(0, account_transaction_history_prefix.length) == account_transaction_history_prefix ) {
            // transaction_history object
            if (!this._isSubbedTo("accounts", object.account)) {
                return; // console.log("not interested in transaction_history of", object.account);
            }
        } else if( object.id.substring(0, order_prefix.length) == order_prefix ) {
            // limit_order object
            if (!this._isSubbedTo("accounts", object.seller)) {
                return; // console.log("not interested in limit_orders of", object.seller);
            }
        } else if( object.id.substring(0, call_order_prefix.length) == call_order_prefix ) {
            // call_order object
            if (!this._isSubbedTo("accounts", object.borrower)) {
                return; // console.log("not interested in call_orders of", object.borrower);
            }
        } else if (object.id.substring(0, balance_prefix.length) == balance_prefix) {
            // balance object
            if (!this._isSubbedTo("accounts", object.owner)) {
                return; // console.log("not interested in balance_object of", object.owner);
            }
        } else if( object.id.substring(0, operation_history_prefix.length) == operation_history_prefix ) {
            // operation_history object
            return; // console.log("not interested in operation_history", object);
        } else if( object.id.substring(0, block_summary_prefix.length) == block_summary_prefix ) {
            // block_summary object
            return; // console.log("not interested in block_summary_prefix", object);
        } else if( object.id.substring(0,account_stats_prefix.length) == account_stats_prefix ) {
            // account_stats object
            if (!this._isSubbedTo("accounts", object.owner)) {
                return; // console.log("not interested in stats of", object.owner);
            }
        } else if( object.id.substring(0,witness_prefix.length) == witness_prefix ) {
            // witness object
            if (!this._isSubbedTo("witnesses", object.id)) {
                return;
            }
        } else if( object.id.substring(0,committee_prefix.length) == committee_prefix ) {
            // committee_member object
            if (!this._isSubbedTo("committee", object.id)) {
                return;
            }
        } else if (object.id.substring(0, 4) === "0.0." || object.id.substring(0, 4) === "5.1.") {
            /*
            ** The witness node spams these random objects related to markets,
            ** they are never needed by the GUI and thus only fill up the memory,
            ** so we ignore them
            */
            return;
        }

        // DYNAMIC GLOBAL OBJECT
        if( object.id == "2.1.0" ) {
            object.participation = 100*(__WEBPACK_IMPORTED_MODULE_4_bigi___default()(object.recent_slots_filled).bitCount() / 128.0);
            this.head_block_time_string = object.time;
            this.chain_time_offset.push( Date.now() - timeStringToDate(object.time).getTime() );
            if(this.chain_time_offset.length > 10) this.chain_time_offset.shift(); // remove first
        }

        let current = this.objects_by_id.get( object.id );
        if( !current ) {
            // console.log("add object:", object.id);
            current = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map();
        }
        let prior   = current;
        if( current === undefined || current === true )
            this.objects_by_id.set( object.id, current = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(object) );
        else
        {
            this.objects_by_id.set( object.id, current = current.mergeDeep( __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(object) ) );
        }


        // BALANCE OBJECT
        if( object.id.substring(0,balance_prefix.length) == balance_prefix ) {
            let owner = this.objects_by_id.get( object.owner );
            if( owner === undefined || owner === null ) {
                return;
                /*  This prevents the full account from being looked up later
                owner = {id:object.owner, balances:{ } }
                owner.balances[object.asset_type] = object.id
                owner = Immutable.fromJS( owner )
                */
            } else {
                let balances = owner.get( "balances" );
                if( !balances )
                    owner = owner.set( "balances", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map() );
                owner = owner.setIn( ["balances",object.asset_type],  object.id );
            }
            this.objects_by_id.set( object.owner, owner  );
        } else if( object.id.substring(0,account_stats_prefix.length) == account_stats_prefix ) {
            // ACCOUNT STATS OBJECT
            try {
                let prior_most_recent_op = prior.get("most_recent_op", "2.9.0");

                if( prior_most_recent_op != object.most_recent_op) {
                    this.fetchRecentHistory( object.owner );
                }
            } catch(err) {
                console.log("prior error:", "object:", obj, "prior", prior, "err:", err);
            }
        } else if( object.id.substring(0,witness_prefix.length) == witness_prefix ) {
            // WITNESS OBJECT
            if (this._isSubbedTo("witnesses", object.id)) {
                this.witness_by_account_id.set( object.witness_account, object.id );
                this.objects_by_vote_id.set( object.vote_id, object.id );
            } else {
                return;
            }
        } else if( object.id.substring(0,committee_prefix.length) == committee_prefix ) {
            // COMMITTEE MEMBER OBJECT
            if (this._isSubbedTo("committee", object.id)) {
                this.committee_by_account_id.set( object.committee_member_account, object.id );
                this.objects_by_vote_id.set( object.vote_id, object.id );
            } else {
                return;
            }
        } else if( object.id.substring(0,account_prefix.length) == account_prefix ) {
            // ACCOUNT OBJECT
            current = current.set( "active", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.active ) );
            current = current.set( "owner", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.owner ) );
            current = current.set( "options", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.options ) );
            current = current.set( "whitelisting_accounts", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.whitelisting_accounts ) );
            current = current.set( "blacklisting_accounts", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.blacklisting_accounts ) );
            current = current.set( "whitelisted_accounts", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.whitelisted_accounts ) );
            current = current.set( "blacklisted_accounts", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS( object.blacklisted_accounts ) );
            this.objects_by_id.set( object.id, current );
            this.accounts_by_name.set( object.name, object.id );
        } else if( object.id.substring(0,asset_prefix.length) == asset_prefix ) {
            // ASSET OBJECT
            this.assets_by_symbol.set( object.symbol, object.id );
            let dynamic = current.get( "dynamic" );
            if( !dynamic ) {
                let dad = this.getObject( object.dynamic_asset_data_id, true );
                if( !dad )
                    dad = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map();
                if( !dad.get( "asset_id" ) ) {
                    dad = dad.set( "asset_id", object.id );
                }
                this.objects_by_id.set( object.dynamic_asset_data_id, dad );

                current = current.set( "dynamic", dad );
                this.objects_by_id.set( object.id, current );
            }

            let bitasset = current.get( "bitasset" );
            if( !bitasset && object.bitasset_data_id ) {
                let bad = this.getObject( object.bitasset_data_id, true );
                if( !bad )
                    bad = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Map();

                if( !bad.get( "asset_id" ) ) {
                    bad = bad.set( "asset_id", object.id );
                }
                this.objects_by_id.set( object.bitasset_data_id, bad );

                current = current.set( "bitasset", bad );
                this.objects_by_id.set( object.id, current );
            }
        } else if( object.id.substring(0,asset_dynamic_data_prefix.length) == asset_dynamic_data_prefix ) {
            // ASSET DYNAMIC DATA OBJECT
            // let asset_id = asset_prefix + object.id.substring( asset_dynamic_data_prefix.length )
            let asset_id = current.get( "asset_id" );
            if (asset_id) {
                let asset_obj = this.getObject( asset_id );
                if(asset_obj && asset_obj.set) {
                    asset_obj = asset_obj.set( "dynamic", current );
                    this.objects_by_id.set( asset_id, asset_obj );
                }
            }

        } else if( object.id.substring(0,worker_prefix.length ) == worker_prefix ) {
            // WORKER OBJECT
            this.objects_by_vote_id.set( object.vote_for, object.id );
            this.objects_by_vote_id.set( object.vote_against, object.id );
        } else if( object.id.substring(0,bitasset_data_prefix.length) == bitasset_data_prefix ) {
            // BITASSET DATA OBJECT
            let asset_id = current.get( "asset_id" );
            if( asset_id ) {
                let asset = this.getObject( asset_id );
                if( asset ) {
                    asset = asset.set( "bitasset", current );
                    emitter.emit("bitasset-update", asset);
                    this.objects_by_id.set( asset_id, asset );
                }
            }
        } else if( object.id.substring(0,call_order_prefix.length ) == call_order_prefix ) {
            // CALL ORDER OBJECT
            // Update nested call_orders inside account object
            if (emit) {
                emitter.emit("call-order-update", object);
            }

            let account = this.objects_by_id.get(object.borrower);
            if (account) {
                if (!account.has("call_orders")) account = account.set("call_orders", new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set());
                let call_orders = account.get("call_orders");
                if (!call_orders.has(object.id)) {
                    account = account.set("call_orders", call_orders.add(object.id));
                    this.objects_by_id.set( account.get("id"), account );
                    __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [[object.id]]); // Force subscription to the object in the witness node by calling get_objects
                }
            }
        }
        else if( object.id.substring(0,order_prefix.length ) == order_prefix ) {
            // LIMIT ORDER OBJECT
            let account = this.objects_by_id.get(object.seller);
            if (account) {
                if (!account.has("orders")) account = account.set("orders", new __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set());
                let limit_orders = account.get("orders");
                if (!limit_orders.has(object.id)) {
                    account = account.set("orders", limit_orders.add(object.id));
                    this.objects_by_id.set( account.get("id"), account );
                    __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [[object.id]]); // Force subscription to the object in the witness node by calling get_objects
                }
            }
            // POROPOSAL OBJECT
        } else if ( object.id.substring(0,proposal_prefix.length ) == proposal_prefix ) {
            this.addProposalData(object.required_active_approvals, object.id);
            this.addProposalData(object.required_owner_approvals, object.id);
        }


        if( notify_subscribers ) {
            this.notifySubscribers();
        }
        return current;
    }

    getObjectsByVoteIds( vote_ids )
    {
        let result = [];
        let missing = [];
        for( let i = 0; i < vote_ids.length; ++i )
        {
            let obj = this.objects_by_vote_id.get( vote_ids[i] );
            if( obj )
                result.push(this.getObject( obj ) );
            else
            {
                result.push( null );
                missing.push( vote_ids[i] );
            }
        }

        if( missing.length ) {
            // we may need to fetch some objects
            __WEBPACK_IMPORTED_MODULE_1_cybexjs_ws__["Apis"].instance().db_api().exec( "lookup_vote_ids", [ missing ] )
            .then( vote_obj_array => {
                console.log( "missing ===========> ", missing );
                console.log( "vote objects ===========> ", vote_obj_array );
                for( let i = 0; i < vote_obj_array.length; ++i )
                {
                    if( vote_obj_array[i] )
                    {
                        let isWitness = vote_obj_array[i].id.substring(0, witness_prefix.length ) == witness_prefix;
                        this._subTo(isWitness ? "witnesses" : "committee", vote_obj_array[i].id);
                        this._updateObject( vote_obj_array[i] );
                    }
                }
            }, error => console.log( "Error looking up vote ids: ", error ) );
        }
        return result;
    }

    getObjectByVoteID( vote_id )
    {
        let obj_id = this.objects_by_vote_id.get( vote_id );
        if( obj_id ) return this.getObject( obj_id );
        return undefined;
    }

    getHeadBlockDate() {
        return timeStringToDate( this.head_block_time_string );
    }

    getEstimatedChainTimeOffset() {
        if( this.chain_time_offset.length === 0 ) return 0;
        // Immutable is fast, sorts numbers correctly, and leaves the original unmodified
        // This will fix itself if the user changes their clock
        var median_offset = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.List(this.chain_time_offset)
        .sort().get(Math.floor( (this.chain_time_offset.length - 1) / 2 ));
        // console.log("median_offset", median_offset)
        return median_offset;
    }

    addProposalData(approvals, objectId) {
        approvals.forEach(id => {
            let impactedAccount = this.objects_by_id.get(id);
            if (impactedAccount) {
                let proposals = impactedAccount.get("proposals", __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Set());

                if (!proposals.includes(objectId)) {
                    proposals = proposals.add(objectId);
                    impactedAccount = impactedAccount.set("proposals", proposals);
                    this._updateObject( impactedAccount.toJS() );
                }
            }
        });
    }

}

let chain_store = new ChainStore();

function FetchChainObjects(method, object_ids, timeout, subMap) {
    let get_object = method.bind(chain_store);

    return new Promise((resolve, reject) => {

        let timeout_handle = null;

        function onUpdate(not_subscribed_yet = false) {
            let res = object_ids.map(id => {
                if (method.name === "getAccount") return get_object(id, subMap[id]);
                if (method.name === "getObject") return get_object(id, false, subMap[id]);
                return get_object(id);
            });
            if (res.findIndex(o => o === undefined) === -1) {
                if(timeout_handle) clearTimeout(timeout_handle);
                if(!not_subscribed_yet) chain_store.unsubscribe(onUpdate);
                resolve(res);
                return true;
            }
            return false;
        }

        let resolved = onUpdate(true);
        if(!resolved) chain_store.subscribe(onUpdate);

        if(timeout && !resolved) timeout_handle = setTimeout(() => {
            chain_store.unsubscribe(onUpdate);
            reject("timeout");
        }, timeout);

    });

}
chain_store.FetchChainObjects = FetchChainObjects;

function FetchChain(methodName, objectIds, timeout = 1900, subMap = {}) {

    let method = chain_store[methodName];
    if( ! method ) throw new Error("ChainStore does not have method " + methodName);

    let arrayIn = Array.isArray(objectIds);
    if( ! arrayIn ) objectIds = [ objectIds ];

    return chain_store.FetchChainObjects(method, __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.List(objectIds), timeout, subMap)
    .then( res => arrayIn ? res : res.get(0) );
}

chain_store.FetchChain = FetchChain;

function timeStringToDate(time_string) {
    if( ! time_string) return new Date("1970-01-01T00:00:00.000Z");
    if( ! /Z$/.test(time_string)); //does not end in Z
    // https://github.com/cryptonomex/graphene/issues/368
    time_string = time_string + "Z";
    return new Date(time_string);
}

/* harmony default export */ __webpack_exports__["a"] = (chain_store);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Immutable = factory());
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  }

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  }

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  }

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        }
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value)
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    }
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    }
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    }
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    }
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    }
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      }
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    }

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    }
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    }
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(62)
  , callable = __webpack_require__(76)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(63)
  , normalizeOpts = __webpack_require__(71)
  , isCallable    = __webpack_require__(72)
  , contains      = __webpack_require__(73)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(64)()
	? Object.assign
	: __webpack_require__(65);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(66)
  , value = __webpack_require__(70)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(67)()
	? Object.keys
	: __webpack_require__(68);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(21);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(21);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(21);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
 return typeof obj === "function";
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(74)()
	? String.prototype.contains
	: __webpack_require__(75);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ecc__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__serializer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ChainTypes__ = __webpack_require__(7);






var head_block_time_string, committee_min_review;

class TransactionBuilder {

    constructor() {
        this.ref_block_num = 0
        this.ref_block_prefix = 0
        this.expiration = 0
        this.operations = []
        this.signatures = []
        this.signer_private_keys = []

        // semi-private method bindings
        this._broadcast = _broadcast.bind(this)
    }

    /**
        @arg {string} name - like "transfer"
        @arg {object} operation - JSON matchching the operation's format
    */
    add_type_operation(name, operation) {
        this.add_operation(this.get_type_operation(name, operation));
        return;
    }

    /**
        This does it all: set fees, finalize, sign, and broadcast (if wanted).

        @arg {ConfidentialWallet} cwallet - must be unlocked, used to gather signing keys

        @arg {array<string>} [signer_pubkeys = null] - Optional ["GPHAbc9Def0...", ...].  These are additional signing keys.  Some balance claims require propritary address formats, the witness node can't tell us which ones are needed so they must be passed in.  If the witness node can figure out a signing key (mostly all other transactions), it should not be passed in here.

        @arg {boolean} [broadcast = false]
    */
    process_transaction(cwallet, signer_pubkeys = null, broadcast = false) {

        let wallet_object = cwallet.wallet.wallet_object
        if(__WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().chain_id !== wallet_object.get("chain_id"))
            return Promise.reject("Mismatched chain_id; expecting " +
                wallet_object.get("chain_id") + ", but got " +
                __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().chain_id)

        return this.set_required_fees().then(()=> {
            var signer_pubkeys_added = {}
            if(signer_pubkeys) {

                // Balance claims are by address, only the private
                // key holder can know about these additional
                // potential keys.
                var pubkeys = cwallet.getPubkeys_having_PrivateKey(signer_pubkeys)
                if( ! pubkeys.length)
                    throw new Error("Missing signing key")

                for(let pubkey_string of pubkeys) {
                    var private_key = cwallet.getPrivateKey(pubkey_string)
                    this.add_signer(private_key, pubkey_string)
                    signer_pubkeys_added[pubkey_string] = true
                }
            }

            return this.get_potential_signatures().then( ({pubkeys, addys})=> {
                var my_pubkeys = cwallet.getPubkeys_having_PrivateKey(pubkeys, addys)

                //{//Testing only, don't send All public keys!
                //    var pubkeys_all = PrivateKeyStore.getPubkeys() // All public keys
                //    this.get_required_signatures(pubkeys_all).then( required_pubkey_strings =>
                //        console.log('get_required_signatures all\t',required_pubkey_strings.sort(), pubkeys_all))
                //    this.get_required_signatures(my_pubkeys).then( required_pubkey_strings =>
                //        console.log('get_required_signatures normal\t',required_pubkey_strings.sort(), pubkeys))
                //}

                return this.get_required_signatures(my_pubkeys).then( required_pubkeys => {
                    for(let pubkey_string of required_pubkeys) {
                        if(signer_pubkeys_added[pubkey_string]) continue
                        var private_key = cwallet.getPrivateKey(pubkey_string)
                        if( ! private_key)
                            // This should not happen, get_required_signatures will only
                            // returned keys from my_pubkeys
                            throw new Error("Missing signing key for " + pubkey_string)
                        this.add_signer(private_key, pubkey_string)
                    }
                })
            })
            .then(()=> broadcast ? this.broadcast() : this.serialize())
        })
    }

    /** Typically this is called automatically just prior to signing.  Once finalized this transaction can not be changed. */
    finalize(){
        return new Promise((resolve, reject)=> {

            if (this.tr_buffer) { throw new Error("already finalized"); }

            resolve(__WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [["2.1.0"]]).then((r) => {
                head_block_time_string = r[0].time;
                if( this.expiration === 0 )
                    this.expiration = base_expiration_sec() + __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["ChainConfig"].expire_in_secs
                this.ref_block_num = r[0].head_block_number & 0xFFFF;
                this.ref_block_prefix =  new Buffer(r[0].head_block_id, 'hex').readUInt32LE(4);
                //DEBUG console.log("ref_block",@ref_block_num,@ref_block_prefix,r)

                var iterable = this.operations;
                for (var i = 0, op; i < iterable.length; i++) {
                    op = iterable[i];
                    if (op[1]["finalize"]) {
                        op[1].finalize();
                    }
                }
                this.tr_buffer = __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].transaction.toBuffer(this);

            }));

        });
    }

    /** @return {string} hex transaction ID */
    id() {
        if (!this.tr_buffer) { throw new Error("not finalized"); }
        return __WEBPACK_IMPORTED_MODULE_1__ecc__["d" /* hash */].sha256(this.tr_buffer).toString( 'hex' ).substring(0,40);
    }

    /**
        Typically one will use {@link this.add_type_operation} instead.
        @arg {array} operation - [operation_id, operation]
    */
    add_operation(operation) {
        if (this.tr_buffer) { throw new Error("already finalized"); }
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(operation, "operation");
        if (!Array.isArray(operation)) {
            throw new Error("Expecting array [operation_id, operation]");
        }
        this.operations.push(operation);
        return;
    }

    get_type_operation(name, operation) {
        if (this.tr_buffer) { throw new Error("already finalized"); }
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(name, "name");
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(operation, "operation");
        var _type = __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */][name];
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(_type, `Unknown operation ${name}`);
        var operation_id = __WEBPACK_IMPORTED_MODULE_4__ChainTypes__["a" /* default */].operations[_type.operation_name];
        if (operation_id === undefined) {
            throw new Error(`unknown operation: ${_type.operation_name}`);
        }
        if (!operation.fee) {
            operation.fee = {amount: 0, asset_id: 0};
        }
        if (name === 'proposal_create') {
            /*
            * Proposals involving the committee account require a review
            * period to be set, look for them here
            */
            let requiresReview = false, extraReview = 0;
            operation.proposed_ops.forEach(op => {
                const COMMITTE_ACCOUNT = 0;
                let key;

                switch (op.op[0]) {
                    case 0: // transfer
                    key = "from";
                    break;

                    case 6: //account_update
                    case 17: // asset_settle
                    key = "account";
                    break;

                    case 10: // asset_create
                    case 11: // asset_update
                    case 12: // asset_update_bitasset
                    case 13: // asset_update_feed_producers
                    case 14: // asset_issue
                    case 18: // asset_global_settle
                    case 43: // asset_claim_fees
                    key = "issuer";
                    break;

                    case 15: // asset_reserve
                    key = "payer";
                    break;

                    case 16: // asset_fund_fee_pool
                    key ="from_account";
                    break;

                    case 22: // proposal_create
                    case 23: // proposal_update
                    case 24: // proposal_delete
                    key ="fee_paying_account";
                    break;

                    case 45: // initiate_crowdfund
                    key = "owner";
                    break;

                    case 31: // committee_member_update_global_parameters
                    requiresReview = true;
                    extraReview = 60 * 60 * 24 * 13; // Make the review period 2 weeks total
                    break;
                }
                if (key in op.op[1] && op.op[1][key] === COMMITTE_ACCOUNT) {
                    requiresReview = true;
                }
            });
            operation.expiration_time || (operation.expiration_time = (base_expiration_sec() + __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["ChainConfig"].expire_in_secs_proposal));
            if (requiresReview) {
                operation.review_period_seconds = extraReview + Math.max(committee_min_review, 24 * 60 * 60 || __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["ChainConfig"].review_in_secs_committee);
                /*
                * Expiration time must be at least equal to
                * now + review_period_seconds, so we add one hour to make sure
                */
                operation.expiration_time += (60 * 60 + extraReview);
            }
        }
        var operation_instance = _type.fromObject(operation);
        return [operation_id, operation_instance];
    }

    /* optional: fetch the current head block */

    update_head_block() {
        return Promise.all([
                __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [["2.0.0"]]),
                __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [["2.1.0"]])
            ]).then(function (res) {
                let [g, r] = res;
                head_block_time_string = r[0].time;
                committee_min_review = g[0].parameters.committee_proposal_review_period;
        });
    }

    /** optional: there is a deafult expiration */
    set_expire_seconds(sec){
        if (this.tr_buffer) { throw new Error("already finalized"); }
        return this.expiration = base_expiration_sec() + sec;
    }

    /* Wraps this transaction in a proposal_create transaction */
    propose(proposal_create_options) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        if (!this.operations.length) {
            throw new Error("add operation first");
        }

        __WEBPACK_IMPORTED_MODULE_0_assert___default()(proposal_create_options, "proposal_create_options");
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(proposal_create_options.fee_paying_account, "proposal_create_options.fee_paying_account");

        let proposed_ops = this.operations.map(op => {
            return {op: op};
        })

        this.operations = []
        this.signatures = []
        this.signer_private_keys = []
        proposal_create_options.proposed_ops = proposed_ops;
        this.add_type_operation("proposal_create", proposal_create_options);
        return this;
    }

    has_proposed_operation() {
        let hasProposed = false;
        for (var i = 0; i < this.operations.length; i++) {
            if ("proposed_ops" in this.operations[i][1]) {
                hasProposed = true;
                break;
            }
        }

        return hasProposed;
    }

    /** optional: the fees can be obtained from the witness node */
    set_required_fees(asset_id){
        let fee_pool;
        if (this.tr_buffer) { throw new Error("already finalized"); }
        if (!this.operations.length) { throw new Error("add operations first"); }
        let operations = [];
        for (let i = 0, op; i < this.operations.length; i++) {
            op = this.operations[i];
            operations.push(__WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].operation.toObject(op));
        }

        if (!asset_id) {
            let op1_fee = operations[0][1].fee;
            if (op1_fee && op1_fee.asset_id !== null) {
                asset_id = op1_fee.asset_id;
            } else {
                asset_id = "1.3.0";
            }
        }

        let promises = [
            __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec( "get_required_fees", [operations, asset_id])
        ];


        if (asset_id !== "1.3.0") {
            // This handles the fallback to paying fees in CYB if the fee pool is empty.
            promises.push(__WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec( "get_required_fees", [operations, "1.3.0"]));
            promises.push(__WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [[asset_id]]));
        }
        let fees, coreFees, asset;
        return Promise.all(promises).then( (results) => {

            [fees, coreFees, asset] = results;
            asset = asset ? asset[0] : null;

            let dynamicPromise = (asset_id !== "1.3.0" && asset) ?
              __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec("get_objects", [[asset.dynamic_asset_data_id]]) :
              new Promise(resolve => resolve());
            return dynamicPromise;
        })
        .then((dynamicObject) => {
            if (asset_id !== "1.3.0") {
                fee_pool = dynamicObject ? dynamicObject[0].fee_pool : 0;
                let totalFees = 0;
                for (let j = 0, fee; j < coreFees.length; j++) {
                    fee = coreFees[j];
                    totalFees += fee.amount;
                }

                if (totalFees > parseInt(fee_pool, 10)) {
                    fees = coreFees;
                    asset_id = "1.3.0";
                }
            }

            // Proposed transactions need to be flattened
            let flat_assets = [];
            let flatten = function(obj) {
                if (Array.isArray(obj)) {
                    for (let k = 0, item; k < obj.length; k++) {
                        item = obj[k];
                        flatten(item);
                    }
                } else {
                    flat_assets.push(obj);
                }
                return;
            };
            flatten(fees);

            let asset_index = 0;

            let set_fee = operation => {
                if( ! operation.fee || operation.fee.amount === 0
                    || (operation.fee.amount.toString && operation.fee.amount.toString() === "0")// Long
                ) {
                    operation.fee = flat_assets[ asset_index ]
                    // console.log("new operation.fee", operation.fee)
                } else {
                    // console.log("old operation.fee", operation.fee)
                }
                asset_index++
                if (operation.proposed_ops) {
                    let result = [];
                    for ( let y = 0; y < operation.proposed_ops.length; y++)
                        result.push(set_fee(operation.proposed_ops[y].op[1]))

                    return result;
                }
            }
            for( let i = 0; i < this.operations.length; i++) {
                set_fee(this.operations[i][1])
            }
        });
            //DEBUG console.log('... get_required_fees',operations,asset_id,flat_assets)
    }

    get_potential_signatures(){
        var tr_object = __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].signed_transaction.toObject(this);
        return Promise.all([
            __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec( "get_potential_signatures", [tr_object] ),
            __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec( "get_potential_address_signatures", [tr_object] )
        ]).then( function(results){
            return {pubkeys: results[0], addys: results[1]};
        }
        );
    }

    get_required_signatures(available_keys){
        console.log("AvL: ", available_keys);
        if (!available_keys.length) { return Promise.resolve([]); }
        var tr_object = __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].signed_transaction.toObject(this);
        //DEBUG console.log('... tr_object',tr_object)
        return __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().db_api().exec( "get_required_signatures", [tr_object, available_keys]).then(function(required_public_keys){
            //DEBUG console.log('... get_required_signatures',required_public_keys)
            return required_public_keys;
        });
    }

    add_signer(private_key, public_key = private_key.toPublicKey()){

        __WEBPACK_IMPORTED_MODULE_0_assert___default()(private_key.d, "required PrivateKey object")

        if (this.signed) { throw new Error("already signed"); }
        if (!public_key.Q) {
            public_key = __WEBPACK_IMPORTED_MODULE_1__ecc__["b" /* PublicKey */].fromPublicKeyString(public_key);
        }
        // prevent duplicates
        let spHex = private_key.toHex()
        for(let sp of this.signer_private_keys) {
            if(sp[0].toHex() === spHex)
                return
        }
        this.signer_private_keys.push([private_key, public_key]);
    }

    sign(chain_id = __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().chain_id){
        if (!this.tr_buffer) { throw new Error("not finalized"); }
        if (this.signed) { throw new Error("already signed"); }
        if (!this.signer_private_keys.length) {
            throw new Error("Transaction was not signed. Do you have a private key? [no_signers]");
        }
        var end = this.signer_private_keys.length;
        for (var i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i++) {
            var [private_key, public_key] = this.signer_private_keys[i];
            var sig = __WEBPACK_IMPORTED_MODULE_1__ecc__["c" /* Signature */].signBuffer(
                Buffer.concat([new Buffer(chain_id, 'hex'), this.tr_buffer]),
                private_key,
                public_key
            );
            this.signatures.push(sig.toBuffer());
        }
        this.signer_private_keys = [];
        this.signed = true;
        return;
    }

    serialize(){
        return __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].signed_transaction.toObject(this);
    }

    toObject(){
        return __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].signed_transaction.toObject(this);
    }

    broadcast(was_broadcast_callback){
        if (this.tr_buffer) {
            return this._broadcast(was_broadcast_callback);
        } else {
            return this.finalize().then(() => {
                return this._broadcast(was_broadcast_callback);
            });
        }
    }
}

var base_expiration_sec = ()=> {
    var head_block_sec = Math.ceil(getHeadBlockDate().getTime() / 1000);
    var now_sec = Math.ceil(Date.now() / 1000);
    // The head block time should be updated every 3 seconds.  If it isn't
    // then help the transaction to expire (use head_block_sec)
    if (now_sec - head_block_sec > 30) { return head_block_sec; }
    // If the user's clock is very far behind, use the head block time.
    return Math.max(now_sec, head_block_sec);
};

function _broadcast(was_broadcast_callback){
    return new Promise((resolve, reject)=> {

        if (!this.signed) { this.sign(); }
        if (!this.tr_buffer) { throw new Error("not finalized"); }
        if (!this.signatures.length) { throw new Error("not signed"); }
        if (!this.operations.length) { throw new Error("no operations"); }

        var tr_object = __WEBPACK_IMPORTED_MODULE_2__serializer__["a" /* ops */].signed_transaction.toObject(this);
        // console.log('... broadcast_transaction_with_callback !!!')
        __WEBPACK_IMPORTED_MODULE_3_cybexjs_ws__["Apis"].instance().network_api().exec( "broadcast_transaction_with_callback", [ function(res) { return resolve(res); } ,tr_object]).then(function(){
            //console.log('... broadcast success, waiting for callback')
            if(was_broadcast_callback) was_broadcast_callback();
            return;
        }
        ).catch( (error)=> {
            // console.log may be redundant for network errors, other errors could occur
            console.log(error);
            var message = error.message;
            if (!message) { message = ""; }
            reject( new Error((
                message + "\n" +
                'bitshares-crypto ' +
                ' digest ' + __WEBPACK_IMPORTED_MODULE_1__ecc__["d" /* hash */].sha256(this.tr_buffer).toString('hex') +
                ' transaction ' + this.tr_buffer.toString('hex') +
                ' ' + JSON.stringify(tr_object) ))
            );
            return;
        }
        );
        return;
    });
}

function getHeadBlockDate() {
    return timeStringToDate( head_block_time_string )
}

function timeStringToDate(time_string) {
    if( ! time_string) return new Date("1970-01-01T00:00:00.000Z")
    if( ! /Z$/.test(time_string)) //does not end in Z
        // https://github.com/cryptonomex/graphene/issues/368
        time_string = time_string + "Z"
    return new Date(time_string)
}

/* harmony default export */ __webpack_exports__["a"] = (TransactionBuilder);


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assert__);


/**
    Convert 12.34 with a precision of 3 into 12340

    @arg {number|string} number - Use strings for large numbers.  This may contain one decimal but no sign
    @arg {number} precision - number of implied decimal places (usually causes right zero padding)
    @return {string} -
*/

const NumberUtils = {
    toImpliedDecimal: function toImpliedDecimal(number, precision) {
        if(typeof number === "number") {
            __WEBPACK_IMPORTED_MODULE_0_assert___default()(number <= 9007199254740991, "overflow")
            number = ""+number;
        } else
            if( number.toString )
                number = number.toString()

        __WEBPACK_IMPORTED_MODULE_0_assert___default()(typeof number === "string", "number should be an actual number or string: " + (typeof number))
        number = number.trim()
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(/^[0-9]*\.?[0-9]*$/.test(number), "Invalid decimal number " + number)

        let [ whole = "", decimal = ""] = number.split(".")

        let padding = precision - decimal.length
        __WEBPACK_IMPORTED_MODULE_0_assert___default()(padding >= 0, "Too many decimal digits in " + number + " to create an implied decimal of " + precision)

        for(let i = 0; i < padding; i++)
            decimal += "0"

        while(whole.charAt(0) === "0")
            whole = whole.substring(1)

        return whole + decimal
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NumberUtils);


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_secure_random__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_secure_random___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_secure_random__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bytebuffer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bytebuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bytebuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ecc__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__serializer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__);

var helper = {};









helper.unique_nonce_entropy = null;
helper.unique_nonce_uint64=function() {
    var entropy = helper.unique_nonce_entropy = ((() => {

            if (helper.unique_nonce_entropy === null) {
                //console.log('... secureRandom.randomUint8Array(1)[0]',secureRandom.randomUint8Array(1)[0])
                return parseInt(__WEBPACK_IMPORTED_MODULE_0_secure_random___default.a.randomUint8Array(1)[0]);
            } else {
                return ++helper.unique_nonce_entropy % 256;
            }
    })()
    );
    var long = __WEBPACK_IMPORTED_MODULE_1_bytebuffer__["Long"].fromNumber(Date.now());
    //console.log('unique_nonce_uint64 date\t',ByteBuffer.allocate(8).writeUint64(long).toHex(0))
    //console.log('unique_nonce_uint64 entropy\t',ByteBuffer.allocate(8).writeUint64(Long.fromNumber(entropy)).toHex(0))
    long = long.shiftLeft(8).or(__WEBPACK_IMPORTED_MODULE_1_bytebuffer__["Long"].fromNumber(entropy));
    //console.log('unique_nonce_uint64 shift8\t',ByteBuffer.allocate(8).writeUint64(long).toHex(0))
    return long.toString();
};

/* Todo, set fees */
helper.to_json=function( tr, broadcast = false ) {
    return (function(tr, broadcast){
        var tr_object = __WEBPACK_IMPORTED_MODULE_3__serializer__["a" /* ops */].signed_transaction.toObject(tr);
        if (broadcast) {
            var net = __WEBPACK_IMPORTED_MODULE_4_cybexjs_ws__["Apis"].instance().network_api();
            console.log('... tr_object', JSON.stringify(tr_object));
            return net.exec("broadcast_transaction", [tr_object]);
        } else {
            return tr_object;
        }
    }
    )(tr, broadcast);
};

helper.signed_tr_json=function(tr, private_keys){
    var tr_buffer = __WEBPACK_IMPORTED_MODULE_3__serializer__["a" /* ops */].transaction.toBuffer(tr);
    tr = __WEBPACK_IMPORTED_MODULE_3__serializer__["a" /* ops */].transaction.toObject(tr);
    tr.signatures = (() => {
        var result = [];
        for (var i = 0; 0 < private_keys.length ? i < private_keys.length : i > private_keys.length; 0 < private_keys.length ? i++ : i++) {
            var private_key = private_keys[i];
            result.push(__WEBPACK_IMPORTED_MODULE_2__ecc__["c" /* Signature */].signBuffer( tr_buffer, private_key ).toHex());
        }
        return result;
    })();
    return tr;
};

helper.expire_in_min=function(min){
    return Math.round(Date.now() / 1000) + (min*60);
};

helper.seconds_from_now=function(timeout_sec){
    return Math.round(Date.now() / 1000) + timeout_sec;
};

/**
    Print to the console a JSON representation of any object in
    @graphene/serializer { types }
*/
helper.template=function(serializer_operation_type_name, debug = {use_default: true, annotate: true}){
    var so = __WEBPACK_IMPORTED_MODULE_3__serializer__["a" /* ops */][serializer_operation_type_name];
    if (!so) {
        throw new Error(`unknown serializer_operation_type ${serializer_operation_type_name}`);
    }
    return so.toObject(undefined, debug);
};

helper.new_operation=function(serializer_operation_type_name){
    var so = __WEBPACK_IMPORTED_MODULE_3__serializer__["a" /* ops */][serializer_operation_type_name];
    if (!so) {
        throw new Error(`unknown serializer_operation_type ${serializer_operation_type_name}`);
    }
    var object = so.toObject(undefined, {use_default: true, annotate: true});
    return so.fromObject(object);
};

helper.instance=function(ObjectId){
    return ObjectId.substring("0.0.".length);
};

/* harmony default export */ __webpack_exports__["a"] = (helper);


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecc_src_PrivateKey__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ecc_src_KeyUtils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(81);





var _keyCachePriv = {};
var _keyCachePub = {};

class AccountLogin {

    constructor() {
        let state = {loggedIn: false, roles: ["active", "owner", "memo"]};
        this.get = Object(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* get */])(state);
        this.set = Object(__WEBPACK_IMPORTED_MODULE_2__state__["b" /* set */])(state);

        this.subs = {};
    }

    addSubscription(cb) {
        this.subs[cb] = cb;
    }

    setRoles(roles) {
        this.set("roles", roles);
    }

    generateKeys(accountName, password, roles, prefix) {
        var start = new Date().getTime();
        if (!accountName || !password) {
            throw new Error("Account name or password required");
        }
        if (password.length < 12) {
            throw new Error("Password must have at least 12 characters");
        }

        let privKeys = {};
        let pubKeys = {};

        (roles || this.get("roles")).forEach(role => {
            let seed = accountName + role + password;
            let pkey = _keyCachePriv[seed] ? _keyCachePriv[seed] :  __WEBPACK_IMPORTED_MODULE_0__ecc_src_PrivateKey__["a" /* default */].fromSeed( __WEBPACK_IMPORTED_MODULE_1__ecc_src_KeyUtils__["a" /* default */].normalize_brainKey(seed) );
            _keyCachePriv[seed] = pkey;

            privKeys[role] = pkey;
            pubKeys[role] = _keyCachePub[seed] ? _keyCachePub[seed] : pkey.toPublicKey().toString(prefix);

            _keyCachePub[seed] = pubKeys[role];
        });

        return {privKeys, pubKeys};
    }

    checkKeys({accountName, password, auths}) {
        if (!accountName || !password || !auths) {
            throw new Error("checkKeys: Missing inputs");
        }
        let hasKey = false;

        for (let role in auths) {
            let {privKeys, pubKeys} = this.generateKeys(accountName, password, [role]);
            auths[role].forEach(key => {
                if (key[0] === pubKeys[role]) {
                    hasKey = true;
                    this.set(role, {priv: privKeys[role], pub: pubKeys[role]});
                }
            });
        };

        if (hasKey) {
            this.set("name", accountName);
        }

        this.set("loggedIn", hasKey);

        return hasKey;
    }

    signTransaction(tr) {
        let myKeys = {};
        let hasKey = false;

        this.get("roles").forEach(role => {
            let myKey = this.get(role);
            if (myKey) {
                hasKey = true;
                console.log("adding signer:", myKey.pub);
                tr.add_signer(myKey.priv, myKey.pub);
            }
        });

        if (!hasKey) {
            throw new Error("You do not have any private keys to sign this transaction");
        }
    }
}

let accountLogin = new AccountLogin();

/* harmony default export */ __webpack_exports__["a"] = (accountLogin);


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return set; });
function get(state) {
    return function(key) {
        return state[key] || "";
    };
}

function set(state) {
    return function(key, value) {
        state[key] = value;
        return this;
    };
}




/***/ })
/******/ ]);
});