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

function createCard() {
  const name = document.getElementById("nameInput").value || "Merry Christmas 🎄";
  const msg = document.getElementById("msgInput").value ||
    "May this Christmas bring peace, love, and joy.";

  document.getElementById("cardName").innerText = name;
  document.getElementById("cardMessage").innerText = msg;
}

function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const card = document.getElementById("card");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = cardImage.src;

  img.onload = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(img, 0, 0, canvas.width, 600);

    ctx.fillStyle = "#000";
    ctx.font = "bold 60px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(cardName.innerText, canvas.width/2, 700);

    ctx.font = "42px Georgia";
    wrap(ctx, cardMessage.innerText, canvas.width/2, 780, 900, 56);

    const link = document.createElement("a");
    link.download = "christmas-card.png";
    link.href = canvas.toDataURL();
    link.click();
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
