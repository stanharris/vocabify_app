import React, { Component } from "react";
import { connect } from "react-redux";
import isPast from "date-fns/is_past";

import ReviewCard from "../../components/ReviewCard";
import NoWordsPendingReview from "../../components/NoWordsPendingReview";
import "./styles.css";

class ReviewView extends Component {
  state = {
    wordsPendingReview: []
  };

  componentDidMount() {
    const { wordsData } = this.props;
    const wordsPendingReview = wordsData.filter(word =>
      isPast(word.reviewDate)
    );
    this.setState({
      wordsPendingReview,
      currentWord: wordsPendingReview[0]
    });
  }

  render() {
    const { wordsPendingReview, currentWord } = this.state;
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
