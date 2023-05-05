import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { UserQueryConfig, init } from './backend/backendIntf.js';

const historyList = [];
const currentConfig = new UserQueryConfig();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App props={{
        history: historyList,
        config: currentConfig,
        onConfigChange: confChange => {
            if(typeof confChange.algorithm !== 'undefined')currentConfig.algorithm = confChange.algorithm;
            if(typeof confChange.uwuifyLevel !== 'undefined')currentConfig.uwuifyLevel = confChange.uwuifyLevel;
        }
    }}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.log('[INFO] Begin initialization');
init();
console.log('[INFO] End initialization');
