import * as PropTypes from "prop-types";
import * as React from "react";
export default class extends React.Component {
  static displayName = "FluxContext";

  static childContextTypes = {
    flux: PropTypes.object
  };

  getChildContext() {
    return { flux: this.props.flux };
  }

  render() {
    return this.props.children;
  }
}
