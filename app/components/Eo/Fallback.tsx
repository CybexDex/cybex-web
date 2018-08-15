import * as React from "react";
import "./Fallback.scss";
import classnames from "classnames";
import Translate from "react-translate-component";

// let cybex = require("assets/images/logo-main.png");

let Fallback = class extends React.PureComponent<{}, { currentCybex: number }> {
  static CybexAmount = 6;

  timer;

  constructor(props) {
    super(props);
    this.state = {
      currentCybex: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prev => ({
        currentCybex: (prev.currentCybex + 1) % Fallback.CybexAmount
      }));
    }, 750);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="fallback-wrapper readable text-center">
        <Translate component="h3" content="fallback.title" />
        <Translate component="p" content="fallback.tip" />
        <ul className="logo-list">
          {[0, 1, 2, 3, 4, 5].map(cybexNum => (
            <li
              key={cybexNum}
              className={classnames("logo-list-item", {
                current: this.state.currentCybex === cybexNum
              })}
            >
              <img src="/images/logo-main.png" alt="Cybex Logo" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export { Fallback };
export default Fallback;
