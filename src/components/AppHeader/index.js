import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";

import { host } from "../../config";
import { WORDS, REVIEW } from "../../constants/viewTypes";
import { updateView } from "../../actions/view";
import { syncWords } from "../../actions/words";
import { signIn, signOut } from "../../actions/auth";
import "./styles.css";

class AppHeader extends Component {
  state = {
    showProfile: false
  };

  onWordsClick = () => {
    const { dispatch } = this.props;
    dispatch(updateView(WORDS));
  };

  onReviewClick = () => {
    const { dispatch } = this.props;
    dispatch(updateView(REVIEW));
  };

  addActiveClass = navLink => {
    const { activeView } = this.props;
    if (activeView === navLink) {
      return "active";
    }
  };

  onSignInSuccess = async response => {
    const { dispatch, words } = this.props;
    const { profileObj: userProfile } = response;
    dispatch(signIn(userProfile));

    const { email } = userProfile;
    const syncData = {
      email,
      words
    };
    const syncResponse = await fetch(`${host}/api/v1/sync`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(syncData)
    });
    const data = await syncResponse.json();
    dispatch(syncWords(data));
  };

  onSignInFailure = error => {
    // TODO
  };

  onSignOutClick = () => {
    // Remove user profile from app state
    // (Doesn't trigger call to Google but I wonder if that's necessary?)
    const { dispatch } = this.props;
    dispatch(signOut);
    this.setState({
      showProfile: false
    });
  };

  onProfileImgClick = () => {
    const { showProfile } = this.state;
    this.setState({
      showProfile: !showProfile
    });
    // TODO - Add window event listener to close popup on click outside of component
  };

  render() {
    const { showProfile } = this.state;
    const { isSignedIn } = this.props.auth;
    const { email, name, imageUrl } = this.props.auth.userProfile;

    const profile = (
      <div className="profile-detail">
        <div className="profile-detail-email">{email}</div>
        <button className="google-sign-out" onClick={this.onSignOutClick}>
          Sign out
        </button>
      </div>
    );

    return (
      <div className="app-header">
        <h1 className="header-logo">Vocabify</h1>
        <div className="header-navigation">
          <button
            className={this.addActiveClass(WORDS)}
            onClick={this.onWordsClick}
          >
            {WORDS}
          </button>
          <button
            className={this.addActiveClass(REVIEW)}
            onClick={this.onReviewClick}
          >
            {REVIEW}
          </button>
        </div>
        {!isSignedIn && (
          <GoogleLogin
            className="google-sign-in"
            clientId="548701809892-m8dg0mlqjk8ldbd9dd8actnpv6jeq7f0.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={this.onSignInSuccess}
            onFailure={this.onSignInFailure}
          />
        )}
        {isSignedIn && (
          <img
            src={imageUrl}
            alt={name}
            className="user-profile"
            onClick={this.onProfileImgClick}
          />
        )}
        {showProfile && profile}
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  activeView: state.view.activeView,
  words: state.words
}))(AppHeader);
