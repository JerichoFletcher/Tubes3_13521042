const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kevin",
    database: "chatgwipwiti"
});

connection.connect();

async function getData() {
  const query = 'SELECT * FROM chats';
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
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
    connection.end();
  }
}

async function doSomethingWithData() {
  const data = await getData();
  console.log('The data is:', data);
  // do something with the data here
}

doSomethingWithData();