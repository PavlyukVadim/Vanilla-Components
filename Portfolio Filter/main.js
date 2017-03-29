var chooseButtons = document.getElementsByClassName('btn-choose-cat');
var portfolioTiles = document.getElementsByClassName('tile');

var i;
var btnRel;

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
  for (i = 0; i < portfolioTiles.length; i++) {
  	//portfolioTiles[i].style.display = 'none'; 
  	setTimeout(function(element) {
	    if (element.classList.contains(className) || className === 'all') {
				element.style.width = '25%'; 
	    } else {
	    	element.style.width = '0'; 
	    	 
	    }
  	}, 100, portfolioTiles[i]);
	}
}