import React, { Component } from "react";
import isPast from "date-fns/is_past";

import ReviewCard from "../../components/ReviewCard";
import NoWordsPendingReview from "../../components/NoWordsPendingReview";
import { storage } from "../../constants";
import "./styles.css";

class ReviewView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsData: []
    };
  }

  componentDidMount() {
    this.updateWords();
  }

  updateWords = async () => {
    const { wordsData } = await storage.get();
    this.setState({
      wordsData
    });
  };

  renderReviewCard = (wordsPendingReview, currentWord) => {
    if (!wordsPendingReview.length) {
      return null;
    }
    return <ReviewCard currentWord={currentWord} />;
  };

  render() {
    const { wordsData } = this.state;
    const wordsPendingReview = wordsData.filter(word =>
      isPast(word.reviewDate)
    );
    const currentWord = wordsPendingReview[0];
    return (
      <div className="review-view">
        {this.renderReviewCard(wordsPendingReview, currentWord)}
        {!wordsPendingReview.length && <NoWordsPendingReview />}
      </div>
    );
  }
}

export default ReviewView;
