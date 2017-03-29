(function() {
	window.onload = function() {
	  var countUpElement = document.getElementById('count-up'); 
	  var countUpValue = countUpElement.dataset.value;
	  var ANIMATION_DURATION = 1000;
	  var numberOfDigits = countUpValue.length;
	  var arrayOfDigitLists = [];
	  var animationDuration;
	  var i;
	  var list;

	  for (i = 0; i < numberOfDigits; i++) {
	    list = createDigitList();
	    list.style.left = 0.5 * i + 'em';
	    list.classList.add('count-up-animate');
	    animationDuration = (ANIMATION_DURATION / (countUpValue.slice(0, i + 1)) + 1) / 100;
	    if (i >= 2) {
	      animationDuration = Math.max(animationDuration, (numberOfDigits - i));
	    }
	    list.style.animationDuration = animationDuration + 's';
	    arrayOfDigitLists.push(list);
	    countUpElement.appendChild(list);
	  }
	  
	  setTimeout(function() {
	  	for (i = 0; i < numberOfDigits; i++) {
		    arrayOfDigitLists[i].classList.toggle('count-up-animate');
		    arrayOfDigitLists[i].innerText = countUpValue[i];  
	    }
		}, ANIMATION_DURATION + 100);
	}

	function createDigitList() {
		var ul = document.createElement('ul');
	  var li;
	  for (i = 0; i < 10; i++) {
	    li = document.createElement('li');
	    li.innerHTML = i;
	    ul.appendChild(li);
	  }
	  ul.classList.add('list-of-digits');
	  return ul;
	}
})();
