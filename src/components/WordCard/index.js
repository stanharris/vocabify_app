import React, { Component } from "react";

import DefinitionList from "../DefinitionList";
import { host, storage } from "../../constants";
import "./styles.css";

class WordCard extends Component {
  state = {
    isFetchingDefinition: false,
    definitionNotFound: false
  };

  handleRemoveClick = async () => {
    const { word } = this.props;
    const { wordsList, wordsData } = await storage.get();

    const filteredWordsList = wordsList.filter(item => item !== word);
    const filteredWordsData = wordsData.filter(item => item.word !== word);

    storage.set({
      wordsList: filteredWordsList,
      wordsData: filteredWordsData
    });
  };

  componentDidMount() {
    const { fetchDefinition } = this.props;
    if (fetchDefinition) {
      this.setState(
        {
          isFetchingDefinition: true
        },
        this.fetchDefinition
      );
    }
  }

  fetchDefinition = async () => {
    const { word } = this.props;
    try {
      const response = await fetch(`${host}/api/v1/definition/${word}`);
      let dictionaryData;
      if (response.status === 404) {
        dictionaryData = null;
        this.setState({
          definitionNotFound: true,
          isFetchingDefinition: false
        });
      } else {
        const data = await response.json();
        dictionaryData = data;
        this.setState({
          isFetchingDefinition: false
        });
      }

      /* TODO - fix race condition: storage get/set is asynchronous and if multiple words are added at once the saved deinitions can overwrite each other */
      const { wordsData } = await storage.get();
      const updatedWordsData = wordsData.map(item => {
        if (item.word === word) {
          item.dictionaryData = dictionaryData;
          item.fetchDefinition = false;
        }
        return item;
      });

      storage.set({ wordsData: updatedWordsData });
    } catch (error) {
      // TODO - Add better error handling
      this.setState({
        isFetchingDefinition: false
      });
    }
  };

  render() {
    const { isFetchingDefinition, definitionNotFound } = this.state;
    const { word, dictionaryData } = this.props;
    return (
      <div className="word-card">
        <div onClick={this.handleRemoveClick} className="remove-icon-container">
          <span className="icon">&times;</span>
        </div>
        <h3 className="title">{word}</h3>
        {isFetchingDefinition && (
          <p className="fetching-definition">Searching for definition...</p>
        )}
        <DefinitionList dictionaryData={dictionaryData} />
        {definitionNotFound && (
          <div className="definition-not-found">Definition not found</div>
        )}
      </div>
    );
  }
}

export default WordCard;
