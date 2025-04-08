document.addEventListener("DOMContentLoaded", () => {
  const emailButton = document.getElementById("emailButton");
  const bootScreen = document.getElementById("bootScreen");
  const mainContent = document.getElementById("mainContent");

  emailButton.addEventListener("click", () => {
    window.location.href = "mailto:laurencegadd@example.com?subject=Game%20Dev%20Inquiry";
  });

  // Delay showing content until boot screen fades out
  setTimeout(() => {
    bootScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 5000); // Slight buffer after boot animation
});
