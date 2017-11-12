import React, { Component } from 'react';
import './styles.css';

class WordInput extends Component {

  state = {
    wordValue: '',
    disableAddWordButton: true
  }

  onWordInputChange = (event) => {
    this.setState({
      wordValue: event.target.value
    });
    if (event.target.value) {
      this.setState({
        disableAddWordButton: false
      });
    } else {
      this.setState({
        disableAddWordButton: true
      });
    }
  }

  onAddWordClick = () => {
    // Save word to words redux store
    // Fetch definition
    console.log('clicked')
  }

  render() {
    const {
      disableAddWordButton
    } = this.state;
    return(
      <div className="word-input-container">
        <input
          placeholder="Add word..."
          type="text"
          pattern="/^[a-zA-Z0-9]*$/"
          onChange={this.onWordInputChange} />
        <button
          className="add-word-button"
          disabled={disableAddWordButton}
          onClick={this.onAddWordClick}>Add word</button>
      </div>
    )
  }
}

export default WordInput;
