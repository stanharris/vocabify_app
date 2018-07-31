// @flow
import * as React from 'react';

import styles from './styles.module.css';

type Props = {
  className: string,
  children: React.Node
};

class Card extends React.PureComponent<Props> {
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div className={`${styles.card} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
