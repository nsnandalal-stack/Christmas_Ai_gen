const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const cardTitle = document.getElementById("cardTitle");
const cardMessage = document.getElementById("cardMessage");
const cardImage = document.getElementById("cardImage");

const images = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng3bmxzNTV3dmNzaGl0cTRyNWp3dXFnajR2ZWs3bnUyajZyZ2NycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G4TM38TROaeGj5pkXh/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZrYm03bG10OThkZWl5d3B5ZnBlZTdqbGM2Z3psYjNqa2VyZnJtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gNke2UrUTopOg/giphy.gif"
];

let current = 0;

function switchImage() {
  current = (current + 1) % images.length;
  cardImage.src = images[current];
}

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

function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = cardImage.src;

  img.onload = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, canvas.width, 600);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    ctx.font = "bold 64px serif";
    ctx.fillText(cardTitle.textContent, canvas.width / 2, 720);

    ctx.font = "42px serif";
    wrapText(ctx, cardMessage.textContent, canvas.width / 2, 800, 900, 52);

    const link = document.createElement("a");
    link.download = "christmas-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
