// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import isNull from 'lodash/isNull';

import DefinitionList from '../DefinitionList';
import {
  DefinitionList as DefinitionListType,
  ErrorType,
  DefinitionSource
} from '../../types';
import './styles.css';

type Props = {
  firebaseId: string,
  fetchDefinition: boolean,
  word: string,
  definitionList: Array<DefinitionListType>
};

type State = {
  isFetchingDefinition: boolean,
  error: ErrorType
};

const sourceMapping = {
  ZhzoOH1C99RAwDOzRfGF: 'wordsAPI'
};

class WordCard extends Component<Props, State> {
  state = {
    isFetchingDefinition: false,
    error: {
      hasError: false,
      errorMessage: ''
    }
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
        db.collection('users')
          .doc(uid)
          .collection('words')
          .doc(wordId)
          .delete();
      }
    });
  };

  fetchAndSaveDefinition = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { word } = this.props;
        const db = firebase.firestore();
        const sourcesRef = await db
          .collection('users')
          .doc(uid)
          .collection('settings')
          .doc('dictionarySources')
          .get();
        if (sourcesRef.exists) {
          const enabledSources = sourcesRef
            .data()
            .sources.filter(source => source.enabled);
          enabledSources.forEach(source => {
            const fetchDefinition = firebase
              .functions()
              .httpsCallable(sourceMapping[source.id]);
            fetchDefinition({ word })
              .then(response => console.log(response))
              .catch(error => console.log(error));
          });
          // TODO - Save definition
        } else {
          // TODO - Ensure new loading state is cancelled here
          this.setState({
            error: {
              hasError: true,
              errorMessage: 'Failed to fetch dictionary sources.'
            }
          });
        }
      } else {
        // TODO - handle case of non-signed in users
      }
    });
  };

  render() {
    const { isFetchingDefinition, error } = this.state;
    const { word, definitionList, fetchDefinition } = this.props;
    const { hasError, errorMessage } = error;

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
        {hasError && <p className="error">{errorMessage}</p>}
      </div>
    );
  }
}

export default WordCard;
