// js/sections/games.js
// Данные и рендеринг карточек для страницы /pages/games/

const games = [
  {
    id: "fm7",
    title: "Forza Motorsport 7",
    year: 2017,
    description: "Forza Motorsport 7 — аркадно-реалистичный гоночный симулятор с большим пулом трасс и автомобилей.",
    banner: "/assets/games/fm7.jpg"
  },
  {
    id: "fm2023",
    title: "Forza Motorsport",
    year: 2023,
    description: "Рестарт серии Forza — более реалистичная физика, современная графика и глубокая кастомизация автомобилей.",
    banner: "/assets/games/fm2023.jpg"
  }
];

function createCardHTML(game) {
  return `
    <article class="game-card bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div class="game-card__media h-40 md:h-48 bg-cover bg-center" style="background-image: url('${game.banner}');"></div>
      <div class="p-4 flex-1 flex flex-col">
        <h3 class="text-xl font-semibold mb-1">${game.title}</h3>
        <div class="text-sm text-slate-500 mb-3">Год: ${game.year}</div>
        <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-1">${game.description}</p>
        <div class="mt-2">
          <button class="btn-more inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded" data-id="${game.id}">Подробнее</button>
        </div>
      </div>
    </article>
  `;
}

function renderGames(containerSelector = '#games-list') {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = games.map(createCardHTML).join('');

  // Навешиваем обработчики на кнопки
  container.querySelectorAll('.btn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (!id) return;
      // Переход на страницу игры (относительно /pages/games/index.html)
      window.location.href = `${id}/`;
    });
  });
}

// Инициализация на DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderGames('#games-list');
});

// Экспорт для случаев подключения в другом контексте
if (typeof module !== 'undefined') module.exports = { games, renderGames };
