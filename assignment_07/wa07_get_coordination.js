"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      got = require('got'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'


for (let i=1; i<11; i++){
    
    if ( i == 10){
        var fileName = 'aa10'
    }else{
        var fileName = 'aa0' + i;
    }
    
   getCordinate(fileName)
    
}


async function getCordinate(fileName){
    
    
  

//'require' to read file
var jsonData = require(`./newdata/${fileName}.json`)

// geocode addresses
let meetingsData = [];


// console.log(jsonData)

//map은 배열을 루프 하면서 function 지정 내용대로 수정
var jsonDataWithCoordinate = jsonData.map(function(e){
    e.coordinate = 'test'
    return e    
    
})

// console.log(jsonDataWithCoordinate)


    
// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(jsonDataWithCoordinate, function(value, callback) {
    // console.log(callback)
    console.log(value)
    
    let query = {
        streetAddress: value.address,
        city: value.city,
        state: value.state,
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
    
    // console.log(query)

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    
    // console.log(apiRequest)

    (async () => {
    	try {
    		const response = await got(apiRequest);
    // 		console.log("response", response)
    		let tamuGeo = JSON.parse(response.body);
    		
    // 		console.log(value.coordinate)
    		
    		value.coordinate = {lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude, lng: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude}
    		
    // 		console.log(value)
    		
    		
    	
        	meetingsData.push(value);
        	console.log(meetingsData)
        	

    	} catch (error) {
    		console.log(error.response.body);
    	}
    })();

    // sleep for a couple seconds before making the next request
  
  
    setTimeout(callback, 2000);
    
    
        	
    
}, function() {
    console.log(meetingsData)
    fs.writeFileSync(`dataWithCoordinate/${fileName}_data.json`, JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    // console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});

}