// Get canvas and context
const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');

// Initial ball properties
let mass = 5;
let force = 50;
let gravity = 9.8;

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    vx: 0,
    vy: 0,
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
