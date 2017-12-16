import React, { Component } from "react";
import { connect } from "react-redux";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import ReviewView from "./containers/ReviewView";
import { WORDS, REVIEW } from "./constants/viewTypes";
import "./App.css";

class App extends Component {
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
  activeView: state.view.activeView
}))(App);
