// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define object pool and ball array
const ballPool = [];
const balls = [];
const gravity = 0.5;
const bounceFriction = 0.2;  // To limit bounce after collision with the ground

let selectedBall = null;
let offsetX = 0;
let offsetY = 0;

// Ball factory function
function createBall() {
    if (ballPool.length > 0) {
        const ball = ballPool.pop();
        ball.x = Math.random() * canvas.width;
        ball.y = 0;
        ball.vx = 0;
        ball.vy = 0;
        ball.radius = 20 + Math.random() * 30;
        ball.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        balls.push(ball);
    } else {
        const ball = {
            x: Math.random() * canvas.width,
            y: 0,
            radius: 20 + Math.random() * 30,
            vx: 0,
            vy: 0,
            color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
        };
        balls.push(ball);
    }
}

// Recycle a ball into the pool when it goes off-screen or is no longer needed
function recycleBall(ball) {
    ballPool.push(ball);
    ball.x = -100;  // Move it off-screen
    ball.y = -100;
    ball.vx = 0;
    ball.vy = 0;
}

// Update physics (gravity, movement, etc.)
function updatePhysics() {
    balls.forEach((ball, index) => {
        // If the ball is not selected and is falling, apply gravity
        if (selectedBall !== ball) {
            ball.vy += gravity;  // Apply gravity

            // Apply some friction to slow down horizontal movement
            ball.vx *= 0.99;

            ball.x += ball.vx;
            ball.y += ball.vy;

            // Bounce off the floor but with less bouncing
            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;  // Prevent going below the ground
                ball.vy *= -bounceFriction;  // Apply a small bounce with friction
            }

            // Recycle ball if it goes off-screen
            if (ball.x - ball.radius > canvas.width || ball.x + ball.radius < 0) {
                recycleBall(ball);
            }
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

// Add impulse force when clicking on an empty space
canvas.addEventListener('click', function (event) {
    if (selectedBall === null) {
        // Add an impulse force when clicking on an empty space
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        balls.forEach((ball) => {
            const dx = mouseX - ball.x;
            const dy = mouseY - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If the click is within range of the ball, apply an impulse
            if (distance < ball.radius + 50) { // Change the threshold distance if needed
                const impulseX = (dx / distance) * 10;  // Modify impulse strength as needed
                const impulseY = (dy / distance) * 10;
                ball.vx += impulseX;
                ball.vy += impulseY;
            }
        });
    }
});

// Start dragging a ball
canvas.addEventListener('mousedown', function (event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Check if the mouse is within a ball
    balls.forEach((ball) => {
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius) {
            selectedBall = ball;
            offsetX = mouseX - ball.x;
            offsetY = mouseY - ball.y;
        }
    });
});

// Update ball position while dragging
canvas.addEventListener('mousemove', function (event) {
    if (selectedBall !== null) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        selectedBall.x = mouseX - offsetX;
        selectedBall.y = mouseY - offsetY;
    }
});

// Release the ball when mouse is released
canvas.addEventListener('mouseup', function () {
    selectedBall = null;  // Deselect the ball
});

// Game loop to animate
function gameLoop() {
    updatePhysics();
    drawBalls();
    requestAnimationFrame(gameLoop);
}

// Initialize balls and start animation
setInterval(createBall, 1000); // Create a new ball every second
gameLoop();
