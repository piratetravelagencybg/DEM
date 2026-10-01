/**
 * Централизиран конфигурационен файл за Dom Expert Мебел.
 * Единен източник на истината за контактна информация, адрес и бизнес данни.
 */

export const SITE_CONFIG = {
  name: 'Dom Expert Мебел',
  legalName: 'Dom Expert Мебел',

  // Контакти
  phone: '0876 081 199',
  phoneInternational: '+359876081199',
  email: 'domexpertmebel@gmail.com',

  // Адрес
  address: {
    street: 'ул. „Стамболийски" 52',
    city: 'Благоевград',
    postalCode: '2700',
    region: 'Благоевград',
    country: 'BG',
    countryName: 'България',
    fullAddress: 'ул. „Стамболийски" 52, 2700 Благоевград',
  },

  // Координати
  geo: {
    latitude: 42.0144733,
    longitude: 23.0984408,
  },

  // Работно време
  hours: {
    weekdays: 'Понеделник–Петък',
    time: '09:00–18:00',
    weekend: 'Събота и Неделя: Почивни дни',
  },

  // Google Business Profile
  googleBusinessProfile: {
    url: 'https://www.google.com/maps/place/%D0%94%D0%BE%D0%BC+%D0%95%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82+%D0%9C%D0%B5%D0%B1%D0%B5%D0%BB/@42.0144733,23.0984408,17z/data=!3m1!4b1!4m6!3m5!1s0x14aaf7859c53811f:0xaac91a1223edc4ae!8m2!3d42.0144733!4d23.0984408!16s%2Fg%2F11zgs015hn',
  },

  // Социални мрежи
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61591180911065',
    instagram: 'https://www.instagram.com/domexpertmebel/',
  },

  // Статистики и бизнес факти
  stats: {
    experience: '10+ години',
    experienceYears: 10,
    projects: '100+ проекта',
    projectsCount: 100,
    warranty: '2 години',
    warrantyYears: 2,
    deliveryTime: '4–6 седмици',
    deliveryWeeksMin: 4,
    deliveryWeeksMax: 6,
  },

  // Услуги и условия
  services: {
    freeInspection: 'Безплатен оглед на място',
    design3D: '3D проект с приспадане при поръчка',
    assemblyIncluded: 'Монтаж включен',
    warranty: '2 години гаранция',
    responseTime: 'до 24 часа',
  },

  // Обслужвани градове
  cities: [
    'Благоевград',
    'София',
    'Дупница',
    'Сандански',
    'Кресна',
    'Банско',
    'Разлог',
    'Гоце Делчев',
  ],

  // SEO
  siteUrl: 'https://domexpertmebel.com',
  siteName: 'Dom Expert Мебел',
} as const

export type SiteConfig = typeof SITE_CONFIG
