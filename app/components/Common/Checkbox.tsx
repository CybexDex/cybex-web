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
    onChange?;
  },
  {
    active: boolean;
  }
> {
  static defaultProps = {
    isMaster: false,
    disabled: false,
    label: "",
    onChange: () => void 0
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    isMaster: PropTypes.bool,
    id: PropTypes.string
  };

  static styles = {
    label: {
      base: {
        fontSize: "1.4rem",
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
      }
    },
    input: {
      base: {
        margin: 0,
        backgroundImage: `url(${getIcon("checkbox")})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        appearance: "none",
        width: "1.4em",
        height: "1.4em",
        marginRight: "0.5em"
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
      }
    }
  };

  id: string;
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.id = this.props.id || getId("checkbox");
  }

  handleOnChange = e => {
    this.setState({
      active: e.target.checked
    });
    this.props.onChange(e.target.checked);
  };

  render() {
    let { label, isMaster, disabled } = this.props;
    let { active } = this.state;
    let labelStyles = Checkbox.styles.label;
    let inputStyles = Checkbox.styles.input;
    return (
      <label
        htmlFor={this.id}
        style={
          [
            labelStyles.base,
            active && labelStyles.active,
            disabled && labelStyles.disabled
          ] as any
        }
      >
        <input
          id={this.id}
          // className="no-appearance"
          type="checkbox"
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
              disabled ? inputStyles.disabled : {}
            ] as any
          }
        />
        {label}
      </label>
    );
  }
};
Checkbox = Radium(Checkbox);

export { Checkbox };
export default Checkbox;
