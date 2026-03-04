// Модальные окна для кнопок "Подробнее"

document.addEventListener('DOMContentLoaded', function() {
  const detailButtons = document.querySelectorAll('.detail-button');
  const modal = document.querySelector('.modal');
  
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content');
  const closeModal = modal.querySelector('.modal-close');
  
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title');
      const content = button.getAttribute('data-content');
      
      modalContent.innerHTML = `\n        <h2>${title}</h2>\n        <p>${content}</p>\n      `;
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  // Закрытие по клику вне модального окна
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});