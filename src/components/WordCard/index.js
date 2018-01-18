import React, { Component } from "react";

import DefinitionList from "../DefinitionList";
import { host, storage } from "../../constants";
import "./styles.css";

class WordCard extends Component {
  state = {
    isFetchingDefinition: false
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
    const { wordsData } = await storage.get();
    try {
      const response = await fetch(`${host}/api/v1/definition/${word}`);
      let dictionaryData;
      if (response.status === 404) {
        dictionaryData = null;
        this.setState({
          definitionNotFound: true
        });
      } else {
        const data = await response.json();
        dictionaryData = data;
        this.setState({
          isFetchingDefinition: false
        });
      }

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

  renderDefinitionNotFound = () => {
    // TODO not working
    const { definitionNotFound } = this.state;
    if (!definitionNotFound) {
      return null;
    }
    return <div className="definition-not-found">Definition not found</div>;
  };

  render() {
    const { isFetchingDefinition } = this.state;
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
        {this.renderDefinitionNotFound()}
      </div>
    );
  }
}

export default WordCard;
