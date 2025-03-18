// Get canvas and context
const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');

// Initial ball properties
let mass = 5;
let force = 50;
let gravity = 9.8;

// Ball object with initial position and velocity
const ball = {
    x: canvas.width / 2,   // Start in the middle
    y: canvas.height / 2,  // Start in the middle
    radius: 20,            // Size of the ball
    vx: 0,                 // Initial horizontal velocity
    vy: 0,                 // Initial vertical velocity
    color: 'blue',
};

// Event listeners to update properties
document.getElementById('mass').addEventListener('input', (e) => {
    mass = parseFloat(e.target.value);
    document.getElementById('massValue').textContent = mass;
});

document.getElementById('force').addEventListener('input', (e) => {
    force = parseFloat(e.target.value);
    document.getElementById('forceValue').textContent = force;
});

document.getElementById('gravity').addEventListener('input', (e) => {
    gravity = parseFloat(e.target.value);
    document.getElementById('gravityValue').textContent = gravity;
});

// Update physics of the ball
function updatePhysics() {
    // Newton's second law: F = ma => a = F / m
    const acceleration = force / mass;

    // Apply acceleration to velocity (simulating motion)
    ball.vy += acceleration + gravity; // Adding gravity effect to vertical speed

    // Update position
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Ball hitting the ground (simple bounce)
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy = -ball.vy * 0.7; // bounce with energy loss
    }

    // Ball hitting the walls (simple reflection)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.vx = -ball.vx;
    }

    // Ensure the ball is visible inside the canvas
    ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
    ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
}

// Draw the ball and update the simulation
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Main loop to update and draw physics
function gameLoop() {
    updatePhysics();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop(); // Start the simulation
