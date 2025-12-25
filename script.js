/* Santa image used on the card (local asset recommended) */
const images = [
  "assets/how-old-is-santa-claus.avif"
];

let imgIndex = 0;
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

/* WhatsApp share */
function shareWhatsApp() {
  const text = `🎄 Merry Christmas!\n${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

/* Instagram (copy link) */
function shareInstagram() {
  navigator.clipboard.writeText(location.href);
  alert("Link copied. Paste it in Instagram DM, bio, or story.");
}

/* Download card */
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

    const fade = ctx.createLinearGradient(0, 700, 0, 820);
    fade.addColorStop(0, "rgba(255,255,255,0)");
    fade.addColorStop(1, "rgba(255,255,255,1)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 700, canvas.width, 120);

    ctx.fillStyle = "#2b2b2b";
    ctx.textAlign = "center";
    ctx.font = "bold 64px Georgia";
    ctx.fillText(cardName.innerText, canvas.width / 2, 860);

    ctx.strokeStyle = "rgba(200,150,80,.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 120, 890);
    ctx.lineTo(canvas.width / 2 + 120, 890);
    ctx.stroke();

    ctx.font = "44px Georgia";
    ctx.fillStyle = "#444";
    wrap(ctx, cardMessage.innerText, canvas.width / 2, 950, 860, 58);

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
