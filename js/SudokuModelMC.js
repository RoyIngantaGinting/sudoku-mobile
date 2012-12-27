function SudokuModelMC (total){
	this.maskedSpec = new SudokuSpec([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]);
	this.limit = total;
	
	this.generate = function(){
		var tempRow = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
		var tempCol = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
		var tempSub = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
		var i, tempGen, value, subMatrix, flag = true;
		
		var tab = new Array();
		for(i=0; i<this.limit; i++){
			do{
				tempGen = generateCell();
				value = rand(9) + 1;
				subMatrix = getSubMatrixNumber(tempGen[0], tempGen[1]);
				//console.log("attempt " + i, JSON.stringify(tempGen) + ", " + subMatrix + ", " + value);
			} while (this.contains(tab, tempGen) || this.isCrossed(tempRow, tempGen[0], value) || this.isCrossed(tempCol, tempGen[1], value) || this.isCrossed(tempSub, subMatrix, value));
			tempRow[tempGen[0]][value-1] = 0;
			tempCol[tempGen[1]][value-1] = 0;
			tempSub[subMatrix][value-1] = 0;
			tab.push(tempGen);
			this.maskedSpec.setValueAt(value, tempGen[0], tempGen[1]);
			console.log("fill", i);
		}
		console.log("tab", JSON.stringify(tab));
	}
	this.isCrossed = function(container, index, value){
		console.log("isCrossed " + container[index].indexOf(value), container[index] + ", " + value);
		return container[index].indexOf(value) == -1;
	}
	this.contains = function(container, value){
		var i = 0, result = false;
		
		for (;i<container.length; i++){
			if (container[i][0] == value[0] && container[i][1] == value[1]){
				result = true;
				break;
			}
		}
		return result;
	}
}