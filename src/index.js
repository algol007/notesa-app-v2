import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';

const firebaseConfig = {
  apiKey: "AIzaSyB-JrVRWfhO3LSqoNJyblW37Swb-OA43Ug",
  authDomain: "notesa-app-v2.firebaseapp.com",
  databaseURL: "https://notesa-app-v2.firebaseio.com",
  projectId: "notesa-app-v2",
  storageBucket: "notesa-app-v2.appspot.com",
  messagingSenderId: "523471668039",
  appId: "1:523471668039:web:69eb6c1664476eadcc4262",
  measurementId: "G-R29M72EC66"
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
