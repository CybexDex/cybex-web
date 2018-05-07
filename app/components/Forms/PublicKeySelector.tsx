import * as React from "react"; import * as PropTypes from "prop-types";

import ChainTypes from "components/Utility/ChainTypes";
import BindToChainState from "components/Utility/BindToChainState";
import Translate from "react-translate-component";
import { Map } from "immutable";

type Auth = [string, number];
type AccountOptions = {
  memo_key: string;
  num_committee: number;
  num_witness: number;
  votes: any[];
  voting_account: AccountId;
}
type AccountAuth = {
  account_auths: Auth[];
  address_auths: Auth[];
  key_auths: Auth[];
  weight_threshold: number
};
type AccountId = string;
type Account = {
  active: AccountAuth;
  active_special_authority: any;
  assets: any[];
  balances: { [asset_id: string]: string };
  blacklisted_accounts: AccountId[];
  blacklisting_accounts: AccountId[];
  call_orders: any[];
  history: any[];
  id: AccountId;
  level: 2;
  lifetime_referrer: AccountId;
  lifetime_referrer_fee_percentage: number;
  lifetime_referrer_name: AccountId;
  membership_expiration_date: string;
  name: string;
  network_fee_percentage: number;
  options: AccountOptions;
  orders: any[];
  owner: AccountAuth;
  owner_special_authority: any;
  proposals: any[];
  referrer: AccountId;
  referrer_name: AccountId;
  referrer_rewards_percentage: 0;
  registrar: string;
  registrar_name: AccountId;
  statistics: string;
  top_n_control_flags: number;
  vesting_balances: any[];
  whitelisted_accounts: any[];
  whitelisting_accounts: AccountId[];
};

class PublicKeySelector extends React.PureComponent<{ account: Map<string, any>, name, disabled, onKeyChange }, { key, keys }> {
  id = `public_key_selector_${this.props.name}`;
  key = "";

  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      key: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    let { account, disabled } = nextProps;
    let keys = account ? account.getIn(["active", "key_auths"]).toJS() : [];
    if (this.props.account !== account) {
      if (keys.length > 1) {
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
        })
      }
      if (this.props.onKeyChange) {
        this.props.onKeyChange(this.key);
      }
    }
  }

  handleKeyChange = (e) => {
    let key = e.target.value;
    this.key = key;
    this.setState({
      key
    });
    if (this.props.onKeyChange) {
      this.props.onKeyChange(key);
    }
  }

  render() {
    let { name, account, disabled } = this.props;
    let { keys } = this.state;
    return (
      keys.length > 1 && !disabled ?
        <select disabled={disabled} id={this.id} name={name} value={this.state.key} onChange={this.handleKeyChange}>
          <Translate component="option" content="transfer.public_key" value="" />
          {
            keys.map(item =>
              <option key={item[0]} value={item[0]} >
                {item[0]}
              </option>)
          }
        </select> :
        null
    )
  }
}

const PublicKeySelectorWrapper = BindToChainState(PublicKeySelector, { keep_updating: true });

export {
  PublicKeySelectorWrapper as PublicKeySelector
}

export default PublicKeySelectorWrapper;