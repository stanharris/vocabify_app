/* global browser */
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

const initialState = {
  wordsList: [],
  wordsData: []
};

browser.storage.local.set(initialState);

ReactDOM.render(<App />, document.getElementById("root"));
