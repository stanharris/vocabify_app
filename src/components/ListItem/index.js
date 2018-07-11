// @flow
import React, { PureComponent } from 'react';

import './styles.css';

class ListItem extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.id, this.props.enabled);
  };

  render() {
    const { name, enabled } = this.props;
    return (
      <div className="list-item" onClick={this.handleClick}>
        {name} {enabled ? 'enabled' : 'disabled'}
      </div>
    );
  }
}

export default ListItem;
