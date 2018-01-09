import { host } from "../config";

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

const requestSync = {
  type: "REQUEST_SYNC"
};

const receiveSyncedWords = words => ({
  type: "RECEIVE_SYNCED_WORDS",
  words
});

export const syncWords = browserWords => {
  return dispatch => {
    dispatch(requestSync);
    return fetch(`${host}/api/v1/sync`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(browserWords)
    })
      .then(response => response.json())
      .then(words => dispatch(receiveSyncedWords(words)))
      .catch(error => {
        // TODO
      });
  };
};
