import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { Button, ButtonSize, ButtonType } from "./Button";

let TabLink = class extends React.Component<
  {
    children?;
    disabled?: boolean;
    active?: boolean;
    size?: "normal" | "small" | "large";
    type?: "primary" | "secondary";
    style?: React.CSSProperties;
    onClick?;
  },
  any
> {
  static Styles = {
    base: {
      color: Colors.$colorGrey
    },
    primary: {
      ":hover": {
        color: Colors.$colorOrangeLight
      },
      ":active": {
        color: Colors.$colorOrange,
        borderBottom: "1px solid"
      }
    },
    secondary: {
      ":hover": {
        color: Colors.$colorGrey
      },
      ":active": {
        color: Colors.$colorWhiteOp8,
        borderBottom: "1px solid"
      }
    },
    normal: {
      fontSize: "1rem"
    }
  };

  static defaultProps = {
    type: "primary",
    size: "normal",
    disabled: false,
    active: false
  };

  static propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  };

  render() {
    let { children, size, type, disabled, active, style } = this.props;
    let styles = TabLink.Styles;
    return (
      <span
        className="clickable"
        style={
          [
            styles.base,
            styles[type],
            styles[size],
            active && styles[type][":active"],
            style
          ] as any
        }
        onClick={this.props.onClick ? this.props.onClick : () => void 0}
      >
        {children}
      </span>
    );
  }
};
TabLink = Radium(TabLink);

export { TabLink };
export default TabLink;
