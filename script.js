// 🚀 MainOS Update Panel - Liquid Glass UI
// GitHub: https://github.com/romagrisin847-afk/MainOS-Updates

// ⚙️ Конфигурация
const CONFIG = {
    currentVersion: "26.7",
    driveFolderId: "1Ny-0ZSp0z1u96j_jwGNfinnpD4AWd3as",
    googleApiKey: "AIzaSyB1pkjZ-q8c9NmZ1L5GxX9T8BwCv7yWYF4", // Замени на свой ключ
    githubRepo: "romagrisin847-afk/MainOS-Updates",
    websiteUrl: "https://towerrl.tilda.ws",
    autoCheckInterval: 300000 // 5 минут
};

// 📊 Состояние
let state = {
    isChecking: false,
    bypassMode: false,
    lastCheck: null,
    versions: {
        website: null,
        drive: null
    }
};

// 🎯 Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    setupEventListeners();
    loadFromStorage();
    
    // Авто-проверка через 2 секунды
    setTimeout(() => {
        if (!state.isChecking) {
            simulateCheck();
        }
    }, 2000);
    
    // Авто-проверка каждые 5 минут
    setInterval(() => {
        if (!state.isChecking) {
            simulateCheck();
        }
    }, CONFIG.autoCheckInterval);
});

// 🚀 Основная инициализация
function initApp() {
    // Установить текущую версию
    document.getElementById('currentVersion').textContent = CONFIG.currentVersion;
    
    // Показать приветствие
    setTimeout(() => {
        showNotification('MainOS Update Panel', 'Liquid Glass UI загружен', 'info');
    }, 1000);
}

// 🎮 Настройка обработчиков
function setupEventListeners() {
    // Проверка обновлений
    document.getElementById('checkBtn').addEventListener('click', function() {
        simulateCheck();
    });
    
    // Скачивание
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const driveVersion = state.versions.drive || CONFIG.currentVersion;
        window.open(`https://drive.google.com/drive/folders/${CONFIG.driveFolderId}`, '_blank');
        showNotification('Загрузка', `Открываю Google Drive`, 'info');
        
        this.innerHTML = '<div class="loading"></div> Opening...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Opened';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-download"></i> Download';
                this.disabled = false;
            }, 2000);
        }, 1500);
    });
    
    // Дополнительные кнопки
    document.getElementById('manualBtn').addEventListener('click', function() {
        showNotification('Ручная установка', 'Введите номер версии:', 'info');
        const version = prompt('Введите номер версии (например 26.8):', '26.8');
        if (version) {
            state.versions.drive = version;
            updateVersionDisplay();
            showNotification('Версия установлена', `Ручная версия: ${version}`, 'success');
        }
    });
    
    document.getElementById('bypassBtn').addEventListener('click', function() {
        toggleBypass();
    });
    
    document.getElementById('folderBtn').addEventListener('click', function() {
        window.open(`https://drive.google.com/drive/folders/${CONFIG.driveFolderId}`, '_blank');
        showNotification('Google Drive', 'Папка открыта в новой вкладке', 'info');
    });
    
    document.getElementById('logBtn').addEventListener('click', function() {
        showSystemLog();
    });
    
    // Ripple эффект для всех кнопок
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// 🌊 Ripple эффект
function createRipple(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255, 255, 255, 0.3)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 0.6s linear';
    circle.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(circle);
    
    setTimeout(() => circle.remove(), 600);
}

