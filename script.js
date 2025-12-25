/* Background images */
const backgrounds = [
  "images/nativity1.jpg",
  "images/nativity2.jpg",
  "images/nativity3.jpg"
];

let bgIndex = 0;
document.body.style.backgroundImage = `url(${backgrounds[0]})`;

setInterval(() => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
}, 5000);

/* Jesus GIF rotation */
const gifs = [
  "gifs/jesus1.gif",
  "gifs/jesus2.gif",
  "gifs/jesus3.gif"
];

let gifIndex = 0;
setInterval(() => {
  gifIndex = (gifIndex + 1) % gifs.length;
  document.getElementById("jesusGif").src = gifs[gifIndex];
}, 7000);

/* Language support */
const translations = {
  en: {
    title: "🎄 Merry Christmas 🎄",
    defaultWish: "May the birth of Jesus fill your heart with peace, love, and hope.",
    name: "Your name",
    msg: "Your Christmas message...",
    share: "Create & Share Card",
    download: "Download Card as Image"
  },
  ml: {
    title: "🎄 ക്രിസ്മസ് ആശംസകൾ 🎄",
    defaultWish: "യേശുവിന്റെ ജനനം നിങ്ങളുടെ ഹൃദയത്തിൽ സമാധാനവും സ്നേഹവും പ്രത്യാശയും നിറക്കട്ടെ.",
    name: "നിങ്ങളുടെ പേര്",
    msg: "നിങ്ങളുടെ ക്രിസ്മസ് സന്ദേശം...",
    share: "കാർഡ് സൃഷ്ടിച്ച് പങ്കിടുക",
    download: "കാർഡ് ചിത്രം ഡൗൺലോഡ് ചെയ്യുക"
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("defaultWish").innerText = translations[lang].defaultWish;
  document.getElementById("senderName").placeholder = translations[lang].name;
  document.getElementById("userWish").placeholder = translations[lang].msg;
  document.querySelector("button[onclick='share()']").innerText = translations[lang].share;
  document.querySelector("button[onclick='downloadCard()']").innerText = translations[lang].download;
}

setLang(localStorage.getItem("lang") || "en");

/* URL parameters */
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
  const msg = document.getElementById("userWish").value ||
    translations[localStorage.getItem("lang") || "en"].defaultWish;

  const url = `${location.origin}${location.pathname}?name=${encodeURIComponent(name)}&msg=${encodeURIComponent(msg)}`;

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
  const msg = document.getElementById("userWish").value || msgParam;

  const bg = new Image();
  bg.src = backgrounds[bgIndex];

  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "bold 72px Georgia";
    ctx.fillText("Merry Christmas", 540, 180);

    ctx.font = "48px Georgia";
    wrapText(ctx, msg, 540, 350, 820, 60);

    ctx.font = "italic 42px Georgia";
    ctx.fillText(`– ${name}`, 540, 720);

    const link = document.createElement("a");
    link.download = "christmas-card.png";
    link.href = canvas.toDataURL();
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
