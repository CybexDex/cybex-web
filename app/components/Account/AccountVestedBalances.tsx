import * as React from "react"; import * as PropTypes from "prop-types";
import { connect } from "alt-react";
import * as Immutable from "immutable";
import cname from "classnames";
import notify from "actions/NotificationActions";
import ChainTypes from "../Utility/ChainTypes";
import LoadingIndicator from "components/LoadingIndicator";
import PrivateKeyStore from "stores/PrivateKeyStore";
import AccountRefsStore from "stores/AccountRefsStore";
import BlockchainStore from "stores/BlockchainStore";
import AccountStore from "stores/AccountStore";
import BalanceClaimActiveStore from "stores/BalanceClaimActiveStore";
import BalanceClaimActiveActions from "actions/BalanceClaimActiveActions";
import BindToChainState from "../Utility/BindToChainState";
import { VestedBalancesLists } from "components/Account/VestedBalancesLists";
import WalletActions from "actions/WalletActions";
import MyAccounts from "components/Forms/MyAccounts";
import Translate from "react-translate-component";
import {
  ChainStore
} from "cybexjs";

type VestedBalancesProps = {
  selected_balances?: any;
  account?: string;
  account_refs?: Immutable.Set<any>;
  balances?: Immutable.Set<any>;
  claim_account_name?: string;
  loading?: boolean;
};

let AccountVestedBalances = class extends React.PureComponent<VestedBalancesProps, any> {
  static propTypes = {
    isUpdate: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.refreshBalances = this.refreshBalances.bind(this);
  }

  existing_keys: Immutable.Set<any>;
  componentWillMount() {
    let keys = PrivateKeyStore.getState().keys;
    let keySeq = keys.keySeq();
    try {
      BalanceClaimActiveActions.setPubkeys(keySeq);
    } catch {
      setTimeout(() => BalanceClaimActiveActions.setPubkeys(keySeq), 0);
    }
    this.existing_keys = keySeq;
    ChainStore.subscribe(this.refreshBalances);
    // console.debug("Balances: ", );
    // this.balances = BalanceClaimActiveStore.getState();
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.refreshBalances);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.debug("Should: ", nextProps, nextState);
  //   if (!nextProps.balance &&)
  //   return true;
  // }

  componentWillReceiveProps(nextProps) {
    // console.debug("WillReceive: ", nextProps);
    let keys = PrivateKeyStore.getState().keys;
    let keySeq = keys.keySeq();
    console.debug("GetKey: ", keySeq);
    if (!keySeq.equals(this.existing_keys)) {
      this.existing_keys = keySeq;
      BalanceClaimActiveActions.setPubkeys(keySeq);
    }
    // BalanceClaimActiveActions.refreshBalances();
  }

  render() {

    // if (this.props.loading) {
    //   return (
    //     <div>
    //       <br />
    //       <h5><Translate content="wallet.loading_balances" />&hellip;</h5>
    //       <br />
    //       <LoadingIndicator type="three-bounce" />
    //     </div>
    //   );
    // }

    // if (!this.props.balances || !this.props.balances.size) {
    //   return (
    //     <div>
    //       <br />
    //       <h5><Translate content="wallet.no_balance" /></h5>
    //     </div>
    //   );
    // }

    let import_ready = this.props.selected_balances.size && this.props.claim_account_name;
    let claim_balance_label = import_ready ?
      ` (${this.props.claim_account_name})` :
      null;

    return (
      <div>
        <div className="grid-block vertical">
          <VestedBalancesLists />
        </div> 
        <div className="vest-bottom grid-block">
          <MyAccounts
            key={this.props.balances}
            accounts={Immutable.List(this.props.account_refs)}
            onChange={this.onClaimAccountChange.bind(this)}
            className="small-12 medium-9"
          />
          <Translate
            component="button"
            className={cname("button success small-12 medium-3", { disabled: !import_ready })}
            content="wallet.claim_balance"
            onClick={this.onClaimBalance.bind(this)}
          />
        </div>
        {/* <div className="button cancel" onClick={this.onBack.bind(this)}><Translate content="wallet.cancel" /></div> */}
      </div>
    )
  }

  onBack(e) {
    e.preventDefault();
    window.history.back();
  }


  refreshBalances() {
    BalanceClaimActiveActions.refreshBalances();
  }

  onClaimAccountChange(claim_account_name) {
    BalanceClaimActiveActions.claimAccountChange(claim_account_name)
  }

  onClaimBalance() {
    WalletActions.importBalance(this.props.claim_account_name,
      this.props.selected_balances, true //broadcast
    )
      .then(() => {
        BalanceClaimActiveActions.setSelectedBalanceClaims(Immutable.Map());
      })
      .catch((error) => {
        console.error("claimBalance", error)
        let message = error
        try { message = error.data.message } catch (e) { }
        notify.error("Error claiming balance: " + message)
        throw error
      })
  }
}

AccountVestedBalances = connect(AccountVestedBalances, {
  listenTo() {
    return [BalanceClaimActiveStore, AccountRefsStore, PrivateKeyStore];
  },
  getProps() {
    let props = BalanceClaimActiveStore.getState();
    // console.debug("Vest Props: ", props, );
    let account_refs = AccountRefsStore.getAccountRefs();
    let currentAccountState = AccountStore.getCurrentAccountState();
    if (account_refs.size === 0 && currentAccountState) {
      account_refs = new Set([currentAccountState.get("id")]);
    }
    props.account_refs = account_refs;
    // props = 
    return props;
  }
});
export {
  AccountVestedBalances
}
export default AccountVestedBalances;
