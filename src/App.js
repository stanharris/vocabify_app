import React, { Component } from "react";
import { connect } from "react-redux";

import AppHeader from "./components/AppHeader";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
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
            <h2>Review</h2>
          </div>
        );
      }
    }
  };
  render() {
    return (
      <div className="app">
        <AppHeader />
        {this.renderView()}
      </div>
    );
  }
}

export default connect(state => ({
  activeView: state.view.activeView
}))(App);
