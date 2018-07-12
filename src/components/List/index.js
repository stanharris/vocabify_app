// @flow
import React, { PureComponent, Fragment } from 'react';

import './styles.css';

type Props = {
  isLoading: boolean,
  title: string
};

class List extends PureComponent<Props> {
  render() {
    const { isLoading, title, children } = this.props;
    if (isLoading) return <p className="loading">Loading...</p>;
    if (children.length) {
      return (
        <Fragment>
          {title && <h2 className="list-title">{title}</h2>}
          <div className="list">{children}</div>
        </Fragment>
      );
    }
    return null;
  }
}

export default List;
