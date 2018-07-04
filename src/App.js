import React, { Component } from 'react';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import WordInput from './components/WordInput';
import WordsList from './components/WordsList';
import ReviewView from './components/ReviewView';
import './App.css';

class App extends Component {
  state = {
    showWordsView: true,
    showReviewView: false
  };

  handleWordsClick = () => {
    this.setState({
      showWordsView: true,
      showReviewView: false
    });
  };

  handleReviewClick = () => {
    this.setState({
      showWordsView: false,
      showReviewView: true
    });
  };

  render() {
    const { showWordsView, showReviewView } = this.state;

    return (
      <div className="app">
        <div className="app-view">
          <AppHeader
            showWordsView={showWordsView}
            showReviewView={showReviewView}
            handleWordsClick={this.handleWordsClick}
            handleReviewClick={this.handleReviewClick}
          />
          <div className={showWordsView ? '' : 'hide'}>
            <WordInput />
            <WordsList />
          </div>
          <div className={showReviewView ? '' : 'hide'}>
            <ReviewView />
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
