import * as React from "react";
import { Button } from "./../Common/Button";
import Radium from "radium";
import * as counterpart from "counterpart";
import BindToChainState from "../Utility/BindToChainState";

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

export const GameCenter = connect(
  class GameCenter extends React.Component<{}, {}> {
    openModal = (modalType: ModalType) => () => {
      console.debug("GameCenter: ", "OpenModal", modalType);
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
        </>
      );
    }
  },
  {
    listenTo() {
      return [AccountStore, GatewayStore];
    },
    getProps() {
      return {
        account: AccountStore.getState().currentAccount,
        depositModal: GatewayStore.getState().modals.get(DEPOSIT_MODAL_ID),
        withdrawModal: GatewayStore.getState().modals.get(WITHDRAW_MODAL_ID)
      };
    }
  }
);

export default GameCenter;
