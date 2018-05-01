import * as PropTypes from "prop-types";
import * as React from "react";

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

var _get = function get(_x4, _x5, _x6) {
  var _again = true;
  _function: while (_again) {
    var object = _x4,
      property = _x5,
      receiver = _x6;
    desc = parent = getter = undefined;
    _again = false;
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return undefined;
      } else {
        _x4 = parent;
        _x5 = property;
        _x6 = receiver;
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

var Connect = (function(_React$Component) {
  _inherits(Connect, _React$Component);

  function Connect() {
    _classCallCheck(this, Connect);

    _get(Object.getPrototypeOf(Connect.prototype), "constructor", this).apply(
      this,
      arguments
    );
  }

  _createClass(
    Connect,
    [
      {
        key: "setConnections",
        value: function setConnections(props, context) {
          var config =
            arguments.length <= 2 || arguments[2] === undefined
              ? {}
              : arguments[2];

          this.flux = props.flux || context.flux;
          this.stores = this.flux ? this.flux.stores : {};
          this.config =
            typeof config === "function"
              ? config(this.stores, this.flux)
              : config;
        }
      },
      {
        key: "componentWillMount",
        value: function componentWillMount() {
          if (this.config.willMount) this.call(this.config.willMount);
        }
      },
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this = this;

          var stores = this.config.listenTo
            ? this.call(this.config.listenTo)
            : [];
          this.storeListeners = stores.map(function(store) {
            return store.listen(function() {
              return _this.forceUpdate();
            });
          });

          if (this.config.didMount) this.call(this.config.didMount);
        }
      },
      {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.storeListeners.forEach(function(unlisten) {
            return unlisten();
          });
          if (this.config.willUnmount) this.call(this.config.willUnmount);
        }
      },
      {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          if (this.config.willReceiveProps)
            this.call(this.config.willReceiveProps);
        }
      },
      {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          return this.config.shouldComponentUpdate
            ? this.call(this.config.shouldComponentUpdate, nextProps)
            : true;
        }
      },
      {
        key: "getNextProps",
        value: function getNextProps() {
          var nextProps =
            arguments.length <= 0 || arguments[0] === undefined
              ? this.props
              : arguments[0];

          return this.config.getProps
            ? this.call(this.config.getProps, nextProps)
            : nextProps;
        }
      },
      {
        key: "call",
        value: function call(f) {
          var props =
            arguments.length <= 1 || arguments[1] === undefined
              ? this.props
              : arguments[1];

          return f(props, this.context, this.flux);
        }
      },
      {
        key: "render",
        value: function render() {
          throw new Error("Render should be defined in your own class");
        }
      }
    ],
    [
      {
        key: "contextTypes",
        value: {
          flux: PropTypes.object
        },
        enumerable: true
      }
    ]
  );

  return Connect;
})(_react2["default"].Component);

export default Connect;
