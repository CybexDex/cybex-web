import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import classnames from "classnames";

export type ButtonSize = "xsmall" | "normal" | "smaller" | "small" | "large";
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
  loading?: boolean;
  style?: React.CSSProperties;
  onClick?;
  link?;
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
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  };

  static Styles = {
    base: {
      borderRadius: "4px",
      display: "inline-block",
      transition: "opacity 0.3s",
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
      ":focus": {
        background: Colors.$colorOrangeLight
      },
      ":active": {
        background: Colors.$colorOrange
      },
      ":disabled": {
        background: Colors.$colorGreyLightWhite,
        cursor: "not-allowed",
        color: Colors.$colorGreyLight,
        opacity: "1"
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
    large: {
      fontSize: "16px",
      height: "56px"
    },
    lineHeight: {
      small: {
        lineHeight: "32px"
      },
      normal: {
        lineHeight: "40px"
      },
      large: {
        lineHeight: "56px"
      }
    }
  };

  render() {
    let { children, size, type, disabled, style, loading, link } = this.props;
    let styles = Button.Styles;
    return (
      <button
        {...this.props}
        disabled={disabled}
        className={loading ? "loading" : ""}
        style={[styles.base, styles[type], styles[size], style] as any}
        onClick={this.props.onClick ? this.props.onClick : () => void 0}
      >
        {children}
      </button>
    );
  }
};
Button = Radium(Button);

let RouterButton = class extends React.PureComponent<ButtonProps> {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  render() {
    return (
      <Button
        {...this.props}
        onClick={() => this.context.router.push(this.props.link)}
      />
    );
  }
};

export { Button, RouterButton };
export default Button;
