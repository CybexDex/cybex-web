import * as React from "react";
import * as PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router-dom";
import Translate from "react-translate-component";
import CardList from "components/Account/CardList";

import { Button, Icon } from "components/Common";
import { $styleFlexItem, $styleFlexContainer } from "components/Common/Styles";

const Options = [
  {
    content: "wallet.answer_right",
    isAnswer: true
  },
  {
    content: "wallet.answer_wrong_1"
  },
  {
    content: "wallet.answer_wrong_2"
  },
  {
    content: "wallet.answer_wrong_3"
  }
];

const messy = (ori: any[]) => {
  let arr = ori.slice(),
    res: any[] = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    let index = Math.floor(Math.random() * arr.length);
    res = res.concat(arr.splice(index, 1));
  }
  return res;
};

type NewWalletTipsProps = {
  className?: string;
  onKnownWallet: any;
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
      <div
        className={className + " wallet-tips"}
        style={{
          fontSize: "1.2rem",
          maxWidth: "56em",
          marginTop: "3em",
          padding: "1em"
        }}
      >
        <h2 style={$styleFlexContainer("row", "flex-start", "center")}>
          <Icon icon="info" style={{ marginRight: "0.8rem" }} />
          <Translate content="login.backup_your_wallet" />
        </h2>
        <div style={{ marginTop: "2em" }} />
        {/* {this.state.warning ? <Translate content="createTip.but" component="p" /> : <Translate content="createTip.may" component="p" />}
        <CardList onAllDone={onKnownWallet} onWarning={() => this.setState({ warning: true })} /> */}
        <Translate component="p" content="warningDetail.p1" />
        <Translate component="p" content="warningDetail.p2" />
        <Translate component="p" content="warningDetail.p3" />
        <div style={{ marginTop: "3em", textAlign: "right" }}>
          <Button onClick={onKnownWallet} type="primary">
            <Translate content="login.create_local" />{
              " > "
            }
          </Button>
        </div>
      </div>
    );
  }
};
export default NewWalletTips;
