type AssetSymbol = string;
type Priority = number;
type Markets = {
  base_markets: AssetSymbol[];
  quote_markets: AssetSymbol[];
  special_markets: { [AssetSymbol: string]: Priority }; //{ "JADE.MT": { "JADE.ETH": 0, CYB: 1, "JADE.BTC": 2 } }
  /*
    {
      CYB: { "JADE.DPY": -1 },
      "JADE.ETH": { "JADE.DPY": -1 },
      // "JADE.BTC": { "JADE.GNX": -1 },
      // "JADE.EOS": { "JADE.GNX": -1 }
    };
  */
  fixed_markets: {
    [AssetSymbol: string]: {
      [AssetSymbol: string]: Priority;
    };
  };
};
