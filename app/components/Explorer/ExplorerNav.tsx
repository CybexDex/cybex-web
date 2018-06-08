import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";

export class ExplorerNav extends React.Component {
  nav: HTMLElement;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="explorer-nav with-shadow"
        ref={nav => (this.nav = nav)}
        onClick={e => e.stopPropagation()}
      >
        <Link activeClassName="active" to="ledger">
          <Translate component="span" content="explorer.blocks.title" />
        </Link>
        <Link activeClassName="active" to="explorer/assets">
          <Translate component="span" content="explorer.assets.title" />
        </Link>
        <Link activeClassName="active" to="explorer/accounts">
          <Translate component="span" content="explorer.accounts.title" />
        </Link>
        <Link activeClassName="active" to="explorer/witnesses">
          <Translate component="span" content="explorer.witnesses.title" />
        </Link>
        <Link activeClassName="active" to="explorer/committee-members">
          <Translate
            component="span"
            content="explorer.committee_members.title"
          />
        </Link>
        {/* <Link activeClassName="active" to="explorer/markets">
          <Translate component="span" content="markets.title" />
        </Link> */}
        <Link activeClassName="active" to="explorer/fees">
          <Translate component="span" content="fees.title" />
        </Link>
      </div>
    );
  }
}
