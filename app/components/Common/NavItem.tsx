import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { getId } from "./utils";
import { getIcon } from "./IconMap";
import { Icon } from "./Icon";

const styles = {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "5.334rem",
    height: "5.334rem",
    margin: 0,
    position: "relative"
  },
  active: {
    opacity: "1"
  }
};



const iconStyles = {
  base: {
    fontSize: "2rem"
  }
};

let NavItem = ({
  label = "",
  id = getId("navItem"),
  active = false,
  icon = "exchange",
  linkTo = "",
  onClick = (...any) => void 0
}) => {
  return (
    <a
      id={id}
      href={linkTo || "javascript:;"}
      style={[styles.base, active && styles.active] as any}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      
      <Icon style={iconStyles.base} icon={icon} active={active} />
    </a>
  );
};
NavItem = Radium(NavItem);

export { NavItem };
export default NavItem;
