/* Background images (Pexels) */
const backgrounds = [
  "https://images.pexels.com/photos/290220/pexels-photo-290220.jpeg",
  "https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg",
  "https://images.pexels.com/photos/1578010/pexels-photo-1578010.jpeg",
  "https://images.pexels.com/photos/1652555/pexels-photo-1652555.jpeg",
  "https://images.pexels.com/photos/728461/pexels-photo-728461.jpeg"
];

let bgIndex = 0;
document.body.style.backgroundImage = `url(${backgrounds[0]})`;

setInterval(() => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
}, 5000);

/* GIFs (Giphy + Pixabay) */
const gifs = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng3bmxzNTV3dmNzaGl0cTRyNWp3dXFnajR2ZWs3bnUyajZyZ2NycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G4TM38TROaeGj5pkXh/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZrYm03bG10OThkZWl5d3B5ZnBlZTdqbGM2Z3psYjNqa2VyZnJtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gNke2UrUTopOg/giphy.gif",
  "https://cdn.pixabay.com/animation/2022/11/01/09/28/09-28-14-806_512.gif"
];

let gifIndex = 0;
document.getElementById("jesusGif").src = gifs[0];

setInterval(() => {
  gifIndex = (gifIndex + 1) % gifs.length;
  document.getElementById("jesusGif").src = gifs[gifIndex];
}, 7000);

/* Language toggle */
const translations = {
  en: {
    title: "🎄 Merry Christmas 🎄",
    defaultWish: "May the birth of Jesus fill your heart with peace, love, and hope."
  },
  ml: {
    title: "🎄 ക്രിസ്മസ് ആശംസകൾ 🎄",
    defaultWish: "യേശുവിന്റെ ജനനം നിങ്ങളുടെ ഹൃദയത്തിൽ സമാധാനവും സ്നേഹവും പ്രത്യാശയും നിറക്കട്ടെ."
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("defaultWish").innerText = translations[lang].defaultWish;
}
setLang(localStorage.getItem("lang") || "en");

/* URL params */
const params = new URLSearchParams(window.location.search);
const nameParam = params.get("name");
const msgParam = params.get("msg");

if (nameParam && msgParam) {
  document.getElementById("defaultWish").innerText =
    `🎄 Merry Christmas from ${nameParam}\n\n${msgParam}`;
  document.getElementById("editBtn").style.display = "inline-block";
}

/* Share */
function share() {
  const name = document.getElementById("senderName").value || "Someone";
  const msg = document.getElementById("userWish").value || "Merry Christmas 🎄";

  const url =
    `${location.origin}${location.pathname}?name=${encodeURIComponent(name)}&msg=${encodeURIComponent(msg)}`;

  if (navigator.share) {
    navigator.share({ title: "Christmas Card", text: msg, url });
  } else {
    navigator.clipboard.writeText(url);
    alert("Link copied. Share anywhere.");
  }
}

/* Download card */
function downloadCard() {
  const canvas = document.getElementById("cardCanvas");
  const ctx = canvas.getContext("2d");

  const name = document.getElementById("senderName").value || nameParam || "Someone";
  const msg = document.getElementById("userWish").value || msgParam || "";

  const bg = new Image();
  bg.crossOrigin = "anonymous";
  bg.src = backgrounds[bgIndex];

  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";

    ctx.font = "bold 72px Georgia";
    ctx.fillText("Merry Christmas", canvas.width / 2, 180);

    ctx.font = "48px Georgia";
    wrapText(ctx, msg, canvas.width / 2, 360, 820, 60);

    ctx.font = "italic 42px Georgia";
    ctx.fillText(`– ${name}`, canvas.width / 2, 780);

    const link = document.createElement("a");
    link.download = "christmas-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

function resetCard() {
  window.location.href = window.location.pathname;
}
