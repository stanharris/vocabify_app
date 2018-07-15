// @flow
import React, { Component } from 'react';
import firebase from 'firebase/app';
import Modal from 'react-modal';

import Card from '../Card';
import './styles.css';

Modal.setAppElement('#root');

// Modal.defaultStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(157, 103, 91, 1)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   content: {
//     border: '1px solid #ccc',
//     background: '#fff',
//     overflow: 'auto',
//     WebkitOverflowScrolling: 'touch',
//     borderRadius: '4px',
//     outline: 'none',
//     padding: '20px'
//   }
// };

class ManageDefinitionsModal extends Component<{}> {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleModalClose}
        className="content"
        overlayClassName={{
          base: 'overlay',
          afterOpen: 'after-open'
        }}
      >
        <Card>Modal content</Card>
      </Modal>
    );
  }
}

export default ManageDefinitionsModal;
