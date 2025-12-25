const images = [
  "https://images.pexels.com/photos/1652555/pexels-photo-1652555.jpeg",
  "https://images.pexels.com/photos/728461/pexels-photo-728461.jpeg",
  "https://images.pexels.com/photos/290220/pexels-photo-290220.jpeg"
];

let imgIndex = 0;
const cardImage = document.getElementById("cardImage");
cardImage.src = images[0];

setInterval(() => {
  imgIndex = (imgIndex + 1) % images.length;
  cardImage.src = images[imgIndex];
}, 5000);

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

/* Create (URL) */
function createCard() {
  const url =
    `${location.origin}${location.pathname}?` +
    `name=${encodeURIComponent(cardName.innerText)}` +
    `&msg=${encodeURIComponent(cardMessage.innerText)}` +
    `&img=${imgIndex}`;

  history.replaceState(null, "", url);
}

/* Share */
function shareLink() {
  navigator.clipboard.writeText(location.href);
  alert("Link copied. Share anywhere.");
}

function shareWhatsApp() {
  const text = `🎄 Christmas Card\n${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

function shareInstagram() {
  navigator.clipboard.writeText(location.href);
  alert("Instagram doesn’t allow direct sharing.\nLink copied to clipboard.");
}

/* Download */
function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = cardImage.src;

  img.onload = () => {
    /* Background */
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#fffaf2");
    gradient.addColorStop(1, "#ffffff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Image */
    ctx.drawImage(img, 0, 0, canvas.width, 720);

    /* Fade */
    const fade = ctx.createLinearGradient(0, 700, 0, 820);
    fade.addColorStop(0, "rgba(255,255,255,0)");
    fade.addColorStop(1, "rgba(255,255,255,1)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 700, canvas.width, 120);

    /* Name */
    ctx.fillStyle = "#2b2b2b";
    ctx.textAlign = "center";
    ctx.font = "bold 64px Georgia";
    ctx.fillText(cardName.innerText, canvas.width / 2, 860);

    /* Divider */
    ctx.strokeStyle = "rgba(200,150,80,.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 120, 890);
    ctx.lineTo(canvas.width / 2 + 120, 890);
    ctx.stroke();

    /* Message */
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

/* Load shared card */
const params = new URLSearchParams(location.search);
if (params.get("name")) {
  cardName.innerText = params.get("name");
  cardMessage.innerText = params.get("msg");
  imgIndex = parseInt(params.get("img")) || 0;
  cardImage.src = images[imgIndex % images.length];
}
