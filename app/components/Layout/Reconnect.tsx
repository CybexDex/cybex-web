import * as React from "react";
import { withRouter } from "react-router";
import willTransitionTo from "../../routerTransition";
import Translate from "react-translate-component";


let Reconnect = class extends React.Component<any, { retry }> {
  timer;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  reconnect() {
    this.timer = setTimeout(() =>
      willTransitionTo(this.props.router, this.props.router.replace, () => { }, false),
      300);
  }

  render() {
    return (
      <Translate component="a" href="javascript:;" content="init_error.retry" onClick={this.reconnect.bind(this)}/>
    )
  }
}

Reconnect = withRouter(Reconnect);

export { Reconnect };
export default Reconnect;