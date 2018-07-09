import React, { PureComponent } from 'react';

import './styles.css';

class Card extends PureComponent {
  render() {
    return <div className="card">{this.props.children}</div>;
  }
}

export default Card;
