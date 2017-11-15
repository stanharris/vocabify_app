import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import throttle from "lodash/throttle";

import App from "./App";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import { loadState, saveState } from "./localStorage";
import "./index.css";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeWithDevTools());

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }),
  1000
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
