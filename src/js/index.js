window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.pageYOffset > 0) {
    header.classList.add("small");
  } else {
    header.classList.remove("small");
  }
});

const button = document.querySelector('.icon-menu-mobile button');
const menuMobile = document.querySelector('.menuMobile');

button.addEventListener('click', function() {
  menuMobile.classList.toggle('show');
});

