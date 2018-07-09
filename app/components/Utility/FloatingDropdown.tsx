import * as React from "react";
import * as PropTypes from "prop-types";
import utils from "common/utils";
import { isFootballAsset } from "qtb";

class Dropdown extends React.Component<
  {
    isAsset?;
    id?;
    value?;
    values?;
    entries;
    onChange?;
    upperCase?;
    singleEntry?;
  },
  any
> {
  listener = false;

  static defaultProps = {
    isAsset: true
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.onBodyClick = this.onBodyClick.bind(this);
  }

  componentDidMount() {
    this._setListener();
  }

  shouldComponentUpdate(np, ns) {
    return (
      !utils.are_equal_shallow(np.entries, this.props.entries) ||
      !utils.are_equal_shallow(ns, this.state) ||
      np.value !== this.props.value
    );
  }

  _setListener(props = this.props) {
    if (props.entries.length > 1 && !this.listener) {
      this.listener = true;
      document.body.addEventListener("click", this.onBodyClick, {
        capture: false,
        passive: true
      });
    }
  }

  _removeListener() {
    document.body.removeEventListener("click", this.onBodyClick);
    this.listener = false;
  }

  componentWillReceiveProps(np) {
    if (np.entries.length === 1) {
      this._removeListener();
    } else if (np.entries.length > 1) {
      this._setListener(np);
    }
  }

  componentWillUnmount() {
    this._removeListener();
  }

  onBodyClick(e) {
    let el = e.target;
    let insideActionSheet = false;

    do {
      if (
        el.classList &&
        el.classList.contains("dropdown") &&
        el.id === this.props.id
      ) {
        insideActionSheet = true;
        break;
      }
    } while ((el = el.parentNode));

    if (!insideActionSheet) {
      this.setState({ active: false });
    } else {
      e.stopPropagation();
    }
  }

  onChange(value, e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onChange(value);
    this.setState({
      active: false
    });
  }

  _toggleDropdown() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { entries, value, isAsset } = this.props;
    let { active } = this.state;

    if (entries.length === 0) return null;
    if (entries.length == 1) {
      return (
        <div
          className={
            "dropdown-wrapper inactive" +
            (this.props.upperCase ? " upper-case" : "")
          }
        >
          <div>
            {this.props.singleEntry ? utils.replaceName(this.props.singleEntry).name : utils.replaceName(entries[0]).name}
          </div>
        </div>
      );
    } else {
      let options = entries.filter(value => !isFootballAsset(value)).map(value => {
        return (
          <li
            className={this.props.upperCase ? "upper-case" : ""}
            key={value}
            onClick={this.onChange.bind(this, this.props.values[value])}
          >
            {isAsset ? (
              <span>{utils.replaceName(value).name}</span>
            ) : (
              <span>{value}</span>
            )}
          </li>
        );
      });
      return (
        <div
          onClick={this._toggleDropdown.bind(this)}
          className={
            "dropdown-wrapper" +
            (active ? " active" : "") +
            (this.props.upperCase ? " upper-case" : "")
          }
        >
          <div style={{ paddingRight: 15 }}>
            {value ? utils.replaceName(value).name : <span className="hidden">A</span>}
          </div>
          <ul
            className="dropdown"
            style={{ overflow: entries.length > 9 ? "auto" : "hidden" }}
          >
            {options}
          </ul>
        </div>
      );
    }
  }
}

export default Dropdown;
