async function getSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  const eligible = data.filter(m =>
    m.membership === "Gold" || m.membership === "Silver"
  );

  const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.getElementById("spotlight-container");

  container.innerHTML = selected
    .map(m => `
      <section class="spotlight-card">

          <div class="spotlight-header">
              <h3>${m.name}</h3>
              <p class="tagline">${m.description}</p>
          </div>

          <div class="spotlight-divider"></div>

          <div class="spotlight-content">
              <img src="images/${m.image}" class="spotlight-img" alt="${m.name} logo">

              <div class="spotlight-info">
                  <p><strong>EMAIL:</strong> ${m.email}</p>
                  <p><strong>PHONE:</strong> ${m.phone}</p>
                  <p><strong>URL:</strong> ${m.website}</p>
              </div>
          </div>

      </section>
    `)
    .join("");
}

getSpotlights();
