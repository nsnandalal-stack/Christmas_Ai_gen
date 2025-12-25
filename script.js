const visuals = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng3bmxzNTV3dmNzaGl0cTRyNWp3dXFnajR2ZWs3bnUyajZyZ2NycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G4TM38TROaeGj5pkXh/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZrYm03bG10OThkZWl5d3B5ZnBlZTdqbGM2Z3psYjNqa2VyZnJtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gNke2UrUTopOg/giphy.gif",
  "https://images.pexels.com/photos/290220/pexels-photo-290220.jpeg",
  "https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg",
  "https://images.pexels.com/photos/1578010/pexels-photo-1578010.jpeg",
  "https://images.pexels.com/photos/1652555/pexels-photo-1652555.jpeg",
  "https://images.pexels.com/photos/728461/pexels-photo-728461.jpeg"
];

let index = 0;
const img = document.getElementById("cardImage");
img.src = visuals[0];

setInterval(() => {
  index = (index + 1) % visuals.length;
  img.src = visuals[index];
}, 5000);

document.getElementById("nameInput").oninput = e =>
  document.getElementById("cardTitle").textContent =
    e.target.value ? `Merry Christmas 🎄 — ${e.target.value}` : "Merry Christmas 🎄";

document.getElementById("messageInput").oninput = e =>
  document.getElementById("cardMessage").textContent =
    e.target.value || "May this Christmas bring peace, love, and joy.";

function shareWhatsApp() {
  const t = `${cardTitle.textContent}\n\n${cardMessage.textContent}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(t)}`);
}

function goInstagram() {
  window.open("https://www.instagram.com/");
}

function downloadCard() {
  const c = document.getElementById("canvas");
  const x = c.getContext("2d");
  const i = new Image();
  i.crossOrigin = "anonymous";
  i.src = img.src;

  i.onload = () => {
    x.fillStyle="#fff"; x.fillRect(0,0,c.width,c.height);
    x.drawImage(i,0,0,c.width,600);
    x.fillStyle="#000"; x.textAlign="center";
    x.font="bold 64px serif";
    x.fillText(cardTitle.textContent,c.width/2,720);
    x.font="42px serif";
    x.fillText(cardMessage.textContent,c.width/2,800);
    const a=document.createElement("a");
    a.href=c.toDataURL(); a.download="christmas-card.png"; a.click();
  };
}
