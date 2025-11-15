document.addEventListener("DOMContentLoaded", () => {
  const directory = document.querySelector("#directory");
  const gridBtn = document.querySelector("#grid-btn");
  const listBtn = document.querySelector("#list-btn");

  async function loadMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  }

  function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
      const card = document.createElement("article");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
      `;

      directory.appendChild(card);
    });
  }

  gridBtn.addEventListener("click", () => {
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });

  // Footer dates
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#last-mod").textContent = document.lastModified;

  loadMembers();
});
