// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import WordsView from './components/WordsView';
import ReviewView from './components/ReviewView';
import SettingsView from './components/SettingsView';
import './App.css';

class App extends Component<{}> {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="app-view">
            <AppHeader />
            <Route exact path="/" component={WordsView} />
            <Route path="/review" component={ReviewView} />
            <Route path="/settings" component={SettingsView} />
          </div>
          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;
