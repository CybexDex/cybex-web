import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { FlexContainer } from "./CommonStyles";
import classnames from "classnames";

export type Size = "xsmall" | "normal" | "smaller" | "small" | "large";
export type StyleType =
  | "primary"
  | "secondary"
  | "bid"
  | "ask"
  | "white-primary"
  | "white-secondary";

export interface ProgressBarProps {
  children?;
  disabled?: boolean;
  size?: Size;
  styleType?: StyleType;
  loading?: boolean;
  style?: React.CSSProperties;
  percent?;
  max?;
  current?;
  labelStyle?;
  withLabel?;
  flagLabel?;
}

let ProgressBar = class extends React.Component<ProgressBarProps, any> {
  static defaultProps = {
    styleType: "secondary",
    size: "normal",
    disabled: false
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    styleType: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  };

  static Styles = {
    base: {
      common: {
        borderRadius: "0.5em"
      },
      container: {
        ...FlexContainer({ alignItems: "center" })
      },
      outer: {
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
        width: "100%",
        backgroundColor: "rgba(8, 10, 16, 0.2)",
        padding: "2px"
      },
      inner: {
        height: "0.6em",
        position: "relative"
      },
      flag: {
        position: "absolute",
        bottom: "155%",
        padding: "0.4em 0.4em 0.8em 0.4em",
        width: "4em",
        fontSize: "1.4em",
        fontWeight: "bold",
        transition: "0.2s all",
        fontFamily: "PingFangSC-Medium, sans-serif"
      }
    },
    flagLeft: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 20% 80%, 0% 100%, 0% 50%)",
      borderRadius: "4px 4px 12px 0",
      left: "100%",
      right: "unset"
    },
    flagRight: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 80% 80%, 0% 80%, 0% 100%)",
      borderRadius: "4px 4px 0 10px",
      left: "calc(100% - 4.2em)"

      // right: "100%"
    },
    primary: {
      inner: {
        background: Colors.$colorGradientGoldex
      },
      label: {
        color: Colors.$colorOrange,
        fontWeight: "bold"
      },
      flag: {
        background: "linear-gradient(300deg, rgba(255, 255, 255, 0.5), #ffffff)"
      }
    },
    secondary: {
      inner: {
        background: Colors.$colorGradientSilvex
      },
      label: {
        color: Colors.$colorCyan
      }
    },
    small: {
      container: {
        fontSize: "8px"
      }
    },
    normal: {
      container: {
        fontSize: "10px"
      }
    },
    large: {
      container: {
        fontSize: "14px"
      }
    }
  };

  getPercent = () => {
    return (
      this.props.percent || (this.props.current / this.props.max).toFixed(2)
    );
  };

  render() {
    let {
      children,
      size,
      styleType,
      disabled,
      style,
      loading,
      max,
      current,
      flagLabel,
      labelStyle,
      withLabel
    } = this.props;
    let styles = ProgressBar.Styles;
    let percent = this.getPercent();
    return (
      <div
        className="progress"
        style={
          [
            ProgressBar.Styles.base.container,
            ProgressBar.Styles[size].container
          ] as any
        }
      >
        <div
          className="progress-bar-outer"
          style={
            [
              ProgressBar.Styles.base.common,
              ProgressBar.Styles.base.outer
            ] as any
          }
        >
          <div
            className="progress-bar-inner"
            style={
              [
                ProgressBar.Styles.base.common,
                ProgressBar.Styles.base.inner,
                ProgressBar.Styles[styleType].inner,
                { width: `${percent}%` }
              ] as any
            }
          >
            {flagLabel && (
              <span
                style={
                  [
                    ProgressBar.Styles[styleType].label,
                    flagLabel ? ProgressBar.Styles.base.flag : {},
                    flagLabel &&
                      (percent > 50
                        ? ProgressBar.Styles.flagRight
                        : ProgressBar.Styles.flagLeft),
                    ProgressBar.Styles[styleType].flag,
                    labelStyle
                  ] as any
                }
              >
                {percent}%
              </span>
            )}
          </div>
        </div>
        {withLabel && (
          <span
            style={
              [
                ProgressBar.Styles[styleType].label,
                { marginLeft: "1em" },
                labelStyle
              ] as any
            }
          >
            {percent}%
          </span>
        )}
      </div>
    );
  }
};
ProgressBar = Radium(ProgressBar);

export { ProgressBar };
export default ProgressBar;
