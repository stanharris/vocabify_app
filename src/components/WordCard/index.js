// @flow
import React, { Component, Fragment } from 'react';
import firebase from 'firebase/app';
import isNull from 'lodash/isNull';

import DefinitionList from '../DefinitionList';
import ManageDefinitionsModal from '../ManageDefinitionsModal';
import Card from '../Card';
import { DefinitionList as DefinitionListType, ErrorType } from '../../types';
import styles from './styles.module.css';

type Props = {
  firebaseId: string,
  word: string,
  definitionList: Array<DefinitionListType>
};

type State = {
  isFetchingDefinition: boolean,
  hasFetched: boolean,
  showModal: boolean,
  error: ErrorType
};

class WordCard extends Component<Props, State> {
  state = {
    isFetchingDefinition: false,
    hasFetched: false,
    showModal: false,
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

  handleManageClick = () => {
    this.setState({
      showModal: true
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false
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

          const sourceRequests = enabledSources.map(async source => {
            const fetchDefinition = firebase
              .functions()
              .httpsCallable(source.cloudFunctionId);

            const { data: definitionList } = await fetchDefinition({
              word
            });

            return definitionList
              ? {
                  source,
                  definitionList
                }
              : null;
          });

          const values = await Promise.all(sourceRequests);
          const definitionList = values.filter(value => value !== null);

          if (definitionList.length) {
            this.saveDefinition(uid, wordId, definitionList);
          }

          this.setState({
            isFetchingDefinition: false,
            hasFetched: true
          });
        } else {
          this.renderError();
        }
      }
    });
  };

  saveDefinition = (uid: string, wordId: string, definitionList) => {
    const db = firebase.firestore();

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
    const { isFetchingDefinition, hasFetched, showModal, error } = this.state;
    const { word, definitionList } = this.props;
    const { hasError, errorMessage } = error;

    const showDefinitionList = !isNull(definitionList);
    const showNotFound = hasFetched && isNull(definitionList);

    return (
      <Fragment>
        <ManageDefinitionsModal
          isOpen={showModal}
          handleModalClose={this.handleModalClose}
          word={word}
          definitionList={definitionList}
        />

        <Card className={styles.wordCard}>
          <div onClick={this.handleRemoveClick} className={styles.removeIcon}>
            <span className={styles.icon}>&times;</span>
          </div>
          <h3 className={styles.title}>{word}</h3>
          {isFetchingDefinition && (
            <div className={styles.fetching}>Searching for definition...</div>
          )}
          {showNotFound && (
            <div className={styles.notFound}>Definition not found</div>
          )}
          {hasError && <div className={styles.error}>{errorMessage}</div>}
          {showDefinitionList && (
            <DefinitionList definitionList={definitionList} />
          )}
          {showDefinitionList && (
            <div className={styles.actions}>
              <button onClick={this.handleManageClick}>
                Manage Definitions
              </button>
            </div>
          )}
        </Card>
      </Fragment>
    );
  }
}

export default WordCard;
