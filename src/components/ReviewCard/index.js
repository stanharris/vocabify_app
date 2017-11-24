import React, { Component } from "react";

import DefinitionList from "../DefinitionList";
import "./styles.css";

class ReviewCard extends Component {
  state = {
    showDefinition: false
  };

  onCheckDefinitionClick = () => {
    this.setState({
      showDefinition: true
    });
  };

  // Update review date and interval on word
  onEasyButtonClick = () => {};

  onHardButtonClick = () => {};

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
