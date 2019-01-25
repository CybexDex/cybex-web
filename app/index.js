import * as React from "react";
import ReactDOM from "react-dom";
import AppInit from "./AppInit";

if (__PERFORMANCE_DEVTOOL__) {
  console.debug("DEVTOOL", "PERFORMANCE");
  const { registerObserver } = require("react-perf-devtool");
  registerObserver();
} else {
  console.debug = () => null;
  // console.error = () => null;
}

(function initApp() {
  const rootEl = document.getElementById("content");
  const render = () => {
    ReactDOM.render(<AppInit />, rootEl);
  };
  render();
})();


// Patch for Resize
(function() {
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "optimizedResize");
})();
