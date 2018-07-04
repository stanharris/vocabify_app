import React, { PureComponent } from 'react';
import firebase from 'firebase';

import './styles.css';

class AppHeader extends PureComponent {
  state = {
    showSignIn: null
  };

  handleSignInClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        this.setState({
          showSignIn: false
        });
      })
      .catch(() => {
        // TODO - Handle error
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          showSignIn: false
        });
      } else {
        this.setState({
          showSignIn: true
        });
      }
    });
  }

  render() {
    const {
      showWordsView,
      showReviewView,
      handleWordsClick,
      handleReviewClick
    } = this.props;
    const { showSignIn } = this.state;
    return (
      <header className="app-header">
        <h1 className="header-logo">Vocabify</h1>
        <div className="header-navigation">
          <button
            onClick={handleWordsClick}
            className={showWordsView ? 'active' : ''}
          >
            Words
          </button>
          <button
            onClick={handleReviewClick}
            className={showReviewView ? 'active' : ''}
          >
            Review
          </button>
          <div className="button-divider" />
          {showSignIn && (
            <button onClick={this.handleSignInClick}>Sign in</button>
          )}
        </div>
      </header>
    );
  }
}

export default AppHeader;
