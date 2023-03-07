(function navbar() {
  addEventListener("scroll", scrollFunction);
})();

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "0px 10px";
    document.getElementById("logoel1").style.opacity = 0;
  } else {
    document.getElementById("navbar").style.padding = "50px 10px";
    document.getElementById("logoel1").style.opacity = 1;
  }
}
