$(document).ready(function() {
  const PEOPLE_URL = 'https://swapi.co/api/people/?page=';
  let charArray = [];
  let charNum = 0;

  $('.list-group').hide();
  $('.jumbotron').hide();
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
      `<button type="button" data-index=${charNum} class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg">${character.name}</button>`);
    charNum++;
    }

  $('.list-group').on('click', '.btn', function() {
    event.preventDefault();
    let index = $(this).attr('data-index');

    $('#name').text(charArray[index].name);
    $('#born').text(charArray[index].birth_year);
    $('#homeworld').text();
    $('#species').text(charArray[index].species);
    $('#films').text(charArray[index].films);
  });


});
