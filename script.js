/* -----------------------------
   Rotating Nativity Background
-------------------------------- */

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


/* -----------------------------
   Jesus Birth GIF (Single Frame)
-------------------------------- */

const jesusGifs = [
  "gifs/jesus1.gif",
  "gifs/jesus2.gif",
  "gifs/jesus3.gif"
];

let gifIndex = 0;

setInterval(() => {
  gifIndex = (gifIndex + 1) % jesusGifs.length;
  const img = document.getElementById("jesusGif");
  if (img) img.src = jesusGifs[gifIndex];
}, 7000);


/* -----------------------------
   Load Shared Name + Message
-------------------------------- */

const params = new URLSearchParams(window.location.search);
const nameParam = params.get("name");
const msgParam = params.get("msg");

if (nameParam && msgParam) {
  document.getElementById("defaultWish").innerT
