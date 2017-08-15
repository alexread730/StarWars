$(document).ready(function() {
  let charArray = [];

  getCharacters();

  function getCharacters() {
    const PEOPLE_URL = 'http://swapi.co/api/people/?page=';
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
  }


  function makeCharacterArray(page) {
    //for each page, push the characters to charArray
    page.results.forEach(function(characters) {
      charArray.push(characters);
    });

  }

  function makeCharacterList(character,charNum) {
    let avatar = "";
    $.get('./scripts/character-images.json')
      .then(function(imageArray){
        imageArray.find(function(imageObj){
          if (character.name == imageObj.name) {
            avatar = imageObj.image;
          }
        });
        //append list of characters to page
        $('.list-group').append(
          `<button type="button" data-index="${charNum}" class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg"><img src="${avatar}" width="50%" height="auto"><br />${character.name}</button>`);
      });
  }

  // function imageMatch(imageObj) {
  //   let avatar = "";
  //   if (character.name == imageObj.name) {
  //     avatar = imageObj.image;
  //   }
  // }


  $('.list-group').on('click', '.btn', function() {
    event.preventDefault();
    $('.loading').show();
    let index = $(this).attr('data-index');
    getAvatar(index);
    let homeworldURL = charArray[index].homeworld;
    let speciesURL = charArray[index].species[0];
    let films = charArray[index].films;
    $('#name').text(charArray[index].name);
    $('#born').text("Born: " + charArray[index].birth_year);
    getHomeworld(homeworldURL);
    getSpecies(speciesURL);
    getFilms(films);

  });

  $('#search').on('click', function(event) {
    const SEARCH_URL = 'http://swapi.co/api/people/?search=';
    event.preventDefault();
    let searchVal = $('#search-input').val();
    $('.btn-info').hide();
    $.get(SEARCH_URL + searchVal)
      .then(showSearchResults);
  });

  function showSearchResults(response) {
    let searchArray = response.results;
    searchArray.forEach(function(person) {
      let name = person.name;
      let matchIndex = charArray.findIndex(function(character) {
        return character.name == name;
      });
      let charNum = matchIndex;
      $('.list-group').append(
        `<button type="button" data-index=${charNum} class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg"><img src="" width="50%" height="auto"><br />${name}</button>`);
    });
  }

  function getAvatar(index) {
    $('.character-avatar').empty();
    $.get('./scripts/character-images.json')
    .then(function(imageArray){
      imageArray.find(function(imageObj){
        if (charArray[index].name == imageObj.name) {
          $('.character-avatar').append(`<img class='cropper' src="${imageObj.image}">`);
        }
      });
    });
  }

  function getHomeworld(homeworld) {
    $.getJSON(homeworld.replace(/http/, 'https'))
      .then(function(response) {
        $('#homeworld').text(`Homeworld: ${response.name}`);
      });
  }

  function getSpecies(species) {
    $.getJSON(species.replace(/http/, 'https'))
      .then(function(response) {
        $('#species').text(`Species: ${response.name}`);
      });
  }

  function getFilms(films) {
    $('#films').empty();
    for (var i = 0; i < films.length; i++) {
      $.getJSON(films[i].replace(/http/, 'https'))
        .then(function(response) {
          $('#films').append(`<li>Episode ${response.episode_id}: ${response.title}</li>`);
          $('.loading').hide();
        });
    }
  }
});
