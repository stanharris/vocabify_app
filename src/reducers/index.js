import { combineReducers } from "redux";

import words from "./words";
import view from "./view";

const rootReducer = combineReducers({
  words,
  view
});

export default rootReducer;
