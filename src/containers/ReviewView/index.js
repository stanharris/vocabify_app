import React, { Component } from "react";
import { connect } from "react-redux";
import isPast from "date-fns/is_past";

import ReviewCard from "../../components/ReviewCard";
import NoWordsPendingReview from "../../components/NoWordsPendingReview";
import "./styles.css";

class ReviewView extends Component {
  renderReviewCard = (wordsPendingReview, currentWord) => {
    if (!wordsPendingReview.length) {
      return null;
    }
    return <ReviewCard currentWord={currentWord} />;
  };

  render() {
    const { wordsData } = this.props;
    const wordsPendingReview = wordsData.filter(word =>
      isPast(word.reviewDate)
    );
    const currentWord = wordsPendingReview[0];
    return (
      <div className="review-view">
        <h1>Review</h1>
        {this.renderReviewCard(wordsPendingReview, currentWord)}
        {!wordsPendingReview.length && <NoWordsPendingReview />}
      </div>
    );
  }
}

export default connect(state => ({
  wordsData: state.words.wordsData
}))(ReviewView);
