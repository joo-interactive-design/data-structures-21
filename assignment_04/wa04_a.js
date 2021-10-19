const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = process.env.user;
db_credentials.host = process.env.host;
db_credentials.database = process.env.database;
db_credentials.password = process.env.password;
db_credentials.port = process.env.port;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();


// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});