import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AccountsProvider } from './contexts/account.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AccountsProvider>
    <App />
  </AccountsProvider>
  // </React.StrictMode>
);
