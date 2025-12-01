document.addEventListener("DOMContentLoaded", () => {
  // 1. Timestamp: guardar fecha/hora cuando se carga el form
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    // ISO string para fácil parse en thankyou
    timestampInput.value = now.toISOString();
  }

  // 2. Modals de beneficios
  const links = document.querySelectorAll(".benefits-link");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const level = link.dataset.modal; // np, bronze, silver, gold
      const modal = document.getElementById(`modal-${level}`);
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  });

  const closeButtons = document.querySelectorAll(".modal-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) {
        dialog.close();
      }
    });
  });
});
