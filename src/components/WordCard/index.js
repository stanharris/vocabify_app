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
    const { word, dispatch } = this.props;
    try {
      const response = await fetch(`${host}/api/v1/definition/${word}`);
      const { status } = response;
      if (status === 404) {
        this.setState({
          definitionNotFound: true
        });
        dispatch(noDefinitionFound(word));
      } else {
        const data = await response.json();
        this.setState({
          isFetchingDefinition: false
        });
        dispatch(addDictionaryData({ word, dictionaryData: data }));
      }
    } catch (error) {
      // TODO - Add better error handling
      this.setState({
        isFetchingDefinition: false
      });
    }
  };

  renderDefinitions = () => {
    const { dictionaryData } = this.props;
    if (!dictionaryData) {
      return null;
    }
    return dictionaryData.map(item => {
      const { lexicalCategory, definitionList } = item;
      const definitionListElement = definitionList.map((defItem, index) => {
        const { definition, example } = defItem;
        const hasDefinition = Boolean(definition);
        const hasExample = Boolean(example);
        if (index < 2) {
          return (
            <div className="definition-item" key={v4()}>
              <span className="definition-index">{index + 1}.</span>
              {hasDefinition && <p className="definition-text">{definition}</p>}
              {hasExample && (
                <p className="definition-example">&quot;{example}&quot;</p>
              )}
            </div>
          );
        }
        return null;
      });
      return (
        <div key={v4()}>
          <p className="lexical-category">{lexicalCategory}</p>
          {definitionListElement}
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
