// @flow
import React, { Component } from 'react';
import addDays from 'date-fns/add_days';
import firebase from 'firebase/app';
import 'firebase/firestore';

import DefinitionList from '../DefinitionList';
import Word from '../../types';
import styles from './styles.module.css';

type Props = {
  currentWord: Word
};

type State = {
  showDefinition: boolean
};

class ReviewCard extends Component<Props, State> {
  state = {
    showDefinition: false
  };

  handleUpdateReviewDate = async (multiplier: number = 1) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { reviewInterval, id: wordId } = this.props.currentWord;

        const db = firebase.firestore();
        db.collection('users')
          .doc(uid)
          .collection('words')
          .doc(wordId)
          .set(
            {
              reviewInterval: reviewInterval * multiplier,
              reviewDate: addDays(Date.now(), reviewInterval * multiplier)
            },
            { merge: true }
          );
      }
    });
  };

  onCheckDefinitionClick = () => {
    this.setState({
      showDefinition: true
    });
  };

  onEasyButtonClick = () => {
    this.handleUpdateReviewDate(2);
  };

  onHardButtonClick = () => {
    this.handleUpdateReviewDate();
  };

  render() {
    // TODO - Break down into smaller components
    const { currentWord } = this.props;
    const { showDefinition } = this.state;
    const { word, definitionList, reviewInterval } = currentWord;
    return (
      <div className={styles.reviewCard}>
        {!showDefinition && (
          <div className={styles.reviewIntro}>
            <h3>{word}</h3>
            <p className={styles.reminder}>
              (Try to remember the definition before checking)
            </p>
            <button
              onClick={this.onCheckDefinitionClick}
              className={styles.checkDefinition}
            >
              Check definition
            </button>
          </div>
        )}
        {showDefinition && (
          <div className={styles.viewDefinition}>
            <h3>{word}</h3>
            <DefinitionList definitionList={definitionList} />
            <p className={styles.difficulty}>
              How difficult did you find this definition?
            </p>
            <div className={styles.actionButtons}>
              <div className={`${styles.buttonContainer} ${styles.easy}`}>
                <button onClick={this.onEasyButtonClick}>Easy</button>
                <span className={styles.interval}>
                  (Review in {reviewInterval * 2} days)
                </span>
              </div>
              <div className={`${styles.buttonContainer} ${styles.hard}`}>
                <button onClick={this.onHardButtonClick}>Hard</button>
                <span className={styles.interval}>
                  (Review in {reviewInterval} days)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ReviewCard;
