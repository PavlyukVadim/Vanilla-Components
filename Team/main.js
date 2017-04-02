window.onload = function() {
  var arrayOfTeamCards = document.getElementsByClassName('team-card');
  var arrayOfDescriptions = document.querySelectorAll('.skill-description .description');
  var skillDescription = document.getElementsByClassName('skill-description')[0]; 
  
  var i, j;
  var target;
  var prevActive = arrayOfTeamCards[0];


  for (i = 0; i < arrayOfTeamCards.length; i++) {
  	(function(i) {
  	  arrayOfTeamCards[i].addEventListener('click', function(e) {
	      if (e.target.classList.contains('close')) {
	      	skillDescription.parentElement.removeChild(skillDescription);
	      	this.classList.remove('active');
	      	return;
	      }

	      prevActive.classList.remove('active');
	      this.classList.add('active');
	      prevActive = this;
	      target = this.dataset.employee;
	      this.appendChild(skillDescription);


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
};
