// @flow
import React, { Component } from 'react';
import isPast from 'date-fns/is_past';
import isNull from 'lodash/isNull';
import firebase from 'firebase';
import 'firebase/firestore';

import ReviewCard from '../../components/ReviewCard';
import CompletedReview from '../../components/CompletedReview';
import './styles.css';

class ReviewView extends Component<{}> {
  state = {
    words: []
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        this.initWords(uid);
      } else {
        // TODO - handle case of non-signed in users
        // TODO - Check all listeners to see if unsubscribe is required
      }
    });
  }

  initWords = (uid: string) => {
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

  render() {
    const { words } = this.state;
    const wordsPendingReview = words.filter(
      word => isPast(word.reviewDate) && !isNull(word.definitionList)
    );
    const canReviewWords = Boolean(wordsPendingReview.length);
    const currentWord = wordsPendingReview[0];
    return (
      <div className="review-view">
        {canReviewWords && (
          <ReviewCard key={currentWord.word} currentWord={currentWord} />
        )}
        {!canReviewWords && <CompletedReview />}
      </div>
    );
  }
}

export default ReviewView;
