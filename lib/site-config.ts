/**
 * Централизирана конфигурация за бизнес данни.
 * ВАЖНО: Всички факти в сайта трябва да идват от тук. Без измислени данни!
 */

import { BUSINESS_COORDINATES, GOOGLE_BUSINESS_PROFILE_URL } from './business'

export const SITE_CONFIG = {
  name: 'Dom Expert Мебел',
  phone: '0876 081 199',
  phoneInternational: '+359876081199',
  email: 'domexpertmebel@gmail.com',

  address: {
    street: 'ул. „Стамболийски" 52',
    city: 'Благоевград',
    postalCode: '2700',
    fullAddress: 'ул. „Стамболийски" 52, 2700 Благоевград',
  },

  geo: BUSINESS_COORDINATES,
  googleBusinessProfile: {
    url: GOOGLE_BUSINESS_PROFILE_URL,
  },

  hours: {
    weekdays: 'Пон–Пет, 09:00–18:00',
    weekend: 'По договаряне',
  },

  stats: {
    experience: '10+ години',
    projects: '100+ проекта',
    warranty: '2 години',
    deliveryTime: '4–6 седмици',
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
