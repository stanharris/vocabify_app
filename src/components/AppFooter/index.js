// @flow
import React, { PureComponent } from 'react';

import styles from './styles.module.css';

class AppFooter extends PureComponent<{}> {
  render() {
    return (
      <div className={styles.appFooter}>
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
