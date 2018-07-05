import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import WordCard from '../WordCard';
import WordInput from '../WordInput';
import './styles.css';

class WordsView extends Component {
  state = {
    words: [],
    listLength: 10
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        this.initWords(uid);
      } else {
        // TODO - handle case of non-signed in users
        // Unsubscribe listener?
      }
    });
  }

  initWords = uid => {
    const db = firebase.firestore();
    db
      .collection('users')
      .doc(uid)
      .collection('words')
      .onSnapshot(snapshot => {
        // Runs whenever words collection changes
        const { docs } = snapshot;
        const words = docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.setState({ words });
      });
  };

  updateWords = async () => {
    // const { listLength } = this.state;
    // const { wordsData } = await storage.get();
    // const wordsDataLength = wordsData.length;
    // wordsData.length = listLength;
    // this.setState({
    //   wordsData,
    //   wordsDataLength
    // });
  };

  handleMoreClick = () => {
    const { listLength } = this.state;
    this.setState(
      {
        listLength: listLength + 10
      },
      this.updateWords
    );
  };

  renderWordsList = () => {
    const { words } = this.state;
    if (words && words.length) {
      const wordsList = words.map(item => {
        const { word, fetchDefinition, dictionaryData, id } = item;
        return (
          <WordCard
            key={id}
            firebaseId={id}
            word={word}
            fetchDefinition={fetchDefinition}
            dictionaryData={dictionaryData}
          />
        );
      });
      return (
        <div>
          <h2 className="recently-added-title">Recently added</h2>
          <div className="word-list-container">{wordsList}</div>
        </div>
      );
    }
    return null;
  };

  renderShowMoreButton = () => {
    const { listLength, wordsDataLength } = this.state;
    if (listLength < wordsDataLength) {
      return (
        <button className="show-more-button" onClick={this.handleMoreClick}>
          Show more
        </button>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <WordInput />
        {this.renderWordsList()}
        {this.renderShowMoreButton()}
      </div>
    );
  }
}

export default WordsView;
