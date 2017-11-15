const initialState = {
  wordsList: [],
  wordsData: []
};

const words = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WORD":
      return {
        ...state,
        wordsList: [...state.wordsList, action.word],
        wordsData: [
          ...state.wordsData,
          { word: action.word, fetchDefinition: true }
        ]
      };
    case "REMOVE_WORD": {
      const filteredWordsData = state.wordsData.filter(
        item => item.word !== action.word
      );
      return {
        ...state,
        wordsList: state.wordsList.filter(word => word !== action.word),
        wordsData: filteredWordsData
      };
    }
    case "ADD_DICTIONARY_DATA": {
      const wordsData = state.wordsData.map(item => {
        if (item.word === action.word) {
          item.dictionaryData = action.dictionaryData;
          item.fetchDefinition = false;
        }
        return item;
      });
      return {
        ...state,
        wordsData
      };
    }
    case "NO_DEFINITION_FOUND": {
      const wordsData = state.wordsData.map(item => {
        if (item.word === action.word) {
          item.fetchDefinition = false;
        }
        return item;
      });
      return {
        ...state,
        wordsData
      };
    }
    default:
      return state;
  }
};

export default words;
