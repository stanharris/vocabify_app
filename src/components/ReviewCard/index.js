import React, { Component } from "react";
import { connect } from "react-redux";
import addDays from "date-fns/add_days";

import DefinitionList from "../DefinitionList";
import { updateReviewDate } from "../../actions/words";
import "./styles.css";

class ReviewCard extends Component {
  state = {
    showDefinition: false
  };

  handleUpdateReviewDate = (multiplier = 1) => {
    const { dispatch, currentWord } = this.props;
    const { word, reviewDate, reviewInterval } = currentWord;
    dispatch(
      updateReviewDate({
        word,
        reviewDate: addDays(reviewDate, reviewInterval * multiplier),
        reviewInterval: reviewInterval * multiplier
      })
    );
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
                <span className="interval">({reviewInterval} days)</span>
              </div>
              <div className="button-container hard">
                <button onClick={this.onHardButtonClick}>Hard</button>
                <span className="interval">({reviewInterval * 2} days)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(ReviewCard);
