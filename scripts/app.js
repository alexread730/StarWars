$(document).ready(function() {
  const API_URL = 'http://swapi.co/api/people/?page=';
  let charArray = [];

  $('.list-group').hide();
  $('.jumbotron').hide();
  $('.jumbotron').fadeIn(2000);

  getCharacters();

  function getCharacters() {
    const promises = [];
    for (let i = 1; i < 10; i++) {
      const promise = $.getJSON(API_URL + i);
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
    console.log(charArray);
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
        `<button type="button" class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg">${character.name}</button>`);
    }

  $('.btn-info').click(displayCharModal);

  function displayCharModal() {
    console.log('hello!');
  }

});
