function SudokuSpec(specValues){
	this.matrix = specValues;
	this.length = this.matrix[0].length;
	this.sumValue = 45;
	
	// Set value at specific cell
	this.setValueAt = function(value, row, column){
		this.matrix[row][column] = value;
	}
	// Get value at specific cell
	this.getValueAt = function(row, column){
		this.matrix[row][column];
	}
	// Check whether value of a row is valid
	this.isRowFilled = function(number){
		var i = 0;
		var tabValue = new Array();
		
		for (;i<this.length; i++){
			tabValue.push(this.matrix[number][i]);
		}
		return this.isArrayFilled();
	}
	// Check whether values of a column is valid
	this.isColumnFilled = function(number){
		var i = 0;
		var tabValue = new Array();
		
		for (;i<this.length; i++){
			tabValue.push(this.matrix[i][number]);
		}
		return this.isArrayFilled(tabValue);
	}
	// Check whether valued of an array is valid
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