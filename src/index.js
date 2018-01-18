import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { storage } from "./constants";
import "./index.css";

const initialState = {
  wordsList: [],
  wordsData: []
};

storage.set(initialState);

ReactDOM.render(<App />, document.getElementById("root"));
