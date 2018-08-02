// @flow
import React, { Component } from 'react';
import Modal from 'react-modal';

import Card from '../Card';
import List from '../List';
import ListItem from '../ListItem';
import styles from './styles.module.css';

Modal.setAppElement('#root');

type Props = {
  word: string,
  isOpen: boolean,
  handleModalClose: () => void
};

class ManageDefinitionsModal extends Component<Props> {
  renderDefinitions = () =>
    this.props.definitionList.map(item => (
      <List title={item.source.name}>
        {item.definitionList.map(definitionItem => (
          <ListItem
            title={definitionItem.definition}
            subtitle={definitionItem.example}
            enabled={definitionItem.enabled}
          />
        ))}
      </List>
    ));

  render() {
    const { definitionList } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleModalClose}
        className={styles.content}
        overlayClassName={{
          base: styles.overlay,
          afterOpen: styles.afterOpen
        }}
      >
        <Card>
          <h2 className={styles.title}>{this.props.word}</h2>
          {definitionList && this.renderDefinitions()}
        </Card>
      </Modal>
    );
  }
}

export default ManageDefinitionsModal;
