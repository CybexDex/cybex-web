import alt from "alt-instance";
import { string } from "prop-types";
import ReconnectingWebSocket from "reconnecting-websocket";

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
    ws?: ReconnectingWebSocket;
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
  }
  removeMarketListener(marketPair: string, channels = ["ticker", "depth"]) {
    channels.forEach(channel => {
      marketPair in this.subCounter[channel] &&
      this.subCounter[channel][marketPair] > 0
        ? (this.subCounter[channel][marketPair] -= 1)
        : console.error("Remove Market Listener Error: ", marketPair, channel);
    });
    this.updateWs();
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
    this.subscription.ws = new ReconnectingWebSocket(
      `ws://210.3.74.58:18888/streams?stream=${channelStr}`
      // `wss://mdp.cybex.io/streams?stream=${channelStr}`
    );
    this.subscription.ws.onmessage = this.onMarketMsg;
  }

  onMarketMsg(msg: MessageEvent) {
    let { type: channel, sym: market, ...data } = JSON.parse(`{"sym":"JADE.ETHJADE.USDT","type":"depth","bids":[["210.9569102705349300","0.0013930000000000"],["210.3841544607190600","0.0014090000000000"],["210.3346783764538400","0.0042130000000000"],["210.3303274139845000","0.0072080000000000"],["210.2966343411294800","0.0052590000000000"],["210.2755004766444200","0.0052450000000000"],["210.2461227242076800","0.0000870000000000"],["210.2266719015835600","0.0076410000000000"],["210.2213671344499600","0.0022090000000000"],["210.1851083448593700","0.0043380000000000"],["210.1733716475095500","0.0031320000000000"],["210.1587618572141600","0.0020030000000000"],["210.1474249450817500","0.0040970000000000"],["210.1366511318242400","0.0060080000000000"],["210.1222515391380600","0.0034110000000000"],["210.1174154025671000","0.0068560000000000"],["210.1034649866731500","0.0082540000000000"],["210.0056399132321000","0.0069150000000000"],["209.9832730560578400","0.0044240000000000"],["209.9326177698271000","0.0016770000000000"],["209.9183855171390300","0.0067390000000000"],["209.8276685651295300","0.0054430000000000"],["209.7782072060840300","0.0080210000000000"],["209.7265151515151700","0.0013200000000000"],["209.6953344575604500","0.0017790000000000"],["209.6633986928104600","0.0018360000000000"],["209.6501766784452300","0.0011320000000000"],["209.6353194544149400","0.0027860000000000"],["209.6273139403098000","0.0052940000000000"],["209.5959581059153200","0.0067790000000000"]],"asks":[["211.2424242424242500","0.0005860000000000"],["211.2937738549618400","0.0083840000000000"],["211.3312379110251700","0.0020680000000000"],["211.4438502673796700","0.0039270000000000"],["211.4794372294372200","0.0064680000000000"],["211.4992840778923600","0.0069840000000000"],["211.5706267539756600","0.0074830000000000"],["211.5996325030624800","0.0048980000000000"],["211.6248191027496500","0.0055280000000000"],["211.6517482517482700","0.0071500000000000"],["211.7350993377483500","0.0073990000000000"],["211.8210820151535400","0.0075230000000000"],["211.8230822391154000","0.0014470000000000"],["211.8685559240277600","0.0033170000000000"],["212.0855000000000000","0.0040000000000000"],["212.0960812086874500","0.0042360000000000"],["212.1214719542693700","0.0027990000000000"],["212.1912329724065700","0.0057260000000000"],["499.0000000000000600","0.1000000000000000"],["500.0000000000000000","0.3680090000000000"]],"time":"2018-11-14T03:48:07.411836Z"}`);
    // let { type: channel, sym: market, ...data } = JSON.parse(msg.data);
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
