import * as React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";

class LoadingIndicator extends React.Component<
  {
    type?: "three-bounce" | "circle" | "progress";
    loadingText?;
    className?;
    style?;
  },
  { progress }
> {
  // progress;
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  render() {
    switch (this.props.type) {
      case "three-bounce":
        return (
          <div
            className={classnames("three-bounce", this.props.className)}
            style={this.props.style}
          >
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        );
        break;
      case "circle":
        return (
          <div
            className={classnames("circle-wrapper", this.props.className)}
            style={this.props.style}
          >
            <div className="circle1 circle" />
            <div className="circle2 circle" />
            <div className="circle3 circle" />
            <div className="circle4 circle" />
            <div className="circle5 circle" />
            <div className="circle6 circle" />
            <div className="circle7 circle" />
            <div className="circle8 circle" />
            <div className="circle9 circle" />
            <div className="circle10 circle" />
            <div className="circle11 circle" />
            <div className="circle12 circle" />
          </div>
        );
        break;
      case "progress":
      default:
        var classes = "loading-overlay";
        if (this.state.progress > 0) {
          classes += " with-progress";
        }
        return (
          <div className={classes}>
            <div className="loading-panel">
              <div className="text-center">{this.props.loadingText}</div>
              <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
              </div>
              <div className="progress-indicator">
                <span>{this.state.progress}</span>
              </div>
            </div>
          </div>
        );
    }
  }
}
export { LoadingIndicator };
export default LoadingIndicator;
