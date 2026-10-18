# SEO ъпгрейд на domexpertmebel.com — промени, проверки, TODO

Период: 18.10.2026 · Базов commit: `a0a5811` · Всичко е на `main` и е live.

## 1. Промени

### По commit

| Commit | Фаза | Какво |
|---|---|---|
| `465c0da` | 2 | Единен `/sitemap.xml` с реален `<lastmod>`; Organization + WebSite; BlogPosting; BreadcrumbList на /услуги/ и /блог/; meta текстове; llms.txt; responsive снимки (640w/1024w); H1 на началната без анимация (LCP) |
| `1c23cad` | 3.1 | /софия/ пренаписана; нова /софия/кухни-по-поръчка/; линкове от началната към /благоевград/ и /софия/; Cormorant само 600/700 |
| `97c7f87` | 3.2 | Уникални Дупница, Сандански, Петрич (общ шаблон); поправени „безплатен оглед“ / „безплатна консултация“ навсякъде |
| `0ba63e7` | портфолио | 3D проекти (салон за красота, 3 кухни), поле `status`; обновен /3d-проекти/kuhnya-domexpert-v17/; нова страница за салони; по-силна офис страница; 307 от /услуги/обзавеждане-на-обекти/ |
| `7cfc048` | 3.3–3.6 | Кухни и спални (услуги); 4 каталожни категории с увод, FAQ и линк към „по поръчка“; салонът в Благоевград; IndexNow ключ |
| `35638bc` | 3.6 | **Отделен commit:** индексиране на 132 представителни продуктови URL-а (връщане: `git revert 35638bc`) |
| `a2c9a94` | 3.7 | Блог: МДФ/ПДЧ (таблица, FAQ), разпределение на гардероб (размери), линкове услуга + град във всяка статия, оправени вложени `<main>` |
| `85d476e` | 3.8 | Вътрешни линкове: всяка услуга → всички градове, всеки град → всички услуги, началната → 5 града и 9 услуги |
| (този commit) | 4 | „Бързи факти“ на / и /благоевград/; директен отговор в началото на всички услуги; robots.txt и llms*.txt без BOM; този документ |

### По файлове (основните)

**Нови**
- `app/sitemap.xml/route.ts`, `lib/sitemap-entries.ts` — единен sitemap; `app/sitemap.ts` изтрит
- `app/софия/кухни-по-поръчка/page.tsx`
- `app/услуги/обзавеждане-на-обекти/салони-за-красота/page.tsx`
- `components/seo/SiteSchema.tsx` — Organization + WebSite
- `components/ui/CityLandingTemplate.tsx` — шаблон за Дупница, Сандански, Петрич
- `components/ui/ProjectCards.tsx`, `CityLinks.tsx`, `ServiceLinks.tsx`, `QuickFacts.tsx`
- `lib/projects.ts` — проекти със `status` (realized / 3d), линкове, alt
- `lib/catalog-landing-content.ts` — увод и FAQ за каталожните категории
- `lib/indexable-products.ts`, `data/indexable-products.json`, `data/catalog-gsc-impressions.json` — правило за индексиране на продукти
- `lib/image-loader.ts`, `data/responsive-images.json`, `public/images/responsive/` — responsive снимки
- `data/content-lastmod.json` — дати за `<lastmod>`
- `public/portfolio/3d-proekt-*` — 3D визуализации (WebP, без EXIF/GPS)
- `public/eeab574bf8574d15a6dc8e4f8cb396a8.txt` — IndexNow ключ
- Скриптове: `scripts/seo-check.mjs`, `link-report.mjs`, `generate-content-lastmod.mjs`, `generate-responsive-images.mjs`, `generate-indexable-products.mjs`

**Променени**
- Всички градски страници, всички страници на услуги, /проекти/, /проекти/[slug]/, /3d-проекти/, /3d-проекти/kuhnya-domexpert-v17/, /блог/[slug]/, каталожните landing страници, началната
- `lib/seo.ts` (лимит 60 знака за title + build warning), `lib/mbx.ts` (canonical/robots на продукти), `lib/site-config.ts`, `components/seo/*`
- `data/projects.json`, `data/services.json`, `data/blog-posts.ts`, `data/faq.json`
- `middleware.ts` (временен 307), `next.config.mjs` (custom image loader)
- `public/llms.txt`, `public/llms-full.txt`, `public/robots.txt`

### Команди за поддръжка

| Кога | Команда |
|---|---|
| Преди commit със съдържание | `npm run sitemap:lastmod` |
| След нова/сменена снимка | `npm run images:responsive` |
| След импорт на MBX фийда | `npm run catalog:indexable` и `npm run test:catalog` |
| Проверка | `npm run seo:check -- https://domexpertmebel.com` |
| Вътрешни линкове | `npm run seo:links -- https://domexpertmebel.com` |

