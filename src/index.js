import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { request } from './connect.js';
import { publish } from './event';
const url = require('url');

const historyList = [];
const chatList = [];
const currentConfig = {
    historyId: null,
    algorithm: '',
    uwuifyLevel: 0
};

const props = {
    history: historyList,
    chat: chatList,
    config: currentConfig,
    onConfigChange: confChange => {
        if(typeof confChange.algorithm !== 'undefined')currentConfig.algorithm = confChange.algorithm;
        if(typeof confChange.uwuifyLevel !== 'undefined')currentConfig.uwuifyLevel = confChange.uwuifyLevel;
    },
    onReadQuery: async(query) => {
        const path = url.format({
            pathname: '/ask',
            query: {
                q: query,
                alg: currentConfig.algorithm,
                hid: currentConfig.historyId,
                uwu: currentConfig.uwuifyLevel
            }
        });
        console.log(currentConfig);

        const req = request(path, data => {
            const response = JSON.parse(data);
            response.historyId = parseInt(response.historyId);
            response.timestamp = new Date(response.timestamp);
            console.log(response);

            currentConfig.historyId = response.history_id;
            chatList.push(response);
            publish('onChatListUpdate', chatList);
        });
        req.end();
        // const response = await acceptUserQuery(query, currentConfig);
    }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App props={props}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
