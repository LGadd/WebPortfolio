const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");
const sizeInput = document.getElementById("size");

// Ball properties
let ball = {
    x: 400,
    y: 400,
    radius: parseInt(sizeInput.value),
    velocityX: 0,
    velocityY: 0,
    accelerationX: 0,
    accelerationY: 0,
    gravity = -9.81
};

// Fixed time step variables
let lastTime = performance.now();
const timeStep = 1 / 60; // 60 updates per second (fixed timestep in seconds)
let accumulator = 0;

function updateBall(dt) {
    ball.accelerationY = ball.gravity;
    // Apply acceleration
    ball.velocityX += ball.accelerationX * dt;
    ball.velocityY += ball.accelerationY * dt;

    // Update position
    ball.x += ball.velocityX * dt;
    ball.y += ball.velocityY * dt;

    // Collision detection & response
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.velocityX *= -0.9; // Reduce velocity on impact (energy loss)
    }
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.velocityY *= -0.9; // Reduce velocity on impact (energy loss)
    }

    // Keep ball inside boundaries
    ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
    ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function gameLoop(currentTime) {
    let deltaTime = (currentTime - lastTime) / 1000; // Convert ms to seconds
    lastTime = currentTime;
    accumulator += deltaTime;

    while (accumulator >= timeStep) {
        updateBall(timeStep);
        accumulator -= timeStep;
    }

    drawBall();
    requestAnimationFrame(gameLoop);
}

// Handle size change
sizeInput.addEventListener("input", () => {
    ball.radius = parseInt(sizeInput.value);
});

// Start game loop
requestAnimationFrame(gameLoop);
