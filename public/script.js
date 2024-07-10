document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/query-offers");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const items = await response.json();
    displayOffers(items);
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
});

function displayOffers(offers) {
  const offersList = document.getElementById("offers-list");
  offers.forEach((offer) => {
    // Create offer item container
    const offerDiv = document.createElement("div");
    offerDiv.classList.add("offer-item");
    // Create HTML template for offer item
    const offerTemplate = `
        <div class="offer-inner">
          <div class="offer-front">
          <div class = "offer-header">
            <img id = "offer-logo" src="${offer.logo.S}">
            <div class="company-name">${offer.Company.S}</div>
            </div>
            <div class = "offer-front-information">
            <div class="offer-title">${offer.Title.S}</div>
            <div class="description">${offer.Description.S}</div>
            </div>
            <div class = "button-container">
            <button id = "view-btn">View now</button>
            </div>
          </div>
          <div class="offer-back">
          <div class = "go-back">
          <p>Go back</p>
          <i id = "back-arrow" class="fa-solid fa-left-long"></i>
          </div>
          <h3>${offer.Discount.S}</h3>
          <p>${offer.Conditions.S}</p>
          <p>To be used ${offer.Location.S}</p>
          <p>Expires ${offer.Expiry.S}</p>
        </div>
        </div>
      `;
    // Set innerHTML of offerDiv to the template
    offerDiv.innerHTML = offerTemplate;

    // Append offerDiv to offersList
    offersList.appendChild(offerDiv);

    const viewBtn = offerDiv.querySelector("#view-btn");
    viewBtn.addEventListener("click", () => {
      offerDiv.classList.toggle("flipped");
    });
    const backBtn = offerDiv.querySelector("#back-arrow");
    backBtn.addEventListener("click", () => {
      offerDiv.classList.toggle("flipped");
    });
  });
}
