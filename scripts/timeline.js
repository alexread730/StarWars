var scrollPosition = document.body.scrollTop;

function scrollDelta() {
  var newScrollPosition = document.body.scrollTop,
      delta = newScrollPosition - scrollPosition;
  scrollPosition = document.body.scrollTop;
  return delta;
}

var boxPositions = [-100, -50, 0];
function moveCamera() {
  var boxes = document.getElementsByClassName("box"),
      delta = scrollDelta();
  for (var i=0,l=boxes.length;i<l;i++) {
    boxPositions[i] += delta;
    boxes[i].style["-webkit-transform"] = "translateZ("+boxPositions[i]+"px)";
  }
}
window.addEventListener("scroll", moveCamera, false);
window.scrollTo(0, document.body.scrollHeight);
