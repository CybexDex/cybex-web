
import * as React from "react"; import * as PropTypes from "prop-types";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import WalletDb from "stores/WalletDb";
import PrivateKeyStore from "stores/PrivateKeyStore";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import * as Immutable from "immutable";
import { connect } from "alt-react";
import WalletUnlockStore from "stores/WalletUnlockStore";
import {
  FetchChain,
  TransactionBuilder
} from "cybexjs";
import MemoText from "components/BlockChain/MemoText";


// function swapTag(strings?: TemplateStringsArray, op?: string, from?: string, to?: string) {
//   return `#{SWAP::${op},FROM::${from},TO::${to},MSG::${strings.join("|")}}`;
// }
const enum SWAP_OP {
  PROPOSE,
  APPROVE,
  DEPOSIT,
  CHECK_BTC,
  CHECK_DONE,
  SWAP_DONE
};
const SWAP_STATUS = {
  [SWAP_OP.PROPOSE]: "提起侧发起，待对侧同意并发回临时公钥",
  [SWAP_OP.APPROVE]: "对侧已同意，待提起侧存款",
  [SWAP_OP.DEPOSIT]: "提起侧已存款，待对侧验证并使用双侧私钥提取存款",
  [SWAP_OP.SWAP_DONE]: "对侧已取款，交易完成"
};

class Swap {
  static SWAP_EXP = /^#{SWAP::(.*),OP::(.*),SIDEA::(.*),SIDEB::(.*),PB::(.*),PA::(.*),MSG::(.*)}$/;
  static getInstanceByIncome(incomingMsg: string) {
    let msgData = Swap.parseSwapMsg(incomingMsg);
    if (!msgData) return msgData;
    return new Swap(
      msgData.sideA,
      msgData.sideB,
      msgData.swapId,
      msgData.op,
      msgData.pubB,
      msgData.priA
    );
  }
  static parseSwapMsg(incomingMsg: string) {
    if (!Swap.SWAP_EXP.test(incomingMsg)) {
      return null;
    }
    let [msg, swapId, op, sideA, sideB, pubB, priA, body] = incomingMsg.match(Swap.SWAP_EXP);
    return {
      msg,
      swapId,
      op,
      sideA,
      sideB,
      pubB,
      priA,
      body
    };
  }
  constructor(
    public sideA: string,
    public sideB: string = "",
    public swapId = Date.now().toString(),
    public op: any = SWAP_OP.PROPOSE,
    public pubB: string = "",
    public priA: string = ""
  ) {
  };
  getSwapMemo(op: any, msgs: string[] = []) {
    return `#{SWAP::${this.swapId},OP::${op},SIDEA::${this.sideA},SIDEB::${this.sideB},PB::${this.pubB},PA::${this.priA},MSG::${msgs.join("|")}}`;
  };
  proposal() {
    return this.getSwapMemo(SWAP_OP.PROPOSE);
  }
  approve(tempPublicKey: string) {
    this.pubB = tempPublicKey;
    return this.getSwapMemo(SWAP_OP.APPROVE);
  }
  deposit() {
    return this.getSwapMemo(SWAP_OP.DEPOSIT);
  }
  checkBTC() {
    return this.getSwapMemo(SWAP_OP.CHECK_BTC);
  }
  checkDone(tempPass: string) {
    return this.getSwapMemo(SWAP_OP.CHECK_DONE)
  }
  swapDone() {
    return this.getSwapMemo(SWAP_OP.SWAP_DONE);
  }
}
const enum SIDE {
  SIDEA,
  SIDEB,
  UNKNOWN
};


const findLatest = (prev, next) => {
  if (prev.op > next.op) return prev;
  if (prev.op < next.op) return prev;
  return prev;
}

