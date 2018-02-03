import React, { Component } from "react";

import { storage } from "../../constants";
import "./styles.css";

class ImportWords extends Component {
  state = {
    email: "",
    importDisabled: true,
    requestPending: false,
    showError: false,
    errorMessage: ""
  };

  handleEmailChange = event => {
    const { value: email } = event.target;
    this.setState({
      email
    });
    if (!email) {
      this.setState({
        importDisabled: true
      });
    } else {
      this.setState({
        importDisabled: false
      });
    }
  };

  handleImportClick = async () => {
    this.setState({
      requestPending: true
    });
    const { email } = this.state;
    const importRequest = await fetch(
      `https://vocabifyapp.com/api/import-words?email=${email}`
    );
    const { status } = importRequest;
    switch (status) {
      case 200: {
        this.setState({
          requestPending: false
        });
        const importResponse = await importRequest.json();
        const { wordsList, wordsData } = importResponse;
        storage.set({
          wordsList,
          wordsData,
          showImportCard: false
        });
        break;
      }
      case 404: {
        this.setState({
          showError: true,
          errorMessage: "User not found",
          requestPending: false
        });
        break;
      }
      default:
        this.setState({
          showError: true,
          errorMessage:
            "Something went wrong. Please try again. If the problem persists, email hello@vocabifyapp.com",
          requestPending: false
        });
        break;
    }
  };

  handleDismissClick = () => {
    storage.set({ showImportCard: false });
  };

  renderErrorMessage = () => {
    const { showError, errorMessage } = this.state;
    if (showError) {
      return <p className="import-error">{errorMessage}</p>;
    }
    return null;
  };

  render() {
    const { email, importDisabled, requestPending } = this.state;
    return (
      <div className="import-card">
        <h2 className="title">Welcome to the new Vocabify!</h2>
        <p>
          If you have used Vocabify before, you'll need to enter your email
          below and then import your words.
        </p>
        <div className="import-form">
          <input
            type="email"
            className="email-input"
            value={email}
            placeholder="Email"
            onChange={this.handleEmailChange}
          />
          <button
            className="import-button"
            onClick={this.handleImportClick}
            disabled={importDisabled}
          >
            {requestPending ? "Loading..." : "Import words"}
          </button>
          {this.renderErrorMessage()}
        </div>
        <p className="dismiss-message">
          If you are completely new to Vocabify, simply dismiss this message.
        </p>
        <button className="dismiss-button" onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </div>
    );
  }
}

export default ImportWords;
