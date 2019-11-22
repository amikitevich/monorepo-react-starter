import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppApolloProvider, AppErrorBoundary, AppUserProvider, GUIProvider } from '@foretell/shared';
import LoginModal from './shared/LoginModal/LoginModal';

ReactDOM.render(
  <BrowserRouter>
    <AppErrorBoundary>
      <AppApolloProvider>
        <AppUserProvider>
          <GUIProvider LoginModal={LoginModal}>
            <App />
          </GUIProvider>
        </AppUserProvider>
      </AppApolloProvider>
    </AppErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export function getJSONFromLocalStorage(key, defaultValue) {
  return getJSONFromStorage(key, defaultValue, localStorage);
}

export function getJSONFromSessionStorage(key, defaultValue) {
  return getJSONFromStorage(key, defaultValue, sessionStorage);
}

function getJSONFromStorage(key, defaultValue, storage = localStorage) {
  let value;

  try {
    value = JSON.parse(storage.getItem(key)) || defaultValue;
  } catch (err) {
    const e = new Error(`can not get value by key ${key} from storage. Original Error: ${err.message}`);
    console.log(e);
    value = defaultValue;
  }
  return value;
}

export function setJSONToLocalStorage(key, value) {
  try {
    setToLocalStorage(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}

export function setToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}
