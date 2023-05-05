import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { request } from './connect.js';
const url = require('url');

const historyList = [];
const chatList = [
{
    history_id: 1,
    timestamp: new Date(2023, 5, 3, 10, 15, 23),
    question: "Ini apa?",
    answer: "Ini itu",
    algorithm: "KMP"
},
{
    history_id: 1,
    timestamp: new Date(2023, 5, 3, 10, 16, 23),
    question: "Itu apa?",
    answer: "Itu ini",
    algorithm: "BM"
},
{
    history_id: 1,
    timestamp: new Date(2023, 5, 5, 22, 18, 46),
    question: "7Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    algorithm: "KMP"
}];
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
            console.log(response);
            currentConfig.historyId = response.history_id;
            chatList.push(response);
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
