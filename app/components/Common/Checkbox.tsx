import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { getId } from "./utils";
import { getIcon } from "./IconMap";
let Checkbox = class extends React.Component<
  {
    label?: string;
    id?: string;
    disabled?: boolean;
    isMaster?: boolean;
    active: boolean;
    children: any;
    size: string;
    onChange?;
  },
  any
> {
  static defaultProps = {
    isMaster: false,
    disabled: false,
    size: "normal",
    label: "",
    onChange: () => void 0
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    size: PropTypes.string,
    isMaster: PropTypes.bool,
    active: PropTypes.bool,
    id: PropTypes.string
  };

  static styles = {
    label: {
      base: {
        fontSize: "1em",
        display: "flex",
        alignItems: "center",
        opacity: "0.8",
        color: Colors.$colorWhite,
        cursor: "pointer",
        ":hover": {
          opacity: "1"
        },
        margin: 0
      },
      active: {
        opacity: "1"
      },
      disabled: {
        cursor: "not-allowed",
        opacity: "0.3",
        ":hover": {
          opacity: "0.3"
        }
      },
      size: {
        small: {
          fontSize: "0.8em"
        },
        large: {
          fontSize: "1.2em"
        },
        xlarge: {
          fontSize: "1.4em"
        }
      }
    },
    input: {
      base: {
        margin: "0 0.5em 0 0",
        backgroundImage: `url(${getIcon("checkbox")})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        appearance: "none",
        width: "1.2em",
        height: "1.2em"
      },
      active: {
        backgroundImage: `url(${getIcon("checkbox", "active")})`
      },
      master: {
        backgroundImage: `url(${getIcon("checkbox", "master")})`
      },
      disabled: {
        backgroundImage: `url(${getIcon("checkbox", "disabled")})`
      },
      disabledActive: {
        backgroundImage: `url(${getIcon("checkbox", "disabledAcitve")})`
      },
      disabledMaster: {
        backgroundImage: `url(${getIcon("checkbox", "disabledAcitve")})`
      },
      size: {
        small: {
          width: "0.8em",
          height: "0.8em"
        },
        largr: {
          fontSize: "1.2em"
        },
        xlargr: {
          fontSize: "1.4em"
        },
      }
    }
  };

  id: string;
  constructor(props) {
    super(props);
    this.id = this.props.id || getId("checkbox");
  }

  handleOnChange = e => {
    this.setState({
      active: e.target.checked
    });
    this.props.onChange(e.target.checked);
  };

  render() {
    let { label, isMaster, disabled, active, children, size } = this.props;
    let labelStyles = Checkbox.styles.label;
    let inputStyles = Checkbox.styles.input;
    return (
      <label
        htmlFor={this.id}
        style={
          [
            labelStyles.base,
            active && labelStyles.active,
            disabled && labelStyles.disabled,
            labelStyles.size[size]            
          ] as any
        }
      >
        <input
          id={this.id}
          // className="no-appearance"
          type="checkbox"
          checked={active}
          disabled={disabled}
          onChange={this.handleOnChange}
          style={
            [
              inputStyles.base,
              active
                ? isMaster
                  ? inputStyles.master
                  : inputStyles.active
                : {},
              disabled && active
                ? isMaster
                  ? inputStyles.disabledMaster
                  : inputStyles.disabledAcitve
                : {},
              disabled ? inputStyles.disabled : {},
              inputStyles.size[size]
            ] as any
          }
        />
        {label || children}
      </label>
    );
  }
};
Checkbox = Radium(Checkbox);

export { Checkbox };
export default Checkbox;
