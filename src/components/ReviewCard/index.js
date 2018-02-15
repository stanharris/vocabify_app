import React, { Component } from "react";
import addDays from "date-fns/add_days";

// import { storage } from "../../constants";
import DefinitionList from "../DefinitionList";
import "./styles.css";

class ReviewCard extends Component {
  state = {
    showDefinition: false
  };

  handleUpdateReviewDate = async (multiplier = 1) => {
    // const { currentWord } = this.props;
    // const { word, reviewInterval } = currentWord;
    // const { wordsData } = await storage.get();

    // const updatedWordsData = wordsData.map(item => {
    //   if (item.word === word) {
    //     const today = Date.now();
    //     item.reviewDate = addDays(today, reviewInterval * multiplier);
    //     item.reviewInterval = reviewInterval * multiplier;
    //   }
    //   return item;
    // });

    // storage.set({ wordsData: updatedWordsData });
  };

  onCheckDefinitionClick = () => {
    this.setState({
      showDefinition: true
    });
  };

  onEasyButtonClick = () => {
    this.handleUpdateReviewDate();
  };

  onHardButtonClick = () => {
    this.handleUpdateReviewDate(2);
  };

  render() {
    const { currentWord } = this.props;
    const { showDefinition } = this.state;
    const { word, dictionaryData, reviewInterval } = currentWord;
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
            <DefinitionList dictionaryData={dictionaryData} />
            <p className="difficulty">
              How difficult did you find this definition?
            </p>
            <div className="difficulty-action-buttons">
              <div className="button-container easy">
                <button onClick={this.onEasyButtonClick}>Easy</button>
                <span className="interval">({reviewInterval * 2} days)</span>
              </div>
              <div className="button-container hard">
                <button onClick={this.onHardButtonClick}>Hard</button>
                <span className="interval">({reviewInterval} days)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ReviewCard;
