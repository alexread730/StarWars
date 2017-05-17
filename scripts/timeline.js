$(document).ready(function() {
  let bodyHeight = 200;
  let position = 0;
  let boxPositions = [];
  $.get('./scripts/timeline-events.json')
    .then(function(eventArray) {
      eventArray.forEach(function(event) {
        for (let i=0; i<event.time; i++){
          $('body').height(bodyHeight -= 10);
          $('#viewport').prepend(event.text);
          //adjust spacing for each hidden below
          position -= (55);
          boxPositions.push(position);
        }
      });

      var scrollPosition = document.body.scrollTop;

      function scrollDelta() {
        var newScrollPosition = document.body.scrollTop,
            delta = newScrollPosition - scrollPosition;
        scrollPosition = document.body.scrollTop;
        return delta;
      }

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
      $('.box').hide();
      $('.verticalLine').hide()
      $('.box').fadeIn(2000);
      $('.verticalLine').fadeIn(2000);

    });
});
