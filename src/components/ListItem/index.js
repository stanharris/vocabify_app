// @flow
import React, { PureComponent } from 'react';

import './styles.css';

class ListItem extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.id, !this.props.enabled);
  };

  render() {
    const { name, enabled } = this.props;
    let classNames = 'list-item';
    if (enabled) classNames = `${classNames} active`;
    return (
      <div className={classNames} onClick={this.handleClick}>
        {name} {enabled && 'tick icon'}
      </div>
    );
  }
}

export default ListItem;