// Добавляем анимацию ripple в CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 🔍 Симуляция проверки (для демо)
async function simulateCheck() {
    if (state.isChecking) return;
    
    state.isChecking = true;
    const checkBtn = document.getElementById('checkBtn');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    
    // Обновляем UI
    checkBtn.disabled = true;
    checkBtn.innerHTML = '<div class="loading"></div> Checking...';
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    
    statusIcon.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i>';
    statusTitle.textContent = 'Connecting...';
    statusMessage.textContent = 'Establishing connection';
    
    try {
        // Этап 1: Подключение (30%)
        await animateProgress(progressBar, 0, 30, 600);
        statusIcon.innerHTML = '<i class="fas fa-wifi"></i>';
        statusTitle.textContent = 'Checking website';
        statusMessage.textContent = 'Accessing Tilda page...';
        
        // Этап 2: Сайт (60%)
        await animateProgress(progressBar, 30, 60, 800);
        statusIcon.innerHTML = '<i class="fab fa-google-drive"></i>';
        statusTitle.textContent = 'Google Drive';
        statusMessage.textContent = 'Scanning for updates...';
        
        // Этап 3: Drive (90%)
        await animateProgress(progressBar, 60, 90, 1000);
        statusIcon.innerHTML = '<i class="fas fa-cogs"></i>';
        statusTitle.textContent = 'Analyzing';
        statusMessage.textContent = 'Comparing versions...';
        
        // Этап 4: Анализ (100%)
        await animateProgress(progressBar, 90, 100, 500);
        
        // Генерируем демо-версии
        const websiteVersion = (26.7 + Math.random() * 0.5).toFixed(1);
        const driveVersion = (26.7 + Math.random() * 0.3).toFixed(1);
        
        // Сохраняем
        state.versions.website = websiteVersion;
        state.versions.drive = driveVersion;
        
        // Обновляем интерфейс
        updateVersionDisplay();
        
        // Анализируем
        const current = parseFloat(CONFIG.currentVersion);
        const website = parseFloat(websiteVersion);
        const drive = parseFloat(driveVersion);
        
        if (drive > current) {
            statusIcon.innerHTML = '<i class="fas fa-download"></i>';
            statusTitle.textContent = 'Update available!';
            statusMessage.textContent = `Version ${driveVersion} ready`;
            document.getElementById('downloadBtn').disabled = false;
            showNotification('🎉 Обновление!', `Версия ${driveVersion} доступна`, 'success');
        } else if (website > current) {
            statusIcon.innerHTML = '<i class="fas fa-code-branch"></i>';
            statusTitle.textContent = 'Beta available';
            statusMessage.textContent = `Beta ${websiteVersion} on site`;
            showNotification('⚠️ Бета-версия', `На сайте: ${websiteVersion}`, 'warning');
        } else {
            statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            statusTitle.textContent = 'Up to date';
            statusMessage.textContent = 'Latest version installed';
            showNotification('✅ Актуально', 'Установлена последняя версия', 'info');
        }
        
        // Сохраняем время
        state.lastCheck = new Date();
        saveToStorage();
        updateLastCheck();
        
    } catch (error) {
        console.error('Check error:', error);
        statusIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        statusTitle.textContent = 'Check failed';
        statusMessage.textContent = 'Please try again';
        showNotification('❌ Ошибка', 'Не удалось проверить обновления', 'error');
        
        // Если bypass режим включен
        if (state.bypassMode) {
            useDemoData();
        }
    } finally {
        // Восстанавливаем UI
        setTimeout(() => {
            checkBtn.disabled = false;
            checkBtn.innerHTML = '<i class="fas fa-search"></i> Check Updates';
            
            setTimeout(() => {
                progressContainer.style.display = 'none';
                progressBar.style.width = '0%';
                state.isChecking = false;
            }, 1000);
        }, 1000);
    }
}

// 📊 Анимация прогресса
function animateProgress(progressBar, start, end, duration) {
    return new Promise(resolve => {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * progress;
            progressBar.style.width = current + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };
        animate();
    });
}

// 🎨 Обновление отображения версий
function updateVersionDisplay() {
    const websiteEl = document.getElementById('websiteVersion');
    const driveEl = document.getElementById('driveVersion');
    
    websiteEl.textContent = state.versions.website || '-';
    driveEl.textContent = state.versions.drive || '-';
    
    // Сброс стилей
    websiteEl.className = 'info-value';
    driveEl.className = 'info-value';
    
    // Анализ
    const current = parseFloat(CONFIG.currentVersion);
    const website = parseFloat(state.versions.website);
    const drive = parseFloat(state.versions.drive);
    
    if (website > current) {
        websiteEl.classList.add('beta');
    }
    
    if (drive > current) {
        driveEl.classList.add('new');
    }
}

// 🔓 Переключение bypass режима
function toggleBypass() {
    state.bypassMode = !state.bypassMode;
    const bypassBtn = document.getElementById('bypassBtn');
    
    if (state.bypassMode) {
        bypassBtn.classList.add('active');
        bypassBtn.innerHTML = '<i class="fas fa-lock-open"></i> Bypass ON';
        showNotification('🔓 Bypass Mode', 'Демо-данные активированы', 'warning');
    } else {
        bypassBtn.classList.remove('active');
        bypassBtn.innerHTML = '<i class="fas fa-unlock"></i> Bypass';
        showNotification('🔐 Normal Mode', 'Используется реальное API', 'info');
    }
    
    saveToStorage();
}

