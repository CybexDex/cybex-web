import * as React from "react"; import * as PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router";
import Translate from "react-translate-component";
import CardList from "components/Account/CardList";


const Options = [
  {
    content: "wallet.answer_right",
    isAnswer: true
  }, {
    content: "wallet.answer_wrong_1",
  }, {
    content: "wallet.answer_wrong_2",
  }, {
    content: "wallet.answer_wrong_3",
  }
];

const messy = (ori: any[]) => {
  let arr = ori.slice(), res: any[] = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    let index = Math.floor(Math.random() * arr.length);
    res = res.concat(arr.splice(index, 1));
  }
  return res;
};


type NewWalletTipsProps = {
  className?: string
  onKnownWallet: any
};

const NewWalletTips = class extends React.Component<NewWalletTipsProps, any> {
  messyOptions = messy(Options);
  constructor(props: NewWalletTipsProps) {
    super(props);
    this.state = {
      answerRight: false,
      warning: false
    };
  }
  render() {
    let { className, onKnownWallet } = this.props;
    return (
      <div className={className + " wallet-tips"}>
        {this.state.warning ? <Translate content="createTip.but" component="p" /> : <Translate content="createTip.may" component="p" />}
        <CardList onAllDone={onKnownWallet} onWarning={() => this.setState({ warning: true })} />
      </div>
    )
  }
};
export default NewWalletTips;