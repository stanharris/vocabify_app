// @flow
import React, { Component } from 'react';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import WordsView from './components/WordsView';
import ReviewView from './components/ReviewView';
import SettingsView from './components/SettingsView';
import './App.css';

type State = {
  showWordsView: boolean,
  showReviewView: boolean,
  showSettingsView: boolean
};

class App extends Component<{}, State> {
  state = {
    showWordsView: true,
    showReviewView: false,
    showSettingsView: false
  };

  // TODO - Add a router when number of views increase
  handleWordsClick = () => {
    this.setState({
      showWordsView: true,
      showReviewView: false,
      showSettingsView: false
    });
  };

  handleReviewClick = () => {
    this.setState({
      showWordsView: false,
      showReviewView: true,
      showSettingsView: false
    });
  };

  handleSettingsClick = () => {
    this.setState({
      showWordsView: false,
      showReviewView: false,
      showSettingsView: true
    });
  };

  render() {
    const { showWordsView, showReviewView, showSettingsView } = this.state;

    return (
      <div className="app">
        <div className="app-view">
          <AppHeader
            showWordsView={showWordsView}
            showReviewView={showReviewView}
            showSettingsView={showSettingsView}
            handleWordsClick={this.handleWordsClick}
            handleReviewClick={this.handleReviewClick}
            handleSettingsClick={this.handleSettingsClick}
          />
          <div className={showWordsView ? '' : 'hide'}>
            <WordsView />
          </div>
          <div className={showReviewView ? '' : 'hide'}>
            <ReviewView />
          </div>
          <div className={showSettingsView ? '' : 'hide'}>
            <SettingsView />
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
