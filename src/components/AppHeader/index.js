import React, { Component } from "react";
import { connect } from "react-redux";

import { WORDS, REVIEW } from "../../constants/viewTypes";
import { updateView } from "../../actions/view";
import "./styles.css";

class AppHeader extends Component {
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

  render() {
    return (
      <div className="app-header">
        <h1 className="header-logo">Vocabify</h1>
        <div className="header-navigation">
          <button
            className={this.addActiveClass(WORDS)}
            onClick={this.onWordsClick}
          >
            Words
          </button>
          <button
            className={this.addActiveClass(REVIEW)}
            onClick={this.onReviewClick}
          >
            Review
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  activeView: state.view.activeView
}))(AppHeader);
