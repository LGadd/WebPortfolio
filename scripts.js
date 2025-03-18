// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define physics object properties
const balls = [];
const gravity = 0.5;
const friction = 0.99;

function createBall() {
    const ball = {
        x: Math.random() * canvas.width,
        y: 0,
        radius: 20 + Math.random() * 30,
        vx: (Math.random() - 0.5) * 4,  // Random horizontal velocity
        vy: (Math.random() + 0.5) * 4,  // Random vertical velocity
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
    };
    balls.push(ball);
}

// Update physics
function updatePhysics() {
    balls.forEach((ball, index) => {
        ball.vy += gravity;  // Apply gravity
        ball.x += ball.vx;   // Update position
        ball.y += ball.vy;

        // Bounce off the walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.vx = -ball.vx;
        }

        // Bounce off the bottom
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy = -ball.vy * friction; // Apply some friction on bounce
        }
    });
}

// Draw balls
function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}

// Game loop to animate
function gameLoop() {
    updatePhysics();
    drawBalls();
    requestAnimationFrame(gameLoop);
}

// Initialize balls and start animation
setInterval(createBall, 1000); // Create a new ball every second
gameLoop();
