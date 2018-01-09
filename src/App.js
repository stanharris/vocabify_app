import React, { Component } from "react";
import { connect } from "react-redux";

import { updateWords } from "./actions/words";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import ReviewView from "./containers/ReviewView";
import { WORDS, REVIEW } from "./constants/viewTypes";
import { host } from "./config";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.fetchServerWords();
  }

  fetchServerWords = async () => {
    const { dispatch, auth, words } = this.props;
    const { isSignedIn } = auth;
    if (isSignedIn) {
      const { email } = auth.userProfile;
      const browserWords = {
        email,
        words
      };
      const syncResponse = await fetch(`${host}/api/v1/sync`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(browserWords)
      });
      const data = await syncResponse.json();
      dispatch(updateWords(data));
    }
  };

  renderView = () => {
    const { activeView } = this.props;
    switch (activeView) {
      case WORDS:
      default: {
        return (
          <div>
            <WordInput />
            <WordsList />
          </div>
        );
      }
      case REVIEW: {
        return (
          <div>
            <ReviewView />
          </div>
        );
      }
    }
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <div className="app-view">{this.renderView()}</div>
        <AppFooter />
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  activeView: state.view.activeView,
  words: state.words
}))(App);
