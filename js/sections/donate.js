/* ╔════════════════════════════════════════════════════════════════╗ */
/* ║                    DONATE PAGE JAVASCRIPT                      ║ */
/* ╚════════════════════════════════════════════════════════════════╝ */

// Data структуры для донатов
const donateData = {
    // История донатов (мок данные)
    recentDonations: [
        {
            id: 1,
            name: 'Dima_Gamer',
            amount: 500,
            date: '2024-02-28 18:30',
            anonymous: false
        },
        {
            id: 2,
            name: 'StreamLover',
            amount: 1000,
            date: '2024-02-28 17:15',
            anonymous: false
        },
        {
            id: 3,
            name: 'Аноним',
            amount: 250,
            date: '2024-02-28 16:45',
            anonymous: true
        },
        {
            id: 4,
            name: 'ProPlayer99',
            amount: 2000,
            date: '2024-02-28 15:20',
            anonymous: false
        },
        {
            id: 5,
            name: 'NightStreamer',
            amount: 150,
            date: '2024-02-28 14:00',
            anonymous: false
        },
        {
            id: 6,
            name: 'Аноним',
            amount: 300,
            date: '2024-02-28 13:30',
            anonymous: true
        },
        {
            id: 7,
            name: 'SkyWalker88',
            amount: 750,
            date: '2024-02-28 12:00',
            anonymous: false
        },
        {
            id: 8,
            name: 'EchoVoice',
            amount: 400,
            date: '2024-02-28 11:15',
            anonymous: false
        }
    ],

    // Топ донатеры за всё время
    topDonors: [
        {
            position: 1,
            name: 'LegendaryFan',
            totalAmount: 15500,
            emoji: '👑'
        },
        {
            position: 2,
            name: 'SilverSupporter',
            totalAmount: 12300,
            emoji: '⭐'
        },
        {
            position: 3,
            name: 'GoldenHeart',
            totalAmount: 9800,
            emoji: '💎'
        }
    ],

    // Статистика
    stats: {
        streamTotal: 5240,
        monthTotal: 24680,
        allTimeTotal: 145320,
        goalCurrent: 3200,
        goalTarget: 5000
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeDonePage();
});

// Основная функция инициализации
function initializeDonePage() {
    setupFormHandlers();
    renderTopDonors();
    renderDonateHistory();
    setupPresetButtons();
}

// ═══════════════════════════════════════════════════════════════
// FORM HANDLERS
// ═══════════════════════════════════════════════════════════════

function setupFormHandlers() {
    const amountInput = document.getElementById('donateAmount');
    const payButton = document.querySelector('.donate-button-primary');
    const anonymousCheckbox = document.getElementById('anonymousDonation');

    if (payButton) {
        payButton.addEventListener('click', function() {
            const amount = amountInput.value;
            const isAnonymous = anonymousCheckbox.checked;

            if (validateAmount(amount)) {
                processDonate(amount, isAnonymous);
            }
        });
    }

    // Обработка Enter в поле ввода
    if (amountInput) {
        amountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                payButton.click();
            }
        });
    }
}

// Валидация суммы
function validateAmount(amount) {
    if (!amount || isNaN(amount) || amount < 1) {
        alert('Пожалуйста, введите корректную сумму (минимум 1 ₽)');
        return false;
    }
    return true;
}

// Обработка доната (отправка на DonationAlerts)
function processDonate(amount, isAnonymous) {
    const name = isAnonymous ? 'Аноним' : 'Благодарный донатор';
    
    // Имитируем добавление доната в историю
    const newDonate = {
        id: donateData.recentDonations.length + 1,
        name: name,
        amount: parseInt(amount),
        date: getCurrentDateTime(),
        anonymous: isAnonymous
    };

    // Добавляем в начало массива
    donateData.recentDonations.unshift(newDonate);

    // Обновляем статистику
    updateStatistics(parseInt(amount));

    // Перерисовываем историю
    renderDonateHistory();

    // Показываем сообщение об успехе
    showSuccessMessage(amount);

    // Очищаем форму
    document.getElementById('donateAmount').value = '100';
    document.getElementById('anonymousDonation').checked = false;

    // В реальном приложении здесь была бы редирекция на DonationAlerts
    // window.open(`https://www.donationalerts.com/`, '_blank');
}

