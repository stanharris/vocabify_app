import React, { PureComponent } from "react";

import summerImg from "../../assets/img/summer.svg";
import "./styles.css";

class NoWordsPendingReview extends PureComponent {
  render() {
    return (
      <div className="no-words-card">
        <img src={summerImg} alt="" />
        <h2>
          All done for today <span role="img">👍</span>
        </h2>
      </div>
    );
  }
}

export default NoWordsPendingReview;
