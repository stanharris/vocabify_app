import React, { Component } from 'react';
import AppHeader from './components/AppHeader';
import WordInput from './components/WordInput';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <WordInput />
      </div>
    );
  }
}

export default App;
