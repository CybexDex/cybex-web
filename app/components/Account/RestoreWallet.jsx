import { Link } from "react-router-dom";
import * as React from "react"; import * as PropTypes from "prop-types"; 
import Translate from "react-translate-component";

const RestoreWallet = (props) => (
  <div style={{"paddingTop": "1em"}}>
    <label>
      <Link to="/existing-account">
        <Translate content="wallet.restore" />
      </Link>
    </label>

    <label>
      <Link to="/create-wallet-brainkey">
        <Translate content="settings.backup_brainkey" />
      </Link>
    </label>
  </div>
);

export default RestoreWallet;