const getSwapOps =
  (history) => {
    let swapOps = {};
    for (let op of history) {
      if (!op.memo) continue;
      let { text } = PrivateKeyStore.decodeMemo(op.memo);
      if (!Swap.SWAP_EXP.test(text)) continue;
      let swapOp = Swap.getInstanceByIncome(text);
      if (swapOp.swapId in swapOps) {
        swapOps[swapOp.swapId] = findLatest(swapOps[swapOp.swapId], swapOp);
      } else {
        swapOps[swapOp.swapId] = swapOp;
      }
    }
    return Object.keys(swapOps).map(id => swapOps[id]);
  };

let SwapList = class extends React.Component<any, any> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };

  render() {
    let { pickSwap } = this.props;
    if (this.props.wallet_locked) return (<div>需要解锁以查看原子交易数据</div>);
    let history = this.props.account.has("history") ?
      this.props.account.get("history").toJS() : [];
    history = history.map(o => o.op[1]).slice(0, 15);
    // let history = this.props.account.get("history").toJS();
    let swapOps = getSwapOps(history);
    return (
      <table>
        <thead>
          <tr>
            <th>交易序号</th>
            <th>交易提起侧</th>
            <th>交易对侧</th>
            <th>交易当前状态</th>
            <th>拾起交易</th>
          </tr>
        </thead>
        {
          swapOps.map(swap =>
            <tr key={swap.swapId}>
              <td>{swap.swapId}</td>
              <td>{swap.sideA}</td>
              <td>{swap.sideB}</td>
              <td>{SWAP_STATUS[swap.op]}</td>
              <td>{swap.op != SWAP_OP.SWAP_DONE && <button className="button" onClick={() => pickSwap(swap)}>拾起</button>}</td>
            </tr>
          )
        }</table>
    );
  }
}

SwapList = BindToChainState(SwapList, { keep_updating: true });

SwapList = connect(SwapList, {
  listenTo() {
    return [WalletUnlockStore];
  },
  getProps() {
    return {
      wallet_locked: WalletUnlockStore.getState().locked
    };
  }
});

const SwapField =
  ({ children,
    title,
    enable,
    onSubmit }) => (
      <form onSubmit={onSubmit}>
        <fieldset disabled={!enable}>
          <legend>{title}</legend>
          {children}
          <div className="form-field">
            <button type="submit" className={enable ? "button" : ""}>Submit</button>
          </div>
        </fieldset>
      </form>
    );

