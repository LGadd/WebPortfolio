// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the object pool
const ballPool = [];
const balls = [];
const gravity = 0.5;
const friction = 0.99;

// Ball factory function
function createBall() {
    if (ballPool.length > 0) {
        // Recycle a ball from the pool
        const ball = ballPool.pop();
        ball.x = Math.random() * canvas.width;
        ball.y = 0;
        ball.vx = (Math.random() - 0.5) * 4;
        ball.vy = (Math.random() + 0.5) * 4;
        ball.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        balls.push(ball);
    } else {
        // Create a new ball if no pooled balls are available
        const ball = {
            x: Math.random() * canvas.width,
            y: 0,
            radius: 20 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() + 0.5) * 4,
            color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
        };
        balls.push(ball);
    }
}

// Recycle a ball into the pool when it goes off-screen or is no longer needed
function recycleBall(ball) {
    // Reset ball properties
    ball.x = -100;  // Move it off-screen
    ball.y = -100;  // Move it off-screen
    ball.vx = 0;
    ball.vy = 0;
    ball.radius = 0; // Reset radius to 0 (could also use null if you prefer)
    ball.color = ""; // Clear color

    // Return the ball to the pool
    ballPool.push(ball);
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

        // Bounce off the bottom or recycle if it goes off-screen
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy = -ball.vy * friction; // Apply some friction on bounce
        }

        // Recycle ball if it goes off-screen
        if (ball.y - ball.radius > canvas.height || ball.x - ball.radius > canvas.width || ball.x + ball.radius < 0) {
            recycleBall(ball);
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
