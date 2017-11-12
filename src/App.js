import React, { Component } from "react";
import AppHeader from "./components/AppHeader";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <WordInput />
        <WordsList />
      </div>
    );
  }
}

export default App;
