import React, { PureComponent } from "react";

import "./styles.css";

class AppHeader extends PureComponent {
  render() {
    const {
      showWordsView,
      showReviewView,
      handleWordsClick,
      handleReviewClick
    } = this.props;
    return (
      <header className="app-header">
        <h1 className="header-logo">Vocabify</h1>
        <div className="header-navigation">
          <button
            onClick={handleWordsClick}
            className={showWordsView ? "active" : ""}
          >
            Words
          </button>
          <button
            onClick={handleReviewClick}
            className={showReviewView ? "active" : ""}
          >
            Review
          </button>
        </div>
      </header>
    );
  }
}

export default AppHeader;
