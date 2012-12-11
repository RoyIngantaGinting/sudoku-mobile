// generate random number between 0 (inclusive) and limit (exclusive)
function rand(limit){
	return Math.floor(Math.random() * limit);
}
// Generate two different number between 0 (inclusive) and 9 (exclusive)
function generateTwoNumbers(){
	var temp, numbers = new Array();

	numbers.push(rand(9));
	do{
		temp = rand(9);
	} while (temp == numbers[0]);
	numbers.push(temp);
	return numbers;
}
// Generate valid random type
function generateType(){
	return rand(3);
}
// Generate valid random area number
function generateArea(){
	return rand(6);
}
// Generate number which is not equal with given values
function generateUniqueNumber(comparator){
	var temp;
	
	do{
		temp = rand(9);
	} while (comparator.indexOf(temp) != -1);
	return temp;
}