import { Link } from "react-router";
import React from "react";
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