import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
let Toggle = class extends React.Component<
  {
    children?;
    disabled?: boolean;
    size?: "normal" | "small" | "big";
    type?: "primary" | "secondary";
    onClick?;
  },
  any
> {
  static defaultProps = {
    type: "secondary",
    size: "normal",
    disabled: false
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    size: PropTypes.oneOf(["normal", "small", "big"]).isRequired
  };

  getStyles = () => ({
    base: {
      borderRadius: "5px",
      display: "inline-block",
      ":disabled": {
        background: Colors.$colorGreyLightWhite,
        cursor: "not-allowed",
        color: Colors.$colorGreyLight
      }
    },
    primary: {
      background: Colors.$colorGradientGoldex,
      color: Colors.$colorWhite,
      ":hover": {
        background: Colors.$colorOrangeLight
      },
      ":active": {
        background: Colors.$colorOrange
      }
    },
    secondary: {
      backgroundColor: Colors["$colorAnchor"],
      color: Colors["$colorGrey"],
      ":hover": {
        backgroundColor: Colors["$colorIndependence"],
        color: Colors.$colorWhite
      },
      ":active": {
        backgroundColor: Colors["$colorAnchor"],
        color: Colors.$colorWhite
      }
    },
    small: {
      fontSize: "12px",
      height: "32px"
    },
    normal: {
      fontSize: "14px",
      height: "40px"
    },
    big: {
      fontSize: "16px",
      height: "56px"
    }
  });

  render() {
    let { children, size, type, disabled } = this.props;
    let styles = this.getStyles();
    return (
      <button
        disabled={disabled}
        style={[styles.base, styles[type], styles[size]] as any}
        onClick={this.props.onClick ? this.props.onClick : () => void 0}
      >
        {children}
      </button>
    );
  }
};
Toggle = Radium(Toggle);

export { Toggle };
export default Toggle;
