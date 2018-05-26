import * as React from "react";
import { Icon } from "./Icon";
import Radium from "radium";
import { Colors } from "components/Common/Colors";
import { getId } from "./utils";
import classnames from "classnames";
import { ChainStore, PublicKey, ChainValidation } from "cybexjs";

let Input = Radium(
  class extends React.PureComponent<
    {
      id?;
      name?;
      type;
      tip?;
      icon?;
      iconComponent?;
      size?;
      onChange?;
      onBlur?;
      onFocus?;
      onInvalid?;
      disabled?;
      placeholder?;
      keepPlaceholder?;
      style?;
      error?;
      active?;
      onValid?;
      formatter?;
    },
    { value; focused; type }
  > {
    static defaultProps = {
      size: "normal"
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
    constructor(props) {
      super(props);
      this.state = {
        value: "",
        focused: false,
        type: props.type
      };
      this.key = getId(this.props.id || this.props.name);
    }

    onChange = e => {
      let value = e.target.value;
      if (this.props.formatter) {
        value = this.props.formatter(this.state.value, value);
      }
      this.setState({ value });
      if (this.props.onChange) {
        this.props.onChange(value);
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
                style={[Input.styles.icon, Input.styles.size[size].icon] as any}
                icon={icon}
                type={error ? "error" : "base"}
              />
            )}
          <div className="input-wrapper" style={Input.styles.inputWrapper}>
            <input
              key={this.key}
              type={type}
              name={name}
              placeholder={keepPlaceholder ? "" : placeholder}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              value={this.state.value}
              style={[Input.styles.input] as any}
            />
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
                <a href="javascript:;" onClick={this.togglePassword}>
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

let LoginAccountInput = class extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNameChange = async name => {};

  render() {
    return (
      <Input
        placeholder="Account Name"
        icon="avatar"
        type="text"
        formatter={(prevValue: string, nextValue: string) =>
          nextValue.toLowerCase()
        }
        keepPlaceholder
      />
    );
  }
};

export { Input, LoginAccountInput };
export default Input;
