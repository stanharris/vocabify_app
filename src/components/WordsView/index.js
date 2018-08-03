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
import orderBy from 'lodash/orderBy';

import WordCard from '../WordCard';
import WordInput from '../WordInput';
import Word from '../../types';
import styles from './styles.module.css';

type Props = {
  words: Array<Word>
};

class WordsView extends Component<Props> {
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
    return <div className={styles.wordListContainer}>{wordsList}</div>;
  };

  render() {
    const { words } = this.props;
    const loadingText = <p className={styles.wordsStatus}>Loading...</p>;
    const emptyText = <p className={styles.wordsStatus}>No words added</p>;
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
  firestoreConnect(props => [`users/${props.uid}/words`]),
  connect((state, props) => {
    const words = getVal(state, `firestore/ordered/users/0/words`);
    const sortedWords = orderBy(words, ['dateAdded'], ['desc']);
    return {
      words: sortedWords
    };
  })
)(WordsView);
