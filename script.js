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

const card = document.getElementById("card");
const cardName = document.getElementById("cardName");
const cardMessage = document.getElementById("cardMessage");
const nameInput = document.getElementById("nameInput");
const msgInput = document.getElementById("msgInput");

function setTemplate(tpl) {
  card.className = `card ${tpl}`;
}

function createCard() {
  const name = nameInput.value || "Merry Christmas 🎄";
  const msg = msgInput.value || "May this Christmas bring peace and joy.";
  const tpl = document.getElementById("template").value;

  cardName.innerText = name;
  cardMessage.innerText = msg;
  setTemplate(tpl);

  const url =
    `${location.origin}${location.pathname}?` +
    `name=${encodeURIComponent(name)}&msg=${encodeURIComponent(msg)}&tpl=${tpl}&img=${imgIndex}`;

  history.replaceState(null, "", url);
}

function shareCard() {
  navigator.clipboard.writeText(location.href);
  alert("Card link copied. Share anywhere.");
}

function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = cardImage.src;

  img.onload = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, 600);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.font = "bold 60px Georgia";
    ctx.fillText(cardName.innerText, canvas.width/2, 700);

    ctx.font = "42px Georgia";
    wrap(ctx, cardMessage.innerText, canvas.width/2, 780, 900, 56);

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
  setTemplate(params.get("tpl") || "classic");
  imgIndex = parseInt(params.get("img")) || 0;
  cardImage.src = images[imgIndex % images.length];
}

