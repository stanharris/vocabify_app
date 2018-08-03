import React, { Component } from 'react';
import firebase from 'firebase/app';
import addDays from 'date-fns/add_days';

import styles from './styles.module.css';

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

  componentDidMount() {
    this.initWords();
  }

  initWords = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const db = firebase.firestore();
        db.collection('users')
          .doc(uid)
          .collection('words')
          .onSnapshot(snapshot => {
            // Runs whenever words collection changes
            const { docs } = snapshot;
            const words = docs.map(doc => doc.data().word);
            this.setState({ words });
          });
      } else {
        // TODO - handle case of non-signed in users
        // Unsubscribe listener?
      }
    });
  };

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
    const { words } = this.state;
    if (!words.length) return null;
    if (words.includes(word)) {
      this.setState({
        error: true,
        errorMessage: 'Duplicate word',
        isDuplicate: true
      });
    } else {
      this.setState({
        error: false,
        errorMessage: '',
        isDuplicate: false
      });
    }
  };

  handleAddWord = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const { wordValue: word } = this.state;
        const db = firebase.firestore();
        db.collection('users')
          .doc(uid)
          .collection('words')
          .add({
            word,
            reviewDate: addDays(new Date(), defaultReviewInterval),
            reviewInterval: defaultReviewInterval,
            dateAdded: new Date(),
            definitionList: null
          });
        this.setState({
          wordValue: '',
          disableAddWordButton: true
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
    const errorElement = <p className={styles.errorMessage}>{errorMessage}</p>;
    return (
      <div className={styles.wordInputContainer}>
        <input
          placeholder="Add word..."
          type="text"
          pattern="/^[a-zA-Z0-9]*$/"
          value={wordValue}
          onChange={this.onWordInputChange}
          onKeyPress={this.handleKey}
        />
        <button
          className={styles.addWordButton}
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
