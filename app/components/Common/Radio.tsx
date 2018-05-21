import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { getId } from "./utils";
import { getIcon } from "./IconMap";

const styles = {
  label: {
    base: {
      fontSize: "1.4rem",
      display: "flex",
      alignItems: "center",
      opacity: "0.8",
      color: Colors.$colorWhite,
      cursor: "pointer",
      ":hover": {
        opacity: "1"
      },
      margin: 0
    },
    active: {
      opacity: "1"
    },
    disabled: {
      cursor: "not-allowed",
      opacity: "0.3",
      ":hover": {
        opacity: "0.3"
      }
    }
  },
  input: {
    base: {
      margin: 0,
      backgroundImage: `url(${getIcon("radio")})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      appearance: "none",
      width: "1.4em",
      height: "1.4em",
      marginRight: "0.5em"
    },
    active: {
      backgroundImage: `url(${getIcon("radio", "active")})`
    },
    disabledActive: {
      backgroundImage: `url(${getIcon("radio", "disabledAcitve")})`
    }
  }
};

let Radio = ({
  label = "",
  id = getId("radio"),
  bindTo = "",
  disabled = false,
  value,
  onClick = (...any) => void 0
}) => {
  let labelStyles = styles.label;
  let inputStyles = styles.input;
  let active = bindTo === value;
  return (
    <label
      htmlFor={id}
      style={
        [
          labelStyles.base,
          active && labelStyles.active,
          disabled && labelStyles.disabled
        ] as any
      }
    >
      <input
        id={id}
        // className="no-appearance"
        type="radio"
        disabled={disabled}
        onClick={() => onClick(value)}
        style={
          [
            inputStyles.base,
            active && inputStyles.active,
            disabled && active && inputStyles.disabledActive
          ] as any
        }
      />
      {label}
    </label>
  );
};
Radio = Radium(Radio);

export { Radio };
export default Radio;
