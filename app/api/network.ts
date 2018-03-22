import { NetworkStore } from "stores/NetworkStore";

NetworkStore.listen(state => {
  console.debug("Listen OnChange: ", state);
});