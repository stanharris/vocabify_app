// @flow
import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Card from '../Card';
import List from '../List';
import ListItem from '../ListItem';
import { DefinitionSource, ErrorType } from '../../types';
import styles from './styles.module.css';

type State = {
  definitionSources: Array<DefinitionSource>,
  isLoading: boolean,
  error: ErrorType
};

class SettingsView extends React.Component<{}, State> {
  state = {
    definitionSources: [],
    isLoading: false,
    error: {
      hasError: false,
      errorMessage: ''
    }
  };

  componentDidMount() {
    this.initSettings();
  }

  initSettings = () => {
    this.setState({
      isLoading: true
    });

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const db = firebase.firestore();
        const sourcesRef = await db
          .collection('users')
          .doc(uid)
          .collection('settings')
          .doc('dictionarySources')
          .get();
        if (sourcesRef.exists) {
          this.setState({
            definitionSources: sourcesRef.data().sources,
            isLoading: false
          });
        } else {
          // TODO - Log error
          this.setState({
            isLoading: false,
            error: {
              hasError: true,
              errorMessage: 'Failed to fetch user settings.'
            }
          });
        }
      }
    });
  };

  toggleSource = (id: string, enabled: boolean) => {
    const { definitionSources } = this.state;
    const updatedSources = definitionSources.map(source => {
      if (source.id === id) {
        return {
          ...source,
          enabled
        };
      }
      return source;
    });

    this.setState({
      definitionSources: updatedSources
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const db = firebase.firestore();
        db.collection('users')
          .doc(uid)
          .collection('settings')
          .doc('dictionarySources')
          .set({ sources: updatedSources });
      } else {
        // TODO - handle case of non-signed in users
      }
    });
  };

  renderDefinitionSources = () =>
    this.state.definitionSources.map(item => (
      <ListItem
        id={item.id}
        title={item.name}
        enabled={item.enabled}
        onClick={this.toggleSource}
      />
    ));

  render() {
    const { isLoading, error } = this.state;
    const { hasError, errorMessage } = error;
    return (
      <div className={styles.settingsView}>
        <Card>
          <h1>Settings</h1>
          <List title="Definition sources" isLoading={isLoading}>
            {this.renderDefinitionSources()}
          </List>
          {hasError && <p className={styles.error}>{errorMessage}</p>}
        </Card>
      </div>
    );
  }
}

export default SettingsView;
