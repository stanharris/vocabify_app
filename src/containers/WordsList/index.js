import React, { Component } from "react";

import WordCard from "../../components/WordCard";
// import { storage, storageEvent } from "../../constants";
import "./styles.css";

class WordsList extends Component {
  state = {
    wordsData: [],
    listLength: 10
  };

  componentDidMount() {
    // this.updateWords();
    // storageEvent.onChanged.addListener(this.updateWords);
  }

  updateWords = async () => {
    // const { listLength } = this.state;
    // const { wordsData } = await storage.get();
    // const wordsDataLength = wordsData.length;
    // wordsData.length = listLength;
    // this.setState({
    //   wordsData,
    //   wordsDataLength
    // });
  };

  handleMoreClick = () => {
    const { listLength } = this.state;
    this.setState(
      {
        listLength: listLength + 10
      },
      this.updateWords
    );
  };

  renderWordsList = () => {
    const { wordsData } = this.state;
    if (wordsData && wordsData.length) {
      const wordsList = wordsData.map(item => {
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
      return (
        <div>
          <h2 className="recently-added-title">Recently added</h2>
          <div className="word-list-container">{wordsList}</div>
        </div>
      );
    }
    return null;
  };

  renderShowMoreButton = () => {
    const { listLength, wordsDataLength } = this.state;
    if (listLength < wordsDataLength) {
      return (
        <button className="show-more-button" onClick={this.handleMoreClick}>
          Show more
        </button>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        {this.renderWordsList()}
        {this.renderShowMoreButton()}
      </div>
    );
  }
}

export default WordsList;
