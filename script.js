// Get the container element
const container = document.getElementById('container');

// Function to create a ball at the clicked position
container.addEventListener('click', (event) => {
  const ball = document.createElement('div');
  ball.classList.add('ball');

  // Set the ball's position to the click coordinates
  const x = event.clientX - container.offsetLeft - 25; // Adjust for ball size
  const y = event.clientY - container.offsetTop - 25; // Adjust for ball size

  // Ensure the ball stays within the container boundaries
  const maxX = container.clientWidth - 50; // 50 is the ball's width/height
  const maxY = container.clientHeight - 50;

  ball.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
  ball.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;

  // Add the ball to the container
  container.appendChild(ball);
});
