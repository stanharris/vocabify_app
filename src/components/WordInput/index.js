import React, { Component } from "react";
import addDays from "date-fns/add_days";

import { defaultReviewInterval } from "../../constants";
import "./styles.css";

const initialState = {
  wordValue: "",
  disableAddWordButton: true,
  error: false,
  errorMessage: "",
  isDuplicate: false
};

class WordInput extends Component {
  state = initialState;

  onWordInputChange = event => {
    this.setState({
      wordValue: event.target.value
    });
    if (event.target.value) {
      this.setState({
        disableAddWordButton: false
      });
    } else {
      this.setState({
        disableAddWordButton: true
      });
    }
    this.duplicateCheck(event.target.value);
  };

  duplicateCheck = async word => {
    // const { wordsList } = await storage.get();
    // if (wordsList.includes(word)) {
    //   this.setState({
    //     error: true,
    //     errorMessage: "Duplicate word",
    //     isDuplicate: true
    //   });
    // } else {
    //   this.setState({
    //     error: false,
    //     errorMessage: "",
    //     isDuplicate: false
    //   });
    // }
  };

  handleAddWord = async () => {
    // const { wordValue } = this.state;

    // const { wordsList, wordsData } = await storage.get();

    // wordsList.unshift(wordValue);
    // wordsData.unshift({
    //   word: wordValue,
    //   fetchDefinition: true,
    //   reviewDate: addDays(new Date(), defaultReviewInterval),
    //   reviewInterval: defaultReviewInterval
    // });
    // storage.set({ wordsList, wordsData });

    // this.setState(initialState);
  };

  onAddWordClick = () => {
    this.handleAddWord();
  };

  handleKey = event => {
    const { isDuplicate } = this.state;
    if (event.key === "Enter" && !isDuplicate) {
      this.handleAddWord();
    }
  };

  render() {
    const {
      wordValue,
      disableAddWordButton,
      error,
      errorMessage,
      isDuplicate
    } = this.state;
    const errorElement = <p className="error-message">{errorMessage}</p>;
    return (
      <div className="word-input-container">
        <input
          placeholder="Add word..."
          type="text"
          pattern="/^[a-zA-Z0-9]*$/"
          value={wordValue}
          onChange={this.onWordInputChange}
          onKeyPress={this.handleKey}
        />
        <button
          className="add-word-button"
          disabled={disableAddWordButton || isDuplicate}
          onClick={this.onAddWordClick}
        >
          Add word
        </button>
        {error && errorElement}
      </div>
    );
  }
}

export default WordInput;
