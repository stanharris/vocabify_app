import React, { Component } from "react";
import { connect } from "react-redux";

import { removeWord } from "../../actions/words";
import "./styles.css";

class WordCard extends Component {
  handleRemoveClick = () => {
    const { word, dispatch } = this.props;
    dispatch(removeWord(word));
  };

  render() {
    const { word } = this.props;
    return (
      <div className="word-card">
        <div onClick={this.handleRemoveClick} className="remove-icon-container">
          <span className="icon">&times;</span>
        </div>
        <h3 className="title">{word}</h3>
      </div>
    );
  }
}

export default connect()(WordCard);
