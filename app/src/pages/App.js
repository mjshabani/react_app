import React from 'react';
import logo from '../logo.svg';
import './App.css';
import {Button} from '@material-ui/core'
import Login from '../components/Login'
import axios from 'axios'

var axiosConfig = {
  headers: {'Access-Control-Allow-Origin': '*'}
};

function login(username, password) {
  let res = axios.post('http://localhost:8080/api/admin/login', {
    username: username,
    password: password
  }, axiosConfig)
  .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          سامانه رزرو زمان مشاوره
        </h1>
        <Login onClick={login}></Login>
      </header>
    </div>
  );
}

export default App;