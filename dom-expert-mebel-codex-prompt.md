# CODEX PROMPT — Dom Expert Mebel Website
## Пълен промпт за изграждане на сайта от нулата

---

## 🎯 МИСИЯ

Изгради пълен, production-ready уебсайт за **Dom Expert Mebel** — семейна фирма за мебели по поръчка от Благоевград и София. Сайтът трябва да е SEO-оптимизиран от старта, визуално премиум, бърз и скалируем — с готова структура за блог и онлайн магазин, които могат да се разширяват без пренаписване.

---

## 🛠️ ТЕХНОЛОГИЧЕН СТЕК

- **Framework:** Next.js 14 (App Router, Static Export `output: 'export'`)
- **Styling:** Tailwind CSS v3 + CSS Variables за design tokens
- **Language:** TypeScript
- **Content:** JSON файлове за продукти, проекти, отзиви + MDX за блог постове
- **Icons:** Lucide React
- **Fonts:** Google Fonts — `Cormorant Garamond` (display/headings) + `DM Sans` (body)
- **Images:** Next/Image с локални assets + placeholder blur
- **Forms:** React Hook Form — Submit изпраща към `mailto:` fallback засега (Resend се добавя по-късно с 1 файл)
- **Animations:** Framer Motion за scroll reveals и page transitions
- **SEO:** Next.js Metadata API, JSON-LD Schema, sitemap.xml, robots.txt
- **Deployment ready:** Vercel или static hosting (Apache/Nginx)

---

## 🎨 DESIGN SYSTEM

### Цветова палитра (CSS Variables)
```css
--color-cream: #F5F0E8        /* Главен фон */
--color-warm-white: #FAFAF7   /* Карти, секции */
--color-walnut: #8B6F47       /* Primary акцент — бутони, икони */
--color-walnut-dark: #6B5235  /* Hover states */
--color-charcoal: #2C2C2C     /* Основен текст */
--color-warm-gray: #6B6560    /* Вторичен текст */
--color-light-tan: #E8DDD0    /* Граници, разделители */
--color-sand: #D4C4A8         /* Фон на карти */
--color-success: #4A7C59      /* Success states */
```

### Типография
```css
--font-display: 'Cormorant Garamond', serif  /* H1, H2, hero text */
--font-body: 'DM Sans', sans-serif           /* body, nav, бутони */

/* Размери */
--text-hero: clamp(2.5rem, 6vw, 4.5rem)
--text-h1: clamp(2rem, 4vw, 3rem)
--text-h2: clamp(1.5rem, 3vw, 2.25rem)
--text-h3: 1.5rem
--text-body: 1rem
--text-small: 0.875rem
```

### Spacing & Layout
```css
--container-max: 1280px
--section-py: clamp(4rem, 8vw, 8rem)
--card-radius: 12px
--btn-radius: 8px
```

### Design Mood
Топъл, органичен минимализъм — като листването на луксозно мебелно списание. Кремави фонове, дървесни акценти, много white space, снимките дишат. Усещане: "семейна занаятчийска традиция + модерен дизайн".

---

## 📁 ФАЙЛОВА СТРУКТУРА

