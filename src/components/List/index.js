// @flow
import React, { PureComponent, Fragment } from 'react';

import './styles.css';

class List extends PureComponent {
  render() {
    return (
      <Fragment>
        <h2 className="list-title">Definition sources</h2>
        <div className="list">{this.props.children}</div>
      </Fragment>
    );
  }
}

export default List;
