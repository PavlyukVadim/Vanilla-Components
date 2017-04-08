window.onload = function() {
	
	var reviewsEls = document.querySelectorAll('#slider-reviews article');
	var controlRow = document.getElementsByClassName('controlrow')[0];
  var arrayOfControlCircles = [];
  var ANIMATION_DURATION = 1000;
  var indexOfPrevActive = 0;
  
  createControlCircles(reviewsEls.length);

	function createControlCircles(number) {
    var i;
    var div;
    for (i = 0; i < number; i++) {
      div = document.createElement('div');
      div.className = 'circle';
      (function(i) {
        div.addEventListener('click', function() {
          
          arrayOfControlCircles[indexOfPrevActive].classList.remove('active');
          this.classList.add('active');
          
          reviewsEls[indexOfPrevActive].classList.add('bounceOut');
          reviewsEls[indexOfPrevActive].classList.remove('bounceIn');

          setTimeout(function(index) {
            reviewsEls[index].classList.remove('active');
            reviewsEls[i].classList.add('active', 'bounceIn');
            reviewsEls[i].classList.remove('bounceOut');
          }, ANIMATION_DURATION, indexOfPrevActive);
          
          indexOfPrevActive = i;
        });
      })(i);
      arrayOfControlCircles.push(div);
      controlRow.appendChild(div);
    }
    arrayOfControlCircles[0].classList.add('active');
	}
}
