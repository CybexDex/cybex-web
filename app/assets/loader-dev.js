require("file-loader?name=favicon.ico!./favicon.ico");
// require("common/dictionary.json");
require("file-loader?name=dictionary.json!common/dictionary_en.json");
require("babel-polyfill");
require("whatwg-fetch");
require("indexeddbshim");
require("./asset-symbols/symbols.js");
require("./language-dropdown/flags.js");
require("./images/images.js");

import locales from "assets/locales";
for (let locale of locales) {
  require(`file-loader?name=[name].[ext]!./locales/locale-${locale}.json`);
}
