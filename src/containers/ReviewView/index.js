import React, { Component } from "react";
import { connect } from "react-redux";
import isPast from "date-fns/is_past";

import ReviewCard from "../../components/ReviewCard";
import NoWordsPendingReview from "../../components/NoWordsPendingReview";
import "./styles.css";

class ReviewView extends Component {
  render() {
    const { wordsData } = this.props;
    const wordsPendingReview = wordsData.filter(word =>
      isPast(word.reviewDate)
    );
    const currentWord = wordsPendingReview[0];
    return (
      <div className="review-view">
        <h1>Review</h1>
        {wordsPendingReview.length && <ReviewCard currentWord={currentWord} />}
        {!wordsPendingReview.length && <NoWordsPendingReview />}
      </div>
    );
  }
}

export default connect(state => ({
  wordsData: state.words.wordsData
}))(ReviewView);
