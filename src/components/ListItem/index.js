// @flow
import React, { PureComponent } from 'react';

import styles from './styles.module.css';

type Props = {
  id: string,
  title: string,
  subtitle?: string,
  enabled: boolean,
  onClick: (string, boolean) => void
};

class ListItem extends PureComponent<Props> {
  handleClick = () => {
    this.props.onClick(this.props.id, !this.props.enabled);
  };

  render() {
    const { title, subtitle, enabled } = this.props;
    let classNames = styles.item;
    if (enabled) classNames = `${classNames} ${styles.active}`;
    return (
      <div className={classNames} onClick={this.handleClick}>
        <div className={styles.check}>
          {enabled ? (
            <i class="material-icons">check_circle_outline</i>
          ) : (
            <i class="material-icons">radio_button_unchecked</i>
          )}
        </div>
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    );
  }
}

export default ListItem;
