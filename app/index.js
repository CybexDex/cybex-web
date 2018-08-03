import * as React from "react";
import ReactDOM from "react-dom";
import AppInit from "./AppInit";

if (__PERFORMANCE_DEVTOOL__) {
  console.debug("DEVTOOL", "PERFORMANCE");
  const { registerObserver } = require("react-perf-devtool");
  registerObserver();
} else {
  console.debug = () => null;

}

(function initApp() {
  const rootEl = document.getElementById("content");
  const render = () => {
    ReactDOM.render(<AppInit />, rootEl);
  };
  render();
})();

// (function initGtag() {
//   let innerHTML = `<!-- Google Analytics tracking code -->
//   <!-- Global site tag (gtag.js) - Google Analytics -->
//   <script async src="https://www.googletagmanager.com/gtag/js?id=UA-121047450-1"></script>
//   <script>
//       window.dataLayer = window.dataLayer || [];
//       let gtag = window.gtag = function () { dataLayer.push(arguments); }
//       gtag("config", "UA-121047450-1", { app_name: "CybexDex", });
//       gtag("config", "UA-121082216-1", { app_name: "CybexDex", });
//       gtag("config", "UA-121050870-1", { app_name: "CybexDex", });
//       gtag('js', new Date());
//       if (history) {
//         history.listen(location => {
//           if (window.gtag) {
//             window.gtag("event", "page_view", {
//               page_path: location.pathname + location.search
//             });
//           }
//         });
//       }
//       console.debug("Gtag Init");
//   </script>
//   <!-- End Google Analytics tracking code -->`;
//   let gtagElem = document.createElement("div");
//   gtagElem.innerHTML = innerHTML;
//   document.body.appendChild(gtagElem);
// })();
