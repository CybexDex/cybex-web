import * as React from "react";
import * as PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import SettingsStore from "stores/SettingsStore";
import { NotificationActions } from "actions/NotificationActions";
import counterpart from "counterpart";
import { connect } from "alt-react";
import { Input } from "components/Common";

export let Captcha = class Captcha extends React.Component<
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
  faucetAddress: string;
  
  constructor(props) {
    super(props);
    this.state = {
      cap: "",
      capType: 0,
      captchaSvg: "<svg></svg>",
      captcha: ""
    };
    this.faucetAddress = SettingsStore.getSetting("faucet_address")
    this.setCaptcha = this.setCaptcha.bind(this)
    this.updateCaptcha = this.updateCaptcha.bind(this)
    this.send = this.send.bind(this)
  }

  componentDidMount() {
    this.updateCaptcha();
  }

  setCaptcha(captcha) {
    this.setState({
      captcha
    });
    this.captcha = captcha;
    this.props.onCapthaChange({ id: this.state.cap, captcha });
  };

  updateCaptcha() {
    fetch(`${this.faucetAddress}/captcha`)
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

  send() {
    let { captcha, cap } = this.state;
    console.debug("Captcha: ", captcha);
    fetch(`${this.faucetAddress}/register`, {
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
      <div className="captcha" ref = "test"> 
        <Input
          type="text"
          value={this.state.captcha}
          onChange={this.setCaptcha}
          style={{width: "100%", padding: "0.6667em 0 0.6667em 0.6667em"}}
        >
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
        </Input>
      </div>
    );
  }
};

// Captcha = connect(Captcha, {
//   listenTo() {
//     return [SettingsStore];
//   },
//   getProps() {
//     return {
//       ...SettingsStore.getState()
//     };
//   }
// });

export default Captcha;