```
dom-expert-mebel/
├── app/
│   ├── layout.tsx                    ← Root layout с nav + footer
│   ├── page.tsx                      ← Homepage
│   ├── за-нас/
│   │   └── page.tsx
│   ├── услуги/
│   │   ├── page.tsx                  ← Всички услуги
│   │   ├── кухни-по-поръчка/page.tsx
│   │   ├── гардероби-по-поръчка/page.tsx
│   │   ├── спални-по-поръчка/page.tsx
│   │   ├── дневни-по-поръчка/page.tsx
│   │   ├── офис-мебели/page.tsx
│   │   └── монтаж/page.tsx
│   ├── проекти/
│   │   ├── page.tsx                  ← Всички проекти (портфолио)
│   │   └── [slug]/page.tsx           ← Единичен проект
│   ├── каталог/
│   │   ├── page.tsx                  ← Готови мебели (catalog)
│   │   └── [slug]/page.tsx           ← Единичен продукт
│   ├── блог/
│   │   ├── page.tsx                  ← Всички статии
│   │   └── [slug]/page.tsx           ← Единична статия (MDX)
│   ├── контакти/
│   │   └── page.tsx
│   ├── благоевград/
│   │   └── page.tsx                  ← Local SEO landing page
│   ├── софия/
│   │   └── page.tsx                  ← Local SEO landing page
│   ├── дупница/
│   │   └── page.tsx
│   └── сандански/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── ProjectsGallery.tsx
│   │   ├── CatalogPreview.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTABar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ContactForm.tsx
│   │   ├── QuoteForm.tsx             ← Форма за запитване/оферта
│   │   └── ImageGallery.tsx
│   └── seo/
│       ├── LocalBusinessSchema.tsx
│       ├── FAQSchema.tsx
│       └── BreadcrumbSchema.tsx
├── data/
│   ├── services.json
│   ├── projects.json
│   ├── products.json                 ← Каталог (готови мебели)
│   ├── testimonials.json
│   ├── locations.json
│   └── faq.json
├── content/
│   └── blog/
│       ├── как-да-изберем-кухня-по-поръчка.mdx
│       ├── гардероб-по-поръчка-или-готов.mdx
│       ├── цени-мебели-по-поръчка-българия.mdx
│       ├── мебели-малък-апартамент.mdx
│       └── детска-стая-по-поръчка.mdx
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── products/
│   │   └── team/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt
└── lib/
    ├── mdx.ts                        ← MDX parser за блог
    ├── formHandler.ts                ← Form submit (mailto: сега, Resend по-късно)
    └── utils.ts
```

---

## 📄 СТРАНИЦИ — ДЕТАЙЛНИ СПЕЦИФИКАЦИИ

---

### 1. HOMEPAGE (`/`)

**SEO:**
```
Title: Мебели по поръчка Благоевград и София | Dom Expert Мебел
Meta: Семейна фирма за мебели по поръчка. Кухни, гардероби, спални, офис мебели.
      Безплатна консултация и 3D проект. Работим в Благоевград, София и региона.
H1: Мебели по поръчка за домове с характер
Canonical: https://domexpertmebel.com/
```

