let planetArray = [];

getPlanets();

function getPlanets() {
  const PLANETS_URL = 'https://swapi.co/api/planets/?page=';
  const promises = [];
  //get planets from api, place in promise array
  for (let i = 1; i < 8; i++) {
    const promise = $.getJSON(PLANETS_URL + i);
    promises.push(promise)
  }
  //resolve promise array
  Promise
    .all(promises)
    .then(showPlanets);
}

function showPlanets(pages) {
  pages.forEach(makePlanetsArray);
  planetArray.forEach(makePlanetList);
  $('.list-group').fadeIn(2000);
}

function makePlanetsArray(page) {
  //for each page, push the planets to planetArray
  page.results.forEach(function(planet) {
    planetArray.push(planet);
  });

}

function makePlanetList(planet,planetNum) {
   let avatar = "";
  $.get('./scripts/planet-images.json')
    .then(function(imageArray){
      imageArray.find(function(imageObj){
        if (planet.name == imageObj.name) {
          avatar = imageObj.image;
        }
      });
      //append list of characters to page
      $('.list-group').append(
        `<button type="button" data-index=${planetNum} class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg"><img src="${avatar}" width="50%" height="auto"><br />${planet.name}</button>`);
    });
}

  //planet info modal display
  $('.list-group').on('click', '.btn', function() {
    event.preventDefault();
    $('.loading').show();
    let index = $(this).attr('data-index');
    let residents = planetArray[index].residents;
    getAvatar(index);
    $('#name').text(planetArray[index].name);
    $('#population').text(`Population: ${planetArray[index].population}`);
    $('#climate').text(`Climate: ${planetArray[index].climate}`);
    $('#terrain').text(`Terrain: ${planetArray[index].terrain}`);
    $('#diameter').text(`Diameter: ${planetArray[index].diameter}`);
    $('#terrain').text(`Terrain: ${planetArray[index].climate}`);
    $('#gravity').text(`gravity: ${planetArray[index].gravity}`);

    getResidents(residents);

  });

//search function
  $('#search').on('click', function(event) {
    const SEARCH_URL = 'https://swapi.co/api/planets/?search=';
    event.preventDefault();
    let searchVal = $('#search-input').val();
    $('.btn-info').hide();
    $.get(SEARCH_URL + searchVal)
      .then(showSearchResults);
  });

//only show those planets with search box values in them
  function showSearchResults(response) {
    let searchArray = response.results;
    searchArray.forEach(function(planet) {
      let name = planet.name;
      let matchIndex = planetArray.findIndex(function(planet) {
        return planet.name == name;
      });
      let planetNum = matchIndex;
      $('.list-group').append(
        `<button type="button" data-index=${planetNum} class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg"><img src="" width="50%" height="auto"><br />${name}</button>`);
    });
  }

//match planet picture with planet name and display
  function getAvatar(index) {
    $('.planet-avatar').empty();
    $.get('./scripts/planet-images.json')
      .then(function(imageArray){

        imageArray.find(function(imageObj){
        if (planetArray[index].name == imageObj.name) {
          $('.planet-avatar').append(`<img class="cropper" src="${imageObj.image}">`);
        }
        });
    });
  }


//find residents from API with chosen planet name
  function getResidents(residents) {
    $('#residents').empty();
    if (residents.length != 0) {
      for (var i = 0; i < residents.length; i++) {
        $.getJSON(residents[i])
          .then(function(response) {
            $('#residents').append(`<li>${response.name}</li>`);
            $('.loading').hide();
          });
      }
    } else if (residents.length == 0){
      $('.loading').hide();
      $('#residents-title').text('Residents: ');
    }
  }
