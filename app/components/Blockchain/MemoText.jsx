import * as React from "react";
import * as PropTypes from "prop-types";
import PrivateKeyStore from "stores/PrivateKeyStore";
import WalletUnlockActions from "actions/WalletUnlockActions";
import counterpart from "counterpart";
import Icon from "../Icon/Icon";
import { connect } from "alt-react";
import WalletUnlockStore from "stores/WalletUnlockStore";
import utils from "common/utils";
import ReactTooltip from "react-tooltip";

class MemoText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full: false
    };
  }
  static defaultProps = {
    fullLength: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !utils.are_equal_shallow(nextProps.memo, this.props.memo) ||
      nextProps.wallet_locked !== this.props.wallet_locked ||
      this.state.full !== nextState.full
    );
  }

  _toggleLock(e) {
    e.preventDefault();
    WalletUnlockActions.unlock().then(() => {
      console.log("unlocked");
      ReactTooltip.rebuild();
    });
  }

  _toggleFullText = () => {
    this.setState(prev => ({
      full: !prev.full
    }));
  };

  render() {
    let { memo, fullLength } = this.props;
    if (!memo) {
      return null;
    }

    let { text, isMine } = PrivateKeyStore.decodeMemo(memo);

    if (!text && isMine) {
      return (
        <div className="memo">
          <span>{counterpart.translate("transfer.memo_unlock")} </span>
          <a href onClick={this._toggleLock.bind(this)}>
            <Icon name="locked" />
          </a>
        </div>
      );
    }

    let full_memo = text;
    if (text && !fullLength && !this.state.full && text.length > 35) {
      text = text.substr(0, 35) + "...";
    }

    if (text) {
      return (
        <div
          className="memo"
          onClick={this._toggleFullText}
          style={{ paddingTop: 5, cursor: "help" }}
        >
          <span
            className="inline-block"
            data-class="memo-tip"
            data-tip={full_memo !== text ? full_memo : null}
            data-place="bottom"
            data-offset="{'bottom': 10}"
            data-html
          >
            {text}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

class MemoTextStoreWrapper extends React.Component {
  render() {
    return <MemoText {...this.props} />;
  }
}

export default connect(
  MemoTextStoreWrapper,
  {
    listenTo() {
      return [WalletUnlockStore];
    },
    getProps() {
      return {
        wallet_locked: WalletUnlockStore.getState().locked
      };
    }
  }
);
