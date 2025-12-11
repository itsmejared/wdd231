import { initCommonLayout } from "./main.js";

initCommonLayout();

/* FAQ accordion */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-question");
  if (!btn) return;
  btn.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

/* Audition form + localStorage + previous submission message */
const form = document.getElementById("auditionForm");
const previousMessage = document.getElementById("previous-submission-message");
const STORAGE_KEY = "fsyAuditionSubmissions";

function loadPreviousSubmissionMessage() {
  if (!previousMessage) return;

  previousMessage.hidden = true;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return;

    const last = list[list.length - 1];
    const dateText = new Date(last.submittedAt).toLocaleString();
    previousMessage.textContent = `You have already submitted an audition on ${dateText}. If you need to update your information, you may submit the form again.`;
    previousMessage.hidden = false;
  } catch (error) {
    console.error("Error reading previous submissions:", error);
  }
}

loadPreviousSubmissionMessage();

if (form) {
  form.addEventListener("submit", (event) => {
    const name = form.name.value.trim();
    const unit = form.unit.value.trim();
    const performanceType = form.performanceType.value;
    const videoUrl = form.videoUrl.value.trim();
    const notes = form.notes.value.trim();

    if (!name || !unit || !performanceType || !videoUrl || !notes) {
      event.preventDefault();
      alert("Please fill in all required fields before submitting your audition.");
      return;
    }

    const submission = {
      name,
      unit,
      performanceType,
      videoUrl,
      notes,
      submittedAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      const updated = Array.isArray(existing) ? existing : [];
      updated.push(submission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving audition submission:", error);
    }
  });
}
