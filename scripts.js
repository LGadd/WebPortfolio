const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let mass = parseFloat(document.getElementById('mass').value);
let force = parseFloat(document.getElementById('force').value);
let gravity = parseFloat(document.getElementById('gravity').value);

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    vx: 0,
    vy: 0,
    color: 'blue',
};

// Update the value displays when the range inputs change
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

function updatePhysics() {
    // Apply Newton's Second Law: F = ma => a = F / m
    const acceleration = force / mass;

    // Calculate velocity based on acceleration and gravity
    ball.vy += acceleration + gravity;

    // Update the position of the ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Apply simple ground collision logic
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy = -ball.vy * 0.8;  // Simulate bounce with some loss of speed
    }

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.vx = -ball.vx;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function gameLoop() {
    updatePhysics();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
