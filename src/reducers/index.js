import { combineReducers } from "redux";

import auth from "./auth";
import words from "./words";
import view from "./view";

const rootReducer = combineReducers({
  auth,
  words,
  view
});

export default rootReducer;
