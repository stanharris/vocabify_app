// @flow
import React, { PureComponent } from 'react';

import './styles.css';

type Props = {
  id: string,
  name: string,
  enabled: boolean,
  onClick: (string, boolean) => void
};

class ListItem extends PureComponent<Props> {
  handleClick = () => {
    this.props.onClick(this.props.id, !this.props.enabled);
  };

  render() {
    const { name, enabled } = this.props;
    let classNames = 'list-item';
    if (enabled) classNames = `${classNames} active`;
    return (
      <div className={classNames} onClick={this.handleClick}>
        <div className="check">
          {enabled ? (
            <i class="material-icons">check_circle_outline</i>
          ) : (
            <i class="material-icons">radio_button_unchecked</i>
          )}
        </div>
        <div className="list-text">{name}</div>
      </div>
    );
  }
}

export default ListItem;
