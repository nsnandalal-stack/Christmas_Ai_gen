const params = new URLSearchParams(location.search);
const name = params.get("name") || "";
const msg = params.get("msg") || "";

document.getElementById("previewCard").innerHTML = `
  <img src="assets/Santa_claus.png" class="card-image">
  <div class="card-text">
    <h1>Merry Christmas 🎄 — ${name}</h1>
    <p>${msg}</p>
  </div>
`;

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("envelope").classList.add("open");
  }, 300);
});

function copyLink() {
  navigator.clipboard.writeText(location.href);
  alert("Link copied");
}

function shareWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(location.href)}`);
}

function openInstagram() {
  window.open("https://www.instagram.com/");
}
