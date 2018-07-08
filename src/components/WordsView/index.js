// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import WordCard from '../WordCard';
import WordInput from '../WordInput';
import './styles.css';

type State = {
  isFetchingWords: boolean
};

class WordsView extends Component<{}, State> {
  state = {
    isFetchingWords: true,
    words: []
  };

  componentDidMount() {
    this.initWords();
  }

  initWords = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const db = firebase.firestore();
        db
          .collection('users')
          .doc(uid)
          .collection('words')
          .orderBy('dateAdded', 'desc')
          .onSnapshot(snapshot => {
            // Runs whenever words collection changes
            const { docs } = snapshot;
            const words = docs.map(doc => ({ ...doc.data(), id: doc.id }));
            this.setState({ words, isFetchingWords: false });
          });
      } else {
        this.setState({
          words: [],
          isFetchingWords: false
        });
        // Unsubscribe listener?
      }
    });
  };

  renderWordsList = () => {
    const { words } = this.state;
    if (words && words.length) {
      const wordsList = words.map(item => {
        const { word, fetchDefinition, definitionList, id } = item;
        return (
          <WordCard
            key={id}
            firebaseId={id}
            word={word}
            fetchDefinition={fetchDefinition}
            definitionList={definitionList}
          />
        );
      });
      return <div className="word-list-container">{wordsList}</div>;
    }
    return <p className="words-status">No words added</p>;
  };

  render() {
    const { isFetchingWords } = this.state;
    return (
      <div>
        <WordInput />
        {isFetchingWords && <p className="words-status">Loading...</p>}
        {!isFetchingWords && this.renderWordsList()}
      </div>
    );
  }
}

export default WordsView;
