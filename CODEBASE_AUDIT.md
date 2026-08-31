# Одит на codebase и текущото SEO състояние

## Обхват и контролна точка

- Дата на снимката: 31 август 2026 г.
- Публичен сайт: `https://domexpertmebel.com/`
- Branch: `agent/fix-catalog-performance`
- Начален commit: `6ef9bf0e85af56ec3b872140bf015469f42c4120`
- Режим: първа фаза — само audit/inventory; без промяна на публичното поведение.
- Production deploy в тази фаза: **не е извършван**.
- Работната директория съдържа по-ранни незавършени промени по формата за запитвания. Те не са част от audit артефактите и трябва да останат извън първия audit-only commit.

Одитът следва `instrukcii_kam_codex_domexpertmebel.docx` и използва
`seo_odit_domexpertmebel_bg.docx` като исторически вход. Числото 3515 от
предишния одит не е прието на доверие, а е проверено наново.

## Методика и артефакти

1. Прегледани са routing, metadata, schema, sitemap, robots, каталогът, формата,
   изображенията, analytics и build/deploy конфигурацията.
2. На 31 август 2026 г. е изтеглен текущият production sitemap и е обходен всеки
   от неговите URL адреси с локално стартирания audit инструмент, с максимум
   четири паралелни заявки.
3. И Next.js development, и production router-ът под текущия Windows host
   върнаха фалшиви 404 отговори за percent-encoded кирилски routes, докато
   същите routes във Vercel върнаха 200. Поради тази възпроизводима разлика
   окончателният inventory е заснет от реалния production, а не от подвеждащия
   Windows резултат. За staging QA трябва да се използва Linux/WSL или Vercel
   Preview.
4. CSV inventory: `URL_INVENTORY.csv`.
5. Възпроизводим crawler: `scripts/generate-seo-inventory.mjs`.
6. Непроменени baseline snapshots:
   - `seo-baseline/sitemap.xml`;
   - `seo-baseline/robots.txt`;
   - `seo-baseline/pages.json` — status, response time, HTML bytes, title,
     description, H1, canonical, robots, schema types/validity/hash и sitemap
     стойности за всяка страница.

`URL_INVENTORY.csv` е UTF-8 с BOM за коректно отваряне в Excel и има точно
изисканите колони:

```text
url,type,status,title,meta_description,h1,canonical,robots,word_count,image_count,images_without_alt,internal_inlinks,internal_outlinks,indexation_recommendation,notes
```

`indexation_recommendation` е техническа евристика, а не разрешение за
автоматична промяна на indexation.

## Задължителен codebase inventory

