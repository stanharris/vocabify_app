// @flow
import React, { PureComponent, Fragment } from 'react';

import styles from './styles.module.css';

type Props = {
  isLoading: boolean,
  title: string
};

class List extends PureComponent<Props> {
  render() {
    const { isLoading, title, children } = this.props;
    if (isLoading) return <p className={styles.loading}>Loading...</p>;
    if (children.length) {
      return (
        <Fragment>
          {title && <h2 className={styles.listTitle}>{title}</h2>}
          <div className={styles.list}>{children}</div>
        </Fragment>
      );
    }
    return null;
  }
}

export default List;
