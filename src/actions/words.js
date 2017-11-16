export const addWord = ({ wordValue, reviewDate }) => ({
  type: "ADD_WORD",
  word: wordValue,
  reviewDate
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
