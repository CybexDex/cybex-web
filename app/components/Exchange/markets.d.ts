type AssetSymbol = string;
type Priority = number;
type Markets = {
  /* 
        [
          // Main Net
          "JADE.ETH",
          "JADE.BTC",
          "JADE.EOS",
          // "JADE.MT",
          "CYB"
        ]
  */
  base_markets: AssetSymbol[];
  /*
        [
          // Main Net
          "CYB",
          "JADE.MT",
          "JADE.ETH",
          "JADE.BTC",
          "JADE.EOS",
          "JADE.BAT",
          "JADE.VEN",
          "JADE.OMG",
          "JADE.SNT",
          "JADE.NAS",
          "JADE.KNC",
          "JADE.PAY",
          "JADE.GET",
          "JADE.MAD",
          "JADE.GNX",
          "JADE.KEY",
          "JADE.TCT",
          "JADE.DPY",
          // "JADE.LST",
          "JADE.ENG"
        ]
  */
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
