import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'firebase/firestore';

import App from './App';
import './index.css';

const config = {
  apiKey: 'AIzaSyBwTk_erRP-kFLroaPA-lQZeaC4ZU6HSXk',
  authDomain: 'vocabify.firebaseapp.com',
  databaseURL: 'https://vocabify.firebaseio.com',
  projectId: 'vocabify'
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
