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

document.getElementById("nameInput").oninput = e => {
  document.getElementById("title").innerText =
    "Merry Christmas 🎄 — " + e.target.value;
};

document.getElementById("msgInput").oninput = e => {
  document.getElementById("message").innerText = e.target.value;
};

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

function shareWhatsApp() {
  const url = location.origin + "/preview.html" + location.search;
  window.open(`https://wa.me/?text=${encodeURIComponent(url)}`);
}

function openInstagram() {
  window.open("https://www.instagram.com/");
}