**JSON-LD Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Dom Expert Мебел",
  "description": "Семейна фирма за мебели по поръчка в Благоевград и София",
  "url": "https://domexpertmebel.com",
  "telephone": "+359876081199",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Благоевград",
    "addressCountry": "BG"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "areaServed": ["Благоевград", "София", "Дупница", "Сандански", "Кресна"]
}
```

**Секции (в ред):**

#### Hero Section
- Full-width, 100vh на desktop / 80vh mobile
- Ляво: H1 + subtitle + 2 CTA бутона ("Изпрати запитване" — solid walnut, "Виж проекти" — outline)
- Дясно: красива снимка на модерна кухня с дървесни тонове (rounded corners, леко припокриване с текста)
- Subtle grain texture overlay върху целия hero
- Scroll-triggered fade-in с stagger animation

#### Нашите услуги
- H2: "Нашите услуги"
- 6 карти в grid 3x2 (desktop) / 2x3 (tablet) / 1x6 (mobile)
- Всяка карта: SVG икона (линейна, walnut цвят) + заглавие + hover lift effect
- Услуги: Кухни по поръчка, Гардероби, Спални, Дневни, Офис мебели, Монтаж
- Всяка карта е линк към съответната услуга страница

#### За нас (split section)
- H2: "Проектираме, изработваме и монтираме"
- Ляво: текст — "Създаваме мебели по поръчка, съобразени с вашия стил, пространство и начин на живот."
- 3 feature pills: ✓ Висококачествени материали / ✓ Индивидуален дизайн / ✓ Прецизна изработка
- Дясно: снимка на занаятчия/ръце при работа (warm, close-up)
- Фон: леко тъмен cream раздел за визуален контраст

#### Нашият процес
- H2: "Нашият процес"
- 4 стъпки с номерация (gold circles): 1. Консултация → 2. Проектиране → 3. Изработка → 4. Монтаж
- Всяка стъпка: икона + заглавие + кратко описание
- Connecting line между стъпките на desktop
- Scroll-triggered reveal animation (left to right)

#### Реализирани проекти
- H2: "Реализирани проекти" + "Виж всички проекти →" линк
- 4 карти в grid: снимка + overlay при hover с проект описание
- Всяка карта: заглавие на проекта + град (напр. "Кухня с остров / София")
- Lazy loading на снимките

#### Онлайн каталог (Preview)
- H2: "Онлайн магазин" + Badge "Скоро" (или без badge ако каталогът е готов)
- 4 продукта в grid: снимка + wishlist икона + заглавие + цена
- "Виж всички продукти →" линк
- Subtle "coming soon" overlay ако магазинът не е активен

#### Отзиви
- H2: "Какво казват нашите клиенти"
- 3 отзива в grid: голям quote symbol + текст + звезди + име
- Cream фон, elegant typography

#### CTA Bar (sticky bottom на mobile, fixed section на desktop)
- Тъмен walnut/charcoal фон
- Ляво: 📞 Обадете се ни / 0876 081 199 / Пон–Пет 09:00–18:00
- Дясно: Бутон "Заявка за консултация →" + "🛡️ Безплатна оценка и оферта"

#### Footer
- Logo + кратко описание
- Навигационни линкове в колони: Услуги / Компания / Локации
- Социални мрежи: Facebook, Instagram, YouTube, Pinterest
- Copyright + Privacy Policy линк

---

### 2. УСЛУГИ СТРАНИЦА — шаблон (прилага се за всички 6)

Пример за `/услуги/кухни-по-поръчка/`:

```
Title: Кухни по поръчка Благоевград | Dom Expert Мебел
Meta: Изработка на кухни по поръчка в Благоевград и София. ПДЧ, МДФ, гланц.
      3D проект безплатно. Монтаж included. Тел: 0876 081 199
H1: Кухни по поръчка в Благоевград — индивидуален проект и монтаж
```

**Структура:**
- Hero с breadcrumb + H1 + subtitle
- Какво включва услугата (bullets)
- Gallery с реализирани проекти от тази категория (4-6 снимки)
- Процес (съкратен — 3 стъпки)
- Материали (ПДЧ, МДФ, гланц, постформинг — с кратки обяснения)
- FAQ секция (минимум 4 въпроса — Schema markup!)
- CTA форма за запитване: Вашето Име / Телефон / Имейл / Град / Какви мебели търсите (textarea) / Бутон "Изпрати запитване"

**FAQ за кухни:**
- Q: Колко струва кухня по поръчка? A: Цените варират според...
- Q: Колко време отнема изработката? A: Стандартен срок е 4-6 седмици...
- Q: Правите ли 3D проект преди изработката? A: Да, всеки проект...
- Q: Работите ли в цялата страна? A: Работим основно в...

---

### 3. ПРОЕКТИ (`/проекти/`)

```
Title: Реализирани проекти — Мебели по поръчка | Dom Expert Мебел
Meta: Разгледайте нашето портфолио от реализирани проекти на мебели по поръчка
      в Благоевград, София и региона. Кухни, гардероби, спални.
H1: Реализирани проекти
```

**Филтри:** All / Кухни / Гардероби / Спални / Дневни / Офис
**Grid:** 3 колони desktop / 2 tablet / 1 mobile
**Всяка карта:** Снимка + hover overlay (заглавие + категория + град) + линк към детайл

**Единичен проект (`/проекти/[slug]`):**
- Hero image (full width)
- Детайли: Категория / Град / Материали / Срок
- Image gallery (lightbox)
- Описание на проекта
- Свързани проекти (3 карти)
- CTA за запитване

---

### 4. КАТАЛОГ (`/каталог/`)

```
Title: Каталог мебели | Готови мебели на склад | Dom Expert Мебел
Meta: Разгледайте нашия каталог от готови мебели на склад в Благоевград.
      Дивани, маси, столове, матраци с бърза доставка.
