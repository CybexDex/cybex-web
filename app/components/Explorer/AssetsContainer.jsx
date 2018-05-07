import * as React from "react";
import * as PropTypes from "prop-types";
import AssetStore from "stores/AssetStore";
import SettingsStore from "stores/SettingsStore";
import AltContainer from "alt-container";
import Assets from "./Assets";

class AssetsContainer extends React.Component {
  render() {
    return (
      <AltContainer
        stores={[AssetStore, SettingsStore]}
        inject={{
          assets: () => {
            return AssetStore.getState().assets;
          },
          filterMPA: () => {
            return SettingsStore.getState().viewSettings.get("filterMPA");
          },
          filterUIA: () => {
            return SettingsStore.getState().viewSettings.get("filterUIA");
          }
        }}
      >
        <Assets />
      </AltContainer>
    );
  }
}

export default AssetsContainer;
