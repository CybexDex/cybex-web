import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { getIcon } from "./IconMap";

let Icon = class extends React.Component<
  {
    disabled?: boolean;
    active?: boolean;
    icon: string;
    style: any;
    onClick?;
  },
  any
> {
  static defaultProps = {
    icon: "add",
    active: false,
    style: {}
  };

  static propTypes = {
    active: PropTypes.bool,
    style: PropTypes.object,
    icon: PropTypes.string
  };

  getStyles = (icon, type = "base") => {
    let url = getIcon(icon, type);
    return {
      base: {
        display: "inline-block",
        width: "1em",
        height: "1em",
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain"
      }
    };
  };

  render() {
    let { icon, active, style } = this.props;
    let styles = this.getStyles(icon, active ? "active" : "base");
    return <i style={[styles.base, style] as any} />;
  }
};

Icon = Radium(Icon);

export { Icon };
export default Icon;
