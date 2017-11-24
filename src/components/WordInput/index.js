import React, { Component } from "react";
import { connect } from "react-redux";
import addDays from "date-fns/add_days";

import { defaultReviewInterval } from "../../constants";
import { addWord } from "../../actions/words";
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

  duplicateCheck = word => {
    const { wordsList } = this.props;
    if (wordsList.includes(word)) {
      this.setState({
        error: true,
        errorMessage: "Duplicate word",
        isDuplicate: true
      });
    } else {
      this.setState({
        error: false,
        errorMessage: "",
        isDuplicate: false
      });
    }
  };

  handleAddWord = () => {
    const { dispatch } = this.props;
    const { wordValue } = this.state;
    dispatch(
      addWord({
        wordValue,
        reviewDate: addDays(new Date(), defaultReviewInterval),
        reviewInterval: defaultReviewInterval
      })
    );
    this.setState(initialState);
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

export default connect(state => ({
  wordsList: state.words.wordsList
}))(WordInput);