H1: Каталог — Готови мебели
```

**Структура:**
- Sidebar филтри: Категория / Ценови диапазон / Наличност
- Product grid: снимка + заглавие + цена + "Виж детайли" бутон
- Wishlist (localStorage)
- Пагинация

**Единичен продукт (`/каталог/[slug]`):**
- Image gallery
- Заглавие + цена + наличност badge
- Описание + характеристики (таблица)
- Форма за запитване/поръчка (НЕ пълна количка — само "Искам оферта за този продукт")
- Свързани продукти

**ВАЖНО:** Структурата на данните трябва да поддържа в бъдеще:
- `inStock: boolean`
- `price: number`
- `comparePrice?: number` (за промоции)
- `sku: string`
- `category: string`
Така когато добавим Stripe/ePay — минималните промени в кода.

---

### 5. БЛОГ (`/блог/`)

```
Title: Блог за мебели и интериор | Dom Expert Мебел
Meta: Полезни съвети за избор на мебели по поръчка, интериорен дизайн
      и обзавеждане на дома. Статии от Dom Expert Мебел.
H1: Блог — Съвети и вдъхновение
```

**Структура:**
- Featured post (голяма карта) + останалите в grid
- Категории: Кухни / Гардероби / Спални / Съвети / Тенденции
- Search (client-side, по заглавие и теги)

**MDX Blog Post шаблон:**
```mdx
---
title: "Как да изберем кухня по поръчка — 7 въпроса преди поръчката"
description: "Преди да поръчате кухня по поръчка, задайте си тези 7 въпроса..."
date: "2025-06-01"
category: "Кухни"
author: "Екипът на Dom Expert"
image: "/images/blog/kuhnya-po-poruchka.jpg"
tags: ["кухня", "по поръчка", "съвети"]
---

## Съдържание
...
```

**Единична статия (`/блог/[slug]`):**
- Breadcrumb
- Заглавие + автор + дата + четене в минути
- Featured image
- MDX content с красива типография
- Table of contents (sticky sidebar на desktop)
- Related posts (3 карти)
- CTA за консултация в края

---

### 6. ЗА НАС (`/за-нас/`)

```
Title: За нас — Семейна фирма Dom Expert Мебел | Благоевград
Meta: Dom Expert Мебел е семейна фирма с дългогодишен опит в изработката
      на мебели по поръчка в Благоевград и София.
H1: Семейна фирма с душа в работата
```

**Секции:**
- Hero с кратка история
- Нашата история (narrative section с timeline)
- Нашият екип (снимки + имена + роли)
- Нашите ценности (3-4 cards: Качество / Честност / Индивидуален подход / Гаранция)
- Производствена база (снимки на работилницата)
- Сертификати и партньори (ако има)
- Testimonials
- CTA

---

### 7. КОНТАКТИ (`/контакти/`)

```
Title: Контакти | Dom Expert Мебел — Благоевград и София
Meta: Свържете се с Dom Expert Мебел за безплатна консултация и оферта.
      Тел: 0876 081 199 | office@domexpertmebel.com
H1: Свържете се с нас
```

**Структура:**
- Контактна форма (Resend за изпращане): Ime / Telefon / Email / Grad / Sydyrjanie
- Контактна информация: телефон + email + адрес
- Работно време
- Google Maps embed (iframe)
- FAQ (бързи отговори)

---

### 8. ЛОКАЛНИ LANDING PAGES

#### `/благоевград/` — Главна (и `/sofia/`, `/dupnica/`, `/sandanski/`)

```
Title: Мебели по поръчка Благоевград | Dom Expert Мебел
Meta: Мебели по поръчка в Благоевград. Кухни, гардероби, спални. Семейна фирма
      с конкурентни цени. Безплатна консултация. Обадете се: 0876 081 199
