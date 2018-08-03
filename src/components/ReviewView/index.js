// @flow
import React, { Component } from 'react';
import isPast from 'date-fns/is_past';
import isNull from 'lodash/isNull';
import firebase from 'firebase/app';
import 'firebase/firestore';

import ReviewCard from '../ReviewCard';
import CompletedReview from '../CompletedReview';
import Word from '../../types';
import styles from './styles.module.css';

type State = {
  words: Array<Word>
};

class ReviewView extends Component<{}, State> {
  state = {
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
        db.collection('users')
          .doc(uid)
          .collection('words')
          .onSnapshot(snapshot => {
            // Runs whenever words collection changes
            const { docs } = snapshot;
            const words = docs.map(doc => ({ ...doc.data(), id: doc.id }));
            this.setState({ words });
          });
      } else {
        // TODO - handle case of non-signed in users
        // TODO - Check all listeners to see if unsubscribe is required
      }
    });
  };

  render() {
    const { words } = this.state;
    const wordsPendingReview = words.filter(
      word => isPast(word.reviewDate) && !isNull(word.definitionList)
    );
    const canReviewWords = Boolean(wordsPendingReview.length);
    const currentWord = wordsPendingReview[0];
    return (
      <div className={styles.reviewView}>
        {canReviewWords && (
          <ReviewCard key={currentWord.id} currentWord={currentWord} />
        )}
        {!canReviewWords && <CompletedReview />}
      </div>
    );
  }
}

export default ReviewView;
