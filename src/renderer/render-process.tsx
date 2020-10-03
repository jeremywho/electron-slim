import * as DOM from "react-dom";
import * as React from "react";
import App from "./components/App";

DOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