// 📋 Демо-данные для bypass
function useDemoData() {
    state.versions.website = "26.9";
    state.versions.drive = "26.8";
    updateVersionDisplay();
    showNotification('🎭 Demo Mode', 'Использую тестовые данные', 'info');
}

// 📝 Системный лог
function showSystemLog() {
    const log = `
    === SYSTEM LOG ===
    
    Version: ${CONFIG.currentVersion}
    Last check: ${state.lastCheck ? state.lastCheck.toLocaleString() : 'Never'}
    Website version: ${state.versions.website || 'Not checked'}
    Drive version: ${state.versions.drive || 'Not checked'}
    Bypass mode: ${state.bypassMode ? 'ON' : 'OFF'}
    Google Drive folder: ${CONFIG.driveFolderId}
    GitHub repository: ${CONFIG.githubRepo}
    
    === END LOG ===
    `;
    
    showNotification('📋 System Log', log, 'info');
}

// 💾 Локальное хранилище
function saveToStorage() {
    const data = {
        lastCheck: state.lastCheck,
        bypassMode: state.bypassMode,
        versions: state.versions
    };
    try {
        localStorage.setItem('mainos-panel-data', JSON.stringify(data));
    } catch (e) {
        console.warn('Failed to save data:', e);
    }
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('mainos-panel-data');
        if (saved) {
            const data = JSON.parse(saved);
            state.lastCheck = data.lastCheck ? new Date(data.lastCheck) : null;
            state.bypassMode = data.bypassMode || false;
            state.versions = data.versions || {};
            updateVersionDisplay();
            updateLastCheck();
        }
    } catch (e) {
        console.warn('Failed to load data:', e);
    }
}

// 🕐 Обновление времени проверки
function updateLastCheck() {
    const lastCheckEl = document.getElementById('lastCheck');
    if (state.lastCheck) {
        const minutesAgo = Math.floor((Date.now() - state.lastCheck.getTime()) / 60000);
        lastCheckEl.textContent = `Checked ${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else {
        lastCheckEl.textContent = 'Status: Ready';
    }
}

// 🔔 Уведомления
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notifications');
    const notification = document.createElement('div');
    const id = Date.now();
    
    const icons = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle'
    };
    
    const colors = {
        info: '#007AFF',
        success: '#34C759',
        warning: '#FF9500',
        error: '#FF3B30'
    };
    
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
            <i class="${icons[type] || 'fas fa-info-circle'}" 
               style="color: ${colors[type] || '#007AFF'}; font-size: 20px;"></i>
            <strong style="font-size: 17px; font-weight: 700;">${title}</strong>
        </div>
        <div style="font-size: 15px; opacity: 0.9; line-height: 1.5;">
            ${message.replace(/\n/g, '<br>')}
        </div>
    `;
    
    container.appendChild(notification);
    
    // Показать
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Авто-удаление через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
    
    // Клик для закрытия
    notification.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    });
    
    return id;
}

// ⌨️ Горячие клавиши
document.addEventListener('keydown', (e) => {
    // Ctrl+U = Check updates
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        simulateCheck();
    }
    // Ctrl+B = Bypass toggle
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleBypass();
    }
    // Ctrl+L = Show log
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        showSystemLog();
    }
    // F5 = Refresh
    if (e.key === 'F5') {
        e.preventDefault();
        window.location.reload();
    }
});

// 🌐 Проверка реальной версии (опционально)
async function checkRealWebsite() {
    try {
        const response = await fetch(CONFIG.websiteUrl);
        const text = await response.text();
        const versionMatch = text.match(/\d{2,}\.\d+/);
        return versionMatch ? versionMatch[0] : "26.9";
    } catch {
        return "26.9";
    }
}

// Вывести версию в консоль
console.log('%c🚀 MainOS Update Panel', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cGitHub: https://github.com/romagrisin847-afk/MainOS-Updates', 'color: #8b949e;');
console.log('%cLiquid Glass UI v2.1', 'color: #34C759;');
