// @flow
import React, { PureComponent } from 'react';

import './styles.css';

class List extends PureComponent {
  render() {
    return <div className="list">{this.props.children}</div>;
  }
}

export default List;
