import * as PropTypes from "prop-types";
import * as React from "react";

export default function(flux) {
  return function(Component) {
    return class extends React.Component {
      static childContextTypes = {
        flux: PropTypes.object
      };

      getChildContext() {
        return { flux: flux };
      }

      render() {
        return React.createElement(Component, this.props);
      }
    };
  };
}
