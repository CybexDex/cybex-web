import * as React from "react";
import * as PropTypes from "prop-types";
import Identicon from "./Identicon";

const insiders = require("assets/insiders.json");
import ModalActions from "actions/ModalActions";
import counterpart from "counterpart";

class AccountImage extends React.Component<any, any> {
  static defaultProps = {
    src: "",
    account: "",
    size: { height: 120, width: 120 },
    style: {}
  };
  static propTypes = {
    src: PropTypes.string,
    account: PropTypes.string,
    size: PropTypes.object.isRequired,
    style: PropTypes.object
  };
  showThanks = () => {
    let { account } = this.props;
    ModalActions.showModal("thanks_" + account);
  };
  render() {
    let { account, image, style } = this.props;
    let { height, width } = this.props.size;
    let custom_image = image ? (
      <img src={image} height={height + "px"} width={width + "px"} />
    ) : (
      <Identicon id={account} account={account} size={this.props.size} />
    );

    return (
      <div style={style} className="account-image">
        {custom_image}
        {account in insiders && (
          <span
            onClick={() => this.showThanks()}
            title={counterpart.translate("cybex.insider")}
            className="cybex-rainbow"
          />
        )}
      </div>
    );
  }
}

export default AccountImage;
