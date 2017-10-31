export type HistoryDatum = {
  "id": string,
  "key": {
    "base": string,
    "quote": string,
    "seconds": number,
    "open": string
  },
  "high_base": number,
  "high_quote": number,
  "low_base": number,
  "low_quote": number,
  "open_base": number,
  "open_quote": number,
  "close_base": number,
  "close_quote": number,
  "base_volume": number,
  "quote_volume": number
};