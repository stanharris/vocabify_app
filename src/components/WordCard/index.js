import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "node-uuid";

import { host } from "../../config";
import {
  removeWord,
  addDictionaryData,
  noDefinitionFound
} from "../../actions/words";
import "./styles.css";

class WordCard extends Component {
  state = {
    isFetchingDefinition: false
  };

  handleRemoveClick = () => {
    const { word, dispatch } = this.props;
    dispatch(removeWord(word));
  };

  componentDidMount() {
    const { word, fetchDefinition, dispatch } = this.props;
    if (fetchDefinition) {
      this.setState({
        isFetchingDefinition: true
      });
      fetch(`${host}/api/v1/definition/${word}`)
        .then(response => {
          const { status } = response;
          if (status === 404) {
            this.setState({
              definitionNotFound: true
            });
            dispatch(noDefinitionFound(word));
          }
          return response.json();
        })
        .then(json => {
          this.setState({
            isFetchingDefinition: false
          });
          dispatch(addDictionaryData({ word, dictionaryData: json }));
        })
        .catch(error => {
          this.setState({
            isFetchingDefinition: false
          });
        });
    }
  }

  renderDefinitions = () => {
    const { dictionaryData } = this.props;
    if (!dictionaryData) {
      return null;
    }
    return dictionaryData.map((item, index) => {
      if (!item) {
        return null;
      }
      const definition = item.senses[0].definitions[0];
      let example;
      try {
        example = item.senses[0].examples[0].text;
      } catch (err) {}
      return (
        <div key={v4()}>
          <span className="definition-index">{index + 1}.</span>
          <p className="definition-text">{definition}</p>
          <p className="definition-example">&quot;{example}&quot;</p>
        </div>
      );
    });
  };

  renderDefinitionNotFound = () => {
    const { definitionNotFound } = this.state;
    if (!definitionNotFound) {
      return null;
    }
    return <div className="definition-not-found">Definition not found</div>;
  };

  render() {
    const { isFetchingDefinition } = this.state;
    const { word } = this.props;
    return (
      <div className="word-card">
        <div onClick={this.handleRemoveClick} className="remove-icon-container">
          <span className="icon">&times;</span>
        </div>
        <h3 className="title">{word}</h3>
        {isFetchingDefinition && (
          <p className="fetching-definition">Searching for definition...</p>
        )}
        {this.renderDefinitions()}
        {this.renderDefinitionNotFound()}
      </div>
    );
  }
}

export default connect()(WordCard);