| Проверка | Реално установен резултат |
|---|---|
| CMS/framework/theme | Next.js 14.2.5 App Router, React 18, TypeScript 5 и Tailwind CSS 3.4. Няма CMS, WordPress, WooCommerce или готов theme. UI е custom component code. |
| SEO implementation | Custom Next.js Metadata API чрез `lib/seo.ts`, route metadata и custom JSON-LD React компоненти. Няма SEO plugin. |
| URL routing | Българските публични routes са в `app/`. `middleware.ts` прави rewrite/redirect между публични `/каталог/` и `/готови-мебели/` routes и вътрешни ASCII routes. `trailingSlash: true`; canonical URL адресите и sitemap използват завършваща наклонена черта. |
| Sitemap/robots | `app/sitemap.ts` генерира sitemap от static routes, 6 услуги, 6 проекта, 30 curated catalog routes, 3449 MBX SKU и 13 blog статии. `public/robots.txt` разрешава crawl и сочи към canonical sitemap. |
| Forms — production | Публичният commit използва client-side Zod и honeypot, но няма server endpoint. Submit отваря `mailto:office@domexpertmebel.com` и веднага показва success, без доказана доставка. Това не е надеждна работеща форма. |
| Forms — pending workspace | Има незавършен локален кандидат с `POST /api/inquiries/`, server validation, consent, honeypot, minimum-fill-time, request ID, origin/body checks, in-memory rate limit и Resend/Supabase delivery. Той не е commit-нат или deploy-нат, няма production secrets и няма end-to-end acceptance test. In-memory rate limit не е споделен между serverless instances. |
| E-commerce | Няма WooCommerce/cart/checkout/account. Това е каталог/lead-generation flow върху локален MBX JSON import. Данните съдържат 3449 активни SKU, групирани в 555 логически модела. Цена и наличност идват от import-а; няма онлайн плащане. |
| Product/category/filter routing | Публични продуктови URL адреси са `/каталог/{slug}/`; curated landings са под `/готови-мебели/`. Query/filter/sort комбинациите не са в sitemap и получават `noindex, follow` чрез metadata и/или `X-Robots-Tag`. |
| Images | Локални WebP/PNG assets плюс директни MBX изображения от `www.mbx.bg`. Next Image optimization е глобално изключена с `images.unoptimized: true`; затова `sizes` props не създават реален responsive `srcset`. Hero е eager/high priority; повечето below-fold изображения са lazy. `SafeProductImage` има client-side fallback и разпознава MBX placeholder с HTTP 200. |
| Analytics | Има Google Search Console verification token и verification HTML файл. Не е намерена GA4/GTM имплементация, measurement ID или custom event tracking. GBP е само видима връзка, не analytics интеграция. |
| Build/deploy | Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run import:mbx`. Hosting е Vercel, а Git remote е GitHub `piratetravelagencybg/DEM`. Няма `.vercel/project.json` в repo. Няма test script. |

## Текущ URL и metadata baseline

### Състав на sitemap

| Тип | URL адреси |
|---|---:|
| Начална | 1 |
| За нас | 1 |
| Услуги — index + detail | 7 |
| Проекти — index + detail | 7 |
| Блог — index + статии | 14 |
| Готови мебели — index + curated landings | 30 |
| Продукти | 3449 |
| Контакти | 1 |
| Политика за поверителност | 1 |
| Локални страници | 4 |
| **Общо** | **3515** |

### Резултат от пълния production crawl

- 3515/3515 sitemap URL адреса върнаха HTTP 200.
- 0 crawl timeout/error.
- 0 липсващи title, meta description, H1 или canonical.
- Всички 3515 страници имат точно един H1.
- 0 title над 60 символа.
- 0 meta descriptions под 120 или над 160 символа.
- 0 HTML изображения без `alt`.
- 0 sitemap страници без входяща вътрешна връзка в server-rendered HTML.
- 4 страници имат само една входяща връзка; 13 имат най-много две.
- 6 дублирани H1 групи за общо 12 продуктови URL адреса. Title и description
  остават уникални.
- 3514 URL адреса са indexable със self-referencing canonical.
- `/политика-за-поверителност/` е `noindex, follow`, но е включена в sitemap.
  Това нарушава правилото sitemap да съдържа само canonical indexable URL
  адреси.
- Product visible word count е 269–650 думи, median 530. Значителна част от
  текста е template-generated; числото не доказва уникална полезност или
  качество на съдържанието.

Пълният списък на дублираните H1 и всички URL-level стойности е в
`URL_INVENTORY.csv`. Crawl-ът потвърждава sitemap URL адресите и inlinks между
тях; не трябва да се тълкува като окончателна проверка на всеки външен asset,
всеки query URL или всички client-side links.

## Host, HTTPS, redirects и canonical

Canonical host в кода и metadata е `https://domexpertmebel.com`.

| Входен URL | Наблюдавана верига |
|---|---|
| `http://domexpertmebel.com/` | 308 → `https://domexpertmebel.com/` → 200 |
| `https://domexpertmebel.com/` | 200 |
| `http://www.domexpertmebel.com/` | 308 → `https://www.domexpertmebel.com/` → 308 → `https://domexpertmebel.com/` → 200 |
| `https://www.domexpertmebel.com/` | 308 → `https://domexpertmebel.com/` → 200 |

Само `http://www` има два redirect hop-а. `next.config.mjs` управлява
www → non-www, а platform layer управлява HTTP → HTTPS. Ако се оптимизира,
целта е единичен permanent redirect без промяна на canonical host или URL
структура.

## Metadata и structured data

- `lib/seo.ts` нормализира title до максимум 55 и description до максимум 155
  символа и създава canonical, robots, Open Graph и Twitter metadata.
- Извадка от всички 66 non-product страници и 120 равномерно разпределени
  продукта не намери непълни Open Graph tags.
- Всички намерени JSON-LD блокове са синтактично валидни.
- `/услуги/`, `/блог/` и privacy страницата нямат JSON-LD. Липсата при privacy
  не е проблем; index страниците трябва да се оценят според реалното им
  съдържание, не механично.
- 3448 от 3449 продуктови URL адреса имат Product schema. Един продукт с цена
  `0` има само BreadcrumbList, което правилно избягва измислен Offer:
  `/каталог/ms-moderato-m18-tapitsirano-leglo-160-h-200-sm-11176/`.
- 3165 продуктови страници включват ProductGroup за variant relationship, а
  283 са единични Product записи.
