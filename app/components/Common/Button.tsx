import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";

let Button = class extends React.Component<
  {
    children?;
    size?: "normal" | "small" | "big";
    type?: "primary" | "secondary";
  },
  any
> {
  static defaultProps = {
    type: "secondary",
    size: "normal"
  };

  static propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    size: PropTypes.oneOf(["normal", "small", "big"]).isRequired
  };

  getStyles = () => ({
    base: {
      borderRadius: "5px",
      display: "inline-block",
      transition: "unset"
    },
    primary: {
      background: Colors.$colorGradientGoldex,
      color: Colors.$colorWhite,
      ":hover": {
        background: Colors.$colorOrangeLight,
      },
      ":active": {
        background: Colors.$colorOrange,
      },
      ":disabled": {
        background: Colors.$colorGrey,
        color: Colors.$colorGreyLight
      }
    },
    secondary: {
      backgroundColor: Colors["$colorAnchor"],
      color: Colors["$colorGrey"],
      ":hover": {
        backgroundColor: Colors["$colorIndependence"],
        color: Colors["$colorWhite"]
      },
      ":active": {
        backgroundColor: Colors["$colorAnchor"],
        color: Colors["$colorWhite"]
      },
      ":disabled": {
        backgroundColor: Colors["$colorGrey"],
        color: Colors["$colorFreyLight"]
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
    let { children, size, type } = this.props;
    let styles = this.getStyles();
    return (
      <button style={[styles.base, styles[type], styles[size]] as any}>
        {children}
      </button>
    );
  }
};

Button = Radium(Button);

export { Button };
export default Button;
