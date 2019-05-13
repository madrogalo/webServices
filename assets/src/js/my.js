/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("heder-show-hide").style.top = "0";
  } else {
    document.getElementById("heder-show-hide").style.top = "-95px";
    document.getElementById("show-mobile-menu").classList.remove('active-nemu');
  }
  prevScrollpos = currentScrollPos;
}

// show hide nav
function clickShowAndHideMenu() {
  document.getElementById('show-mobile-menu').classList.toggle('active-nemu');
}