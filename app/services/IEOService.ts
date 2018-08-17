import { IEO_API as API_URL } from "./../api/apiConfig";
// export const API_URL = __DEV__
//   ? "https://ieo-apitest.cybex.io/api/cybex/"
//   : __TEST__
//     ? "https://ieo-apitest.cybex.io/api/cybex/"
//     : "//eto.cybex.io/api/cybex/";

export const PERSONAL_TRADE = `${API_URL}/cybex/trade/list?cybex_name=alec-2216&page=1&limit=1`;
export const getTradeUrl = account =>
  `${API_URL}/cybex/trade/list?cybex_name=${account}&page=1&limit=1000`;

export const getProjects = () => {};
