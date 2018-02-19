import React, { Component } from 'react';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import WordInput from './components/WordInput';
import WordsList from './containers/WordsList';
import ReviewView from './containers/ReviewView';
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
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };
    return (
      <div className="app">
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
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
