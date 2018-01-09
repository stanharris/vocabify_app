const initialState = {
  wordsList: [],
  wordsData: []
};

const words = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WORD":
      return {
        ...state,
        wordsList: [action.word, ...state.wordsList],
        wordsData: [
          {
            word: action.word,
            fetchDefinition: true,
            reviewDate: action.reviewDate,
            reviewInterval: action.reviewInterval
          },
          ...state.wordsData
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
    case "UPDATE_REVIEW_DATE": {
      const wordsData = state.wordsData.map(item => {
        if (item.word === action.word) {
          item.reviewDate = action.reviewDate;
          item.reviewInterval = action.reviewInterval;
        }
        return item;
      });
      return {
        ...state,
        wordsData
      };
    }
    case "UPDATE_WORDS":
      return action.words;
    default:
      return state;
  }
};

export default words;
