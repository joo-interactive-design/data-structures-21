var fs = require('fs');
var cheerio = require('cheerio');

for (let i=1; i<11; i++){
    
    if ( i == 10){
        var fileName = 'aa10'
    }else{
        var fileName = 'aa0' + i;
    }
    
   getJson(fileName)
    
}


async function getJson(fileName){
    
    


//read file to parse
var content = fs.readFileSync('/home/ec2-user/environment/weekly_assignments/assignment_01/data/'+fileName+'.txt');


// load `content` into a cheerio object
var $ = cheerio.load(content);

var addressBook = '';

var dataSet = [];

$('tbody>tr[style="margin-bottom:10px"]').each(function(i, elem) {
// $('tbody>tr>td:nth-of-type(3n-2)').each(function(i, elem){
    // console.log(i)
    // if(i>=3){
        // if(i!==5){
        //     return
        // }
        
            //$.html makes html to elem object
            // console.log($.html(elem))
            
            //https://www.tabnine.com/code/javascript/functions/cheerio/Cheerio/each
            // console.log($(elem).find('h4').html())
            
            var address_detail=$(elem).html().split('<br>')[2].replaceAll('\n', '').replaceAll('\t', '').split(',');
            address_detail.shift()
            
            var data = {
                building_name: $(elem).find('h4').html().replaceAll('&amp;', '&'),
                address: $(elem).html().split('<br>')[2].replaceAll('\n', '').replaceAll('\t', '').split(',')[0],
                address_detail: address_detail.join().trim(),
                city: 'New York',
                state: 'NY',
                meeting_titles: $(elem).find('b').html().replace(/\-\s*$/,'').replaceAll('&amp;', '&').trim(),
            }
            
     
            // $(elem).find('td:nth-of-type(2)').find('b').each(function(i,e){
              
            //     if($(e).html().indexOf(' From')>=0){
            //          console.log($(e).html().replace(' From', ''))
                    
            //     }
                
            //     console.log($(e).parent().html())
                
            // })
            
            var meetingInfo = [];
            
            // console.log($(elem).find('td:nth-of-type(2)').html().split('\n'))
            $(elem).find('td:nth-of-type(2)').html().split('\n').forEach(function(line,idx){
                
                var dateInfo = line.trim()
            
                if(dateInfo.indexOf(' From')>=0){ 
                    var day = dateInfo.split(' From')[0].slice(3)
                    // console.log(day)
                    
                    //match-select one or two of the number 0-9:0-9 , g-select multiples, regular expression
                    var time = dateInfo.match(/[0-9]{1,2}:[0-9]{1,2}/g)
                    // console.log(time)
                    
                    var meetingTypeAcronyms = dateInfo.match(/([A-Z]{1,2}) =/)
                    meetingTypeAcronyms = meetingTypeAcronyms?meetingTypeAcronyms[1]:null
                    // console.log(meetingTypeAcronyms)
                    
                    var meetingType = dateInfo.split('=')[1]
                    // meetingType = meetingType?meetingType.match(/.+meeting/)[0].trim():null
                    
                      if (typeof dateInfo.split('=')[1] !== "undefined" ) {
                          
                         meetingType = dateInfo.split('=')[1].split("meeting")[0] + 'meeting'
                         
                        //  console.log( dateInfo.split('=')[1].split("meeting")[0] )
                          
                          
                      } 
                      
                      else { meetingType = null}
                      
                    // console.log(meetingType)
                
                    // console.log(meetingType)
                    
                    var specialInterest = dateInfo.split('Special Interest</b>')[1]
                    //if there is speicalInterest, use specialInterest. If not, use null
                    specialInterest = specialInterest?specialInterest.trim():null
                    // console.log(specialInterest)
                    
                    meetingInfo.push({
                        day: day,
                        time: time.join(','),
                        meetingTypeAcronyms: meetingTypeAcronyms,
                        meetingType: meetingType,
                        specialInterest: specialInterest,         
                        
                    })
                    
                }
              
            })
            
            // console.log($(elem).find('img').attr('alt'))
            
            var data = {
                building_name: $(elem).find('h4').html(),
                address: $(elem).html().split('<br>')[2].replaceAll('\n', '').replaceAll('\t', '').split(',')[0],
                address_detail: address_detail.join().trim(),
                city: 'New York',
                state: 'NY',
                meeting_titles: $(elem).find('b').html().replace(/\-\s*$/,'').trim(),
                meetingInfo: meetingInfo
 
            }            
            
           
            
            dataSet.push(data)
            
        
        
        
       
    
    
});

console.log(fileName)



fs.writeFileSync('newdata/'+fileName+'.json',JSON.stringify(dataSet));

}