import React, { Component } from "react";
import { connect } from "react-redux";

import WordCard from "../../components/WordCard";

const renderWordsList = wordsData => {
  if (wordsData && wordsData.length) {
    return wordsData.map(item => {
      const { word, fetchDefinition, dictionaryData } = item;
      return (
        <WordCard
          key={word}
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
    return <div>{renderWordsList(wordsData)}</div>;
  }
}

export default connect(state => ({
  wordsData: state.words.wordsData
}))(WordsList);