H1: Мебели по поръчка в Благоевград — семейна фирма с конкурентни цени
```

**Структура:**
- H1 с локация
- Описание с местни референции
- Услуги (кратко)
- Реализирани проекти от локацията
- FAQ за локацията
- LocalBusiness Schema с точен адрес
- CTA форма

**LocalBusiness Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Dom Expert Мебел — Благоевград",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[АДРЕС]",
    "addressLocality": "Благоевград",
    "postalCode": "2700",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.0135,
    "longitude": 23.0944
  },
  "telephone": "+359876081199",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }]
}
```

---

## 📊 DATA ФАЙЛОВЕ (JSON)

### `data/services.json`
```json
[
  {
    "id": "kuhni",
    "slug": "кухни-по-поръчка",
    "title": "Кухни по поръчка",
    "shortDescription": "Модерни и класически кухни, изработени по вашия проект",
    "icon": "ChefHat",
    "image": "/images/services/kuhnya.jpg",
    "features": ["ПДЧ, МДФ, гланц", "Безплатен 3D проект", "Монтаж included"],
    "faq": [...]
  },
  ...
]
```

### `data/projects.json`
```json
[
  {
    "id": "1",
    "slug": "kuhnya-s-ostrov-sofia",
    "title": "Кухня с остров",
    "category": "kuhni",
    "city": "София",
    "description": "...",
    "materials": "МДФ гланц, плот гранит",
    "duration": "5 седмици",
    "images": ["/images/projects/sofia-kuhnya-1.jpg", "..."],
    "featured": true
  }
]
```

### `data/products.json`
```json
[
  {
    "id": "1",
    "slug": "trapezen-stol-natural",
    "title": "Трапезен стол Natural",
    "category": "stolove",
    "price": 189,
    "comparePrice": null,
    "inStock": true,
    "sku": "DEM-ST-001",
    "description": "...",
    "features": ["Масивен бук", "Дамаска клас А", "Гаранция 2 г."],
    "images": ["/images/products/stol-natural-1.jpg"]
  }
]
```

---

## 🔍 SEO ФАЙЛОВЕ

### `public/robots.txt`
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://domexpertmebel.com/sitemap.xml
```

### `public/llms.txt`
```
# Dom Expert Мебел

> Семейна фирма за мебели по поръчка в Благоевград и София, България.
  Изработваме кухни, гардероби, спални, дневни и офис мебели по индивидуален проект.