## 2. Резултати от проверката

**seo-check срещу live (213 URL-а от sitemap-а: 81 страници + 132 продукта)** — 213/213 OK:
HTTP 200; точно 1 canonical, абсолютен, без www и равен на URL-а; точно 1 H1; title ≤ 60 и description 70–160 знака, уникални в сайта; валиден JSON-LD с `name` на всеки елемент в BreadcrumbList; без вътрешни линкове към www/http; 0 счупени вътрешни линкове; 0 линка през redirect; 0 изображения без alt.

**Уникалност на градските страници** (5-думни поредици, които не се срещат на друга градска страница; само съдържанието в `<main>`):

| Страница | Преди | След |
|---|---|---|
| /благоевград/ | 50% | 74% |
| /софия/ | 53% | 77% |
| /дупница/ | 17% | 68% |
| /сандански/ | 25% | 67% |
| /петрич/ | 38% | 68% |

Остатъкът до 100% са общите блокове (Google отзиви, форма за запитване).

**Вътрешни линкове** — всяка услуга линква към всички 5 града, всеки град към всички 9 услуги; /софия/ получава линкове от 20 страници; няма общи анкори.

**Lighthouse mobile (live, след всички промени)**

| Страница | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 96 (беше 82) | 2.8 s (беше 4.2 s) | 0 | 20 ms |
| /софия/ | 98 | 2.1 s | 0 | 0 ms |
| /услуги/кухни-по-поръчка/ | 98 | 2.5 s | 0 | 0 ms |

Реалният (observed) LCP на началната е под 0.5 s; симулираните 2.8 s идват от шрифта на заглавието. INP се вижда само в полеви данни (CrUX/GSC).

**Тестове:** `test:catalog` (102 проверки), `test:seo:source` — минават. Build — без грешки и без SEO предупреждения.

## 3. TODO — за попълване

| # | Какво | Къде |
|---|---|---|
| 1 | Реализиран проект от **Петрич** (за галерията и FAQ) | `data/projects.json`, после `projectSlug` в `app/петрич/page.tsx` |
| 2 | Обичаен **срок за оглед в Дупница** | `app/дупница/page.tsx` (FAQ „Кога можете да дойдете на оглед?“) |
| 3 | Още **проекти от София** — описан е само 1 от 30+ | `data/projects.json` (галерията на /софия/ се попълва сама) |
| 4 | **3D визуализации на разпределение на гардероб** от реален проект | `data/blog-posts.ts`, статията за разпределение на гардероб |
| 5 | Кухните (мрамор и вино, с остров, тясна) са маркирани като **3D проекти**. Ако някоя е изработена → `status: "realized"` | `data/projects.json` |
| 6 | **Хъб „Обзавеждане на обекти“**, когато има проекти в поне 2 категории; тогава махни временния 307 | `middleware.ts` (`OBJECTS_HUB_PATH`) |
| 7 | Страница за **кабинети** и **заведения/магазини** — само при реални проекти | — |
| 8 | Препоръка: обнови **Next.js 14.2.5 → последната 14.2.x** (поправени уязвимости, вкл. в middleware). Локално 14.2.5 връща 404 за статичните страници с кирилица при `next start`; на Vercel работят | `package.json` |

## 4. Ръчни стъпки след deploy

1. **GSC → Sitemaps:** подай наново `https://domexpertmebel.com/sitemap.xml`. Старите `sitemap-core.xml` и `sitemap-catalog.xml` могат да останат — съдържат подмножества на същите URL-и.
2. **GSC → URL Inspection → Request indexing:** `/`, `/софия/`, `/софия/кухни-по-поръчка/`, `/благоевград/`, `/дупница/`, `/петрич/`, `/услуги/обзавеждане-на-обекти/салони-за-красота/`.
3. **Rich Results Test:** `/` (Organization, LocalBusiness), една градска страница (Service, FAQ, Breadcrumb), една статия (`/блог/mdf-ili-pdch-za-kuhnya/` — BlogPosting, FAQ) и един индексиран продукт (напр. `/каталог/spalen-komplekt-federico-dab-brendi-kastelo-mdf-cheren-glants-1217/` — ProductGroup).
4. **IndexNow (Bing, Yandex):** ключът е публикуван на `/eeab574bf8574d15a6dc8e4f8cb396a8.txt`; изпрати новите и променените URL-и.
5. **Google Business Profile:** категория „Производител на мебели“; добави услугите (кухни, гардероби, спални, дневни, офис мебели, мебели за салони, 3D проект, интериорен дизайн); градовете в зоната на обслужване (Благоевград, София, Дупница, Сандански, Петрич); качи 3D визуализациите като снимки с надпис „3D визуализация“.
6. **След 2–4 седмици:** провери в GSC дали /петрич/ вече е със собствен canonical (беше `747live.bet`) и дали /дупница/ е обходена.
