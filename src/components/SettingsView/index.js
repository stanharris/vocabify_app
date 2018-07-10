// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Card from '../Card';
import './styles.css';

class SettingsView extends Component<{}> {
  render() {
    return (
      <div className="settings-view">
        <Card>
          <h3>Settings</h3>
        </Card>
      </div>
    );
  }
}

export default SettingsView;
