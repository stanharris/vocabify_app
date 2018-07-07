// @flow
import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import isNull from 'lodash/isNull';

import DefinitionList from '../DefinitionList';
import { fetchDefinition } from '../../utils';
import './styles.css';

type Props = {
  firebaseId: string,
  fetchDefinition: boolean,
  word: string
};

type State = {
  isFetchingDefinition: boolean
};

class WordCard extends Component<Props, State> {
  state = {
    isFetchingDefinition: false
  };

  componentDidMount() {
    const { fetchDefinition } = this.props;
    if (fetchDefinition) {
      this.setState(
        {
          isFetchingDefinition: true
        },
        this.fetchAndSaveDefinition
      );
    }
  }

  handleRemoveClick = async () => {
    // TODO - Persist UID somewhere
    // https://firebase.google.com/docs/auth/web/auth-state-persistence
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { firebaseId: wordId } = this.props;

        const db = firebase.firestore();
        db
          .collection('users')
          .doc(uid)
          .collection('words')
          .doc(wordId)
          .delete();
      }
    });
  };

  fetchAndSaveDefinition = () => {
    // TODO - Persist UID somewhere
    // https://firebase.google.com/docs/auth/web/auth-state-persistence
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { word, firebaseId: wordId } = this.props;

        const definitionList = await fetchDefinition(word);

        const db = firebase.firestore();
        db
          .collection('users')
          .doc(uid)
          .collection('words')
          .doc(wordId)
          .set(
            {
              definitionList,
              fetchDefinition: false
            },
            { merge: true }
          );

        this.setState({
          isFetchingDefinition: false
        });
      } else {
        // TODO - handle case of non-signed in users
      }
    });
  };

  render() {
    const { isFetchingDefinition } = this.state;
    const { word, definitionList, fetchDefinition } = this.props;

    const showDefinitionList = !isNull(definitionList);
    const showNotFound = !fetchDefinition && isNull(definitionList);

    return (
      <div className="word-card">
        <div onClick={this.handleRemoveClick} className="remove-icon-container">
          <span className="icon">&times;</span>
        </div>
        <h3 className="title">{word}</h3>
        {isFetchingDefinition && (
          <p className="fetching-definition">Searching for definition...</p>
        )}
        {showDefinitionList && (
          <DefinitionList definitionList={definitionList} />
        )}
        {showNotFound && (
          <div className="definition-not-found">Definition not found</div>
        )}
      </div>
    );
  }
}

export default WordCard;
