import * as React from "react";
import * as PropTypes from "prop-types";
import { Button } from "components/Common";

export type TimerButtonProps = {
  timeToCount: number;
  onClick: any;
};
export class TimerButton extends React.Component<TimerButtonProps, any> {
  timer: any;
  constructor(props: TimerButtonProps) {
    super(props);
    this.state = {
      time: props.timeToCount
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prev => ({
        time: prev.time - 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let className = "button" + (this.state.time <= 0 ? "" : " disabled");
    return (
      <Button {...this.props} disabled={this.state.time > 0}>
        {this.state.time > 0 && this.state.time + "s "}
        {this.props.children}
      </Button>
    );
  }
}
