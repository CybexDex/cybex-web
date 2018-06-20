import * as React from "react";
import * as PropTypes from "prop-types";
import "create-react-class";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Router, browserHistory, hashHistory } from "react-router";
/*
* Routes-dev is only needed for react hot reload, as this does not work with
* the async routes defined in Routes.jsx. Any changes to the routes must be kept
* synchronized between the two files
*/
import routes from "./Routes";
console.debug = () => null;
require("./components/Utility/Prototypes"); // Adds a .equals method to Array for use in shouldComponentUpdate
/*
* Electron does not support browserHistory, so we need to use hashHistory.
* The same is true for servers without configuration options, such as Github Pages
*/
const history = browserHistory;

const rootEl = document.getElementById("content");
if (history) {
  history.listen(location => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search
      });
    }
  });
}
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={history} routes={routes} />
    </AppContainer>,
    rootEl
  );
};
render();
