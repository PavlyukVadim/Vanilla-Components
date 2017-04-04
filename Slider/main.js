window.onload = function() {

	var slider = document.getElementById('slider');
  var slides = document.querySelectorAll('#slider .slide');
  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');
 
  var indexOfCurrentSlide = 0;
  var slideWidth = slides[0].clientWidth;
  var numberOfSlides = slides.length;
  var ANIMATION_DURATION = 1000;
  var isRunning = false;
  var transitionRule = 'transform ' + Number(ANIMATION_DURATION / 1000) + 's'


  initiateSlider();

  function initiateSlider() {
    slider.style.width = slideWidth * (numberOfSlides + 2) + 'px';
    slider.insertAdjacentElement('beforeEnd', slider.children[0].cloneNode(true));
    slider.insertAdjacentElement('afterBegin', slider.children[2].cloneNode(true));
    slider.style.transform = 'translateX(' + ( - slideWidth) + 'px)';  

    setTimeout(function() {
      slider.style.transition = transitionRule; 
    }, 0);
  }


  prevBtn.addEventListener('click', function() {
    changeSlide('prev');
  });


  nextBtn.addEventListener('click', function() {
    changeSlide('next');
  });


  function changeSlide(mode) {
    if (isRunning) {
      return;
    } else if ((indexOfCurrentSlide === numberOfSlides - 1) || !indexOfCurrentSlide) {
      slider.style.transition = transitionRule; 
    }

    if (mode === 'prev') {
      if (!indexOfCurrentSlide) {
        setTimeout(function() {
          slider.style.transition = '0s'; 
          slider.style.transform = 'translateX(' + ( -  slideWidth * (numberOfSlides)) + 'px)';
          indexOfCurrentSlide = numberOfSlides - 1; 
        }, ANIMATION_DURATION);
      }
      indexOfCurrentSlide--;
    } else if (mode === 'next') {
      if (indexOfCurrentSlide === numberOfSlides - 1) {
        setTimeout(function() {
          slider.style.transition = '0s'; 
          slider.style.transform = 'translateX(' + ( - slideWidth) + 'px)';
          indexOfCurrentSlide = 0; 
        }, ANIMATION_DURATION);
      }
      indexOfCurrentSlide++;
    }
    
    isRunning = true;
    slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';  
    setTimeout(function() {
      isRunning = false;
    }, ANIMATION_DURATION);

  }


  slider.ondragstart = function() {
    return false;
  };
  

  slider.onmousedown = function(e) {
    var mouseDownX = e.pageX;
    moveSlide(e);
    
    function moveSlide(e) {
      console.log(e.pageX - mouseDownX);
      if(isRunning) return;
      slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1) + e.pageX - mouseDownX) + 'px)';
    }

    document.onmousemove = function(e) {
      moveSlide(e);
    }

    document.onmouseup = function(e) {
      slider.style.transition = transitionRule; 
      var diff = e.pageX - mouseDownX;
      if (diff > 100) {
        changeSlide('prev');
      } else if (diff < -100) {
        changeSlide('next');
      } else {
        slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';   
      }
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

}
