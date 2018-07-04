import * as React from "react";
import { Icon } from "./Icon";
import Radium from "radium";
import { Colors } from "components/Common/Colors";
import { getId } from "./utils";
import classnames from "classnames";
import { Apis } from "cybexjs-ws";
import { ChainStore } from "cybexjs";
import counterpart from "counterpart";

let Input = Radium(
  class extends React.PureComponent<
    {
      id?;
      name?;
      type;
      tip?;
      icon?;
      iconSize?;
      iconComponent?;
      size?;
      onChange?;
      onBlur?;
      onFocus?;
      onInvalid?;
      inputRef?;
      disabled?;
      placeholder?;
      keepPlaceholder?;
      autoComplete?;
      style?;
      error?;
      active?;
      onValid?;
      onKeyDown?;
      formatter?;
      validator?;
      iconStyle?;
      valueFromOuter?;
    } & HTMLInputElement,
    { value; focused; type; valid }
  > {
    static defaultProps = {
      size: "normal",
      valueFromOuter: false,
      autoComplete: "off",
      inputRef: () => void 0
    };
    static styles = {
      formGroup: {
        display: "flex",
        alignItems: "center",
        backgroundColor: Colors.$colorAnchor,
        color: Colors.$colorWhite,
        padding: "0.6667em",
        marginBottom: "2px",
        ":disabled": {
          cursor: "not-allowed"
        }
      },
      input: {
        margin: 0,
        padding: 0,
        flex: "1 1",
        fontSize: "1em",
        backgroundColor: "transparent",
        ":focus": {
          boxShadow: "unset"
        }
      },
      inputWrapper: {
        position: "relative",
        margin: "0.5rem",
        display: "flex",
        alignItems: "center"
      },
      placeholder: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        transformOrigin: "left",
        color: Colors.$colorGrey,
        transition: "all 0.3s",
        pointerEvents: "none",
        opacity: 0.6,
        ":active": {
          top: "0%",
          transform: "translateY(-80%) scale(0.8)"
        }
      },
      inputTip: {
        position: "absolute",
        top: "0%",
        right: "0",
        transform: "translateY(-80%) scale(0.8)",
        transformOrigin: "right",
        color: Colors.$colorGrey,
        pointerEvents: "none"
      },
      icon: {
        // margin: "0 0.3em"
        opacity: 0.6
      },
      error: {
        color: Colors.$colorFlame,
        fontSize: "1rem"
      },
      errorKeep: {
        color: Colors.$colorWhite,
        position: "absolute",
        left: "-1.5em",
        top: "100%",
        background: Colors.$colorFlame,
        padding: "1em 0.5em 0.5em 0.5em",
        clipPath: "polygon(0% 0%, 3% 20%, 100% 20%, 100% 100%, 0% 100%)",
        borderRadius: "0 1em 0.5em 0.5em",
        zIndex: 1
      },
      size: {
        normal: {
          wrapper: {
            height: "3.3334rem",
            fontSize: "1.3334em"
          },
          icon: {
            fontSize: "2em"
          },
          withPlace: {
            height: "6rem"
          }
        },
        large: {
          wrapper: {
            height: "4.6667rem",
            fontSize: "1.6667em"
          },
          icon: {
            fontSize: "2.6667em"
          },
          withPlace: {
            height: "6.6667rem"
          }
        },
        small: {
          wrapper: {
            height: "2.6667rem"
          },
          icon: {
            fontSize: "2em"
          },
          withPlace: {
            height: "5.3334rem"
          }
        }
      }
    };
    key;
    input = React.createRef();
    constructor(props) {
      super(props);
      this.state = {
        value: "",
        focused: false,
        valid: false,
        type: props.type
      };
      this.key = getId(this.props.id || this.props.name);
    }

    onChange = e => {
      let value = e.target.value;
      let valid = false;
      if (this.props.formatter) {
        value = this.props.formatter(this.state.value, value);
      }
      if (this.props.validator) {
        valid = this.props.validator(value);
      }
      this.setState({ value, valid });
      if (this.props.onChange) {
        if (this.props.valueFromOuter) {
          this.props.onChange(e);
        } else {
          this.props.onChange(value);
        }
      }
      if (this.props.onValid && valid) {
        this.props.onValid(value);
      }
      if (this.props.onInvalid && !valid) {
        this.props.onInvalid(value);
      }
    };
    onFocus = e => {
      this.setState({ focused: true });
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    };
    onBlur = e => {
      let value = e.target.value;
      this.setState({ focused: false });
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    };
    togglePassword = e => {
      this.setState(state => ({
        type: state.type === this.props.type ? "text" : this.props.type
      }));
    };

    render() {
      let {
        name,
        id,
        icon,
        iconComponent,
        size,
        placeholder,
        keepPlaceholder,
        autoComplete,
        error,
        active,
        tip,
        style,
        disabled,
        onChange,
        onBlur,
        onFocus,
        onInvalid,
        onValid,
        inputRef,
        iconStyle,
        valueFromOuter,
        children
      } = this.props;
      let { type } = this.state;
      return (
        <div
          className={classnames("form-field input-group round-corner", {
            disabled
          })}
          style={
            [
              Input.styles.formGroup,
              Input.styles.size[size].wrapper,
              keepPlaceholder && Input.styles.size[size].withPlace,
              style
            ] as any
          }
        >
          {!!iconComponent && iconComponent}
          {!iconComponent &&
            icon && (
              <Icon
                style={
                  [
                    Input.styles.icon,
                    Input.styles.size[size].icon,
                    iconStyle
                  ] as any
                }
                icon={icon}
                type={error ? "error" : "base"}
              />
            )}
          <div className="input-wrapper" style={Input.styles.inputWrapper}>
            <input
              ref={inputRef}
              key={this.key}
              type={type}
              name={name}
              placeholder={keepPlaceholder ? "" : placeholder}
              autoComplete={autoComplete}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onKeyDown={this.props.onKeyDown}
              value={valueFromOuter ? this.props.value : this.state.value}
              style={[Input.styles.input] as any}
            />
            {error && (
              <p
                className="anim-fade"
                style={
                  [
                    Input.styles.error,
                    keepPlaceholder && Input.styles.errorKeep
                  ] as any
                }
              >
                {error}
              </p>
            )}
            {keepPlaceholder && (
              <span
                style={
                  [
                    Input.styles.placeholder,
                    (this.state.focused || this.state.value) &&
                      Input.styles.placeholder[":active"]
                  ] as any
                }
              >
                {placeholder}
              </span>
            )}
            {tip && <span style={[Input.styles.inputTip] as any}>{tip}</span>}
            {this.props.type === "password" &&
              (this.state.focused || this.state.value) && (
                <a
                  tabIndex={-1}
                  href="javascript:;"
                  onClick={this.togglePassword}
                >
                  <Icon
                    style={
                      [
                        Input.styles.icon,
                        Input.styles.size[size].icon,
                        { transform: "scale(0.7)" }
                      ] as any
                    }
                    icon="visibility"
                    type={type === "password" ? "base" : "off"}
                  />
                </a>
              )}
          </div>
          {children}
        </div>
      );
    }
  }
);

