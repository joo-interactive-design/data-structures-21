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

// geocode addresses
let meetingsData = [];

//To read txt file ! 
var addressFile = fs.readFileSync('addressData.txt')
console.log(addressFile.toString())
const addressArray = addressFile.toString().replace(/\r\n/g,'\n').split('\n');
console.log(addressArray)
    


// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addressArray, function(value, callback) {
    // console.log(callback)
    // console.log(value)
    
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
    
    

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    
    // console.log(apiRequest)

    (async () => {
    	try {
    		const response = await got(apiRequest);
    // 		console.log("response", response)
    		let tamuGeo = JSON.parse(response.body);
    		console.log({address: value + ', New York, NY', latLong:{lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude, lng: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude}})
    		
    // 		console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
    		meetingsData.push({address: value + ', New York, NY', latLong:{lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude, lng: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude}});
    	} catch (error) {
    // 		console.log(error.response.body);
        console.log(error)
    	}
    })();

    // sleep for a couple seconds before making the next request
  
  
    setTimeout(callback, 2000);
    // console.log(query)
    
}, function() {
    console.log(meetingsData)
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    // console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});