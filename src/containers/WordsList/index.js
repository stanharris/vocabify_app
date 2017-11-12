import React, { Component } from 'react';
import { connect } from 'react-redux';

class WordsList extends Component {
  render() {
    return <div>Word list</div>;
  }
}

export default connect()(WordsList);
