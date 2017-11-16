import { WORDS } from "../constants/viewTypes";

const initialState = {
  activeView: WORDS
};

const view = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_VIEW": {
      return {
        ...state,
        activeView: action.activeView
      };
    }
    default:
      return state;
  }
};

export default view;
