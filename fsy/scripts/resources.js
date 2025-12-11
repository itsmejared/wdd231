import { initCommonLayout } from "./main.js";

initCommonLayout();

const container = document.getElementById("resources-container");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const modalOverlay = document.getElementById("resource-modal");
const modalBody = document.getElementById("resource-modal-body");
const modalClose = document.getElementById("modal-close");

const BASE_URL = "https://www.churchofjesuschrist.org";
let resources = [];

async function loadResources() {
  if (!container) return;

  try {
    const response = await fetch("data/resources.json");
    if (!response.ok) {
      throw new Error(`Failed to load resources: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      container.textContent = "No resources are available at the moment.";
      return;
    }
    resources = data;
    renderResources(resources);
    setGridView();
  } catch (error) {
    console.error(error);
    container.textContent =
      "There was a problem loading the resources. Please try again later.";
  }
}

function createResourceCard(item) {
  const card = document.createElement("article");
  card.className = "resource-card";
  card.tabIndex = 0;
  card.setAttribute("data-id", item.id);

  const img = document.createElement("img");
  img.setAttribute("data-src", item.image);
  img.setAttribute("alt", item.title);
  img.classList.add("lazy");

  const body = document.createElement("div");
  body.className = "resource-body";

  const title = document.createElement("h3");
  title.className = "resource-title";
  title.textContent = item.title;

  const meta = document.createElement("p");
  meta.className = "resource-meta";
  meta.textContent = `${item.category} • ${item.type}`;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const link = document.createElement("a");
  link.className = "resource-link";
  link.href = BASE_URL + item.path;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Open on churchofjesuschrist.org";

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(desc);
  body.appendChild(link);

  card.appendChild(img);
  card.appendChild(body);

  card.addEventListener("click", () => openResourceModal(item.id));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openResourceModal(item.id);
    }
  });

  return card;
}

function renderResources(list) {
  if (!container) return;
  container.innerHTML = "";

  list.forEach((item) => {
    const card = createResourceCard(item);
    container.appendChild(card);
  });

  setupLazyLoading();
}

function setupLazyLoading() {
  const images = document.querySelectorAll("img.lazy[data-src]");
  if (!("IntersectionObserver" in window)) {
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          obs.unobserve(img);
        }
      });
    },
    { rootMargin: "100px" }
  );

  images.forEach((img) => observer.observe(img));
}

function setGridView() {
  if (!container || !gridBtn || !listBtn) return;
  container.classList.remove("resources-list");
  container.classList.add("resources-grid");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
}

function setListView() {
  if (!container || !gridBtn || !listBtn) return;
  container.classList.remove("resources-grid");
  container.classList.add("resources-list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
}

function openResourceModal(id) {
  if (!modalOverlay || !modalBody) return;

  const item = resources.find((r) => r.id === id);
  if (!item) return;

  modalBody.innerHTML = "";

  const title = document.createElement("h2");
  title.id = "resource-modal-title";
  title.textContent = item.title;

  const category = document.createElement("p");
  category.className = "modal-category";
  category.textContent = `${item.category} • ${item.type}`;

  const desc = document.createElement("p");
  desc.textContent = item.fullDescription;

  const link = document.createElement("a");
  link.href = BASE_URL + item.path;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Open this resource on churchofjesuschrist.org";

  modalBody.appendChild(title);
  modalBody.appendChild(category);
  modalBody.appendChild(desc);
  modalBody.appendChild(link);

  modalOverlay.classList.add("show");
  modalOverlay.setAttribute("aria-hidden", "false");
}

function closeResourceModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("show");
  modalOverlay.setAttribute("aria-hidden", "true");
}

if (gridBtn && listBtn) {
  gridBtn.addEventListener("click", setGridView);
  listBtn.addEventListener("click", setListView);
}

if (modalClose && modalOverlay) {
  modalClose.addEventListener("click", closeResourceModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeResourceModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlay.classList.contains("show")) {
      closeResourceModal();
    }
  });
}

loadResources();
