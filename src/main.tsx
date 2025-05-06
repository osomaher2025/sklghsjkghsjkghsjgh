
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './lib/process-polyfill';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
