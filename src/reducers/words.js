const initialState = {
  wordsList: []
};

const words = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WORD":
      return {
        ...state,
        wordsList: [...state.wordsList, action.word]
      };
    default:
      return state;
  }
};

export default words;
