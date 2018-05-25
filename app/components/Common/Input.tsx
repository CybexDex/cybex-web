import * as React from "react";
import { Icon } from "./Icon";
import Radium from "radium";
import { Colors } from "components/Common/Colors";
import classnames from "classnames";

let Input = Radium(
  class extends React.PureComponent<
    {
      type;
      icon?;
      size?;
      onChange?;
      onBlur?;
      onFocus?;
      onInvalid?;
      disabled?;
      placeholder?;
      onValid?;
    },
    any
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
        padding: "0.6667rem",
        ":disabled": {
          cursor: "not-allowed"
        }
      },
      input: {
        margin: 0,
        backgroundColor: "transparent"
      },
      size: {
        normal: {
          wrapper: {
            fontSize: "2rem"
          },
          icon: {
            fontSize: "2rem"
          }
        },
        large: {
          wrapper: {
            fontSize: "2rem"
          },
          icon: {
            fontSize: "2rem"
          }
        },
        small: {
          wrapper: {
            fontSize: "2rem"
          },
          icon: {
            fontSize: "1.3334rem"
          }
        }
      }
    };

    render() {
      let {
        icon,
        type,
        size,
        placeholder,
        disabled,
        onChange,
        onBlur,
        onFocus,
        onInvalid,
        onValid,
        children
      } = this.props;
      return (
        <div
          className={classnames("form-field input-group round-corner", {
            disabled
          })}
          style={[Input.styles.formGroup] as any}
        >
          {icon && <Icon style={Input.styles.size[size].icon} icon={icon} />}
          <input
            type={type}
            {...this.props}
            style={[Input.styles.input] as any}
          />
          {children}
        </div>
      );
    }
  }
);

export { Input };
export default Input;
