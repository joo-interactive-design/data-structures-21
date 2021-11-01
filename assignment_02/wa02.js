// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/aa03.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
//li:nth-child(3)
var addressBook = '';
$('tbody>tr>td[valign="top"]:nth-of-type(2n-1)').each(function(i, elem) {
// $('tbody>tr>td:nth-of-type(3n-2)').each(function(i, elem){
    // console.log(i)
    if(i!== 0){

        // console.log($(elem).text().split('\n'));
        var tempArray = $(elem).text().split('\n')
        // console.log(tempArray[1]+tempArray[3]+tempArray[4])
        // console.log(tempArray[3].split(',')[0])
        // console.log(tempArray[1]+tempArray[3].split(',')[0]+tempArray[4])
        // console.log(tempArray[1].trim()+tempArray[3].split(',')[0].trim()+tempArray[4].trim())
    
        // console.log(tempArray[1].trim()+','+tempArray[3].split(',')[0].trim()+','+tempArray[4].trim());
        addressBook +=/*tempArray[1].trim()+', '+*/tempArray[3].split(',')[0].trim()+'\n';
        
    }
    
    
});

console.log(addressBook)



// // write the project titles to a text file
// var thesisTitles = ''; // this variable will hold the lines of text

// $('.project .title').each(function(i, elem) {
//     thesisTitles += ($(elem).text()).trim() + '\n';
// });

fs.writeFileSync('data/addressData.txt', addressBook);
