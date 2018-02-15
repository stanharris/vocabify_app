import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
// import { storage } from "./constants";
import "./index.css";

// const initialState = {
//   wordsList: [],
//   wordsData: [],
//   showImportCard: true
// };

// const initApp = async () => {
//   const { wordsList, wordsData, showImportCard } = await storage.get();
//   if (
//     isUndefined(wordsList) ||
//     isUndefined(wordsData) ||
//     isUndefined(showImportCard)
//   ) {
//     storage.set(initialState);
//   }
// };

// initApp();

ReactDOM.render(<App />, document.getElementById("root"));
