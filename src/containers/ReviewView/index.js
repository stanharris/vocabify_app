import React, { Component } from "react";
import isPast from "date-fns/is_past";
import isNull from "lodash/isNull";

import ReviewCard from "../../components/ReviewCard";
import CompletedReview from "../../components/CompletedReview";
// import { storage, storageEvent } from "../../constants";
import "./styles.css";

class ReviewView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsData: []
    };
  }

  componentDidMount() {
    // this.updateWords();
    // storageEvent.onChanged.addListener(this.updateWords);
  }

  updateWords = async () => {
    // const { wordsData } = await storage.get();
    // this.setState({
    //   wordsData
    // });
  };

  renderReviewCard = (wordsPendingReview, currentWord) => {
    if (!wordsPendingReview.length) {
      return null;
    }
    const { word } = currentWord;
    return <ReviewCard key={word} currentWord={currentWord} />;
  };

  render() {
    const { wordsData } = this.state;
    const wordsPendingReview = wordsData.filter(
      word => isPast(word.reviewDate) && !isNull(word.dictionaryData)
    );
    const currentWord = wordsPendingReview[0];
    return (
      <div className="review-view">
        {this.renderReviewCard(wordsPendingReview, currentWord)}
        {!wordsPendingReview.length && <CompletedReview />}
      </div>
    );
  }
}

export default ReviewView;
