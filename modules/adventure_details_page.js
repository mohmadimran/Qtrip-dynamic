import config from "../conf/index.js";

// Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  console.log("params id",params);
  const adventureId = params.get("adventure");
  
  // Returning the extracted adventure ID
  return adventureId;
}

// Implementation of fetch call with a parameterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const adventureDetails = await response.json();
    // Returning the fetched adventure details
    return adventureDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  const allImages = document.getElementById("photo-gallery");
  allImages.innerHTML = ''; 
  adventure.images.forEach(image => {
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = adventure.name; 
    imgElement.className = "activity-card-image";
    
    const divElement = document.createElement("div");
    divElement.appendChild(imgElement);
    
    allImages.appendChild(divElement);
  });

  
document.getElementById("adventure-content").textContent = adventure.content;

}

// Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  
  photoGallery.innerHTML = `<div id="carouselExampleIndicators"  class="carousel slide h-50 carousal-container" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
     <div class="carousel-inner">
       ${images.map((image, index) => `
         <div class="carousel-item ${index === 0 ? 'active' : ''}">
           <img src="${image}" class="d-block w-100 carosal-img activity-card-image" alt="Adventure Image">
         </div>
       `).join('')}
     </div>  
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
  </button>
</div>`;

}


// Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {

  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message
  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  const availablePanel = document.getElementById("reservation-panel-available");

  if (adventure.available) {
    soldOutPanel.style.display = "none";
    availablePanel.style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;

  } else {
    soldOutPanel.style.display = "block";
    availablePanel.style.display = "none";
  }
}

// Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").textContent = totalCost;
}

// Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the form details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page
  // 3. If the reservation fails, just show an alert with "Failed!"
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const reservationData = {
      name: formData.get("name"),
      date: formData.get("date"),
      person: formData.get("person"),
      adventure: adventure.id,
    };

    try {
      const response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        alert("Failed!");
      }
    } catch (error) {
      console.log("Failed to make reservation:", error);
      alert("Failed!");
    }
  });
}

// Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
