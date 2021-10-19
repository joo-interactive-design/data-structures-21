var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, restaurantOrCafe, name, visitDate, address, recommend, comment) {
    this.pk = {};
    this.pk.N = primaryKey.toString(); //number->string
    this.name = {};
    this.name.S = restaurantOrCafe;
    this.address = {};
    this.address.S = address;
    this.visitDate = {}; 
    this.visitDate.S = new Date(visitDate).toDateString();// convert to javascript date format
    this.address = {};
    this.address.S = address;
    this.recommend = {};
    this.recommend.BOOL = recommend; 
    if (comment != null) {
        this.comment = {};
        this.comment.S = comment; 
    }
  }
}

blogEntries.push(new BlogEntry(0, 'cafe', 'paper coffee', 'October 01, 2021', '44 W 29th St, New York, NY 10001', true, 'I loved the wooden interior, which is very cozy! small coffee spot inside boutique hotel Made.'));
blogEntries.push(new BlogEntry(1, 'restaurant', 'AOI Kitchen', 'October 03, 2021', '320 E 6th St, New York, NY 10003', true, 'One of the most unique Japanese place I’ve been to in the east village.'));
blogEntries.push(new BlogEntry(2, 'restaurant', "ruby's", 'October 15, 2021', '442 3rd Ave, New York, NY', true, 'Great brunch spot'));
blogEntries.push(new BlogEntry(3, 'cafe', "Eileen's Special Cheesecake", 'October 10, 2021', '17 Cleveland Pl, New York, NY 10012', true, 'Best cheese cake, ever.'));

console.log(blogEntries);


var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2a";

var dynamodb = new AWS.DynamoDB();

var params = {};
params.Item = blogEntries[0]; 
params.TableName = "processblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});