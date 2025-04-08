// Adds functionality to the "Email Me" button
document.addEventListener("DOMContentLoaded", () => {
  const emailButton = document.getElementById("emailButton");

  emailButton.addEventListener("click", () => {
    // Replace this with your actual email or use a contact form later
    const email = "mailto:laurencegadd@gmail.com?subject=Game%20Dev%20Inquiry";
    window.location.href = email;
  });
});
