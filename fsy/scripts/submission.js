import { initCommonLayout } from "./main.js";

initCommonLayout();

const summaryContainer = document.getElementById("submission-summary");

function renderSummary() {
  if (!summaryContainer) return;

  const params = new URLSearchParams(window.location.search);

  const name = params.get("name") || "(not provided)";
  const unit = params.get("unit") || "(not provided)";
  const performanceType = params.get("performanceType") || "(not provided)";
  const videoUrl = params.get("videoUrl") || "(not provided)";
  const notes = params.get("notes") || "(not provided)";

  const wrapper = document.createElement("div");
  const dl = document.createElement("dl");

  const pairs = [
    ["Participant Name", name],
    ["Stake / Ward", unit],
    ["Performance Type", performanceType],
    ["Video Link", videoUrl],
    ["Short Description", notes],
  ];

  pairs.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  });

  wrapper.appendChild(dl);
  summaryContainer.appendChild(wrapper);
}

renderSummary();
