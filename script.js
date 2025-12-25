const images = [
  "https://media1.giphy.com/media/G4TM38TROaeGj5pkXh/giphy.gif",
  "https://media2.giphy.com/media/gNke2UrUTopOg/giphy.gif"
];

let current = 0;
const cardImage = document.getElementById("cardImage");
cardImage.src = images[current];

setInterval(() => {
  current = (current + 1) % images.length;
  cardImage.src = images[current];
}, 4000);

nameInput.oninput = e =>
  title.innerText = `Merry Christmas 🎄 — ${e.target.value}`;

msgInput.oninput = e =>
  message.innerText = e.target.value;

function downloadCard() {
  import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js")
    .then(() => {
      html2canvas(document.getElementById("card")).then(canvas => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "christmas-card.png";
        a.click();
      });
    });
}

function copyPreviewLink() {
  const link = `${location.origin}${location.pathname.replace("index.html","")}preview.html?name=${encodeURIComponent(nameInput.value)}&msg=${encodeURIComponent(msgInput.value)}`;
  navigator.clipboard.writeText(link);
  alert("Preview link copied!");
}

function shareWhatsApp() {
  const link = `${location.origin}${location.pathname.replace("index.html","")}preview.html?name=${encodeURIComponent(nameInput.value)}&msg=${encodeURIComponent(msgInput.value)}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(link)}`);
}

function openInstagram() {
  window.open("https://www.instagram.com/");
}
