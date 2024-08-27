import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/base.css';
import { Demo } from './Demo';
import { addAllMainEventListeners } from './ipcEvent';

addAllMainEventListeners();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
