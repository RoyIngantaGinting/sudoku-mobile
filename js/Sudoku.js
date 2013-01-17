function Sudoku(){
	this.model;
	this.mode;
	this.screenID;
	this.limit = 50;
	this.matrix = [[1, 2, 3, 	4, 5, 6, 	7, 8, 9],[7, 8, 9, 	1, 2, 3, 	4, 5, 6],[4, 5, 6, 	7, 8, 9, 	1, 2, 3],[2, 3, 4, 	5, 6, 7, 	8, 9, 1],[9, 8, 1, 	2, 3, 4, 	5, 6, 7],[5, 6, 7, 	8, 9, 1, 	2, 3, 4],[3, 4, 5, 	6, 7, 8, 	9, 1, 2],[9, 1, 2, 	3, 4, 5, 	6, 7, 8],[6, 7, 8, 	9, 1, 2, 	3, 4, 5]];
	this.idLastButton;
	this.nilaiPatokan;
	
	this.init = function(mode){
		if (mode == "lv"){
			this.model = new SudokuModelLV(this.matrix);
		} else if (mode == "mc"){
			this.model = new SudokuModelMC(this.limit);
		}
		this.mode = mode;
		this.model.generate();
		this.nilaiPatokan = this.model.maskedSpec.cloneMatrix();
		this.render();
	}
	this.render = function(){
		var i = j = 1;
		var $lv = $("#content" + this.mode), $markup = "", btn, cls, angka, patokan;
		
		for (;i<=9; i++){
			$markup += '<div data-role="controlgroup" data-type="horizontal" data-mini="true">';
			for (j=1; j<=9; j++){
				angka = this.model.getValueAt(i-1, j-1);
				patokan = this.nilaiPatokan[ i-1 ][ j-1 ];
				cls = ( patokan != 0) ? "ui-disabled" : "";
				btn = '<a href="#popupAngka' + this.mode + '" data-rel="popup" data-role="button" data-inline="true" class="' + cls + '" id="angka-' + i + '-' + j + "-" + this.mode + '">' + angka + '</a>';
				$markup += btn;
			}
			$markup += '</div>';
		}
		$lv.html($markup);
		$("#content" + this.mode).find( ":jqmData(role=button)" ).button();
		$("#content" + this.mode).find( ":jqmData(role=controlgroup)" ).controlgroup();
		this.daftarTombol();
	}
	this.popupHandler = function(objek){
		$( "#popupAngka" + this.mode ).popup( "close" );
		var angka = objek.target.innerText
			, temp = this.idLastButton.split("-")
			, col = parseInt(temp[1]) - 1
			, row = parseInt(temp[2]) - 1;
		this.model.setValueAt(angka, col, row);
		this.render();
		this.idLastButton = "";
		if ( this.model.isSelesai() ){
			// Permainan selesai
			console.log("selesai");
		}
	}
	this.daftarTombol = function(){
		var i = j = 1, root = this;
		var $objek;
		
		for (;i<=9; i++){
			for (j=1; j<=9; j++){
				$objek = $("#angka-" + i + "-" + j + "-" + this.mode);
				$objek.on('tap', function(evt){
					root.idLastButton = $(this)[0].id;
				});
			}
		}
	}
}