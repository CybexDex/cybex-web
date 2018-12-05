import * as React from "react";
import { Button } from "./../Common/Button";
import Radium from "radium";
import * as counterpart from "counterpart";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";
import GameStore from "./GameStore";
import WalletDb from "stores/WalletDb";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { GameActions } from "./GameActions";
import BindToChainState from "components/Utility/BindToChainState";
import ChainTypes from "components/Utility/ChainTypes";

const GameChip = Radium(({ title, content, buttonLabel, onButtonClick }) => (
  <div>
    <span>{title}</span>
    <span>{content}</span>
    <Button type="primary" onClick={onButtonClick}>
      {buttonLabel}
    </Button>
  </div>
));

enum ModalType {
  Deposit,
  Withdraw
}

let GameCenter = connect(
  BindToChainState(
    class GameCenter extends React.Component<{ account }, {}> {
      static propTypes = {
        account: ChainTypes.ChainAccount.isRequired
      };

      openModal = (modalType: ModalType) => () => {
        console.debug("GameCenter: ", "OpenModal", modalType);
      };

      openUrl = async () => {
        if (WalletDb.isLocked()) {
          await WalletUnlockActions.unlock();
        }
        GameActions.updateGameUrl(this.props.account);
      };

      render() {
        return (
          <>
            <h1>Game Center</h1>
            <GameChip
              title={counterpart.translate("game.deposit_title")}
              content={counterpart.translate("game.deposit_content", {
                price: 1,
                amount: 1000,
                asset: "USDT"
              })}
              buttonLabel={counterpart.translate("game.deposit_btn")}
              onButtonClick={this.openModal(ModalType.Deposit)}
            />
            <button onClick={this.openUrl}>URL</button>
          </>
        );
      }
    }
  ), 
  {
    listenTo() {
      return [AccountStore, GameStore];
    },
    getProps() {
      console.debug("GameCenter: ", AccountStore.getState().currentAccount);
      return {
        account: AccountStore.getState().currentAccount
      };
    }
  }
);
console.debug("GameCenterInstance: ", GameCenter);
export default GameCenter;
