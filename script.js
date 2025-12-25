const images=["images/nativity1.jpg","images/nativity2.jpg","images/nativity3.jpg"];
let i=0;
document.body.style.backgroundImage=`url(${images[0]})`;
setInterval(()=>{i=(i+1)%images.length;document.body.style.backgroundImage=`url(${images[i]})`;},5000);

const gifs=["gifs/jesus1.gif","gifs/jesus2.gif","gifs/jesus3.gif"];
let g=0;
setInterval(()=>{g=(g+1)%gifs.length;document.getElementById("jesusGif").src=gifs[g];},7000);

const p=new URLSearchParams(window.location.search);
if(p.get("wish")) document.getElementById("defaultWish").innerText=decodeURIComponent(p.get("wish"));

function shareWhatsApp(){
const w=document.getElementById("userWish").value||document.getElementById("defaultWish").innerText;
const link=location.origin+location.pathname+"?wish="+encodeURIComponent(w);
window.open(`https://wa.me/?text=${encodeURIComponent(w+"\n"+link)}`,"_blank");
}

function copyLink(){
const w=document.getElementById("userWish").value||document.getElementById("defaultWish").innerText;
const link=location.origin+location.pathname+"?wish="+encodeURIComponent(w);
navigator.clipboard.writeText(link);
alert("Link copied!");
}

if("serviceWorker"in navigator){
navigator.serviceWorker.register("service-worker.js");
}
