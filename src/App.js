/* global browser */
import React, { Component } from "react";

import AppFooter from "./components/AppFooter";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import ReviewView from "./containers/ReviewView";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWordsView: true,
      showReviewView: false
    };
  }

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

  handleAppClick = () => {
    browser.tabs.create({
      url: "/index.html"
    });
  };

  render() {
    const { showWordsView, showReviewView } = this.state;
    const wordsView = (
      <div>
        <WordInput />
        <WordsList />
      </div>
    );
    return (
      <div className="app">
        <div className="app-view">
          <div className="header-navigation">
            <button
              onClick={this.handleWordsClick}
              className={showWordsView ? "active" : ""}
            >
              Words
            </button>
            <button
              onClick={this.handleReviewClick}
              className={showReviewView ? "active" : ""}
            >
              Review
            </button>
            <button onClick={this.handleAppClick}>App</button>
          </div>
          {showWordsView && wordsView}
          {showReviewView && <ReviewView />}
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
