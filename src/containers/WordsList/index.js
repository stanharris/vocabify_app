import React, { Component } from "react";
import { v4 } from "node-uuid";

import WordCard from "../../components/WordCard";
import { storage, storageEvent } from "../../constants";

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
    return <div style={{ padding: 16 }}>{renderWordsList(wordsData)}</div>;
  }
}

export default WordsList;
