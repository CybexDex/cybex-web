import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import classnames from "classnames";
import Icon from "./Icon";
import { getId } from "./utils";
import ReactTooltip from "react-tooltip";

export interface TipMarkProps {
  children?;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  onClick?;
  type?;
  link?;
  id?;
}

let TipMark = class extends React.Component<TipMarkProps, any> {
  id: string;
  static defaultProps = {
    type: "secondary"
  };

  static propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired
  };

  static Styles = {
    base: {
      borderRadius: "4px",
      display: "inline-block",
      position: "relative",
      transition: "opacity 0.3s",
      cursor: "help",
      ":disabled": {
        // background: Colors.$colorGreyLightWhite,
        cursor: "not-allowed",
        // color: Colors.$colorGreyLight
        opacity: "0.3"
      }
    },
    primary: {
      color: Colors["$colorGrey"]
    }
  };

  constructor(props) {
    super(props);
    this.id = props.id || getId("tip");
  }

  render() {
    let { children, style, type } = this.props;
    let styles = TipMark.Styles;
    return (
      <span
        style={[styles.base, styles[type], style] as any}
        onClick={this.props.onClick ? this.props.onClick : () => void 0}
        data-for={this.id}
        data-place="right"
        data-effect="solid"
        data-tip
        {...this.props}
      >
        <Icon icon="help" />
        <ReactTooltip id={this.id}>{this.props.children}</ReactTooltip>
      </span>
    );
  }
};
TipMark = Radium(TipMark);

export { TipMark };
export default TipMark;
