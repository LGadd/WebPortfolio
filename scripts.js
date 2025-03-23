const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");

const sizeInput = document.getElementById("size");
const sizeValue = document.getElementById("SizeValue");

const gravInput = document.getElementById("gravity");
const gravValue = document.getElementById("gravityValue");

const massInput = document.getElementById("mass");
const massValue = document.getElementById("massValue");

const forceYInput = document.getElementById("forceY");
const forceYValue = document.getElementById("forceYValue");

const elasticityInput = document.getElementById("elasticity");
const elasticityValue = document.getElementById("elasticityValue");

const impulseButton = document.getElementById("impulseButton");

// Ball properties
let ball = {
    x: 400,
    y: 400,
    radius: parseInt(sizeInput.value),
    velocityX: 0,
    velocityY: 0,
    accelerationX: 0,
    accelerationY: 0,
    gravity: parseFloat(gravInput.value),
    mass: parseFloat(massInput.value),
    force: parseFloat(forceYInput.value),
    elasticity: parseFloat(elasticityInput.value),
};

// Fixed time step variables
let lastTime = performance.now();
const timeStep = 1 / 60; // 60 updates per second (fixed timestep in seconds)
let accumulator = 0;

function updateBall(dt) {
    ball.accelerationY = -ball.gravity;
    ball.accelerationY -= ball.force/ball.mass;
    
    ball.accelerationY *= 100;

    ball.velocityX += ball.accelerationX * dt;
    ball.velocityY += ball.accelerationY * dt;

    // Update position
    ball.x += ball.velocityX * dt;
    ball.y += ball.velocityY * dt;

    // Collision detection & response
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.velocityX *= -(ball.elasticity / 100); // Reduce velocity on impact (energy loss)
    }
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.velocityY *= -(ball.elasticity / 100); // Reduce velocity on impact (energy loss)
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

impulseButton.addEventListener("click",() =>{
    const impulseStrength = Math.random() * 100 + 100;
    const angle = Math.random() * Math.PI * 2;

    const impulseX = Math.cos(angle)*impulseStrength;
    const impulseY = -Math.abs(Math.sin(angle)*impulseStrength);
    
    ball.velocityX += impulseX/ball.mass*100;
    ball.velocityY += impulseY/ball.mass*100;
})

// Handle size change
sizeInput.addEventListener("input", () => {
    ball.radius = parseInt(sizeInput.value);
    sizeValue.textContent = sizeInput.value;
});

//Handle Gravity Change
gravInput.addEventListener("input",() => {
    ball.gravity = parseFloat(gravInput.value);
    gravValue.textContent = gravInput.value;

}); 

massInput.addEventListener("input",() => {
    ball.mass = parseFloat(massInput.value);
    massValue.textContent = massInput.value;
});

forceYInput.addEventListener("input",() =>{
    ball.force = parseFloat(forceYInput.value);
    forceYValue.textContent = forceYInput.value;
});

elasticityInput.addEventListener("input",()=>{
    ball.elasticity = parseFloat(elasticityInput.value);
    elasticityValue.textContent = elasticityInput.value/100;
});
// Start game loop
requestAnimationFrame(gameLoop);
