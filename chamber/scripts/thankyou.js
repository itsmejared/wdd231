document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const map = [
    { spanId: "first-name", param: "firstName" },
    { spanId: "last-name", param: "lastName" },
    { spanId: "email", param: "email" },
    { spanId: "phone", param: "phone" },
    { spanId: "organization", param: "organizationName" },
    { spanId: "membership", param: "membershipLevel" }
  ];

  map.forEach(({ spanId, param }) => {
    const el = document.getElementById(spanId);
    if (el) {
      el.textContent = params.get(param) || "";
    }
  });

  const tsSpan = document.getElementById("timestamp-display");
  const rawTs = params.get("timestamp");
  if (tsSpan) {
    if (rawTs) {
      const date = new Date(rawTs);
      if (!isNaN(date.getTime())) {
        tsSpan.textContent = date.toLocaleString();
      } else {
        tsSpan.textContent = rawTs;
      }
    } else {
      tsSpan.textContent = "";
    }
  }
});
