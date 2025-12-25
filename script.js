/* Card image (same Santa image for consistency) */
const images = [
  "how-old-is-santa-claus.jpg"
];

const cardImage = document.getElementById("cardImage");
cardImage.src = images[0];

const cardName = document.getElementById("cardName");
const cardMessage = document.getElementById("cardMessage");
const nameInput = document.getElementById("nameInput");
const msgInput = document.getElementById("msgInput");

/* Live preview */
nameInput.addEventListener("input", () => {
  cardName.innerText = nameInput.value || "Merry Christmas 🎄";
});

msgInput.addEventListener("input", () => {
  cardMessage.innerText =
    msgInput.value || "May this Christmas bring peace, love, and joy.";
});

/* WhatsApp */
function shareWhatsApp() {
  const text = `🎄 Merry Christmas!\n${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

/* Instagram */
function shareInstagram() {
  navigator.clipboard.writeText(location.href);
  alert("Link copied. Paste it in Instagram DM, bio, or story.");
}

/* Download */
function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = cardImage.src;

  img.onload = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#fffaf2");
    gradient.addColorStop(1, "#ffffff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, canvas.width, 720);

    ctx.fillStyle = "#2b2b2b";
    ctx.textAlign = "center";
    ctx.font = "bold 64px Georgia";
    ctx.fillText(cardName.innerText, canvas.width / 2, 860);

    ctx.font = "44px Georgia";
    ctx.fillStyle = "#444";
    wrap(ctx, cardMessage.innerText, canvas.width / 2, 940, 860, 58);

    const a = document.createElement("a");
    a.download = "christmas-card.png";
    a.href = canvas.toDataURL();
    a.click();
  };
}

function wrap(ctx, text, x, y, max, lh) {
  const words = text.split(" ");
  let line = "";
  for (let w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > max) {
      ctx.fillText(line, x, y);
      line = w + " ";
      y += lh;
    } else line = test;
  }
  ctx.fillText(line, x, y);
}
