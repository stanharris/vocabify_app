import React, { Component } from "react";
import { FirebaseAuth } from "react-firebaseui";
import firebase from "firebase";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import WordInput from "./components/WordInput";
import WordsList from "./containers/WordsList";
import ReviewView from "./containers/ReviewView";
import "./App.css";

const config = {
  apiKey: "AIzaSyBwTk_erRP-kFLroaPA-lQZeaC4ZU6HSXk",
  authDomain: "vocabify.firebaseapp.com",
  databaseURL: "https://vocabify.firebaseio.com"
};
firebase.initializeApp(config);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user);
    // // User is signed in.
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

class App extends Component {
  state = {
    showWordsView: true,
    showReviewView: false
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
    // browser.tabs.create({
    //   url: "/index.html"
    // });
  };

  render() {
    const { showWordsView, showReviewView } = this.state;
    return (
      <div className="app">
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        <div className="app-view">
          <AppHeader
            showWordsView={showWordsView}
            showReviewView={showReviewView}
            handleWordsClick={this.handleWordsClick}
            handleReviewClick={this.handleReviewClick}
          />
          <div className={showWordsView ? "" : "hide"}>
            <WordInput />
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
