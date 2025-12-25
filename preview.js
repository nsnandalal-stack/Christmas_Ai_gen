const params = new URLSearchParams(location.search);
const name = params.get("name") || "Friend";
const msg = params.get("msg") || "Wishing you a Merry Christmas and a Happy New Year!";

// Populate the letter
document.getElementById("pTitle").innerText = `Merry Christmas, ${name}!`;
document.getElementById("pMsg").innerText = msg;
document.getElementById("pFooter").innerText = "Sent with ❤️ using Card Maker";

// Trigger Animation on Load
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("envelope").classList.add("open");
  }, 500); // 0.5s delay before opening
});

function shareWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(location.href)}`, '_blank');
}
