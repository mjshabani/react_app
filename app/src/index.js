import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import localIpUrl from 'local-ip-url';
import { Provider } from 'react-redux'
import store from './redux/store'
import Routing from './routing'
import axios from 'axios'
import './index.css';

const ipAddress = localIpUrl();
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'http://' + ipAddress + ':8080/api'

ReactDOM.render(
  <Provider store={store}>
    <Routing/>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
