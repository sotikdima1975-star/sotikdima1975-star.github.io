const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = mobileNav.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const defaultConfig = {
    site_title: 'СайтСотика',
    logo_text: 'S',
    primary_color: '#000000',
    font_family: 'Montserrat'
};

let config = { ...defaultConfig };

async function onConfigChange(newConfig) {
    config = { ...config, ...newConfig };
    document.getElementById('logo-text').textContent = config.logo_text || defaultConfig.logo_text;
    document.getElementById('title-text').textContent = config.site_title || defaultConfig.site_title;
    document.documentElement.style.setProperty('--primary', config.primary_color || defaultConfig.primary_color);
    document.body.style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
}

function mapToCapabilities(currentConfig) {
    return {
        recolorables: [{
            get: () => currentConfig.primary_color || defaultConfig.primary_color,
            set: (value) => {
                currentConfig.primary_color = value;
                window.elementSdk.setConfig({ primary_color: value });
            }
        }],
        borderables: [],
        fontEditable: {
            get: () => currentConfig.font_family || defaultConfig.font_family,
            set: (value) => {
                currentConfig.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(currentConfig) {
    return new Map([
        ['site_title', currentConfig.site_title || defaultConfig.site_title],
        ['logo_text', currentConfig.logo_text || defaultConfig.logo_text]
    ]);
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}