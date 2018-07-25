import * as React from "react"; import * as PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DrawerToggle from "./DrawerToggle";
import HelpWindow from "./HelpWindow";

const HelpDrawer = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState(prevState => ({
      isShowing: !prevState.isShowing
    }));
  }

  render() {
    return (
      <div id="helpDrawer">
        {
          this.state.isShowing ?
            <HelpWindow /> :
            <button onClick={this.toggleDrawer} >Toggle</button>
        }
      </div>
    );
  }
}

export default HelpDrawer;