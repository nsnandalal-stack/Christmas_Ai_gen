const nameInput=document.getElementById("nameInput");
const messageInput=document.getElementById("messageInput");
const cardTitle=document.getElementById("cardTitle");
const cardMessage=document.getElementById("cardMessage");
nameInput.addEventListener("input",()=>{cardTitle.textContent=nameInput.value?`Merry Christmas 🎄 — ${nameInput.value}`:"Merry Christmas 🎄"});
messageInput.addEventListener("input",()=>{cardMessage.textContent=messageInput.value||"May this Christmas bring peace, love, and joy."});
function shareWhatsApp(){const t=`${cardTitle.textContent}\n\n${cardMessage.textContent}`;window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank")}
function copyForInstagram(){navigator.clipboard.writeText(`${cardTitle.textContent}\n\n${cardMessage.textContent}`);alert("Copied for Instagram")}
function downloadCard(){const c=document.getElementById("canvas");const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.fillStyle="#2b2b2b";x.textAlign="center";x.font="bold 64px serif";x.fillText(cardTitle.textContent,c.width/2,400);x.font="42px serif";x.fillText(cardMessage.textContent,c.width/2,520);const a=document.createElement("a");a.download="christmas-card.png";a.href=c.toDataURL();a.click()}
