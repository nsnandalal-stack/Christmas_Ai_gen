body {
  margin: 0;
  height: 100vh;
  font-family: 'Noto Serif Malayalam', Georgia, serif;
  background: linear-gradient(#0b1d33, #16324f);
  overflow: hidden;
}

/* Snow */
.snow {
  position: fixed;
  width: 100%;
  height: 200%;
  background-image:
    radial-gradient(2px 2px at 20px 30px, white 50%, transparent 50%);
  background-size: 120px 120px;
  animation: snow 20s linear infinite;
  opacity: 0.6;
}

.snow2 { animation-duration: 35s; opacity: 0.3; }

@keyframes snow {
  from { transform: translateY(-50%); }
  to { transform: translateY(50%); }
}

/* Characters */
.characters {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.char {
  position: absolute;
  font-size: 48px;
  animation: float 12s ease-in-out infinite;
  opacity: 0.8;
}

.santa { left: 8%; top: 30%; }
.angel { right: 10%; top: 40%; animation-delay: 3s; }
.star  { left: 50%; top: 15%; animation-delay: 6s; }

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}

/* App */
.app {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Card */
.card {
  width: 320px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
  text-align: center;
}

.card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.card h2, .card p {
  margin: 12px;
}

/* Templates */
.card.classic { background: #fff; color: #000; }
.card.night   { background: #1a1a2e; color: #fff; }
.card.festive { background: #fff7e6; color: #7a3e00; }

input, textarea, select {
  width: 300px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  border: none;
}

button {
  margin-top: 10px;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