let InputValidator = props => {};

const ACCOUNT_NAME_SET = /^[a-z0-9\.-]*$/;

let LoginAccountInput = class extends React.PureComponent<
  { onValidChange; errorMsgs? },
  any
> {
  valid = false;
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      valid: false,
      onError: false
    };
  }

  handleNameChange = async name => {
    let account = await Apis.instance()
      .db_api()
      .exec("get_account_by_name", [name]);
    ChainStore.getAccount(name, false);
    let valid = false;
    if (account) {
      valid = true;
      this.setState({ account, valid: true, onError: false });
      this.valid = true;
    } else {
      this.setState({ account: name, valid: false });
    }
    if (this.props.onValidChange) {
      this.props.onValidChange(valid, account);
    }
  };

  clearError = () => {
    this.setState({
      onError: false
    });
  };

  checkError = () => {
    if (!this.state.valid && this.state.account && this.state.account.length) {
      this.setState({
        onError: true
      });
    } else {
      this.setState({
        onError: false
      });
    }
  };

  render() {
    let { valid, onError } = this.state;
    return (
      <Input
        placeholder={counterpart.translate("account.name")}
        icon={valid ? "avatarWhite" : "avatar"}
        type="text"
        onChange={this.handleNameChange}
        onFocus={this.clearError}
        onBlur={this.checkError}
        tip={
          this.state.valid && this.state.account && "#" + this.state.account.id
        }
        formatter={(prevValue: string, nextValue: string) => {
          if (!ACCOUNT_NAME_SET.test(nextValue)) {
            return prevValue;
          }
          return nextValue.toLowerCase();
        }}
        error={onError && counterpart.translate("login.error_name")}
        keepPlaceholder
      />
    );
  }
};
let LoginPasswordInput = class extends React.PureComponent<
  { onValidChange; errorPass },
  any
> {
  valid = false;
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      valid: false
    };
  }

  handleChange = async password => {
    let valid = false;
    if (password) {
      this.setState({ password, valid: true, onError: false });
      valid = true;
      this.valid = true;
    } else {
      this.setState({ password: null, valid: false, onError: false });
    }
    if (this.props.onValidChange) {
      this.props.onValidChange(valid, password);
    }
  };

  clearError = () => {
    this.setState({
      onError: false
    });
  };

  checkError = () => {
    this.setState({
      onError: true
    });
  };

  render() {
    let { valid, onError } = this.state;
    let { errorPass } = this.props;
    return (
      <Input
        placeholder={counterpart.translate("settings.password")}
        icon="lock"
        type="password"
        onBlur={this.checkError}
        error={errorPass && counterpart.translate("login.error_password")}
        onChange={this.handleChange}
        keepPlaceholder
      />
    );
  }
};

export { Input, LoginAccountInput, LoginPasswordInput };
export default Input;
