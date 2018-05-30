import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router";
import Translate from "react-translate-component";
import { Colors } from "components/Common";
import Radium from "radium";

export const LoginSelector = Radium(
  class extends React.PureComponent<any, any> {
    render() {
      return (
        <div
          className="text-center"
          style={[{ color: Colors.$colorWhiteOp8 }, this.props.style] as any}
        >
          <Translate content="login.has_account" />
          <Link to="/login" style={{ margin: "0 0.5em" }}>
            <Translate content="login.login_here" />
          </Link>/
          <Link to="/existing-account" style={{ margin: "0 0.5em" }}>
            <Translate content="login.restore_here" />
          </Link>/
          <Link to="/create-wallet-brainkey" style={{ margin: "0 0.5em" }}>
            <Translate content="login.restore_brainkey_here" />
          </Link>
        </div>
      );
    }
  }
);

export default LoginSelector;
