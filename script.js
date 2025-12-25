// Live Preview Logic
const nameInput = document.getElementById('nameInput');
const msgInput = document.getElementById('msgInput');
const cardName = document.getElementById('cardName');
const cardMessage = document.getElementById('cardMessage');

nameInput.addEventListener('input', () => {
    cardName.textContent = nameInput.value || "Your Name";
});

msgInput.addEventListener('input', () => {
    cardMessage.textContent = msgInput.value || "May this Christmas bring peace, love, and joy.";
});

// Download Logic
function downloadCard() {
    const card = document.getElementById('card');
    html2canvas(card).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Christmas_Card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// WhatsApp Share (Link)
function shareWhatsApp() {
    const url = createShareLink();
    window.open(`https://wa.me/?text=Check out this Christmas card I made for you! 🎄 ${encodeURIComponent(url)}`, '_blank');
}

// Copy Link
function copyPreviewLink() {
    const url = createShareLink();
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard! Send it to your friends.');
    });
}

// Open Instagram
function openInstagram() {
    window.open("https://www.instagram.com/", '_blank');
}

// Helper to create the share URL
function createShareLink() {
    const baseUrl = window.location.href.replace('index.html', '').replace(/\/$/, '') + '/preview.html';
    const name = encodeURIComponent(nameInput.value || "Friend");
    const msg = encodeURIComponent(msgInput.value || "Merry Christmas!");
    return `${baseUrl}?name=${name}&msg=${msg}`;
}
