## The Process Blog DB Plan - My Sky Diary

I'm using noSQL database to store the data of my sky photos that I took, which includes images, date, color palettes, place where these were taken, and comments

![noSQL](https://user-images.githubusercontent.com/86972559/138000480-29979e8f-2d15-438a-a6a2-6b36bb04ae03.png)

![Screen Shot 2021-10-19 at 3 48 46 PM](https://user-images.githubusercontent.com/86972559/138000505-64609b3f-2404-4fc4-9add-7231dbe703d9.png)

### visual reference
![Screen Shot 2021-10-20 at 12 52 16 PM](https://user-images.githubusercontent.com/86972559/138137076-8bd4ddc2-a41d-4afb-ac44-9883bd35d2e1.png)




### The Process
1. Create BlogEntry class to store the value
```js
class BlogEntry {
  constructor(primaryKey, day/night, city/country, colorPalette01, colorPalette02, colorPalette03, colorPalette04, date, image, comment) {
    this.pk = {};
    this.pk.N = primaryKey.toString(); //number->string
    this.day/night = {};
    this.day/night.S = day/night;
     this.city/country = {};
    this.city/country.S = city/country;
    this.colorPalette01 = {};
    this.colorPalette01.S = colorPalette01;
    this.colorPalette02 = {};
    this.colorPalette02.S = colorPalette02;
    this.colorPalette03 = {};
    this.colorPalette03.S = colorPalette03;
    this.colorPalette04 = {};
    this.colorPalette04.S = colorPalette04;
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
```

2. Connected Cloud 9 with DynamoDB
3. Push the entries
```js
blogEntries.push(new BlogEntry(0, day/night, 'Tokyo,Japan', '#808ca4', '#9d8488', '#d4907d', '#fea67a', 'March 13, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc', 'on the way to home after working!'))
blogEntries.push(new BlogEntry(1, day/night, 'Tokyo,Japan', '#808ca4', '#9d8488', '#d4907d', '#fea67a', 'March 13, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc', 'on the way to home after working!'))
blogEntries.push(new BlogEntry(2, day/night, 'Tokyo,Japan', '#808ca4', '#9d8488', '#d4907d', '#fea67a', 'March 13, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc', 'on the way to home after working!'))
blogEntries.push(new BlogEntry(3, day/night, 'Tokyo,Japan', '#808ca4', '#9d8488', '#d4907d', '#fea67a', 'March 13, 2021', 'https://drive.google.com/drive/u/0/folders/1KRGQ93NGK9PMdQ_bhDOWO-eoeZLjdSIc', 'on the way to home after working!'))

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
```
