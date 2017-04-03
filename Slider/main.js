window.onload = function() {

	var slider = document.getElementById('slider');
  var slides = document.querySelectorAll('#slider .slide');
  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');
 
  var indexOfCurrentSlide = 0;
  var slideWidth = slides[0].clientWidth;
  var numberOfSlides = slides.length;
  var ANIMATION_DURATION = 300;
  var isRuning = 0;


  initiateSlider();
    
  function initiateSlider() {
    slider.style.width = slideWidth * (numberOfSlides + 2) + 'px';
    slider.insertAdjacentElement('beforeEnd', slider.children[0].cloneNode(true));
    slider.insertAdjacentElement('afterBegin', slider.children[2].cloneNode(true));
    slider.style.transform = 'translateX(' + ( - slideWidth) + 'px)';  

    setTimeout(function() {
      slider.style.transition = 'transform .3s'; 
    }, 0);
  }


  prevBtn.addEventListener('click', function() {
    if (isRuning) return;
    if ((indexOfCurrentSlide === numberOfSlides - 1) || !indexOfCurrentSlide) {
      slider.style.transition = 'transform .3s'; 
    }
    if (!indexOfCurrentSlide) {
      setTimeout(function() {
        slider.style.transition = 'transform 0s'; 
        slider.style.transform = 'translateX(' + ( -  slideWidth * (numberOfSlides)) + 'px)';
        indexOfCurrentSlide = numberOfSlides - 1; 
      }, ANIMATION_DURATION);
    }
    indexOfCurrentSlide--;
    isRuning = true;
    slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';
    setTimeout(function() {
      isRuning = false;
    }, ANIMATION_DURATION);
  });


  nextBtn.addEventListener('click', function() {
    if (isRuning) return;
    if (!indexOfCurrentSlide || (indexOfCurrentSlide === numberOfSlides - 1)) {
      slider.style.transition = 'transform .3s'; 
    }
    if (indexOfCurrentSlide === numberOfSlides - 1) {
      setTimeout(function() {
        slider.style.transition = 'transform 0s'; 
        slider.style.transform = 'translateX(' + ( - slideWidth) + 'px)';
        indexOfCurrentSlide = 0; 
      }, ANIMATION_DURATION);
    }
    indexOfCurrentSlide++;
    isRuning = true;
    slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';  
    setTimeout(function() {
      isRuning = false;
    }, ANIMATION_DURATION);
  });

}
