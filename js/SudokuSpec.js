function SudokuSpec(specValues){
	this.MASKEDSIGN = 0;
	this.matrix = specValues;
	this.length = this.matrix[0].length;
	this.interval = 3;
	
	// Set value at specific cell
	this.setValueAt = function(value, row, column){
		this.matrix[row][column] = value;
	}
	// Set masked at specific cell
	this.setMaskAt = function(row, column){
		this.setValueAt(this.MASKEDSIGN, row, column);
	}
	// Check whether given cell is masked or not
	this.isMasked = function(row, column){
		return this.getValueAt(row, column) == this.MASKEDSIGN;
	}
	// Get masked positions at specific column 
	this.getMaskedColumn = function(columnNumber){
		var masked = new Array(),column = this.extractColumn(columnNumber);
		var sign = this.MASKEDSIGN;
		
		column.every( function(value){ if (value == sign){ masked.push(value); } } );
		return masked;
	}
	// Get masked positions at specific row
	this.getMaskedRow = function(rowNumber){
		var masked = new Array(),row = this.extractRow(rowNumber);
		var sign = this.MASKEDSIGN;
		
		row.every( function(value){ if (value == sign){ masked.push(value); } } );
		return masked;
	}
	// Get value at specific cell
	this.getValueAt = function(row, column){
		this.matrix[row][column];
	}
	// Get sub matrix number of given cell
	this.getSubmatrixNumber = function(row, column){
		var baseRow = Math.floor(row / this.interval);
		var baseCol = Math.floor(column / this.interval);
		return baseRow * this.interval + baseCol;
	}
	// Check whether value of a sub matrix is valid
	this.isSubMatrixFilled = function(number){
		var subMatrix = this.extractSubMatrix(number);
		var tabValue = this.matrixToArray(subMatrix);
		return this.isArrayFilled();
	}
	// Check whether value of a row is valid
	this.isRowFilled = function(number){
		var i = 0;
		var tabValue = this.extractRow(number);
		
		return this.isArrayFilled();
	}
	// Check whether values of a column is valid
	this.isColumnFilled = function(number){
		var i = 0;
		var tabValue = this.extractColumn(number);
		
		return this.isArrayFilled(tabValue);
	}
	// Check whether value of an array is valid
	this.isArrayFilled = function(tabValue){
		var sortValue = tabValue.sort();
		var i = 0;
		var filled = true;
		
		for (;i<sortValue.length; i++){
			if (sortValue[i] != i+1){
				filled = false;
				break;
			}
		}
		return filled;
	}
	// Check whether given array equals or not
	this.isArrayEquals = function(tabValues, tabComparators){
		return JSON.stringify(tabValues) == JSON.stringify(tabComparators);
	}
	// Check whether this object equals with given object
	this.isEquals = function(otherSpec){
		var eq = true;
		var i = 0;
		
		if (this.length == otherSpec.length){
			for (; i<this.length; i++){
				if (!this.isArrayEquals(this.matrix[i]), otherSpec.matrix[i]){
					eq = false;
					break;
				}
			}
		} else eq = false;
		return eq;
	}
	// Extract one column from the matrix
	this.extractColumn = function(columnNumber){
		var i, columns = new Array();
		
		for (i=0; i<this.length; i++){
			columns.push(this.matrix[i][columnNumber]);
		}
		return columns;
	}
	// Extract one row from the matrix
	this.extractRow = function(rowNumber){
		var i, columns = new Array();
		
		for (i=0; i<this.length; i++){
			columns.push(this.matrix[rowNumber][i]);
		}
		return columns;
	}
	// Extract one matrix from the matrix
	this.extractSubMatrix = function(number){
		var row = this.interval * Math.floor(number / this.interval);
		var column = this.interval * (number % this.interval);
		var i, j, subMatrix, temp;
		
		subMatrix = new Array();
		for (i=row; i<row + this.interval; i++){
			temp = new Array();
			for (j=column; j<column + this.interval; j++){
				temp.push(this.matrix[i][j]);
			}
			subMatrix.push(temp);
		}
		return subMatrix;
	}
	// Cloning the matrix
	this.cloneMatrix = function(){
		var temp = JSON.stringify(this.matrix);
		var spec = eval(temp);
		return spec;
	}
	// swap all value from one column with the other column
	this.swapColumn = function(colStart, colEnd){
		var i = 0;
		
		for(; i<this.length; i++){
			this.swap(i, colStart, i, colEnd);
		}
	}
	// swap all vlaue from one row with the other row
	this.swapRow = function(rowStart, rowEnd){
		var i = 0;
		
		for (; i<this.length; i++){
			this.swap(rowStart, i, rowEnd, i);
		}
	}
	// swap value of one cell with value of the other cell
	this.swap = function(rowStart, colStart, rowEnd, colEnd){
		var temp = this.matrix[rowStart][colStart];
		this.matrix[rowStart][colStart] = this.matrix[rowEnd][colEnd];
		this.matrix[rowEnd][colEnd] = temp;
	}
	// Verify that values in matrix is valid
	this.verify = function(){
		var i, flag = true;
		
		for (i=0; i<this.length; i++){
			flag = this.isSubMatrixFilled(i) && this.isRowFilled(i) && this.isColumnFilled(i);
			if (!flag){
				break;
			}
		}
		return flag;
	}
	// Convert matrix into one dimensional array
	this.matrixToArray = function(subMatrix){
		var arr = new Array(), i, j;
		var length = subMatrix[0].length;
		
		for (i=0; i<length; i++){
			for(j=0; j<length; j++){
				arr.push(subMatrix[i][j]);
			}
		}
		return arr;
	}
	// Debugging purpose
	this.toString = function(){
		return JSON.stringify(this.matrix);
	}
	this.toConsole = function(){
		var i = 0;
		for (;i<this.length; i++){
			console.log(JSON.stringify(this.matrix[i]));
		}
	}
}