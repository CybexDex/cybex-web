import * as React from "react";
import * as PropTypes from "prop-types";

import ChainTypes from "components/Utility/ChainTypes";
import BindToChainState from "components/Utility/BindToChainState";
import Translate from "react-translate-component";
import { Map } from "immutable";

class PublicKeySelector extends React.PureComponent<
  { account: Account; name; disabled; onKeyChange },
  { key; keys }
> {
  id = `public_key_selector_${this.props.name}`;
  key = "";

  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      key: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    let { account, disabled } = nextProps;
    let keys = account ? account.getIn(["active", "key_auths"]).toJS() : [];
    if (this.props.account !== account) {
      if (keys.length > 1 || !keys.length) {
        this.key = "";
        this.setState({
          keys,
          key: ""
        });
      } else {
        this.key = keys[0][0];
        this.setState({
          keys,
          key: keys[0][0]
        });
      }
      if (this.props.onKeyChange) {
        this.props.onKeyChange(this.key);
      }
    }
  }

  handleKeyChange = e => {
    let key = e.target.value;
    this.key = key;
    this.setState({
      key
    });
    if (this.props.onKeyChange) {
      this.props.onKeyChange(key);
    }
  };

  render() {
    let { name, account, disabled } = this.props;
    let { keys } = this.state;
    return keys.length > 1 && !disabled ? (
      <select
        disabled={disabled}
        id={this.id}
        name={name}
        value={this.state.key}
        onChange={this.handleKeyChange}
      >
        <Translate component="option" content="transfer.public_key" value="" />
        {keys.map(item => (
          <option key={item[0]} value={item[0]}>
            {item[0]}
          </option>
        ))}
      </select>
    ) : null;
  }
}

const PublicKeySelectorWrapper = BindToChainState(PublicKeySelector, {
  keep_updating: true
});

export { PublicKeySelectorWrapper as PublicKeySelector };

export default PublicKeySelectorWrapper;
