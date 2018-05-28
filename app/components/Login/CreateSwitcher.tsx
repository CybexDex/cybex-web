import * as React from "react";
import Radium from "radium";
import { Button } from "components/Common";
import { Link } from "react-router";
import Translate from "react-translate-component";

export let CreateSwitcher = Radium(
  class extends React.PureComponent<{ mode; style? }, any> {
    render() {
      let { mode, style } = this.props;
      return (
        <Button size="xsmall" type="white-primary" style={style}>
          {mode === 1 ? (
            <Link to="/create-account/password">
              <Translate content="login.switch_to_cloud" />
            </Link>
          ) : (
            <Link to="/create-account/wallet">
              <Translate content="login.switch_to_local" />
            </Link>
          )}
        </Button>
      );
    }
  }
);
export default CreateSwitcher;
