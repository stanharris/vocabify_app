import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import addDays from 'date-fns/add_days';

import './styles.css';

const initialState = {
  wordValue: '',
  disableAddWordButton: true,
  error: false,
  errorMessage: '',
  isDuplicate: false
};

const defaultReviewInterval = 3;

class WordInput extends Component {
  state = initialState;

  onWordInputChange = event => {
    const { value: wordValue } = event.target;
    this.setState({
      wordValue
    });
    if (wordValue) {
      this.setState({
        disableAddWordButton: false
      });
    } else {
      this.setState({
        disableAddWordButton: true
      });
    }
    this.duplicateCheck(wordValue);
  };

  duplicateCheck = async word => {
    // const { wordsList } = await storage.get();
    // if (wordsList.includes(word)) {
    //   this.setState({
    //     error: true,
    //     errorMessage: "Duplicate word",
    //     isDuplicate: true
    //   });
    // } else {
    //   this.setState({
    //     error: false,
    //     errorMessage: "",
    //     isDuplicate: false
    //   });
    // }
  };

  handleAddWord = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const { wordValue: word } = this.state;
        const db = firebase.firestore();
        // TODO
        // Should use transaction/batch write to save to words/ and wordsList/
        db
          .collection('users')
          .doc(uid)
          .collection('words')
          .add({
            word,
            fetchDefinition: true,
            reviewDate: addDays(new Date(), defaultReviewInterval),
            reviewInterval: defaultReviewInterval
          });
        this.setState({
          wordValue: '',
          disableAddWordButton: true
        }).catch(error => {
          // TODO - Display error message (Toast?)
        });
      } else {
        // TODO - handle case of non-signed in users
      }
    });
  };

  onAddWordClick = () => {
    this.handleAddWord();
  };

  handleKey = event => {
    const { isDuplicate } = this.state;
    if (event.key === 'Enter' && !isDuplicate) {
      this.handleAddWord();
    }
  };

  render() {
    const {
      wordValue,
      disableAddWordButton,
      error,
      errorMessage,
      isDuplicate
    } = this.state;
    const errorElement = <p className="error-message">{errorMessage}</p>;
    return (
      <div className="word-input-container">
        <input
          placeholder="Add word..."
          type="text"
          pattern="/^[a-zA-Z0-9]*$/"
          value={wordValue}
          onChange={this.onWordInputChange}
          onKeyPress={this.handleKey}
        />
        <button
          className="add-word-button"
          disabled={disableAddWordButton || isDuplicate}
          onClick={this.onAddWordClick}
        >
          Add word
        </button>
        {error && errorElement}
      </div>
    );
  }
}

export default WordInput;
