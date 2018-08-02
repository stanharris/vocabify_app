// @flow
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firestoreConnect,
  isLoaded,
  isEmpty,
  getVal
} from 'react-redux-firebase';

import WordCard from '../WordCard';
import WordInput from '../WordInput';
import Word from '../../types';
import './styles.css';

class WordsView extends Component<{}> {
  renderWordsList = words => {
    const wordsList = words.map(item => {
      const { word, definitionList, id } = item;
      return (
        <WordCard
          key={id}
          firebaseId={id}
          word={word}
          definitionList={definitionList}
        />
      );
    });
    return <div className="word-list-container">{wordsList}</div>;
  };

  render() {
    const { words } = this.props;
    const loadingText = <p className="words-status">Loading...</p>;
    const emptyText = <p className="words-status">No words added</p>;
    return (
      <div>
        <WordInput />
        {!isLoaded(words)
          ? loadingText
          : isEmpty(words)
            ? emptyText
            : this.renderWordsList(words)}
      </div>
    );
  }
}

export default compose(
  // firestoreConnect(props => [
  //   {
  //     collection: 'users',
  //     doc: props.uid,
  //     queryParams: ['orderByKey']
  //   }
  // ]),
  firestoreConnect(props => [`users/${props.uid}/words`]),
  connect((state, props) => ({
    words: getVal(state, `firestore/ordered/users/0/words`)
  }))
)(WordsView);
