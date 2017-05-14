$(document).ready(function() {
  let url = 'http://swapi.co/api/people/?page=';
  let charCounter = 0;
  let charNumber = 0;
  let charArray = [];
  $('.char-info').hide();
  $('.jumbotron').hide();
  $('.jumbotron').fadeIn(2000);

  getCharacters();



  function getCharacters() {
    for (var i = 1; i < 10; i++) {
      $.getJSON(url + i)
        .then(function(people) {
            let charResults = people.results;
            for (var i = 0; i < charResults.length; i++) {
              charArray.push(charResults[i]);
            }
          });
    }
  }

  function makeCharacterList() {
    console.log(charArray);
    for (var i = 0; i < charArray.length; i++) {
      $('.list-group').append(
        '<a href="#" class="list-group-item container">' + i + ": " + charArray[i].name + '</a>'
      );
    }

  }


  $('#next').on('click', function() {
    //displayCharInfo();
    makeCharacterList();
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
