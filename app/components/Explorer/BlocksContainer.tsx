import * as React from "react";
import * as PropTypes from "prop-types";
import BlockchainStore from "stores/BlockchainStore";
import AltContainer from "alt-container";
import Blocks from "./Blocks";

const BlocksContainer = () => (
  <AltContainer
    stores={[BlockchainStore]}
    inject={{
      latestBlocks: () => {
        return BlockchainStore.getState().latestBlocks;
      },
      latestTransactions: () => {
        return BlockchainStore.getState().latestTransactions;
      }
    }}
  >
    <Blocks />
  </AltContainer>
);
export { BlocksContainer };
export default BlocksContainer;
