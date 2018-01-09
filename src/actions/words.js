export const addWord = ({ wordValue, reviewDate, reviewInterval }) => ({
  type: "ADD_WORD",
  word: wordValue,
  reviewDate,
  reviewInterval
});

export const removeWord = word => ({
  type: "REMOVE_WORD",
  word
});

export const addDictionaryData = ({ word, dictionaryData }) => ({
  type: "ADD_DICTIONARY_DATA",
  word,
  dictionaryData
});

export const noDefinitionFound = word => ({
  type: "NO_DEFINITION_FOUND",
  word
});

export const updateReviewDate = ({ word, reviewDate, reviewInterval }) => ({
  type: "UPDATE_REVIEW_DATE",
  word,
  reviewDate,
  reviewInterval
});

export const syncWords = words => ({
  type: "SYNC_WORDS",
  words
});
