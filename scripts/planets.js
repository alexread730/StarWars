const PLANETS_URL = 'https://swapi.co/api/planets/?page=';
let planetArray = [];
let planetNum = 0;

getPlanets();
console.log('good to go!');


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
  // $.get('./scripts/character-images.json')
  // .then( function(imageArray){
  //   imageArray.find(function(imageObj){
  //     if (character.name == imageObj.name) {
  //       avatar = imageObj.image;
  //     }
  //   });
    //append list of characters to page
    $('.list-group').append(
      `<button type="button" data-index=${planetNum} class="btn btn-info btn-block" id="char-button" data-toggle="modal" data-target=".bs-example-modal-lg"><img src="${avatar}" width="50%" height="auto"><br />${planet.name}</button>`);
    planetNum++;
  // });
  }

  $('.list-group').on('click', '.btn', function() {
    event.preventDefault();
    $('.loading').show();
    let index = $(this).attr('data-index');
    // getAvatar(index);
    // let homeworldURL = planetArray[index].homeworld;
    // let speciesURL = charArray[index].species[0];
    // let films = charArray[index].films;
    // $('#name').text(charArray[index].name);
    // $('#born').text("Born: " + charArray[index].birth_year);
    // getHomeworld(homeworldURL);
    // getSpecies(speciesURL);
    // getFilms(films);

  });
