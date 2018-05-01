'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _supplyFluxContext = require('./supplyFluxContext');

var _supplyFluxContext2 = _interopRequireDefault(_supplyFluxContext);

exports['default'] = { connect: _connect2['default'], supplyFluxContext: _supplyFluxContext2['default'] };
module.exports = exports['default'];