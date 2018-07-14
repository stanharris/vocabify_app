// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import isNull from 'lodash/isNull';

import DefinitionList from '../DefinitionList';
import { DefinitionList as DefinitionListType, ErrorType } from '../../types';
import './styles.css';

type Props = {
  firebaseId: string,
  word: string,
  definitionList: Array<DefinitionListType>
};

type State = {
  isFetchingDefinition: boolean,
  hasFetched: boolean,
  error: ErrorType
};

// TODO - Move to separate file
const sourceMapping = {
  ZhzoOH1C99RAwDOzRfGF: 'wordsAPI'
};

class WordCard extends Component<Props, State> {
  state = {
    isFetchingDefinition: false,
    hasFetched: false,
    error: {
      hasError: false,
      errorMessage: ''
    }
  };

  componentDidMount() {
    const { definitionList } = this.props;
    if (isNull(definitionList)) {
      this.fetchAndSaveDefinition();
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
    // TODO - Refactor
    // Gets auth state (should be in redux store)
    // Gets enabled sources from settings (should happen once on app load then
    // save in redux store)
    // Fetches definition from enabled sources (keep here)
    // Saves definition to firestore (keep here)
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { word, firebaseId: wordId } = this.props;
        const db = firebase.firestore();

        this.setState({
          isFetchingDefinition: true
        });

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

          // TODO - Run fetches in parallel
          enabledSources.forEach(async source => {
            const fetchDefinition = firebase
              .functions()
              .httpsCallable(sourceMapping[source.id]);

            try {
              const { data: definitionList } = await fetchDefinition({
                word
              });
              if (isNull(definitionList)) {
                this.setState({
                  isFetchingDefinition: false,
                  hasFetched: true
                });
              } else {
                db.collection('users')
                  .doc(uid)
                  .collection('words')
                  .doc(wordId)
                  .set(
                    {
                      definitionList
                    },
                    { merge: true }
                  );
              }
            } catch (error) {
              this.renderError();
            }
          });
        } else {
          this.renderError();
        }
      }
    });
  };

  renderError = () => {
    this.setState({
      isFetchingDefinition: false,
      error: {
        hasError: true,
        errorMessage: 'Failed to fetch dictionary sources.'
      }
    });
  };

  render() {
    const { isFetchingDefinition, hasFetched, error } = this.state;
    const { word, definitionList } = this.props;
    const { hasError, errorMessage } = error;

    const showDefinitionList = !isNull(definitionList);
    const showNotFound = hasFetched && isNull(definitionList);

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
