//import  createConnection  from 'mysql';
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kevin",
  database: "chatgwipwiti"
});
con.connect();

export async function getData(query) {
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
export function addHistory(name){
    let query = "INSERT INTO histories(history_name) VALUES ( ? )";
    //con.connect();
    con.query(query,[name],function (err, result) {
      if (err) throw err;
    });
    //con.end();
    //return query;
}

export function addChat(id,question,answer,algorithm) {
  let query = "INSERT INTO chats(history_id,question,answer,algorithm) VALUES ( ? , ? , ? , ? )";
  
  con.query(query,[id,question,answer,algorithm],function (err, result) {
    if (err) throw err;
  });
  //con.end();
}
export function addQuestion(question,answer){
    let query = "INSERT INTO questions VALUES ( ? , ? )";
    con.query(query,[question,answer],function (err, result) {
      if (err) throw err;
    });
}

export function removeQuestion(question){
    let query = "DELETE FROM questions";
    con.query(query,[question],function (err, result) {
      if (err) throw err;
    });
}

export async function getQuestions(question) {
    let query = "SELECT * FROM questions";
    const data = await getData(query);
    //console.log('The data is:', data);
    return data;
}

export async function getAllHistory(id) {
  let query = "SELECT * FROM histories";
  const data = await getData(query);
  //console.log('The data is:', data);
  return data;
}

export async function getHistoryName(id) {
    let query = "SELECT history_name FROM histories WHERE history_id = " + id;
    const data = await getData(query);
    //console.log('The data is:', data);
    return data;
}

export async function getChatinHistory(id) {
    let query = "SELECT * FROM histories NATURAL JOIN chats WHERE history_id = " + id + " ORDER BY timestamp";
    //con.connect();
    const data = await getData(query);
    //console.log('The data is:', data);
    return data;
    //let result;
    //con.query(query, function (error, results, fields) {
    //  if (error) throw error;
  //
    //  // Hasil query tersimpan di dalam variable "results"
    //  console.log(results);
  //
    //  // Tutup koneksi ke database
    //  con.end();
    //});
    ////console.log('The data is:', data);
    //return result;
}


//export default sql;
