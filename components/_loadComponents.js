document.addEventListener("DOMContentLoaded", function () {
  fetch("/components/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      // Add active link highlighting
      const navLinks = document.querySelectorAll('#navbar .nav-link');
      const currentPath = window.location.pathname;
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        }
      });

      // Fix body padding so content isn't hidden behind navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        document.body.style.paddingTop = navbarHeight + "px";
      }
    })
    .catch(err => console.error("Error loading navbar:", err));
});