// Копирование реквизитов в буфер обмена

document.addEventListener('DOMContentLoaded', function() {
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const target = button.getAttribute('data-target');
      const element = document.querySelector(target);
      
      if (element) {
        const text = element.innerText.trim();
        try {
          await navigator.clipboard.writeText(text);
          
          // Временное изменение текста кнопки
          const originalText = button.innerText;
          button.innerText = 'Скопировано!';
          
          setTimeout(() => {
            button.innerText = originalText;
          }, 2000);
        } catch (err) {
          console.error('Ошибка при копировании: ', err);
          alert('Не удалось скопировать. Попробуйте вручную.');
        }
      }
    });
  });
});