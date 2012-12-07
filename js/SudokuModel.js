function SudokuModel(sudokuValues){
	this.spec = new SudokuSpec(sudokuValues);
	this.type = [[0,1], [0, 2], [1, 2]];
	this.interval = 3;
	this.maskedSpec;
	
	// random value of the matrix for given times
	this.randomize = function(limit){
		var areaNumber, typeNumber, i;
		
		for (i=0; i<limit; i++){
			areaNumber = this.generateArea();
			typeNumber = this.generateType();
			this.swapLineInArea(areaNumber, typeNumber);
		}
	}
	// Create mask with criterias two mask in every column and one in every row
	this.createMaskedSpec = function(){
		var i, temp, numbers, spec = this.spec.cloneMatrix();
		
		this.maskedSpec = new SudokuSpec(spec);
		// random position in a row that will be masked
		for (i=0; i<9; i++){
			selectedRows = this.generateTwoNumbers();
			this.maskedSpec.setMaskAt(i, selectedRows[0]);
			this.maskedSpec.setMaskAt(i, selectedRows[1]);
		}
		// random position in a column that will be masked
		for (i=0; i<9; i++){
			temp = this.generateUniqueNumber(this.maskedSpec.getMaskedColumn(i));
			this.maskedSpec.setMaskAt(temp, i);
		}
	}
	// areaNumber is number between 0 - 5 inclusive
	// type indicate type of subtitution. 0 means (0, 1), 1 means (0, 2), 2 means (1, 2)
	this.swapLineInArea = function(areaNumber, typeNumber){
		var pos = this.getIndex(areaNumber, typeNumber);
		
		if (this.isColumn(areaNumber)){
			// work on column
			this.spec.swapColumn(pos[0], pos[1]);
		} else {
			// work on row
			this.spec.swapRow(pos[0], pos[1]);
		}
	}
	// generate random number between 0 (inclusive) and limit (exclusive)
	this.rand = function(limit){
		return Math.floor(Math.random() * limit);
	}
	// Generate two different number between 0 (inclusive) and 9 (exclusive)
	this.generateTwoNumbers = function(){
		var temp, numbers = new Array();

		numbers.push(this.rand(9));
		do{
			temp = this.rand();
		} while (temp == numbers[0]);
		numbers.push(temp);
		return numbers;
	}
	// Generate number which is not equal with given values
	this.generateUniqueNumber = function(comparator){
		var temp;
		
		do{
			temp = this.rand();
		} while (comparator.indexOf(temp) != -1);
		return temp;
	}
	// Calculate index from areaNumber and typeNumber
	this.getIndex = function(areaNumber, typeNumber){
		var result = new Array();
		areaNumber = areaNumber % this.interval;
		result.push(this.type[typeNumber][0] + areaNumber * this.interval);
		result.push(this.type[typeNumber][1] + areaNumber * this.interval);
		return result;
	}
	// Check whether given area number is located on column or not
	this.isColumn = function(areaNumber){
		return areaNumber / this.interval < 1;
	}
	// Generate valid random type
	this.generateType = function(){
		return this.rand(this.interval);
	}
	// Generate valid random area number
	this.generateArea = function(){
		return this.rand(2*this.interval);
	}
	// output to console
	this.toConsole = function(){
		this.spec.toConsole();
	}
	// Get string representation
	this.toString = function(){
		this.spec.toString();
	}
}