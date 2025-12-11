import { initCommonLayout } from "./main.js";

initCommonLayout();

const iframe = document.getElementById("performance-video");
const desc = document.getElementById("performance-description");
const prevBtn = document.getElementById("prev-performance");
const nextBtn = document.getElementById("next-performance");

let performances = [];
let currentIndex = 0;
let autoTimer = null;

async function loadPerformances() {
  try {
    const response = await fetch("data/performances.json");
    if (!response.ok) {
      throw new Error(`Failed to load performances: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      performances = data;
      currentIndex = 0;
      renderPerformance(currentIndex);
      startAutoSlide();
    } else if (desc) {
      desc.textContent =
        "Past performance examples will be added soon. Please check back later.";
    }
  } catch (error) {
    console.error(error);
    if (desc) {
      desc.textContent =
        "Past performance examples are currently unavailable. Please try again later.";
    }
  }
}

function renderPerformance(index) {
  if (!iframe || !desc || performances.length === 0) return;
  const item = performances[index];
  iframe.src = item.videoUrl;
  desc.textContent = item.description;
}

function showNext() {
  if (performances.length === 0) return;
  currentIndex = (currentIndex + 1) % performances.length;
  renderPerformance(currentIndex);
}

function showPrev() {
  if (performances.length === 0) return;
  currentIndex = (currentIndex - 1 + performances.length) % performances.length;
  renderPerformance(currentIndex);
}

function startAutoSlide() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(showNext, 8000);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    showPrev();
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    showNext();
    startAutoSlide();
  });
}

loadPerformances();
