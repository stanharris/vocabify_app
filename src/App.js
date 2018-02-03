/* global browser */
import React, { Component } from "react";

import ImportWords from "./components/ImportWords";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import ReviewView from "./containers/ReviewView";
import { storage, storageEvent } from "./constants";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWordsView: true,
      showReviewView: false,
      showImportCard: false
    };
  }

  componentDidMount() {
    this.checkImportCardVisibility();
    storageEvent.onChanged.addListener(this.checkImportCardVisibility);
  }

  checkImportCardVisibility = async () => {
    const { showImportCard } = await storage.get();
    if (showImportCard) {
      this.setState({
        showImportCard: true
      });
    } else {
      this.setState({
        showImportCard: false
      });
    }
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

  handleAppClick = () => {
    browser.tabs.create({
      url: "/index.html"
    });
  };

  render() {
    const { showWordsView, showReviewView, showImportCard } = this.state;
    return (
      <div className="app">
        <div className="app-view">
          <AppHeader
            showWordsView={showWordsView}
            showReviewView={showReviewView}
            handleWordsClick={this.handleWordsClick}
            handleReviewClick={this.handleReviewClick}
          />
          <div className={showWordsView ? "" : "hide"}>
            <WordInput />
            {showImportCard && <ImportWords />}
            <WordsList />
          </div>
          <div className={showReviewView ? "" : "hide"}>
            <ReviewView />
          </div>
          <button className="open-app" onClick={this.handleAppClick}>
            Open app
          </button>
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
