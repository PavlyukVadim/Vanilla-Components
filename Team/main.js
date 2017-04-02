window.onload = function() {
  var arrayOfTeamCards = document.getElementsByClassName('team-card');
  var arrayOfDescriptions = document.querySelectorAll('.skill-description .description');
  var skillDescription = document.getElementsByClassName('skill-description')[0]; 
  
  var i, j;
  var target;
  var prevActive = arrayOfTeamCards[0];

  var scrolled = 0 || window.pageYOffset || document.documentElement.scrollTop;
  var SCROLL_TIME = 300; // ms
  var acceleration = true;
  var isScrolling = false;


  for (i = 0; i < arrayOfTeamCards.length; i++) {
  	(function(i) {
  	  arrayOfTeamCards[i].addEventListener('click', function(e) {
	      if (isScrolling) return;
	      if (e.target.classList.contains('close')) {
	      	skillDescription.parentElement.removeChild(skillDescription);
	      	this.classList.remove('active');
	      	return;
	      } else if (e.target.tagName !== 'IMG') {
	      	return;
	      }

	      prevActive.classList.remove('active');
	      prevActive = this;
	      target = this.dataset.employee;
	      skillDescription.style.opacity = '0';
	      this.appendChild(skillDescription);
	      
	      setTimeout(function(that) {
          toggleScroll(that.offsetTop - (window.innerHeight - that.clientHeight - skillDescription.clientHeight), scrolled);
	      }, 0, this);
	      
	      setTimeout(function(that) {
          skillDescription.style.opacity = '1';
          that.classList.add('active');
	      }, SCROLL_TIME, this);
	      

	      for (j = 0; j < arrayOfDescriptions.length; j++) {
          if (arrayOfDescriptions[j].classList.contains(target)) {
          	arrayOfDescriptions[j].classList.add('active');
          } else {
          	arrayOfDescriptions[j].classList.remove('active');
          }
	      }
	  	});	
  	})(i);
  }


  document.addEventListener('scroll', function(e) {
    scrolled = window.pageYOffset || document.documentElement.scrollTop; 
  })

  
  function toggleScroll(to, scrolled) {
    var distance = Math.abs(to - scrolled);
    var initialDistance = distance;
    var speed = distance / SCROLL_TIME * 10; // pixels/10ms
    var step;
    if (!scrolled && to < 0 || scrolled === to) return;
    isScrolling = true;
    if (acceleration) {
      speed = 0;
      step = 2 * distance / Math.pow(SCROLL_TIME, 2) * 10;
    }
    var scrollInterval = setInterval(function() {
      distance -= speed;
      if (acceleration && distance >= initialDistance / 2) {
        speed += step;
      } else if (acceleration && distance < initialDistance / 2) {
        speed = speed > step * 3 ? speed - step : speed;
      }
      var positionY = scrolled < to ? to - distance : to + distance;
      window.scrollTo(0, positionY); 
      if (distance <= 0) {
        isScrolling = false;
        clearInterval(scrollInterval);
      }
    }, 10);
  }

};
