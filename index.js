window.addEventListener("scroll", function() {
    var header = document.getElementById("header");
    if (window.pageYOffset > 0) {
      header.classList.add("small");
    } else {
      header.classList.remove("small");
    }
  });