- LocalBusiness schema съдържа непотвърдено `priceRange: "$$"`. То не трябва да
  остава или да се променя без реална бизнес основа.
- Service schema няма ImageObject. Project schema използва CreativeWork, но
  изображенията и фактите за проектите изискват отделна проверка.
- Blog template има Article/Breadcrumb/ImageObject, дати, изображения, CTA и
  related content, но моделът няма author/reviewer полета, изискани от
  заданието.

## Каталог, indexation и вътрешни връзки

`node scripts/verify-catalog-architecture.mjs` минава 102 проверки:

- 3449 активни SKU;
- 555 логически модела;
- 272 групирани модела и 283 единични;
- всички SKU са достижими през catalog/variant links;
- 30 curated ready-furniture routes имат непразни datasets.

Текущият sitemap индексира всички 3449 SKU, включително variants. Това е
значително повече от 555 логически модела, но не е основание за автоматичен
bulk `noindex` или canonical промяна. Преди решение са нужни Google Search
Console данни по URL/query, duplicate analysis и бизнес стойност на
вариантите.

Service intent и ready-furniture intent са разделени концептуално:

- service pages: „по поръчка“, индивидуален проект, оглед, изработка;
- catalog landings: готови мебели, модели, цена, наличност.

Това разграничение трябва да се запази при следващите промени, за да не се
създава канибализация.

## Изображения и performance baseline

### Source assets

- 79 WebP файла: общо 6.75 MB.
- 40 PNG файла: общо 76.52 MB.
- Един SVG placeholder.
- Runtime references към съдържателни локални изображения са WebP; PNG
  дубликатите в `public/images` не са намерени в страниците, с изключение на
  favicon/app icons.

### Production image извадка

Проверени са всички 66 non-product URL адреса, 120 равномерно разпределени
продукта и 180 равномерно разпределени от намерените 1201 image URL адреса:

- 0 HTTP/image content-type failures;
- 0 изображения над 100 KB в извадката;
- 0 изображения с response над 2 секунди;
- 16/180 MBX URL адреса връщат 256×256 placeholder PNG от 6078 bytes с HTTP
  200. Това обяснява „незаредени“/невалидни продуктови снимки, които обикновен
  broken-link checker не вижда.

Client fallback логиката ограничава видимия проблем след hydration, но HTML
първоначално сочи към upstream placeholder. Нужни са пълен MBX asset inventory
и стабилен fallback/cache pipeline преди да се твърди, че проблемът е решен.

### Response baseline, не Core Web Vitals

При пълния crawl:

- median HTML response: 283 ms;
- p75: 319 ms;
- p95: 452 ms;
- максимум: 2635 ms;
- median HTML payload: 113,619 bytes;
- p95: 119,937 bytes;
- максимум: 357,474 bytes.

Най-бавни и най-големи са първите ready-furniture landings:

- `/готови-мебели/мебели-за-спалня/` — 2635 ms, 343,693 bytes;
- `/готови-мебели/гардероби/` — 2629 ms, 341,145 bytes;
- `/готови-мебели/легла/` — 2415 ms, 341,427 bytes.

Това са единични network/server response измервания, не Lighthouse или field
CWV. Не може да се твърди, че LCP/CLS/INP са добри или лоши без отделен
PageSpeed/Lighthouse baseline.

Потвърдено е, че production `<img>` markup няма `srcset`, въпреки наличните
`sizes` props. Причината е глобалното `images.unoptimized: true`. Това намалява
надеждността на Vercel optimizer след предишни 402 отговори, но изпраща един и
същ source размер към всички viewport-и и оставя MBX като runtime dependency.

## Форми и lead measurement

Текущата production форма е критичен бизнес риск:

- няма backend delivery;
- разчита на локален mail client;
- използва стария `office@domexpertmebel.com`;
- показва success веднага след `mailto`, дори когато съобщение не е изпратено;
- няма consent checkbox или server-side spam protection.

Собственикът изрично потвърди `domexpertmebel@gmail.com` като реален email.
Публичната contact страница към датата на crawl-а все още съдържа
`office@domexpertmebel.com`. Локалната незавършена форма е насочена към Gmail,
но не трябва да се смесва с audit commit и не може да се deploy-не без
Resend/Supabase configuration и успешен тест от форма до inbox/database.

Не е намерена GA4/GTM конфигурация. Следователно няма надеждно измерване на
`generate_lead`, phone/email/maps clicks или project inquiries. GSC
verification не замества analytics.

## Business facts и provenance

Потвърдено директно от собственика в текущия проект:

