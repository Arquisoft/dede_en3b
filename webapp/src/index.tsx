
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// eslint-disable-next-line
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line
import NavigationBar from './components/NavigationBar';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor = {persistor}>
        <App/>  
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
