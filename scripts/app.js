$(document).ready(function() {
  let url = 'http://swapi.co/api/people/';
  let charCounter = 0;
  let charNumber = 0;
  $('.char-info').hide();


  $('#next').on('click', function() {

    displayCharInfo();

    });

    function displayCharInfo() {
      $.getJSON(url)
        .then(function(people) {
          console.log(people);
          $('.char-info').hide();
          $('.char-info').fadeIn(1000);

          //array of characters from API
          var peopleArray = people.results;

          //display of character information
          $('#name').text(peopleArray[charCounter].name);
          $('#born').text('Born: ' + peopleArray[charCounter].birth_year);
          $('#gender').text('Gender: ' +peopleArray[charCounter].gender);
          $('#height').text('Height: ' +peopleArray[charCounter].height);
          $('#homeworld').text('Homeworld: ' +peopleArray[charCounter].homeworld);
          //add one to character counter
          charCounter++;
          //if counter reaches 10, update url for next request to the API (10 more characters). Set charCounter to 0.
          if (charCounter == 10) {
            url = people.next;
            charCounter = 0;
          }
        });
    }


});
