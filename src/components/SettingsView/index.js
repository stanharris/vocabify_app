// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Card from '../Card';
import List from '../List';
import ListItem from '../ListItem';
import './styles.css';

class SettingsView extends Component<{}> {
  state = {
    definitionSources: []
  };

  componentDidMount() {
    this.initSettings();
  }

  initSettings = () => {
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
            definitionSources: sourcesRef.data().sources
          });
        } else {
          // TODO - Log error
        }
      }
    });
  };

  toggleSource = (id: string, enabled: boolean) => {
    // Update firestore
  };

  renderDefinitionSources = () =>
    this.state.definitionSources.map(item => (
      <ListItem
        id={item.id}
        name={item.name}
        enabled={item.enabled}
        onClick={this.toggleSource}
      />
    ));

  render() {
    return (
      <div className="settings-view">
        <Card>
          <h3>Settings</h3>
          <List>{this.renderDefinitionSources()}</List>
        </Card>
      </div>
    );
  }
}

export default SettingsView;
