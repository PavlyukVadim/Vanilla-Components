window.onload = function() {
  
  var navIcon = document.getElementById('nav-icon');
  var navItems = document.getElementsByClassName('navbar-nav')[0];
  var navbar = document.getElementsByClassName('navbar')[0];
  var isOpenMobileMenu = false;

  navIcon.onclick = function() {
    navIcon.classList.toggle('open');
    isOpenMobileMenu = !isOpenMobileMenu;
    
    if (isOpenMobileMenu) {
      navItems.style.height = window.innerHeight - navbar.clientHeight + 'px';  
    } else {
      navItems.style.height = 0;  
    }
  }

};
