import createClass from "create-react-class";
import * as PropTypes from "prop-types";
import * as React from "react";
React.createClass = createClass;
React.PropTypes = PropTypes;

require("./assets/loader");
if (!window.Intl) {
  // Safari polyfill
  require.ensure(["intl"], require => {
    window.Intl = require("intl");
    Intl.__addLocaleData(require("./assets/intl-data/en.json"));
    require("index.js");
  });
} else {
  require("index.js");
}
