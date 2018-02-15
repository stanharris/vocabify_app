import React, { Component } from "react";

import "./styles.css";

class AppFooter extends Component {
  render() {
    return (
      <div className="app-footer">
        <a
          href="https://github.com/paulbreslin/vocabify_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          View code on GitHub
        </a>
      </div>
    );
  }
}

export default AppFooter;
