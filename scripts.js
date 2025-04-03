document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("main-header");
    const projects = document.querySelectorAll(".project");
    const imagesContainer = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

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

    // Image Carousel Logic
    let index = 0;

    function updateCarousel() {
        imagesContainer.style.transform = `translateX(-${index * 600}px)`;
    }

    nextBtn.addEventListener("click", function () {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    // Auto-slide the carousel every 5 seconds
    setInterval(() => {
        index = (index + 1) % images.length;
        updateCarousel();
    }, 5000);
});
