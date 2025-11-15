document.addEventListener("DOMContentLoaded", () => {

    const membersContainer = document.getElementById("membersContainer");
    const gridBtn = document.getElementById("gridBtn");
    const listBtn = document.getElementById("listBtn");
    const jsonURL = "data/members.json";

    let membersData = [];

    async function loadMembers() {
        const response = await fetch(jsonURL);
        membersData = await response.json();
        displayGridView();
    }

    // -------------------------------
    // GRID VIEW (tarjetas)
    // -------------------------------
    function displayGridView() {
        membersContainer.innerHTML = "";
        membersContainer.classList.add("directory-grid");
        membersContainer.classList.remove("directory-list");

        membersData.forEach(m => {
            const card = document.createElement("section");
            card.classList.add("member-card");

            card.innerHTML = `
                <img src="images/${m.image}" alt="${m.name}">
                <h3>${m.name}</h3>
                <p>${m.address}</p>
                <p>${m.phone}</p>
                <a href="${m.website}" target="_blank">Visit Website</a>
            `;

            membersContainer.appendChild(card);
        });
    }

    // -------------------------------
    // LIST VIEW (fila estilo tabla)
    // -------------------------------
    function displayListView() {
        membersContainer.innerHTML = "";
        membersContainer.classList.add("directory-list");
        membersContainer.classList.remove("directory-grid");

        membersData.forEach((m, index) => {
            const row = document.createElement("div");
            row.classList.add("list-item");
            if (index % 2 === 0) row.classList.add("even");

            row.innerHTML = `
                <span class="list-name">${m.name}</span>
                <span class="list-address">${m.address}</span>
                <span class="list-phone">${m.phone}</span>
                <span class="list-website"><a href="${m.website}" target="_blank">${m.website}</a></span>
            `;

            membersContainer.appendChild(row);
        });
    }

    // -------------------------------
    // Buttons
    // -------------------------------
    gridBtn.addEventListener("click", displayGridView);
    listBtn.addEventListener("click", displayListView);

    loadMembers();
});
