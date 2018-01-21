import React, { Component } from "react";

import WordCard from "../../components/WordCard";
import { storage, storageEvent } from "../../constants";
import "./styles.css";

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
  constructor(props) {
    super(props);
    this.state = {
      wordsData: []
    };
  }

  componentDidMount() {
    this.updateWords();
    storageEvent.onChanged.addListener(this.updateWords);
  }

  updateWords = async () => {
    const { wordsData } = await storage.get();
    this.setState({
      wordsData
    });
  };

  render() {
    const { wordsData } = this.state;
    return (
      <div>
        <h2 className="recently-added-title">Recently added</h2>
        <div className="word-list-container">{renderWordsList(wordsData)}</div>
      </div>
    );
  }
}

export default WordsList;
