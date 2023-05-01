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
      con.query(query,(error, results, fields) => {
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
    let query = "INSERT INTO histories VALUES (\" ? \",\" ? \")";
    con.query(query,[id,name],function (err, result) {
      if (err) throw err;
    });
    //return query;
}

function addChat(id,question,answer,algorithm) {
  let query = "INSERT INTO chats(history_id,question,answer,algorithm) VALUES (\" ? \",\" ? \",\" ? \",\" ? \")";
  con.query(query,[id,question,answer,algorithm],function (err, result) {
    if (err) throw err;
  });
}
function addQuestion(question,answer){
    let query = "INSERT INTO questions VALUES (\" ? \",\" ? \")";
    con.query(query,[question,answer],function (err, result) {
      if (err) throw err;
    });
}

function removeQuestion(question){
    let query = "DELETE FROM questions WHERE question_pattern like \" ? \"";
    con.query(query,[question],function (err, result) {
      if (err) throw err;
    });
}

async function getQuestions(question) {
    let query = "SELECT * FROM questions";
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
    let query = "SELECT * FROM histories NATURAL JOIN chats WHERE history_id = " + id + " ORDER BY timestamp";
    const data = await getData(query);
    //console.log('The data is:', data);
    return data;
}

//console.log(getChatinHistory(1));

export default sql;
