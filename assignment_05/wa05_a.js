var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, colorPalette01, colorPalette02, colorPalette03, colorPalette04, place, date, image, comment) {
    this.pk = {};
    this.pk.N = primaryKey.toString(); //number->string
    this.colorPalette01 = {};
    this.colorPalette01.S = colorPalette01;
    this.colorPalette02 = {};
    this.colorPalette02.S = colorPalette02;
    this.colorPalette03 = {};
    this.colorPalette03.S = colorPalette03;
    this.colorPalette04 = {};
    this.colorPalette04.S = colorPalette04;
    this.place = {};
    this.place.S = place;
    this.date = {}; 
    this.date.S = new Date(date).toDateString();// convert to javascript date format
    this.image= {};
    this.image.S = image;
    if (comment != null) {
        this.comment = {};
        this.comment.S = comment; 
    }
    
  }
}

blogEntries.push(new BlogEntry(0, '#808ca4', '#9d8488', '#d4907d', '#fea67a', 'Tokyo,Japan', 'March 13, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc', 'on the way to home after working!'))
blogEntries.push(new BlogEntry(1, '#60748f', '#8995a5', '#abb9c6', '#c5d0d4', 'Tokyo,Japan', 'April 08, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc', 'Heading back to Korea after family trip'))
blogEntries.push(new BlogEntry(2, '#fbb091', '#afcdd7', '#6f8698', '#dcd1b5', 'Tokyo,Japan', 'May 05, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc'))
blogEntries.push(new BlogEntry(3, '#db7a57', '#f9ad59', '#b9b9b7', '#fcb479', 'Tokyo,Japan', 'May 10, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc'))


console.log(blogEntries);


var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

for (var i=0; i< blogEntries.length; i++){ var params = {};
params.Item = blogEntries[i]; 
params.TableName = "processblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}