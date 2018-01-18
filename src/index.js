import React from "react";
import ReactDOM from "react-dom";
import isUndefined from "lodash/isUndefined";

import App from "./App";
import { storage } from "./constants";
import "./index.css";

const initialState = {
  wordsList: [],
  wordsData: []
};

const initState = async () => {
  const { wordsList, wordsData } = await storage.get();
  if (isUndefined(wordsList) || isUndefined(wordsData)) {
    storage.set(initialState);
  }
};

initState();

ReactDOM.render(<App />, document.getElementById("root"));
