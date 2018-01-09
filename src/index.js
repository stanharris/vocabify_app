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
import { host } from "./config";
import "./index.css";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeWithDevTools());

store.subscribe(
  throttle(() => {
    const currentState = store.getState();
    saveState(currentState);

    const { auth, words } = currentState;
    if (auth.isSignedIn) {
      const { email } = auth.userProfile;
      const browserWords = {
        email,
        words
      };
      fetch(`${host}/api/v1/sync`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(browserWords)
      });
    }
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