// Обновление статистики после доната
function updateStatistics(amount) {
    // Обновляем статистику в текущей сессии
    donateData.stats.streamTotal += amount;
    donateData.stats.monthTotal += amount;
    donateData.stats.allTimeTotal += amount;

    // Обновляем визуальные элементы (опционально, можно расширить позже)
}

// Получение текущего времени в нужном формате
function getCurrentDateTime() {
    const now = new Date();
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${date} ${hours}:${minutes}`;
}

// Показ сообщения об успехе
function showSuccessMessage(amount) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d4a574, #a8956d);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(92, 74, 47, 0.3);
        animation: slideIn 0.3s ease;
    `;
    message.textContent = `Спасибо за донат ${amount} ₽! ❤️`;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// PRESET BUTTONS
// ═══════════════════════════════════════════════════════════════

function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('.donate-preset');
    const amountInput = document.getElementById('donateAmount');

    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.dataset.amount;
            amountInput.value = amount;

            // Обновляем активный статус
            presetButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Убираем активный класс при изменении ввода
    amountInput.addEventListener('input', function() {
        presetButtons.forEach(btn => {
            if (btn.dataset.amount === this.value) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// TOP DONATORS RENDERING
// ═══════════════════════════════════════════════════════════════

function renderTopDonors() {
    const container = document.getElementById('topDonatorsContainer');

    if (!container) return;

    container.innerHTML = donateData.topDonors.map((donor, index) => `
        <div class="donate-top-donor">
            <div class="donate-donor-position" style="animation: slideUp 0.5s ease ${index * 0.1}s backwards;">
                ${donor.emoji}
            </div>
            <h3 class="donate-donor-name" style="animation: slideUp 0.5s ease ${index * 0.1 + 0.1}s backwards;">
                ${donor.name}
            </h3>
            <p class="donate-donor-amount" style="animation: slideUp 0.5s ease ${index * 0.1 + 0.2}s backwards;">
                ₽${formatNumber(donor.totalAmount)}
            </p>
        </div>
    `).join('');

    // Добавляем стили анимации
    addAnimationStyles();
}

// ═══════════════════════════════════════════════════════════════
// DONATION HISTORY RENDERING
// ═══════════════════════════════════════════════════════════════

function renderDonateHistory() {
    const container = document.getElementById('donateHistoryContainer');

    if (!container) return;

    if (donateData.recentDonations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">История пока пуста</p>';
        return;
    }

    container.innerHTML = donateData.recentDonations.map(donation => {
        const firstLetter = donation.name.charAt(0).toUpperCase();
        return `
            <div class="donate-history-item">
                <div class="donate-history-left">
                    <div class="donate-history-avatar">${firstLetter}</div>
                    <div class="donate-history-info">
                        <span class="donate-history-name">${donation.name}</span>
                        <span class="donate-history-time">${donation.date}</span>
                    </div>
                </div>
                <div class="donate-history-amount">₽${formatNumber(donation.amount)}</div>
            </div>
        `;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Форматирование числа с пробелами
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Добавление стилей анимации
function addAnimationStyles() {
    if (document.getElementById('donate-animation-styles')) {
        return; // Стили уже добавлены
    }

    const style = document.createElement('style');
    style.id = 'donate-animation-styles';
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;

    document.head.appendChild(style);
}

// ═══════════════════════════════════════════════════════════════
// QR CODE FUNCTIONALITY (опционально - для реальной интеграции)
// ═══════════════════════════════════════════════════════════════

function generateQRCode(text, elementId) {
    // Можно использовать qrcode.js библиотеку
    // Здесь оставляем плейсхолдер
    console.log('QR Code for:', text);
}

// ═══════════════════════════════════════════════════════════════
// EXPORT ДЛЯ ИСПОЛЬЗОВАНИЯ В ДРУГИХ СКРИПТАХ
// ═══════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    window.donateApp = {
        data: donateData,
        processDonate: processDonate,
        formatNumber: formatNumber,
        render: {
            topDonors: renderTopDonors,
            history: renderDonateHistory
        }
    };
}
