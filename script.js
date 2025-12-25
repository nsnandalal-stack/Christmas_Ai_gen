* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Noto Serif Malayalam', serif;
  background: radial-gradient(circle at top, #1e3c72, #0b1d33);
  color: white;
  overflow-x: hidden;
}

/* Snow */
.snow {
  position: fixed;
  inset: -50% 0 0 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, white 50%, transparent 50%),
    radial-gradient(1.5px 1.5px at 80px 120px, white 50%, transparent 50%);
  background-size: 140px 140px;
  animation: snow 20s linear infinite;
  opacity: 0.6;
  z-index: 0;
}

.snow2 {
  animation-duration: 35s;
  opacity: 0.35;
}

@keyframes snow {
  from { transform: translateY(-50%); }
  to { transform: translateY(50%); }
}

/* Layout */
.container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Card */
.card {
  background: linear-gradient(180deg, #ffffff, #fffaf0);
  color: #2b2b2b;
  border-radius: 18px;
  padding: 28px 24px;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  margin-bottom: 16px;
}

.card h1 {
  margin: 0 0 12px;
  font-size: 26px;
}

.card p {
  font-size: 16px;
  line-height: 1.6;
}

/* Inputs */
input, textarea {
  width: 100%;
  max-width: 380px;
  margin-top: 12px;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
}

textarea {
  resize: none;
  min-height: 90px;
}

/* Actions row */
.actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
}

button {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wa {
  background: #25d366;
  color: #fff;
}

.ig {
  background: #e1306c;
  color: #fff;
}
