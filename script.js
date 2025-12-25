const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const cardTitle = document.getElementById("cardTitle");
const cardMessage = document.getElementById("cardMessage");

nameInput.addEventListener("input", () => {
  cardTitle.textContent = nameInput.value
    ? `Merry Christmas 🎄 — ${nameInput.value}`
    : "Merry Christmas 🎄";
});

messageInput.addEventListener("input", () => {
  cardMessage.textContent =
    messageInput.value ||
    "May this Christmas bring peace, love, and joy.";
});

function shareWhatsApp() {
  const text = `${cardTitle.textContent}\n\n${cardMessage.textContent}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

function copyInstagram() {
  navigator.clipboard.writeText(
    `${cardTitle.textContent}\n\n${cardMessage.textContent}`
  );
  alert("Text copied for Instagram.");
}
