window.onload = function() {
	var chooseButtons = document.getElementsByClassName('btn-choose-cat');
	var portfolioTiles = document.getElementsByClassName('tile');

	var i;
	var btnRel;

	var windowWidth = window.innerWidth;
	var tilesWidth = portfolioTiles[0].clientWidth;
	var numberOfTilesInRow = Math.floor(windowWidth / tilesWidth);

	var fillingOfTiles = createArrayOfFillingOfTiles(numberOfTilesInRow, portfolioTiles.length);

	console.log(fillingOfTiles);




	for (i = 0; i < chooseButtons.length; i++) {
		chooseButtons[i].onclick = function() {
	    removeClassNameInArrayOfElements(chooseButtons, 'active-btn');
	    this.classList.add('active-btn');
	    btnRel = this.dataset.rel;
	    togglePortfolioTilesByRel(btnRel)

		} 
	}

	function removeClassNameInArrayOfElements(arr, className) {
	  var i = 0;
	  for (i = 0; i < arr.length; i++) {
			arr[i].classList.remove(className);
		}
	}


	function togglePortfolioTilesByRel(className) {
		var i = 0;
		var row = 0, column = 0;
	  for (i = 0; i < portfolioTiles.length; i++) {
	  	//portfolioTiles[i].style.display = 'none'; 
	  	element = portfolioTiles[i];
	  	row = Math.floor(i / numberOfTilesInRow);
			column = i % numberOfTilesInRow;
	  	console.log(row, column);
	  	if (element.classList.contains(className) || className === 'all') {
					/*element.style.width = 'block'; */
					
					fillingOfTiles[row][column] = 1;
		    } else { 
		    	element.classList.add('zoomOut');
			fillingOfTiles[row][column] = 0;
		    	
		    	/*setTimeout(function(element) {
				    element.style.width = '0';
		    		element.style.heigth = '0';  
			  	}, 1000, element);*/
		    }
		}
		shiftTiles();
		console.log(fillingOfTiles);
	}

	function createArrayOfFillingOfTiles(numberOfTilesInRow, numberOfTiles) {
	  var arr = [];
	  var numberOfRows = Math.ceil(numberOfTiles / numberOfTilesInRow);
	  var i, j;
	  for (i = 0; i < numberOfRows; i++) {
	  	arr[i] = [];
	  	for (j = 0; j < numberOfTilesInRow; j++) {
	  		arr[i][j] = 0;
	  	}
	  }
	  return arr;
	}

	function shiftTiles() {
		var i, j;
		var row;
		for (i = 0; i < fillingOfTiles.length; i++) {
	    row = fillingOfTiles[i];
			for (j = 0; j < row.length; j++) {
				var el = row[j];
				if (el && getIndexOfNull() < j) {
	        portfolioTiles[j].style.transform = 'translateX(' + (getIndexOfNull() - j) * tilesWidth + 'px)';
	        fillingOfTiles[0][getIndexOfNull()] = 1;
	        fillingOfTiles[0][j] = 0;
				}

				console.log('Data', el, getIndexOfNull());
			}
		}
	}

	function getIndexOfNull() {
	  var i, j;
		var row;
		for (i = 0; i < fillingOfTiles.length; i++) {
	    row = fillingOfTiles[i];
			for (j = 0; j < row.length; j++) {
				var el = row[j];
				if (!el) {
	         return j;
				}
			}
		}
		return Infinity;	
	}
}
