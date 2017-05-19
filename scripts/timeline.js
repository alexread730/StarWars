$(document).ready(function() {
  let bodyHeight = $(window).height() +10;
  let position = 0;
  let boxPositions = [];
  let descriptions = [];

  $.get('./scripts/timeline-events.json')
    .then(function(eventArray) {
      eventArray.forEach(function(event) {
        for (let i=0; i<event.time; i++){
          //adjust page height
          $('body').height(bodyHeight+=8);
          $('#viewport').prepend(event.text);
          if (event.description) {
            descriptions.push(event.description);
          }
          //adjust spacing for each event below
          position -= (8);
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

      $('.box').on('click', function() {
        $('#modal-conent').empty();
        let selected = this.id;
        $('#modal-conent').append(descriptions[selected]);
      });

    });
});
