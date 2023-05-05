import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { request } from './connect.js';
import { publish } from './event';
const url = require('url');

var historyList = [];
var chatList = [];
const currentConfig = {
    historyId: null,
    algorithm: 'KMP',
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
        const pathChat = url.format({
            pathname: '/ask',
            query: {
                q: query,
                alg: currentConfig.algorithm,
                hid: currentConfig.historyId,
                uwu: currentConfig.uwuifyLevel
            }
        });
        console.log(currentConfig);

        const pathHistory = url.format({
            pathname: '/hist'
        });
        
        const reqChat = request(pathChat, data => {
            const response = JSON.parse(data);
            response.historyId = parseInt(response.historyId);
            response.timestamp = new Date(response.timestamp);
            console.log(response);

            currentConfig.historyId = response.history_id;
            chatList.push(response);
            publish('onChatListUpdate', chatList);
        });
        reqChat.end(() => {
            const reqHistory = request(pathHistory, data => {
                
                const response = JSON.parse(data);
                console.log(response);
    
                historyList = response.data;
                publish('onHistoryListUpdate', historyList);
            });
            reqHistory.end();
        });
    },
    onReloadChat: async(historyId) => {
        if(historyId === null){
            console.log('[INFO] Unloading current chat');
            chatList = [];
            currentConfig.historyId = null;

            publish('onChatListUpdate', chatList);
        }else{
            console.log(`[INFO] Loading chat ID ${historyId}`);
            currentConfig.historyId = historyId;

            const path = url.format({
                pathname: '/hist',
                query: {
                    id: historyId
                }
            });
            
            const reqHistory = request(path, data => {
                const response = JSON.parse(data);
                console.log(response);

                chatList = [];
                for(let i = 0; i < response.data.length; i++){
                    const chat = {
                        history_id: parseInt(response.data[i].historyId),
                        question: response.data[i].question,
                        answer: response.data[i].answer,
                        timestamp: new Date(response.data[i].timestamp),
                        algorithm: response.data[i].algorithm
                    };
                    chatList.push(chat);
                }
                
                publish('onChatListUpdate', chatList);
            });
            reqHistory.end();
        }
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

const pathHistory = url.format({
    pathname: '/hist'
});

const reqHistory = request(pathHistory, data => {
    const response = JSON.parse(data);
    console.log(response);
    
    historyList = response.data;
    publish('onHistoryListUpdate', historyList);
});
reqHistory.end();
