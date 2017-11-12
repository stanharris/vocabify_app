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
    case "REMOVE_WORD":
      return {
        ...state,
        wordsList: state.wordsList.filter(word => word !== action.word)
      };
    default:
      return state;
  }
};

export default words;
