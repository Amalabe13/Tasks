const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let drawing = false;
let points = [];

// center dot
function Dot() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

// Start drawing
canvas.addEventListener("mousedown", () => {
  drawing = true;
  points = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Dot();
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  points.push({ x, y });

  // draw line
  if (points.length > 1) {
    ctx.beginPath();
    ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#042619";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

function checkCircle() {
  const info = document.getElementById("info");
  if (points.length < 10) {
    info.textContent = "❌ Please draw a circle first!";
    return;
  }

  // calculate average radius from center
  let radii = points.map(
    (p) => Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
  );

  const avgRadius = radii.reduce((a, b) => a + b, 0) / radii.length;

  // how circular it is.
  const variance =
    radii.reduce((sum, r) => sum + Math.pow(r - avgRadius, 2), 0) /
    radii.length;

  const stdDev = Math.sqrt(variance);

  // too close to dot?
  if (avgRadius < 30) {
    info.textContent = "Circle too small!";
    return;
  }

  // accuracy: smaller deviation = better score
  let accuracy = Math.max(0, 100 - stdDev * 2).toFixed(2);

  info.textContent = `✅ Accuracy: ${accuracy}%`;
}

// Initial draw
Dot();
