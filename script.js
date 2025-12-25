const nameInput = document.getElementById("nameInput");
const msgInput = document.getElementById("msgInput");
const previewTitle = document.getElementById("previewTitle");
const previewMessage = document.getElementById("previewMessage");

/* Live preview */
nameInput.addEventListener("input", () => {
  previewTitle.textContent =
    nameInput.value ? `Merry Christmas 🎄\n— ${nameInput.value}` : "Merry Christmas 🎄";
});

msgInput.addEventListener("input", () => {
  previewMessage.textContent =
    msgInput.value || "May this Christmas bring peace, love, and joy.";
});

/* WhatsApp */
function shareWhatsApp() {
  const text = `${previewTitle.textContent}\n\n${previewMessage.textContent}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

/* Instagram */
function shareInstagram() {
  navigator.clipboard.writeText(
    `${previewTitle.textContent}\n\n${previewMessage.textContent}`
  );
  alert("Text copied. Paste it in Instagram caption or DM.");
}

/* Download */
function downloadCard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#2b2b2b";
  ctx.textAlign = "center";

  ctx.font = "bold 64px serif";
  ctx.fillText(previewTitle.textContent, canvas.width / 2, 300);

  ctx.font = "42px serif";
  wrapText(ctx, previewMessage.textContent, canvas.width / 2, 420, 900, 56);

  const a = document.createElement("a");
  a.download = "christmas-message.png";
  a.href = canvas.toDataURL();
  a.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}
