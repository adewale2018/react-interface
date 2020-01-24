import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "jquery/dist/jquery.min.js";
import "@popperjs/core/dist/umd/popper";
import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