class SwapSteps extends React.Component<any, any> {
  private form: HTMLFormElement;
  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.proposeSwap = this.proposeSwap.bind(this);
    this.approveSwap = this.approveSwap.bind(this);
    this.doneSwap = this.doneSwap.bind(this);
    this.startSwap = this.startSwap.bind(this);
    this.state = {
      form: {
        sideB: ""
      },
      income: {
        sideA: "",
        publicKeyOfB: ""
      }
    };
    console.debug("Swap: ", AccountStore.getState());
  }

  proposeSwap(e) {
    e.preventDefault();
    let sideB = this.state.form.sideB;
    let sideA = this.props.swap["sideA"];
    let swap = new Swap(sideA, sideB);
    this.transfer(
      AccountStore.getState().currentAccount,
      this.state.form.sideB,
      swap.proposal()
    );
    this.setState({
      currentStep: SIDE.SIDEA,
      swap
    });
  }
  approveSwap(e) {
    e.preventDefault();
    let { swap } = this.props;
    let seed = Math.floor(Math.random() * 1000000).toString();
    localStorage.setItem(`${swap.swapId}_seedB`, seed);
    let { privKey } = WalletDb.generateKeyFromPassword(seed, seed, seed);
    // alert("您本次院子交易的对侧临时私钥为" + seed + ", 请牢记此密钥，已备提款使用");    
    let pubB = privKey.toPublicKey().toPublicKeyString();
    this.transfer(
      AccountStore.getState().currentAccount,
      this.props.swap.sideA,
      this.props.swap.approve(pubB)
    );
  }

  /**
   * 开始步骤包括：
   * 1.利用收到的公钥创建临时账户，并设置临时账号权限
   * 2.转账相应CYB到临时账户
   * 
   * @param {any} e 
   * @memberof SwapContainer
   */
  async startSwap(e) {
    e.preventDefault();
    let { swap } = this.props;
    let seed = Math.floor(Math.random() * 1000000).toString();
    localStorage.setItem(`${swap.swapId}_seedA`, seed);
    let { privKey } = WalletDb.generateKeyFromPassword(seed, seed, seed);
    alert("您本次院子交易的提起侧临时私钥为" + seed + ", 请牢记此密钥，在适当的时候将其交给交易对侧，以供其提款使用")
    let pubA = privKey.toPublicKey().toPublicKeyString();
    console.debug("Start Swap: ", pubA, swap.pubB);    
    await this.createSwapAccount(pubA, swap.pubB);
    console.debug("Notice SIDEB");
    await this.transfer(
      swap.sideA,
      swap.sideB,
      swap.deposit()
    );
  }

  async doneSwap(e) {
    e.preventDefault();
    let { swap } = this.props;
    let seedB = localStorage.getItem(`${swap.swapId}_seedB`);
    let seedA = this.state.form.privA;
    console.debug("Done Swap: ", seedA, seedB);
    let { privKey: privB } = WalletDb.generateKeyFromPassword(seedB, seedB, seedB);
    let { privKey: privA } = WalletDb.generateKeyFromPassword(seedA, seedA, seedA);
    await this.getMoneyFromSwap(privA, privB);
    await this.transfer(swap.sideB, swap.sideA, swap.swapDone());
  }

  onChangeValue(e) {
    let { name, value } = e.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  async createSwapAccount(onekey, anotherKey) {
    let { swap } = this.props;
    let name = `${swap.sideA}-swap-${swap.sideB}-${swap.swapId}`;
    let { privKey } = WalletDb.generateKeyFromPassword(name, "owner", "qwer1234qwer1234");
    let ownerPublic = privKey.toPublicKey().toPublicKeyString();

    await Promise.all([
      FetchChain("getAccount", swap.sideA),
      FetchChain("getAccount", swap.sideB)
    ]).then((res) => {
      let [chain_registrar, chain_referrer] = res;
      console.debug("Get Resigter: ", chain_registrar, chain_referrer);
      let createParams = {
        fee: {
          amount: 0,
          asset_id: 0
        },
        "registrar": chain_registrar.get("id"),
        "referrer": chain_registrar.get("id"),
        "referrer_percent": 0,
        "name": name,
        "owner": {
          "weight_threshold": 6,
          "account_auths": [],
          "key_auths": [
            [onekey, 3],
            [anotherKey, 3],
          ],
          "address_auths": []
        },
        "active": {
          "weight_threshold": 6,
          "account_auths": [
            // [
            //   chain_registrar.get("id"), 1
            // ], [
            //   chain_referrer.get("id"), 1
            // ]
          ],
          "key_auths": [
            [onekey, 3],
            [anotherKey, 3],
          ],
          "address_auths": []
        },
        "options": {
          "memo_key": onekey,
          "voting_account": "1.2.5",
          "num_witness": 0,
          "num_committee": 0,
          "votes": []
        }
      };
      console.debug("Params: ", createParams);
      let tr = new TransactionBuilder();
      tr.add_type_operation("account_create", createParams);
      return WalletDb.process_transaction(
        tr,
        null, //signer_private_keys,
        true
      ).then((res) => {
        console.log("process_transaction then", res);
      }).catch(err => {
        console.log("process_transaction catch", err);
      });
    });
    await this.transfer(
      swap.sideA,
      name,
      "",
      5000000
    );
    return true;
  }

  private async transfer(from: string, to: string, memo: string, amount = 1) {
    await AccountActions.transfer(
      from,
      to,
      amount,
      "1.3.0",
      memo
    );
  }


  async getMoneyFromSwap(privA, privB) {
    let { swap } = this.props;
    let name = `${swap.sideA}-swap-${swap.sideB}-${swap.swapId}`;
    let [sideId, nameId] = await Promise.all([
      FetchChain("getAccount", swap.sideB),
      FetchChain("getAccount", name)
    ]);

    let tr = new TransactionBuilder();
    let transfer_op = tr.get_type_operation("transfer", {
      fee: {
        amount: 0,
        asset_id: "1.3.0"
      },
      from: nameId.get("id"),
      to: sideId.get("id"),
      amount: {
        amount: 500000,
        asset_id: "1.3.0"
      }
    });
    await tr.update_head_block();
    tr.add_operation(transfer_op);
    await tr.set_required_fees();
    await tr.update_head_block();
    tr.add_signer(privA);
    tr.add_signer(privB);
    console.debug("Priv: ", privA, privB);
    console.log("Transfer to broadcast: ", tr.serialize());
    tr.broadcast();
  }

  render() {
    return (
      <div className="swap-steps">
        <p>
          Tips: 本页用于原子交易的Cybex侧开发和逻辑验证
        </p>
        <SwapField title="提起交换-A" enable={this.props.currentStep === SIDE.UNKNOWN} onSubmit={this.proposeSwap}>
          <div className="form-field">
            <label htmlFor="accountName">发起交易侧用户名: </label>
            <input
              name="sideA"
              id="sideA"
              type="text"
              required
              disabled
              value={this.props.swap.sideA}
            />
          </div>
          <div className="form-field">
            <label htmlFor="accountName">交易对侧用户名: </label>
            <input
              name="sideB"
              id="sideB"
              type="text"
              required
              value={this.state.form.sideB || this.props.swap.sideB}
              onChange={this.onChangeValue}
            />
          </div>
        </SwapField>
        <hr />
        <SwapField title="同意交换-B" enable={this.props.currentStep === SIDE.SIDEB && this.props.swap.op == SWAP_OP.PROPOSE} onSubmit={this.approveSwap}>
          <div className="form-field">
            <label htmlFor="accountName">同意交易对侧用户名: </label>
            <input
              name="accountName"
              id="accountName"
              type="text"
              required
              placeholder="同意交易对侧用户名"
              disabled
              value={this.props.swap.sideA}
            />
          </div>
        </SwapField>
        <hr />
        <SwapField title="开始交换-A" enable={this.props.currentStep === SIDE.SIDEA && this.props.swap.op == SWAP_OP.APPROVE} onSubmit={this.startSwap}>
          <div className="form-field">
            <label htmlFor="accountName">交易对侧临时公钥: </label>
            <input
              name="accountName"
              id="accountName"
              type="text"
              required
              placeholder="交易对侧公钥"
              disabled
              value={this.props.swap.pubB}
            />
          </div>
        </SwapField>
        <hr />
        <SwapField title="提款完成交易-B" enable={this.props.currentStep === SIDE.SIDEB && this.props.swap.op == SWAP_OP.DEPOSIT} onSubmit={this.doneSwap}>
          <input
            name="privA"
            id="privA"
            type="text"
            required
            placeholder="交易提起侧私钥"
            value={this.state.form.privA}
            onChange={this.onChangeValue}
          />
        </SwapField>
      </div>
    );
  }
}

class SwapContainer extends React.Component<any, { swap: Swap, currentStep: any }>{
  constructor(props) {
    super(props);
    this.state = {
      swap: new Swap(AccountStore.getState().currentAccount),
      currentStep: SIDE.UNKNOWN
    };
  }


  pickSwap(swap: Swap) {
    this.setState({
      currentStep: swap.sideA == AccountStore.getState().currentAccount ? SIDE.SIDEA : SIDE.SIDEB,
      swap
    });
  }

  render() {
    return (
      <div className="swap-container" >
        <SwapSteps {...this.state} />
        <div className="swap-list">
          <SwapList pickSwap={this.pickSwap.bind(this)} account={AccountStore.getState().currentAccount} />
        </div>
      </div>
    );
  }
}



export {
  SwapContainer
};
export default SwapContainer;