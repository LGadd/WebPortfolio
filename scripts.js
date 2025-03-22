// Ball Bounce Simulation
const ball = document.querySelector('.ball');
const simulationContainer = document.querySelector('.simulation-container');

let ballHeight = 0; // Initial height of the ball
let velocity = 0; // Initial velocity
const gravity = 0.5; // Gravity strength
const bounceFactor = 0.7; // Energy retained after bounce
const containerHeight = simulationContainer.clientHeight;
const ballSize = ball.clientHeight;

function updateBall() {
    // Apply gravity
    velocity += gravity;
    ballHeight += velocity;

    // Check for collision with the bottom
    if (ballHeight + ballSize > containerHeight) {
        ballHeight = containerHeight - ballSize; // Prevent sinking into the ground
        velocity *= -bounceFactor; // Reverse velocity and reduce it
    }

    // Update ball position
    ball.style.top = `${ballHeight}px`;

    // Continue the animation
    requestAnimationFrame(updateBall);
}

// Start the simulation
updateBall();