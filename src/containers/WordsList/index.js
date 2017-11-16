import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "node-uuid";

import WordCard from "../../components/WordCard";
import "./styles.css";

const renderWordsList = wordsData => {
  if (wordsData && wordsData.length) {
    return wordsData.map(item => {
      const { word, fetchDefinition, dictionaryData } = item;
      return (
        <WordCard
          key={v4()}
          word={word}
          fetchDefinition={fetchDefinition}
          dictionaryData={dictionaryData}
        />
      );
    });
  }
  return null;
};

class WordsList extends Component {
  render() {
    const { wordsData } = this.props;
    return (
      <div className="words-list-container">{renderWordsList(wordsData)}</div>
    );
  }
}

export default connect(state => ({
  wordsData: state.words.wordsData
}))(WordsList);
