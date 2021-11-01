const { Client } = require('pg');
const Table = require('console.table');
const dotenv = require('dotenv');
dotenv.config();  


// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'joojoo';
db_credentials.host = 'ds-fall-21.cfbwimnbp6s8.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.password;
db_credentials.port = 5432;


// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
// var thisQuery = "SELECT mtgday, mtgtime, mtglocation, mtgaddress, mtgtypes FROM aadata WHERE mtgday = 'Monday' and mtghour >= 19;";

var thisQuery = "SELECT address, lat, long FROM aalocations WHERE long >= -73.95 and long <= -73.94;";


client.query(thisQuery, (err, res) => { 
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});