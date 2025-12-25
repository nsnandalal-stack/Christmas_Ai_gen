const q = new URLSearchParams(location.search);
document.getElementById("pTitle").innerText = q.get("n");
document.getElementById("pMsg").innerText = q.get("m");

function copyLink() {
  navigator.clipboard.writeText(location.href);
  alert("Link copied!");
}
