// Physics Editor - Ball Bouncing Simulation
const canvas = document.getElementById('physics-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 4, // Horizontal speed
  dy: 4, // Vertical speed
  color: '#ffd700', // Gold color
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Collision with walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  clearCanvas();
  drawBall();
  updateBall();
  requestAnimationFrame(animate);
}

animate();

// Form Submission Handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your message!');
  // You can add AJAX or backend integration here.
});
