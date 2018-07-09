// @flow
import React, { Component } from 'react';
import addDays from 'date-fns/add_days';
import firebase from 'firebase/app';
import 'firebase/firestore';

import DefinitionList from '../DefinitionList';
import Word from '../../types';
import './styles.css';

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
        db
          .collection('users')
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
    const { currentWord } = this.props;
    const { showDefinition } = this.state;
    const { word, definitionList, reviewInterval } = currentWord;
    return (
      <div className="review-card">
        {!showDefinition && (
          <div className="review-intro">
            <h3>{word}</h3>
            <p className="reminder">
              (Try to remember the definition before checking)
            </p>
            <button
              onClick={this.onCheckDefinitionClick}
              className="check-definition"
            >
              Check definition
            </button>
          </div>
        )}
        {showDefinition && (
          <div className="view-definition">
            <h3>{word}</h3>
            <DefinitionList definitionList={definitionList} />
            <p className="difficulty">
              How difficult did you find this definition?
            </p>
            <div className="difficulty-action-buttons">
              <div className="button-container easy">
                <button onClick={this.onEasyButtonClick}>Easy</button>
                <span className="interval">
                  (Review in {reviewInterval * 2} days)
                </span>
              </div>
              <div className="button-container hard">
                <button onClick={this.onHardButtonClick}>Hard</button>
                <span className="interval">
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
