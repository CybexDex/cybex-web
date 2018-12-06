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
import DepositModalWrapper from "./DepositModal";
import WithdrawModalWrapper from "./WithdrawModal";

const DEPOSIT_MODAL_ID = "GAME_MODAL_DEPOSIT";
const WITHDRAW_MODAL_ID = "GAME_MODAL_WITHDRAW";

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
    class GameCenter extends React.Component<
      { account; depositModal?; withdrawModal? },
      {}
    > {
      static propTypes = {
        account: ChainTypes.ChainAccount.isRequired
      };

      openModal = (modalType: ModalType) => () => {
        console.debug("GameCenter: ", "OpenModal", modalType);
        switch (modalType) {
          case ModalType.Deposit:
            GameActions.showDepositModal(DEPOSIT_MODAL_ID);
            break;
          case ModalType.Withdraw:
            GameActions.showWithdrawModal(WITHDRAW_MODAL_ID);

          default:
            break;
        }
      };

      openUrl = async () => {
        if (WalletDb.isLocked()) {
          await WalletUnlockActions.unlock();
        }
        GameActions.updateGameUrl(this.props.account);
      };

      render() {
        let { depositModal, account, withdrawModal } = this.props;
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
            <GameChip
              title={counterpart.translate("game.withdraw_title")}
              content={counterpart.translate("game.withdraw_content", {
                ceil: 1000,
                asset: "USDT",
                delay: 24
              })}
              buttonLabel={counterpart.translate("game.withdraw_btn")}
              onButtonClick={this.openModal(ModalType.Withdraw)}
            />
            <button onClick={this.openUrl}>URL</button>
            {depositModal && (
              <DepositModalWrapper
                account={account}
                modalId={DEPOSIT_MODAL_ID}
              />
            )}
            {withdrawModal && (
              <WithdrawModalWrapper
                account={account}
                modalId={WITHDRAW_MODAL_ID}
              />
            )}
          </>
        );
      }
    }
  ),
  {
    listenTo() {
      return [AccountStore, GameStore];
    },
    getProps(props) {
      console.debug("GameCenter: ", props, GameStore.getState());

      return {
        account: AccountStore.getState().currentAccount,
        depositModal: GameStore.getState().modals.has(DEPOSIT_MODAL_ID),
        withdrawModal: GameStore.getState().modals.has(WITHDRAW_MODAL_ID)
      };
    }
  }
);
console.debug("GameCenterInstance: ", GameCenter);
export default GameCenter;
