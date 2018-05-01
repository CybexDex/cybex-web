import * as PropTypes from "prop-types";
import * as React from "react";

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _get = function get(_x2, _x3, _x4) {
  var _again = true;
  _function: while (_again) {
    var object = _x2,
      property = _x3,
      receiver = _x4;
    desc = parent = getter = undefined;
    _again = false;
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return undefined;
      } else {
        _x2 = parent;
        _x3 = property;
        _x4 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === undefined) {
        return undefined;
      }
      return getter.call(receiver);
    }
  }
};

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ConnectBase2 = require("./ConnectBase");

var _ConnectBase3 = _interopRequireDefault(_ConnectBase2);

export default function(Component) {
  var config =
    arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return (function(_ConnectBase) {
    _inherits(_class, _ConnectBase);

    _createClass(_class, null, [
      {
        key: "displayName",
        value:
          "Stateful" + (Component.displayName || Component.name) + "Container",
        enumerable: true
      },
      {
        key: "contextTypes",
        value: Component.contextTypes || config.contextTypes || {},
        enumerable: true
      }
    ]);

    function _class(props, context) {
      _classCallCheck(this, _class);

      _get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(
        this,
        props,
        context
      );
      this.setConnections(props, context, config);
    }

    _createClass(_class, [
      {
        key: "render",
        value: function render() {
          return _react2["default"].createElement(
            Component,
            _extends(
              {
                flux: this.flux
              },
              this.props,
              this.getNextProps()
            )
          );
        }
      }
    ]);

    return _class;
  })(_ConnectBase3["default"]);
}
