import * as React from "react"; import * as PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import SettingsStore from "stores/SettingsStore";
import { NotificationActions } from "actions//NotificationActions";
import counterpart from "counterpart";
import { connect } from "alt-react";

let faucetAddress = SettingsStore.getSetting("faucet_address");

export let Captcha = class extends React.Component<
  { onCapthaChange },
  {
    cap: string;
    capType: any;
    captchaSvg: any;
    captcha: string;
  }
> {
  id: string;
  captcha: string;

  constructor(props) {
    super(props);
    this.state = {
      cap: "",
      capType: 0,
      captchaSvg: "<svg></svg>",
      captcha: ""
    };
  }

  componentDidMount() {
    this.updateCaptcha();
  }

  setCaptcha = e => {
    let captcha = e.target.value;
    this.setState({
      captcha
    });
    this.captcha = captcha;
    this.props.onCapthaChange({ id: this.state.cap, captcha });
  };

  updateCaptcha = () => {
    fetch(`${faucetAddress}/captcha`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        let { data } = res;
        let s = {
          cap: res.id,
          capType: res.type,
          captchaSvg: data
        };
        this.setState(s);
        this.id = res.id;
      })
      .catch(err => {
        console.debug("Captcha: ", err);
        NotificationActions.error(counterpart.translate("captcha.error"));
        this.id = null;
        let s = {
          cap: "",
          captchaSvg: "<svg></svg>"
        };
        this.setState(s);
      });
  };

  send = () => {
    let { captcha, cap } = this.state;
    console.debug("Captcha: ", captcha);
    fetch(`${faucetAddress}/register`, {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        captcha,
        captchaId: cap
      })
    }).then(res => console.debug("FETCH: ", res));
  };

  render() {
    return (
      <div className="captcha">
        <input
          type="text"
          value={this.state.captcha}
          onChange={this.setCaptcha}
        />
        {this.state.cap && this.state.cap.length ? (
          this.state.capType !== 1 ? (
            <SVGInline
              svg={this.state.captchaSvg}
              onClick={this.updateCaptcha}
            />
          ) : (
            <img
              style={{ height: "34px" }}
              onClick={this.updateCaptcha}
              src={"data:image/png;base64," + this.state.captchaSvg}
            />
          )
        ) : (
          <label htmlFor="" onClick={this.updateCaptcha}>
            {counterpart.translate("captcha.click")}
          </label>
        )}
      </div>
    );
  }
};

Captcha = connect(Captcha, {
  listenTo() {
    return [SettingsStore];
  },
  getProps() {
    return {
      ...SettingsStore.getState()
    };
  }
});

export default Captcha;
