// @flow
import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import get from 'lodash/get';
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

  handleRemoveClick = async () => {
    // TODO - Persist UID somewhere
    // https://firebase.google.com/docs/auth/web/auth-state-persistence
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { firebaseId } = this.props;

        const db = firebase.firestore();

        db
          .collection('users')
          .doc(uid)
          .collection('words')
          .doc(firebaseId)
          .delete();
      }
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

  fetchDefinition = () => {
    // TODO - Persist UID somewhere
    // https://firebase.google.com/docs/auth/web/auth-state-persistence
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const { word, firebaseId } = this.props;

        const definitionResponse = await fetchDefinition(word);

        const db = firebase.firestore();
        db
          .collection('users')
          .doc(uid)
          .collection('words')
          .doc(firebaseId)
          .set(
            {
              dictionaryData: definitionResponse,
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
    const { word, dictionaryData, fetchDefinition } = this.props;
    const definitionList = get(dictionaryData, 'results', []);
    const showDefinitionList = Boolean(definitionList.length);
    const showNotFound = !fetchDefinition && isNull(dictionaryData);
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
