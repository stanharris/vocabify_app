import React, { Component } from "react";

import AppFooter from "./components/AppFooter";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-view">
          <WordInput />
          <WordsList />
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