- реален contact email: `domexpertmebel@gmail.com`;
- 3D проектът е платен и стойността му се приспада при последваща поръчка;
- Google Business Profile съществува и URL адресът е предоставен;
- към момента няма Google reviews;
- продуктовият каталог не се очаква да се променя често.

Следните твърдения се срещат в visible copy и/или schema, но нямат достатъчно
ясна source-of-truth документация в repo и не трябва да се променят,
разширяват или използват за ново съдържание без потвърждение:

- „безплатен оглед“ и точният му географски обхват;
- „10+ години опит“ и брой реализирани проекти;
- 2 години гаранция;
- типичен срок 4–6 седмици;
- включен монтаж, почистване и конкретни partner услуги;
- всички обслужвани градове;
- работно време и съвпадението му с GBP;
- материали, марки, градове и срокове на шестте описани проекта;
- `priceRange: "$$"`.

Шестте project pages правилно означават изображенията като примерни
визуализации, а не като реални снимки от обекта. Това обозначение трябва да
остане, докато собственикът не предостави реални снимки и съгласие за
публикуване.

Инструкционният документ съдържа стария `office@domexpertmebel.com`, докато
собственикът по-късно потвърди Gmail. Преди production промяна трябва да се
сверят сайтът, schema и Google Business Profile за еднакъв NAP.

## Accessibility и HTML

Положителни наблюдения:

- `lang="bg"`;
- skip link;
- по един H1 на всяка sitemap страница;
- alt текстове на всички намерени HTML изображения;
- aria-label за основни icon-only controls;
- видими error/success states в незавършената нова форма.

Рискове:

- root layout вече съдържа `<main>`, но blog и project detail templates влагат
  още един `<main>`, което създава nested main landmarks;
- production формата няма надеждно свързани `label`/`id` за всички полета;
- `maximumScale: 1` и `userScalable: false` забраняват pinch zoom и са
  accessibility риск, въпреки че са добавени по предишно изрично желание;
- локалният Windows router не е годна staging среда за кирилските routes.

## Build и QA baseline

| Проверка | Резултат |
|---|---|
| `node --check scripts/generate-seo-inventory.mjs` | PASS |
| `node scripts/verify-catalog-architecture.mjs` | PASS — 102 проверки |
| Пълен production sitemap crawl | PASS — 3515/3515 HTTP 200, 0 errors |
| JSON-LD syntax в crawl | PASS — 0 parse errors |
| `npm run lint` | BLOCKED — няма ESLint config и командата отваря interactive setup |
| Automated tests | Няма test script и няма test/spec файлове |
| `npm run build` | `.next/BUILD_ID` и manifests са създадени, но Windows процесът не приключи в 300-секундния timeout; това не се отчита като чист CI pass |
| Lighthouse/PageSpeed | Не е изпълняван в audit-only фазата |
| Rich Results Test | Не е изпълняван; изисква отделна staging/changed-URL проверка |
| Production deploy | НЕ |

## Приоритетни находки преди промени

### P0 — бизнес и достоверност

1. Production формата не гарантира доставка на запитване и показва фалшив
   success state.
2. Visible copy/schema съдържат бизнес твърдения без централизирана,
   потвърдена source of truth.
3. MBX връща валиден HTTP 200 placeholder за част от продуктовите изображения;
   проблемът не се засича като broken image.

### P1 — безопасни технически кандидати след потвърждение

1. Премахване на noindex privacy URL от sitemap, без промяна на самия URL.
2. Единичен `http://www` redirect към canonical host.
3. Responsive image pipeline без връщане към платения/грешащ Vercel optimizer.
4. Nested main landmarks и production form label association.
5. Schema cleanup: непотвърден `priceRange`, ImageObject където има реално
   подходящо изображение, без fake ratings/offers.
6. Конфигурируем GA4/GTM и consent-safe events без PII.

### P2 — изисква данни и SEO решение

1. Indexation стратегия за 3449 variants спрямо 555 модела.
2. Уникално локално съдържание и доказателства за Благоевград; review strategy
   след реално събиране на мнения.
3. Реални снимки и проверими case-study данни за шестте проекта.
4. Author/reviewer модел и редакторски workflow за блога.
5. Content map срещу канибализация между service, local, blog и ready-furniture
   intent.

## Забранени автоматични действия след този одит

Без отделно потвърждение не трябва да се правят:

- промяна на URL адреси или изтриване на страници;
- bulk canonical/noindex на продукти/variants;
- промяна на NAP, гаранции, срокове, цени или други бизнес твърдения;
- публикуване на нови project facts/reviews/real-photo claims;
- production deploy.