## Услуги
- [Кухни по поръчка](https://domexpertmebel.com/услуги/кухни-по-поръчка/)
- [Гардероби по поръчка](https://domexpertmebel.com/услуги/гардероби-по-поръчка/)
- [Спални по поръчка](https://domexpertmebel.com/услуги/спални-по-поръчка/)
- [Офис мебели](https://domexpertmebel.com/услуги/офис-мебели/)

## Каталог
- [Готови мебели](https://domexpertmebel.com/каталог/)

## Контакти
- [Контактна форма](https://domexpertmebel.com/контакти/)
- Телефон: +359 876 081 199

## Локации
Благоевград, София, Дупница, Сандански, Кресна, Банско

## За нас
Dom Expert Мебел е семейна фирма с дългогодишен опит. Предлагаме конкурентни цени,
3D проектиране и пълен монтаж. Работим с висококачествени материали от водещи
производители (Egger, Blum, Hafele).
```

### `app/sitemap.ts` (динамичен, Next.js)
Генерира автоматично всички URL-и включително динамичните проекти, продукти и блог постове.

---

## ⚡ PERFORMANCE ИЗИСКВАНИЯ

- Lighthouse score: 90+ за всички категории
- LCP < 2.5s
- CLS < 0.1
- Images: WebP формат + blur placeholder + lazy loading
- Fonts: `display: swap` + preconnect
- Critical CSS inline
- JS bundle < 200KB (gzipped)

---

## 📱 RESPONSIVE BREAKPOINTS

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Wide desktop */
```

Дизайнът е **mobile-first**. Hamburger меню на < 1024px.

---

## 🔧 ФУНКЦИОНАЛНОСТИ

### Форма за запитване (QuoteForm)
- Полета: Ime / Telefon / Email / Grad (select) / Usluga (select) / Sydyrjanie
- Валидация: react-hook-form + zod
- Submit → `mailto:office@domexpertmebel.com` (HTML mailto fallback)
  - Генерира предпопълнен имейл с всички полета
  - Коментар в кода: `// TODO: Replace mailto with Resend API — see lib/formHandler.ts`
  - `formHandler.ts` съдържа готова Resend функция, само закоментирана
- Success/Error states с анимации
- Honeypot field срещу спам

### Image Gallery (Lightbox)
- При клик на снимка → fullscreen lightbox
- Swipe gesture на mobile
- Keyboard navigation (ESC, стрелки)

### Wishlist (Каталог)
- localStorage based
- Heart icon toggle на всяка карта
- Wishlist page или sidebar

### Cookie Banner
- GDPR compliant
- Само "Приемам" — без сложни категории (за началото)

---

## 🚀 DEPLOYMENT

```bash
# Build command
npm run build

# Output directory
out/

# За Vercel: автоматично
# За Apache: копирай /out/ в /var/www/html/
```

---

## 📝 PLACEHOLDER ДАННИ (за да работи от старта)

Попълни с реални данни след генерирането:
- `[ТЕЛЕФОН]` → реалния телефон на DEM
- `[АДРЕС БЛАГОЕВГРАД]` → реалния адрес
- `[ИМЕЙЛ]` → реалния имейл (и в mailto: линка на формата)
- Снимки → замени Unsplash URLs с реални снимки на проекти когато са готови

За placeholder images използвай директно тези Unsplash URL-и (без да ги сваляш):

```
HERO:
https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80
(модерна кухня с дървесни тонове и остров)

УСЛУГИ — Кухни:
https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80

УСЛУГИ — Гардероби:
https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80

УСЛУГИ — Спални:
https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80

УСЛУГИ — Дневни:
https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80

УСЛУГИ — Офис мебели:
https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80

ЗА НАС (занаятчия/ръце):
https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80

ПРОЕКТ 1 — Кухня с остров / София:
https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80

ПРОЕКТ 2 — Гардеробна система / Пловдив:
https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80

ПРОЕКТ 3 — Дневна по поръчка / Варна:
https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80

ПРОЕКТ 4 — Спалня с тапицирано легло / Бургас:
https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80

КАТАЛОГ — Трапезен стол:
https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80

КАТАЛОГ — Холна маса:
https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80

КАТАЛОГ — Диван:
https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80

КАТАЛОГ — ТВ шкаф:
https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80

БЛОГ — featured image:
https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80

ЕКИП / За нас:
https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80

ПРОИЗВОДСТВЕНА БАЗА:
https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80
```

**ВАЖНО за images в Next.js:**
```js
// next.config.ts — добави domains
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' }
  ]
}
```

---

## ✅ ФИНАЛЕН CHECKLIST (Codex да провери преди да завърши)

- [ ] Всяка страница има уникален title + meta description на БГ
- [ ] H1 присъства на всяка страница и съдържа главния keyword
- [ ] JSON-LD Schema на homepage + всички услуги + контакти
- [ ] FAQPage Schema на всички услуги страници
- [ ] robots.txt + llms.txt + sitemap.ts генерира правилно
- [ ] Всички вътрешни линкове работят
- [ ] Форма за запитване работи (mailto fallback) и има TODO коментар за Resend
- [ ] Мобилно меню работи на всички breakpoints
- [ ] Images имат alt text с keywords
- [ ] Open Graph tags (og:title, og:description, og:image) на всяка страница
- [ ] Canonical tags на всяка страница
- [ ] 404 страница (app/not-found.tsx)
- [ ] Loading states на форми и динамично съдържание
- [ ] Smooth scroll поведение
- [ ] Skip to main content (accessibility)
