import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AwesomeButton } from '@project-namespace/uikit';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <AwesomeButton>Hello with Love</AwesomeButton>
      </header>
    </div>
  );
};

export default App;
