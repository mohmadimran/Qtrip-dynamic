import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) { 
    cities.forEach((key) => { 
      console.log(key);
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const url = `${config.backendEndpoint}/cities`; 
    const response = await fetch(url); 
    const citiesData = await response.json(); 
    return citiesData; 
    
  } catch (error) {
    console.log(error);
    return null; 
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let link = `pages/adventures/?city=${id}`; 
  let cardsRow = document.querySelector("#data");
  cardsRow.innerHTML += `
  <div class="col-sm-6 col-lg-3 mb-4"> 
      <a href="${link}" id="${id}">
          <div class="tile">
            <img src="${image}" alt="${city}">
            <div class="tile-text">
              <h5>${city}</h5>
              <p>${description}</p>
            </div> 
          </div>
        </a>
  </div>
  `

}

export { init, fetchCities, addCityToDOM };
