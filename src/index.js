import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import {
  getFirebase,
  reactReduxFirebase,
  firebaseReducer
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import './index.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBwTk_erRP-kFLroaPA-lQZeaC4ZU6HSXk',
  authDomain: 'vocabify.firebaseapp.com',
  databaseURL: 'https://vocabify.firebaseio.com',
  projectId: 'vocabify'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true
};

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
  devToolsEnhancer(),
  applyMiddleware(thunk.withExtraArgument(getFirebase))
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
