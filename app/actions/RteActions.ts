import alt from "alt-instance";
import { string } from "prop-types";

type SubCounter = {
  [channel: string]: {
    [market: string]: number;
  };
};

class RteActions {
  subCounter: SubCounter = {
    ticker: {},
    depth: {}
  };

  subscription: {
    channel: string;
    ws?: WebSocket;
  } = {
    channel: ""
  };

  addMarketListener(marketPair: string, channels = ["ticker", "depth"]) {
    channels.forEach(channel => {
      marketPair in this.subCounter[channel]
        ? (this.subCounter[channel][marketPair] += 1)
        : (this.subCounter[channel][marketPair] = 1);
    });
    this.updateWs();
    return this.subCounter;
  }
  removeMarketListener(marketPair: string, channels = ["ticker", "depth"]) {
    channels.forEach(channel => {
      marketPair in this.subCounter[channel] &&
      this.subCounter[channel][marketPair] > 0
        ? (this.subCounter[channel][marketPair] -= 1)
        : console.error("Remove Market Listener Error: ", marketPair, channel);
    });
    this.updateWs();
    return this.subCounter;
  }
  updateWs() {
    let latestChannelStr = Object.getOwnPropertyNames(this.subCounter)
      .map(channel =>
        Object.getOwnPropertyNames(this.subCounter[channel])
          .filter(market => !!this.subCounter[channel][market])
          .map(market => `${market}@${channel}`)
          .join("/")
      )
      .filter(channel => channel.length)
      .join("/");

    if (latestChannelStr !== this.subscription.channel && latestChannelStr) {
      this.subscription.ws ? this.subscription.ws.close() : null;
      this.setupWs(latestChannelStr);
    }
  }

  setupWs(channelStr: string) {
    this.subscription.channel = channelStr;
    this.subscription.ws = new WebSocket(
      `wss://mdp.cybex.io/streams?stream=${channelStr}`
    );
    this.subscription.ws.onmessage = this.onMarketMsg;
  }

  onMarketMsg(msg: MessageEvent) {
    let { type: channel, sym: market, ...data } = JSON.parse(msg.data);
    return {
      channel,
      market,
      data
    };
  }
}

const RteActionsWrapped: RteActions = alt.createActions(RteActions);

export { RteActionsWrapped as RteActions };
export default RteActionsWrapped;
