import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          سامانه رزرو زمان مشاوره
        </p>
        <Button variant='contained' >ورود به سامانه</Button>
      </header>
    </div>
  );
}

export default App;