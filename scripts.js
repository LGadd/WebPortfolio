// Interactive Developer Tool
function runCode() {
    const codeInput = document.getElementById("code-input").value;
    const outputElement = document.getElementById("output");
    try {
        const result = eval(codeInput);
        outputElement.textContent = result !== undefined ? result : 'Code executed successfully';
    } catch (error) {
        outputElement.textContent = 'Error: ' + error.message;
    }
}

// Physics Simulation
const canvas = document.getElementById("physicsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let particles = [];

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 5;
    }

    update() {
        this.vy += 0.1; // Gravity effect
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy *= -0.7; // Bounce
        }

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx *= -1; // Bounce off walls
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#4CAF50";
        ctx.fill();
        ctx.closePath();
    }
}

// Create particles
for (let i = 0; i < 50; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 - 1, Math.random() * 2 - 1));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

