// npm install got
// mkdir data

const got = require('got');
const fs = require('fs');

// (async () => {
// 	try {
// 		const response = await got('https://parsons.nyc/aa/m01.html');
// 		console.log(response.body);
// 		fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', response.body);
// 		//=> '<!doctype html> ...'
// 	} catch (error) {
// 		console.log(error.response.body);
// 		//=> 'Internal server error ...'
// 	}
// })();

var crawl = async (number) => {
	console.log(number)
	try {
		const response = await got(`https://parsons.nyc/aa/m${number}.html`);
		console.log(response.body);
		fs.writeFileSync(`/home/ec2-user/environment/weekly_assignments/assignment_01/data/aa${number}.txt`, response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
};


// 웹에서 m01.html-m10.html 데이터를 가져와서 각각 aa01-aa10.txt 으로 저장

for (var i = 1; i <= 10; i++) { 
	if(i<10){
		crawl("0"+i)
	}else{
		crawl(i+"")
	}
}




