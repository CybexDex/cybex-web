import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { getId } from "./utils";
import { getIcon } from "./IconMap";
import { Icon } from "./Icon";
import Translate from "react-translate-component";
import { getClassName } from "utils";

const styles = {
  hover: {
    ":hover": {
      filter: "brightness(1.2)"
    }
  },
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
  },
  toggle: {
    position: "relative"
  }
};

const iconStyles = {
  base: {
    fontSize: "2rem"
  }
};

let NavItem = ({
  name = "",
  id = getId("navItem"),
  hideIcon = false,
  hideLabel = false,
  active = false,
  icon = "exchange",
  children = null,
  linkTo = "",
  onClick = (...any) => void 0 as any
}) => {
  return (
    <a
      id={id}
      href={linkTo || "javascript:;"}
      className={getClassName("", { active })}
      style={
        [
          styles.hover,
          active && styles.active,
          !!children && styles.toggle
        ] as any
      }
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {!hideIcon && (
        <Icon style={iconStyles.base} icon={icon} active={active} />
      )}
      {!hideLabel && <Translate content={`nav.${name}`} />}
      {children}
    </a>
  );
};
NavItem = Radium(NavItem);

export { NavItem };
export default NavItem;
