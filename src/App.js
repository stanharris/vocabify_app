// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import WordsView from './components/WordsView';
import ReviewView from './components/ReviewView';
import SettingsView from './components/SettingsView';
import './App.css';

type Props = {
  uid: string
};

class App extends Component<Props> {
  render() {
    const { uid } = this.props;
    return (
      <Router>
        <div className="app">
          <div className="app-view">
            <AppHeader />
            <Route exact path="/" render={() => <WordsView uid={uid} />} />
            <Route path="/review" component={ReviewView} />
            <Route path="/settings" component={SettingsView} />
          </div>
          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default connect(state => ({
  uid: state.firebase.auth.uid
}))(App);
