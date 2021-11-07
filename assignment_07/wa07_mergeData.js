// require(`/home/ec2-user/environment/weekly_assignments/assignment_07.1/dataWithCoordinate/aa${number}_data.json`)


// const array1 = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = array1.concat(array2);

// console.log(array3);
// // expected output: Array ["a", "b", "c", "d", "e", "f"]

var fs = require('fs');
var mergeData = []

var fileName = function(fileNumber){
    
    return `/home/ec2-user/environment/weekly_assignments/assignment_07.1/dataWithCoordinate/aa${fileNumber}_data.json`
}
    
for (var i = 1; i <= 10; i++) { 
	if(i<10){
		mergeData = mergeData.concat(require(fileName("0"+i)))
		
	}else{
		mergeData = mergeData.concat(require(fileName(i+"")))
	}
}

// console.log(mergeData)

fs.writeFileSync('dataWithCoordinate/'+'aa_data.json',JSON.stringify(mergeData));



// var test = require(`/home/ec2-user/environment/weekly_assignments/assignment_07.1/dataWithCoordinate/aa${fileNumber}_data.json`);

// var array3 = mergeData.concat(test);

// console.log()



