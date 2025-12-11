// Common layout logic shared by all pages

const fsyDate = new Date("2025-12-20T00:00:00");

export function initCommonLayout() {
  setupOverlayNav();
  setupCountdown();
}

function setupOverlayNav() {
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("nav-overlay");
  const closeBtn = document.getElementById("overlay-close");

  if (!toggle || !overlay || !closeBtn) return;

  const links = overlay.querySelectorAll("a");

  toggle.addEventListener("click", () => {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  });

  const closeOverlay = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  };

  closeBtn.addEventListener("click", closeOverlay);
  links.forEach((link) => link.addEventListener("click", closeOverlay));
}

function setupCountdown() {
  const el = document.getElementById("fsy-countdown");
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = fsyDate.getTime() - now.getTime();

    if (diff <= 0) {
      el.textContent = "FSY is happening now. Have fun!";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    el.textContent = `FSY starts in ${days} days ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  update();
  setInterval(update, 1000);
}
