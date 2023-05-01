//import  createConnection  from 'mysql';
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kevin",
  database: "chatgwipwiti"
});

//prosedur menambah histori
function addHistory(id,name){
    let query = "INSERT INTO histories VALUES (\"" + id + "\",\"" + name +"\")";
    con.connect();
    con.query(query,function (err, result) {
      if (err) throw err;
    });
    //return query;
}

function addChat(id,question,answer,algorithm) {
  let query = "INSERT INTO chats(history_id,question,answer,algorithm) VALUES (\"" + id + "\",\"" + question +"\",\""+ answer + "\",\""+ algorithm+"\")";
  con.connect();
  con.query(query,function (err, result) {
    if (err) throw err;
  });
}
function addQuestion(question,answer){
    let query = "INSERT INTO questions VALUES (\"" + question + "\",\"" + answer +"\")";
    con.connect();
    con.query(query,function (err, result) {
      if (err) throw err;
    });
}

function getAnswer(question) {
    let query = "SELECT answer_pattern FROM questions WHERE question_pattern like \'" + question + "\'";
    con.connect();
    con.query(query,function (err, result) {
      if (err) throw err;
      console.log(result);
    });
}

function getHistoryName(id) {
    let query = "SELECT history_name FROM histories WHERE history_id = " + id;
    con.connect();
    con.query(query,function (err, result) {
      if (err) throw err;
      console.log(result);
    });
}

function getChatinHistory(id) {
    let query = "SELECT * FROM histories NATURAL JOIN chats WHERE history_id = " + id ;
    let arrResult = new Array();
    con.connect();
    con.query(query,function (err, result) {
      if (err) throw err;
      for(let i=0; i< result.length;i++){
        let sub = [];
        sub.push(result[i].timestamp);
        sub.push(result[i].question);
        sub.push(result[i].answer);
        sub.push(result[i].algorithm);
        //console.log(sub);
        arrResult.push(sub);
        //return arrResult;
      }
      console.log(arrResult);
    }
    );
    //console.log(arrResult);
    //return arrResult;
}

//console.log(getChatinHistory(1));

export default sql;
