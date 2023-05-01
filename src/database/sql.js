//import  createConnection  from 'mysql';
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kevin",
  database: "chatgwipwiti"
});

con.connect();
async function getData(query) {
  //const query = 'SELECT * FROM chats';
  try {
    const results = await new Promise((resolve, reject) => {
      con.query(query, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    con.end();
  }
}

//prosedur menambah histori
function addHistory(id,name){
    let query = "INSERT INTO histories VALUES (\"" + id + "\",\"" + name +"\")";
    con.query(query,function (err, result) {
      if (err) throw err;
    });
    //return query;
}

function addChat(id,question,answer,algorithm) {
  let query = "INSERT INTO chats(history_id,question,answer,algorithm) VALUES (\"" + id + "\",\"" + question +"\",\""+ answer + "\",\""+ algorithm+"\")";
  con.query(query,function (err, result) {
    if (err) throw err;
  });
}
function addQuestion(question,answer){
    let query = "INSERT INTO questions VALUES (\"" + question + "\",\"" + answer +"\")";
    con.query(query,function (err, result) {
      if (err) throw err;
    });
}

async function getAnswer(question) {
    let query = "SELECT answer_pattern FROM questions WHERE question_pattern like \'" + question + "\'";
    const data = await getData(query);
    //console.log('The data is:', data);
    return data;
}

async function getHistoryName(id) {
    let query = "SELECT history_name FROM histories WHERE history_id = " + id;
    const data = await getData(query);
    //console.log('The data is:', data);
    return data;
}

async function getChatinHistory(id) {
    let query = "SELECT * FROM histories NATURAL JOIN chats WHERE history_id = " + id ;
    const data = await getData(query);
    console.log('The data is:', data);
    return data;
}

console.log(getChatinHistory(1));

//export default sql;
