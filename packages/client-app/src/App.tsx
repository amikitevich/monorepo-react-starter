import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { AwesomeButton } from '@foretell/uikit';
// import { BackBtn } from '@foretell/shared';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={window.history}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <AwesomeButton>Hello with Love</AwesomeButton>
          <BackBtn />
        </header>
      </Router>
    </div>
  );
};

export default App;
