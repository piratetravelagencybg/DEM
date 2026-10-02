/**
 * Централизирана конфигурация за бизнес данни.
 * ВАЖНО: Всички факти в сайта трябва да идват от тук. Без измислени данни!
 */

import { BUSINESS_COORDINATES, GOOGLE_BUSINESS_PROFILE_URL } from './business'

export const SITE_CONFIG = {
  name: 'Dom Expert Мебел',
  legalName: 'Dom Expert Мебел',
  phone: '0876 081 199',
  phoneInternational: '+359876081199',
  email: 'domexpertmebel@gmail.com',

  address: {
    street: 'ул. „Стамболийски" 52',
    city: 'Благоевград',
    postalCode: '2700',
    region: 'Благоевград',
    country: 'BG',
    countryName: 'България',
    fullAddress: 'ул. „Стамболийски" 52, 2700 Благоевград',
  },

  geo: BUSINESS_COORDINATES,
  googleBusinessProfile: {
    url: GOOGLE_BUSINESS_PROFILE_URL,
  },

  // UI настройки
  ui: {
    showHeroRating: false, // Ще се включи при 20+ отзива
  },

  hours: {
    weekdays: 'Понеделник–Петък',
    time: '09:00–18:00',
    weekend: 'Събота и Неделя: Почивни дни',
  },

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

  // Цени за 3D проект
  pricing: {
    visualization: {
      kitchen: {
        from: 100,
        currency: '€',
        deductible: true, // 100% приспадане при поръчка
      },
      other: {
        from: 50,
        currency: '€',
        deductible: true,
        description: 'Гардероб, спалня, дневна',
      },
      multipleRooms: 'По оферта',
    },
    interiorDesign: {
      pricePerSqm: 25,
      currency: '€',
      minimumSqm: 30,
      description: 'Цялостен интериорен дизайн — функционално разпределение, материали, цветове, осветление, 3D визуализации на всяко помещение. Точна оферта след оглед.',
    },
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
  cities: {
    primary: ['Благоевград', 'София', 'Дупница', 'Сандански', 'Петрич'],
    region: 'Югозападна България',
    remote3D: true, // Дистанционен 3D проект за цяла България
  },

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61591180911065',
    instagram: 'https://www.instagram.com/domexpertmebel/',
  },

  siteUrl: 'https://domexpertmebel.com',
  siteName: 'Dom Expert Мебел',
} as const

// Помощни функции
export function formatPrice(amount: number, currency: string = 'лв') {
  return `${amount} ${currency}`
}

export function get3DVisualizationPrice(type: 'kitchen' | 'other') {
  const config = type === 'kitchen'
    ? SITE_CONFIG.pricing.visualization.kitchen
    : SITE_CONFIG.pricing.visualization.other

  return {
    text: `от ${config.from} ${config.currency}`,
    deductible: config.deductible,
  }
}

export function getInteriorDesignPrice() {
  const { pricePerSqm, currency, minimumSqm } = SITE_CONFIG.pricing.interiorDesign
  return {
    text: `от ${pricePerSqm} ${currency}/кв.м`,
    minimum: `минимум ${minimumSqm} кв.м`,
  }
}

export type SiteConfig = typeof SITE_CONFIG
