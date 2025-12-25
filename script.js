const gifs = [
  "https://media1.giphy.com/media/G4TM38TROaeGj5pkXh/giphy.gif",
  "https://media2.giphy.com/media/gNke2UrUTopOg/giphy.gif"
];

let index = 0;
const media = document.getElementById("media");

function rotateMedia() {
  media.src = gifs[index % gifs.length];
  index++;
}
rotateMedia();
setInterval(rotateMedia, 4000);

document.getElementById("nameInput").oninput = e =>
  document.getElementById("title").innerText =
    `Merry Christmas 🎄 — ${e.target.value}`;

document.getElementById("msgInput").oninput = e =>
  document.getElementById("msg").innerText = e.target.value;

function buildPreviewURL() {
  const params = new URLSearchParams({
    n: title.innerText,
    m: msg.innerText
  });
  return location.origin + location.pathname.replace("index","preview") + "?" + params;
}

function shareWhatsApp() {
  window.open("https://wa.me/?text=" + encodeURIComponent(buildPreviewURL()));
}

function shareInstagram() {
  window.open("https://www.instagram.com/");
}

function downloadCard() {
  html2canvas(document.getElementById("card")).then(canvas => {
    const a = document.createElement("a");
    a.download = "christmas-card.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}
