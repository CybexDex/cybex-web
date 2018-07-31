import * as React from "react";
import Radium from "radium";
import { Button } from "components/Common";
import { Link } from "react-router-dom";
import Translate from "react-translate-component";

export let CreateSwitcher = Radium(
  class extends React.PureComponent<{ mode; style? }, any> {
    render() {
      let { mode, style } = this.props;
      return (
        <div style={style}>
          {mode === 1 ? (
            <Link to="/create-account/password">
              <Button size="xsmall" type="white-primary">
                <Translate content="login.switch_to_cloud" />
              </Button>
            </Link>
          ) : (
            <Link to="/create-account/wallet">
              <Button size="xsmall" type="white-primary">
                <Translate content="login.switch_to_local" />
              </Button>
            </Link>
          )}
        </>
      );
    }
  }
);
export default CreateSwitcher;
