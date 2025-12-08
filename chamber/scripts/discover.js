import { placesOfInterest } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("discoverGrid");
  const visitMsg = document.getElementById("visitMessage");

  renderCards();
  updateVisitMessage();

  // -------------------------------
  // RENDER CARDS
  // -------------------------------
  function renderCards() {
    grid.innerHTML = "";

    placesOfInterest.forEach((place, index) => {
      const card = document.createElement("section");
      card.classList.add("discover-card", `place-${index + 1}`);

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="images/${place.image}" alt="${place.name}">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn more</button>
      `;

      grid.appendChild(card);
    });
  }

  // -------------------------------
  // VISIT MESSAGE SYSTEM
  // -------------------------------
  function updateVisitMessage() {
    const key = "discover-last-visit";
    const now = Date.now();
    const last = localStorage.getItem(key);
    const visitText = document.getElementById("visitText");
    const visitBox = document.getElementById("visitMessage");
    const closeBtn = document.getElementById("closeVisitMsg");

    let msg = "";

    if (!last) {
        msg = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - last) / (1000 * 60 * 60 * 24));

        if (days < 1) msg = "Back so soon! Awesome!";
        else if (days === 1) msg = "You last visited 1 day ago.";
        else msg = `You last visited ${days} days ago.`;
    }

    visitText.textContent = msg;

    // Save new timestamp
    localStorage.setItem(key, now);

    // Close (hide) message when clicking X
    closeBtn.addEventListener("click", () => {
        visitBox.style.display = "none";
    });
}


});
