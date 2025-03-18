const canvas = document.getElementById('physics-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800; // Width of the canvas
canvas.height = 400; // Height of the canvas

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20, // Smaller ball
  dx: 3, // Slower horizontal speed
  dy: 3, // Slower vertical speed
  color: '#00ff00', // Green ball

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Update ball position and handle collisions
function updateBall() {
  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Collision with walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx; // Reverse horizontal direction
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy; // Reverse vertical direction
  }
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Animation loop
function animate() {
  clearCanvas();
  drawBall();
  updateBall();
  requestAnimationFrame(animate);
}

// Start the animation
animate();
