const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");
const sizeInput = document.getElementById("size");

let ball = {
    x: 400,
    y: 400,
    radius: parseInt(sizeInput.value),
    velocityX: 3,
    velocityY: 2,
    accelerationX: 0.1,
    accelerationY: 0.1
};

function updateBall() {
    // Apply acceleration
    ball.velocityX += ball.accelerationX;
    ball.velocityY += ball.accelerationY;

    // Update position
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Collision with walls (bounce effect)
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

function animate() {
    updateBall();
    drawBall();
    requestAnimationFrame(animate);
}

// Handle size change
sizeInput.addEventListener("input", () => {
    ball.radius = parseInt(sizeInput.value);
});

animate();
