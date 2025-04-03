document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("main-header");
    const projects = document.querySelectorAll(".project");

    // Change header background on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.style.background = "var(--dark-gold)";
        } else {
            header.style.background = "var(--gold)";
        }
    });

    // Add animation effect to projects on hover
    projects.forEach(project => {
        project.addEventListener("mouseenter", () => {
            project.style.transform = "rotateY(5deg)";
        });
        project.addEventListener("mouseleave", () => {
            project.style.transform = "rotateY(0deg)";
        });
    });
});
