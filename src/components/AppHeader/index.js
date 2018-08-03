// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { NavLink } from 'react-router-dom';

import cogIcon from '../../assets/img/cog.svg';
import styles from './styles.module.css';

type State = {
  showSignIn: boolean
};

class AppHeader extends Component<{}, State> {
  state = {
    showSignIn: false
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

  handleSignOutClick = () => {
    firebase.auth().signOut();
  };

  render() {
    const { showSignIn } = this.state;
    return (
      <header className={styles.appHeader}>
        <h1 className={styles.headerLogo}>Vocabify</h1>
        <div className={styles.headerNavigation}>
          <NavLink exact to="/" activeClassName={styles.active}>
            <button>Words</button>
          </NavLink>
          <NavLink to="/review" activeClassName={styles.active}>
            <button>Review</button>
          </NavLink>
          <div className={styles.actionButtons}>
            <NavLink to="/settings" activeClassName={styles.active}>
              <img src={cogIcon} className={styles.settingsIcon} alt="" />
            </NavLink>
            {showSignIn && (
              <button onClick={this.handleSignInClick}>Sign in</button>
            )}
            {!showSignIn && (
              <button onClick={this.handleSignOutClick}>Sign out</button>
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
