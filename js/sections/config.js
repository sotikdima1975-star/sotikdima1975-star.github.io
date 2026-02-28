// Глобальные конфигурации

class SiteConfig {
  constructor() {
    this.siteName = 'СайтСотика';
    this.author = 'Дмитрий Переднего';
    this.version = '1.0.0';
    this.analyticsEnabled = false; // Можно включить при необходимости
  }
  
  init() {
    console.log(`${this.siteName} v${this.version} by ${this.author}`);
  }
}

// Инициализация конфигурации
const config = new SiteConfig();
config.init();