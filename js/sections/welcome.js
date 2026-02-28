// Анимация появления приветственного блока

function animateWelcomeSection() {
  const section = document.getElementById('welcome-section');
  const title = section.querySelector('.title-main');
  const cards = section.querySelectorAll('.card');
  const stats = section.querySelectorAll('.stat');

  // Анимация заголовка
  title.style.opacity = '0';
  title.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    title.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
  }, 300);

  // Анимация карточек
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 600 + (index * 100));
  });

  // Анимация статистики
  stats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      stat.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      stat.style.opacity = '1';
      stat.style.transform = 'scale(1)';
    }, 1000 + (index * 150));
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Задержка для полной загрузки фонового изображения
  setTimeout(animateWelcomeSection, 500);
});

// Перезапуск анимации при изменении размера окна
window.addEventListener('resize', () => {
  const section = document.getElementById('welcome-section');
  if (section) {
    section.querySelectorAll('*').forEach(el => {
      el.style.transition = 'none';
      el.style.opacity = '';
      el.style.transform = '';
    });
    
    setTimeout(() => {
      animateWelcomeSection();
    }, 100);
  }
});