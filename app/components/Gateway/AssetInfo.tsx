import * as React from "react";
import { AssetIcon } from "./AssetIcon";
import Translate from "react-translate-component";
import { GatewayAsset } from "services/GatewayConfig";

export let AssetInfo = class extends React.PureComponent<{
  gatewayAsset: GatewayAsset;
}> {
  render() {
    let { gatewayAsset } = this.props;
    return (
      <div className="gateway-info flex-wrapper">
        <div className="asset-section flex-wrapper-main">
          <ul className="gateway-info-asset no-margin">
            {gatewayAsset.options.name && (
              <li>
                <Translate
                  content={"gateway.project_name"}
                  className="with-colon"
                />
                <strong>{gatewayAsset.options.name}</strong>
              </li>
            )}
            {gatewayAsset.options.contractAddress && (
              <li>
                <Translate
                  content={"gateway.contract_address"}
                  className="with-colon"
                />
                <a
                  href={gatewayAsset.contractExplorer}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{gatewayAsset.options.contractAddress}</strong>
                </a>
              </li>
            )}
          </ul>
          <hr />
          {this.props.children}
        </div>
        <AssetIcon symbol={gatewayAsset.type} />
      </div>
    );
  }
};
