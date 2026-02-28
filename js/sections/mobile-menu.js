// Логика бургер-меню и закрытия по Esc/ссылке

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Закрытие меню при нажатии клавиши Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = mobileNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
});