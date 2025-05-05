import config from "../conf/index.js";

function getCityFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("city");
}

async function fetchAdventures(city) {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function addAdventureToDOM(adventures) {
  const container = document.getElementById("data");
  container.innerHTML = "";

  adventures.forEach((adventure) => {
    let link = `detail/?adventure=${adventure.id}`; 
    const card = document.createElement("div");
    card.className = "col-6 col-lg-3 mb-4";
    card.innerHTML = `
    <a href="${link}" id="${adventure.id}" class="activity-card">
      <p class="category-banner">${adventure.category}</p>
  
      <img src="${adventure.image}" alt="${adventure.name}" class="adventure-img"/>
  
      <div class="mt-2 px-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <h5 class="card-title">${adventure.name}</h5>
          <p class="card-text">₹${adventure.costPerHead}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center w-100">
          <p class="card-text">Duration</p>
          <p class="card-text">${adventure.duration} hours</p>
        </div>
      </div>
    </a>
  `;
  

    container.appendChild(card);
  });
}

function filterByDuration(list, low, high) {
  return list.filter(
    (adventure) => adventure.duration >= low && adventure.duration <= high
  );
}

function filterByCategory(list, categoryList) {
  return list.filter((adventure) => categoryList.includes(adventure.category));
}

function filterFunction(list, filters) {
  let filteredList = list;

  if (filters.duration) {
    const [low, high] = filters.duration.split("-").map(Number);
    filteredList = filterByDuration(filteredList, low, high);
  }

  if (filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  return filteredList;
}

function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
}

function getFiltersFromLocalStorage() {
  const filters = localStorage.getItem("filters");
  return filters ? JSON.parse(filters) : null;
}

function generateFilterPillsAndUpdateDOM(filters) {
  const categoryListContainer = document.getElementById("category-list");
  categoryListContainer.innerHTML = "";

  filters.category.forEach((category) => {
    const pill = document.createElement("span");
    pill.className = "badge bg-secondary me-2";
    pill.textContent = category;
    categoryListContainer.appendChild(pill);
  });

  const durationSelect = document.getElementById("duration-select");
  durationSelect.value = filters.duration;
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
