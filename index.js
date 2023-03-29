window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.pageYOffset > 0) {
    header.classList.add("small");
  } else {
    header.classList.remove("small");
  }
});

function menuShow() {
  let menuMobile = document.querySelector('.menuMobile');
  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
  } else {
    menuMobile.classList.add('open')
  }
}