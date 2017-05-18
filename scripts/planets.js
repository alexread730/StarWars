const PLANETS_URL = 'https://swapi.co/api/planets/?page=';
const SEARCH_URL = 'https://swapi.co/api/planets/?search=';
let planetArray = [];
let planetNum = 0;

getPlanets();

function getPlanets() {
  const promises = [];
  for (let i = 1; i < 8; i++) {
    const promise = $.getJSON(PLANETS_URL + i);
    promises.push(promise)
  }
  Promise
    .all(promises)
    .then(showPlanets);
}

function showPlanets(pages) {
  pages.forEach(makePlanetsArray);
  planetArray.forEach(makePlanetList);
  $('.list-group').fadeIn(2000);
    console.log(planetArray[0]);
}

function makePlanetsArray(page) {
  //for each page, push the planets to planetArray
  page.results.forEach(function(planet) {
    planetArray.push(planet);
  });

}

function makePlanetList(planet) {
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
      planetNum++;
    });
}

  $('.list-group').on('click', '.btn', function() {
    event.preventDefault();
    $('.loading').show();
    let index = $(this).attr('data-index');
    console.log(planetArray);
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

  $('#search').on('click', function(event) {
    event.preventDefault();
    let searchVal = $('#search-input').val();
    $.get(SEARCH_URL + searchVal)
      .then(function(response) {
        $('.btn-info').hide();
        console.log(response.results);
        planetNum = 0;
        response.results.forEach(makePlanetList);
      });
  });

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

  function getResidents(residents) {
    $('#residents').empty();
    if (residents.length) {
      for (var i = 0; i < residents.length; i++) {
        $.getJSON(residents[i].replace(/http/, 'https'))
          .then(function(response) {
            $('#residents').append(`<li>${response.name}</li>`);
            $('.loading').hide();
          });
      }
    } else {
      $('.loading').hide();
      $('#residents-title').text('Residents: None');
    }
  }
