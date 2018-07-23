import * as React from "react";
import { Link } from "react-router-dom";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import { Route, Switch, Redirect } from "react-router-dom";
import { LoadComponent } from "Routes";
import Blocks from "./BlocksContainer";
import Assets from "./AssetsContainer";
import Accounts from "./AccountsContainer";
import Committee from "./CommitteeMembers";
import Witnesses from "./Witnesses";
import Fees from "components/Blockchain/FeesContainer";

class ExplorerCard extends React.Component {
  render() {
    return (
      <div className="grid-content">
        <div className="card">{this.props.children}</div>
      </div>
    );
  }
}
class Explorer extends React.Component {
  render() {
    return (
      <div className="page-layout flex-start">
        <Switch>
          <Route path="/explorer/blocks" exact component={Blocks as any} />
          <Route path="/explorer/accounts" component={Accounts as any} />
          <Route path="/explorer/assets" component={Assets as any} />
          <Route path="/explorer/committee" component={Committee as any} />
          <Route path="/explorer/witnesses" component={Witnesses as any} />
          <Route path="/explorer/fees" component={Fees as any} />
          <Redirect from="*" to="/explorer/blocks" />
        </Switch>
      </div>
    );
  }
}

export default Explorer;
