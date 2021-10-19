const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = process.env.user;
db_credentials.host = process.env.host;
db_credentials.database = process.env.database;
db_credentials.password = process.env.password;
db_credentials.port = process.env.port;



// var addressesForDb = [ {"address":"7 East 10th Street, New York, NY","latLong":{"lat":"40.6483895400048","lng":"-73.9705803172279"}},{"address":"155 East 22nd Street, New York, NY","latLong":{"lat":"40.7385487033475","lng":"-73.9843107652274"}},{"address":"61 Fourth Avenue, New York, NY","latLong":{"lat":"40.6823550359262","lng":"-73.9795868290333"}} ];
var addressesForDb = require('../assignment_03/data/first.json');

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 