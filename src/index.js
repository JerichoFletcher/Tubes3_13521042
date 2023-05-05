import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

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
// {
//     history_id: 1,
//     timestamp: new Date(2023, 5, 3, 10, 18, 46),
//     question: "1Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
//     answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
//     algorithm: "KMP"
// },
// {
//     history_id: 1,
//     timestamp: new Date(2023, 5, 3, 13, 18, 6),
//     question: "2Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
//     answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
//     algorithm: "KMP"
// },
// {
//     history_id: 1,
//     timestamp: new Date(2023, 5, 3, 22, 0, 11),
//     question: "3Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
//     answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
//     algorithm: "KMP"
// },
// {
//     history_id: 1,
//     timestamp: new Date(2023, 5, 3, 22, 18, 46),
//     question: "4Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
//     answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
//     algorithm: "KMP"
// },
// {
//     history_id: 1,
//     timestamp: new Date(2023, 5, 3, 23, 23, 23),
//     question: "5Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
//     answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
//     algorithm: "KMP"
// },
// {
//     history_id: 1,
//     timestamp: new Date(2023, 5, 4, 22, 18, 46),
//     question: "6Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
//     answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
//     algorithm: "KMP"
// },
{
    history_id: 1,
    timestamp: new Date(2023, 5, 5, 22, 18, 46),
    question: "7Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    algorithm: "KMP"
}];
//const currentConfig = new UserQueryConfig(1);
const currentConfig = {
    historyId: 1,
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
        // const response = await acceptUserQuery(query, currentConfig);
        // chatList.push(response);
        // console.log(response);
        console.log(query);
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

/// SEGMENT HTTP CONNECTION TEST
const http = require('http');
const options = {
    hostname: '192.168.0.6',
    port: 8000,
    path: '/getQuestions',
    method: 'GET'
};

const req = http.request(options, res => {
    let data = '';
    res.on('data', d => {
        data += d;
    });
    res.on('end', () => {
        const resData = JSON.parse(data);
        console.log(resData);
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();

