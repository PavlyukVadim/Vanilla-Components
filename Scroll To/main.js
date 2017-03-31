window.onload = function() {

  
  (function menuComponent() {
    
    var navIcon = document.getElementById('nav-icon');
    var navItems = document.getElementsByClassName('navbar-nav')[0];
    var navbar = document.getElementsByClassName('navbar')[0];
    var isOpenMobileMenu = false;


    navIcon.addEventListener('click', function() {
      navIcon.classList.toggle('open');
      isOpenMobileMenu = !isOpenMobileMenu;
      
      if (isOpenMobileMenu) {
        navItems.style.height = window.innerHeight - navbar.clientHeight + 'px';  
      } else {
        navItems.style.height = 0;  
      }
    });

    navItems.addEventListener('click', function() {
      navIcon.classList.toggle('open');
      isOpenMobileMenu = !isOpenMobileMenu;
      navItems.style.height = 0;  
    });
    
  })();

  
  (function scrollToComponent() {
    
    var navLinks = document.getElementsByClassName('nav-link');
    var mapOffsetTop = {};
    var i;
    var selector;
    var element;

    var scrolled = 0 || window.pageYOffset || document.documentElement.scrollTop;
    var SCROLL_TIME = 400; // ms
    var acceleration = true;
    var isScrolling = false;
    

    for (i = 0; i < navLinks.length; i++) {
      selector = navLinks[i].dataset.scrollTo;
      element = document.querySelectorAll(selector)[0];
      mapOffsetTop[selector] = element.offsetTop;
      navLinks[i].onclick = (function(i) {
        return function() {
          if (!isScrolling) {
            toggleScroll(mapOffsetTop[navLinks[i].dataset.scrollTo], scrolled);  
          }
        }
      })(i);
    }

    document.addEventListener('scroll', function() {
      scrolled = window.pageYOffset || document.documentElement.scrollTop; 
    })

    function toggleScroll(to, scrolled) {
      var distance = Math.abs(to - scrolled);
      var initialDistance = distance;
      var speed = distance / SCROLL_TIME * 10; // pixels/10ms
      var step;
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

  })();


};
