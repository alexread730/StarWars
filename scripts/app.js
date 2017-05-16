$(document).ready(function() {
  const PEOPLE_URL = 'https://swapi.co/api/people/?page=';
  let charArray = [];
  let charNum = 0;

  $('.list-group').hide();
  $('.jumbotron').hide();
  $('.loading').hide();
  $('.jumbotron').fadeIn(2000);

  getCharacters();



  function getCharacters() {
    const promises = [];
    for (let i = 1; i < 10; i++) {
      const promise = $.getJSON(PEOPLE_URL + i);
      promises.push(promise)
    }
    Promise
      .all(promises)
      .then(showCharacters);
  }

  function showCharacters(pages) {
    pages.forEach(makeCharacterArray);
    charArray.forEach(makeCharacterList);
    $('.list-group').fadeIn(2000);
      console.log(charArray[0]);
  }


  function makeCharacterArray(page) {
    //for each page, push the characters to charArray
    page.results.forEach(function(characters) {
      charArray.push(characters);
    });

  }

  function makeCharacterList(character) {
    //append list of characters to page
    $('.list-group').append(
      `<button type="button" data-index=${charNum} class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg">${character.name}</button>`);
    charNum++;
    }

  $('.list-group').on('click', '.btn', function() {
    event.preventDefault();
    $('.loading').show();
    let index = $(this).attr('data-index');
    let homeworldURL = charArray[index].homeworld;
    let speciesURL = charArray[index].species[0];
    let films = charArray[index].films;
    $('#name').text(charArray[index].name);
    $('#born').text("Born: " + charArray[index].birth_year);
    getHomeworld(homeworldURL);
    getSpecies(speciesURL);
    getFilms(films);

  });

  function getHomeworld(homeworld) {
    $.getJSON(homeworld)
      .then(function(response) {
        $('#homeworld').text(`Homeworld: ${response.name}`);
      });
  }

  function getSpecies(species) {
    $.getJSON(species)
      .then(function(response) {
        $('#species').text(`Species: ${response.name}`);
      });
  }

  function getFilms(films) {
    $('#films').empty();
    for (var i = 0; i < films.length; i++) {
      $.getJSON(films[i])
        .then(function(response) {
          $('#films').append(`<li>Episode ${response.episode_id}: ${response.title}</li>`);
          $('.loading').hide();
        });
    }

  }

});
