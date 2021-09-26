const mysql = require('mysql');
const conn = {
    host: 'localhost',
    port: '3306',
    user: 'user',
    possword: 'pw',
    database: 'monolithic'
};

var connection = mysql.createConnection(conn);
connection.connect();

var testQuery = "INSERT INTO  `members`(`username`,`password`) VALUES ('test','test');";

connection.query(testQuery, (err, results, fields) => {
    if (err) {
        console.log(err);
    } console.log(results);
});

testQuery = "SELECT * FROM MEMBERS";

connection.query(testQuery, (err, results, field) => {
    if (err) {
        console.log(err);
    } console.log(results);
});

connection.end();