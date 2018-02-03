import React, { Component } from "react";

import { storage } from "../../constants";
import "./styles.css";

class AppFooter extends Component {
  handleImportClick = () => {
    storage.set({ showImportCard: true });
  };

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
        <span onClick={this.handleImportClick}>Import words</span>
      </div>
    );
  }
}

export default AppFooter;
