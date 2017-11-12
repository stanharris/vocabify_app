import React, { Component } from "react";
import { connect } from "react-redux";

import WordCard from "../../components/WordCard";

const renderWordsList = wordsList => {
  if (wordsList && wordsList.length) {
    return wordsList.map(word => <WordCard key={word} word={word} />);
  }
  return null;
};

class WordsList extends Component {
  render() {
    const { wordsList } = this.props;
    return <div>{renderWordsList(wordsList)}</div>;
  }
}

export default connect(state => ({
  wordsList: state.words.wordsList
}))(WordsList);
