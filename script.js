const visuals = [
  // GIFs
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng3bmxzNTV3dmNzaGl0cTRyNWp3dXFnajR2ZWs3bnUyajZyZ2NycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G4TM38TROaeGj5pkXh/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZrYm03bG10OThkZWl5d3B5ZnBlZTdqbGM2Z3psYjNqa2VyZnJtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gNke2UrUTopOg/giphy.gif",

  // GitHub-hosted images (safe)
  "https://raw.githubusercontent.com/nsnandalal-stack/Christmas_Ai_gen/main/pexels-photo-1028723.jpeg",
  "https://raw.githubusercontent.com/nsnandalal-stack/Christmas_Ai_gen/main/pexels-photo-1578010.jpeg",
  "https://raw.githubusercontent.com/nsnandalal-stack/Christmas_Ai_gen/main/pexels-photo-1652555.jpeg",
  "https://raw.githubusercontent.com/nsnandalal-stack/Christmas_Ai_gen/main/pexels-photo-728461.jpeg",
  "https://raw.githubusercontent.com/nsnandalal-stack/Christmas_Ai_gen/main/pexels-thisbrandstudio-290220.jpg"
];

let index = 0;
const img = document.getElementById("cardImage");
img.src = visuals[0];

// auto rotate
setInterval(() => {
  index = (index + 1) % visuals.length;
  img.src = visuals[index];
  updateURL();
}, 5000);

// live preview
nameInput.oninput = () => {
  cardTitle.textContent = nameInput.value
    ? `Merry Christmas 🎄 — ${nameInput.value}`
    : "Merry Christmas 🎄";
  updateURL();
};

messageInput.oninput = () => {
  cardMessage.textContent = messageInput.value
    || "May this Christmas bring peace, love, and joy.";
  updateURL();
};

// preserve aspect ratio (NO squashing)
function drawImageContain(ctx, img, cw, maxH) {
  const ratio = Math.min(cw / img.width, maxH / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  ctx.drawImage(img, (cw - w) / 2, 0, w, h);
}

function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = img.src;

  image.onload = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawImageContain(ctx, image, canvas.width, 600);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.font = "bold 64px serif";
    ctx.fillText(cardTitle.textContent, canvas.width / 2, 720);

    ctx.font = "42px serif";
    ctx.fillText(cardMessage.textContent, canvas.width / 2, 800);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "christmas-card.png";
    a.click();
  };
}

// WhatsApp
function shareWhatsApp() {
  const txt = `${cardTitle.textContent}\n\n${cardMessage.textContent}\n\n${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`);
}

// Instagram (correct behavior)
function openInstagram() {
  alert("Image will be downloaded. Please upload it manually to Instagram.");
  window.open("https://www.instagram.com/", "_blank");
}

// URL state (share progress)
function updateURL() {
  const p = new URLSearchParams({
    name: nameInput.value,
    msg: messageInput.value,
    img: index
  });
  history.replaceState(null, "", "?" + p.toString());
}

// restore state
const params = new URLSearchParams(location.search);
if (params.get("name")) nameInput.value = params.get("name");
if (params.get("msg")) messageInput.value = params.get("msg");
if (params.get("img")) {
  index = Number(params.get("img")) % visuals.length;
  img.src = visuals[index];
}
nameInput.dispatchEvent(new Event("input"));
messageInput.dispatchEvent(new Event("input"));
