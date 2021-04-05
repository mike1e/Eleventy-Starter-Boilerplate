const hamburgerButton = document.querySelector('#hamburger-button');
const mobileMenu = document.querySelector('#mobile-menu');
function mobileMenuToggle() {
  mobileMenu.classList.toggle('hidden');
}
hamburgerButton.addEventListener('click', mobileMenuToggle);
