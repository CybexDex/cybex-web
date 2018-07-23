import * as React from "react";
import * as PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
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
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        <NavLink activeClassName="active" to="/explorer/blocks">
          <Translate component="span" content="explorer.blocks.title" />
        </NavLink>
        <NavLink activeClassName="active" to="/explorer/assets">
          <Translate component="span" content="explorer.assets.title" />
        </NavLink>
        <NavLink activeClassName="active" to="/explorer/accounts">
          <Translate component="span" content="explorer.accounts.title" />
        </NavLink>
        <NavLink activeClassName="active" to="/explorer/witnesses">
          <Translate component="span" content="explorer.witnesses.title" />
        </NavLink>
        <NavLink activeClassName="active" to="/explorer/committee">
          <Translate
            component="span"
            content="explorer.committee_members.title"
          />
        </NavLink>
        {/* <Link activeClassName="active" to="explorer/markets">
          <Translate component="span" content="markets.title" />
        </Link> */}
        <NavLink activeClassName="active" to="/explorer/fees">
          <Translate component="span" content="fees.title" />
        </NavLink>
      </div>
    );
  }
}
