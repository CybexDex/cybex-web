import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";

export type ButtonSize = "xsmall" | "normal" | "smaller" | "small" | "big";
export type ButtonType =
  | "primary"
  | "secondary"
  | "bid"
  | "ask"
  | "white-primary"
  | "white-secondary";
export interface ButtonProps {
  children?;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  style?: React.CSSProperties;
  onClick?;
}

let Button = class extends React.Component<ButtonProps, any> {
  static defaultProps = {
    type: "secondary",
    size: "normal",
    disabled: false
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    size: PropTypes.oneOf(["normal", "small", "smaller", "xsmall", "big"])
      .isRequired
  };

  static Styles = {
    base: {
      borderRadius: "4px",
      display: "inline-block",
      ":disabled": {
        // background: Colors.$colorGreyLightWhite,
        cursor: "not-allowed",
        // color: Colors.$colorGreyLight
        opacity: "0.3"
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
    "white-primary": {
      backgroundColor: Colors.$colorAnchor,
      color: Colors.$colorGrey,
      ":hover": {
        color: Colors.$colorOrangeLight
      },
      ":active": {
        color: Colors.$colorOrange
      }
    },
    "white-secondary": {
      backgroundColor: Colors.$colorGreyLightWhite,
      color: Colors.$colorWhite,
      ":hover": {
        backgroundColor: Colors["$colorIndependence"]
      },
      ":active": {
        backgroundColor: Colors["$colorAnchor"]
      }
    },
    bid: {
      background: Colors.$colorGradientGrass,
      ":hover": {
        background: Colors.$colorGrassLight
      },
      ":active": {
        background: Colors.$colorGrass
      }
    },
    ask: {
      background: Colors.$colorGradientFlame,
      ":hover": {
        background: Colors.$colorFlameLight
      },
      ":active": {
        background: Colors.$colorFlame
      }
    },
    xsmall: {
      fontSize: "1rem",
      lineHeight: "1.5",
      height: "unset",
      padding: "0 0.3334rem"
    },
    smaller: {
      fontSize: "1rem",
      lineHeight: "2",
      height: "2rem",
      padding: "0 0.6667rem"
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
  };

  render() {
    let { children, size, type, disabled, style } = this.props;
    let styles = Button.Styles;
    return (
      <button
        {...this.props}
        disabled={disabled}
        style={[styles.base, styles[type], styles[size], style] as any}
        onClick={this.props.onClick ? this.props.onClick : () => void 0}
      >
        {children}
      </button>
    );
  }
};
Button = Radium(Button);

export { Button };
export default Button;
