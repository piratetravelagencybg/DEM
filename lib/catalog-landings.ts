/**
 * Curated, dependency-free catalog landing definitions.
 *
 * This module is safe to import from Edge middleware: it performs no I/O and
 * intentionally does not import the product feed or server-only modules.
 */

export const CATALOG_LANDING_BASE_PATH = '/готови-мебели/' as const
export const CATALOG_SITE_ORIGIN = 'https://domexpertmebel.com' as const
export const CATALOG_PAGE_SEGMENT = 'страница' as const

export type CatalogLandingKind =
  | 'hub'
  | 'room'
  | 'product-type'
  | 'attribute'
  | 'collection-hub'
  | 'collection'

export type CatalogLandingTier = 0 | 1 | 2
export type CatalogLandingChangeFrequency = 'weekly' | 'monthly'

export type CatalogRoomFilterId =
  | 'bedroom'
  | 'children'
  | 'living'
  | 'hallway'

export type CatalogProductTypeFilterId =
  | 'wardrobes'
  | 'beds'
  | 'bedroom-sets'
  | 'nightstands'
  | 'dressers'
  | 'shelving'
  | 'tv-units'
  | 'tables'
  | 'hallway-furniture'

export type CatalogCollectionSlug =
  | 'line'
  | 'sentinel'
  | 'modern'
  | 'linero'
  | 'kiara'
  | 'zanardi'
  | 'brooklyn'
  | 'integra'
  | 'bronx'
  | 'arson'

export type CatalogSubtypeFilterId =
  | 'tv-cabinet'
  | 'living-wall-unit'
  | 'bed-with-storage'
  | 'bed-size-160x80'
  | 'bed-size-140x70'
  | 'bed-size-160x200'
  | 'coffee-table'

export type CatalogFilterDescriptor =
  | Readonly<{ kind: 'all' }>
  | Readonly<{ kind: 'room'; room: CatalogRoomFilterId }>
  | Readonly<{ kind: 'type'; productType: CatalogProductTypeFilterId }>
  | Readonly<{
      kind: 'room-type'
      room: CatalogRoomFilterId
      productType: CatalogProductTypeFilterId
    }>
  | Readonly<{
      kind: 'tag'
      room?: CatalogRoomFilterId
      productType?: CatalogProductTypeFilterId
      subtype?: CatalogSubtypeFilterId
    }>
  | Readonly<{ kind: 'collections' }>
  | Readonly<{
      kind: 'collection'
      collection: CatalogCollectionSlug
      aliases: readonly string[]
    }>

export type CatalogLandingConfig = Readonly<{
  slug: string
  path: `/${string}/`
  kind: CatalogLandingKind
  tier: CatalogLandingTier
  title: string
  h1: string
  metaDescription: string
  intro: string
  filter: CatalogFilterDescriptor
  priority: number
  changeFrequency: CatalogLandingChangeFrequency
}>

export const CATALOG_LANDINGS = [
  {
    slug: '',
    path: '/готови-мебели/',
    kind: 'hub',
    tier: 0,
    title: 'Готови мебели с цени и наличности | Dom Expert Мебел',
    h1: 'Готови мебели с цени и наличности',
    metaDescription: 'Разгледайте готови мебели от каталога на MBX с актуални цени, снимки и наличности. Филтрирайте по стая, вид, размер и колекция.',
    intro: 'Сравнете готови модели за спалня, детска стая, дневна и антре на едно място. Проверете цената, вариантите и актуалната наличност преди избор.',
    filter: { kind: 'all' },
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    slug: 'мебели-за-спалня',
    path: '/готови-мебели/мебели-за-спалня/',
    kind: 'room',
    tier: 1,
    title: 'Готови мебели за спалня | Dom Expert Мебел',
    h1: 'Готови мебели за спалня',
    metaDescription: 'Готови мебели за спалня с актуални цени и снимки: легла, гардероби, скринове, нощни шкафчета и спални комплекти.',
    intro: 'Обзаведете спалнята с готови модели, които лесно се комбинират по стил и функция. Разгледайте отделни мебели и завършени комплекти с ясни продуктови данни.',
    filter: { kind: 'room', room: 'bedroom' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'гардероби',
    path: '/готови-мебели/гардероби/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови гардероби с цени | Dom Expert Мебел',
    h1: 'Готови гардероби',
    metaDescription: 'Разгледайте готови гардероби с различни размери, врати и вътрешно разпределение. Вижте актуални цени, снимки и наличности.',
    intro: 'Сравнете готови гардероби за спалня, детска стая или антре. Продуктовите страници показват размери, варианти, цена и информация за наличността.',
    filter: { kind: 'type', productType: 'wardrobes' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'легла',
    path: '/готови-мебели/легла/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови легла с цени и размери | Dom Expert Мебел',
    h1: 'Готови легла',
    metaDescription: 'Готови легла за спалня и детска стая с различни размери и конфигурации. Сравнете модели, цени, снимки и актуална наличност.',
    intro: 'Открийте готови легла за различни помещения и размери матраци. Сравнете конструкция, място за съхранение и подходящи допълващи мебели.',
    filter: { kind: 'type', productType: 'beds' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'детски-легла',
    path: '/готови-мебели/детски-легла/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови детски легла с цени | Dom Expert Мебел',
    h1: 'Готови детски легла',
    metaDescription: 'Готови детски легла в практични размери и конфигурации. Разгледайте снимки, актуални цени, варианти и информация за наличност.',
    intro: 'Изберете готово детско легло според свободното пространство и размера на матрака. Сред моделите има компактни решения и варианти с допълнително съхранение.',
    filter: { kind: 'room-type', room: 'children', productType: 'beds' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'спални-комплекти',
    path: '/готови-мебели/спални-комплекти/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови спални комплекти | Dom Expert Мебел',
    h1: 'Готови спални комплекти',
    metaDescription: 'Готови спални комплекти с легло, гардероб и допълващи мебели. Сравнете състав, цветове, актуални цени и наличности.',
    intro: 'Спалните комплекти събират основните мебели в единна серия и улесняват съчетаването на цветове и материали. Проверете какво включва всеки комплект.',
    filter: { kind: 'type', productType: 'bedroom-sets' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'скринове-и-ракли',
    path: '/готови-мебели/скринове-и-ракли/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови скринове и ракли | Dom Expert Мебел',
    h1: 'Готови скринове и ракли',
    metaDescription: 'Готови скринове, ракли и комоди за практично съхранение. Разгледайте размери, цветове, снимки, актуални цени и наличности.',
    intro: 'Скриновете и раклите добавят удобно място за дрехи и вещи без да заемат голяма площ. Сравнете ширина, брой чекмеджета и подходяща мебелна серия.',
    filter: { kind: 'type', productType: 'dressers' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'нощни-шкафчета',
    path: '/готови-мебели/нощни-шкафчета/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови нощни шкафчета | Dom Expert Мебел',
    h1: 'Готови нощни шкафчета',
    metaDescription: 'Готови нощни шкафчета за различни легла и спални серии. Сравнете размери, чекмеджета, цветове, актуални цени и наличности.',
    intro: 'Подберете нощно шкафче според височината на леглото и нуждата от съхранение. Моделите могат да се комбинират с легла, скринове и гардероби от същата серия.',
    filter: { kind: 'type', productType: 'nightstands' },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'тв-шкафове',
    path: '/готови-мебели/тв-шкафове/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови ТВ шкафове с цени | Dom Expert Мебел',
    h1: 'Готови ТВ шкафове',
    metaDescription: 'Готови ТВ шкафове и модули за дневната с различни размери и места за съхранение. Вижте снимки, цени и актуална наличност.',
    intro: 'Сравнете готови ТВ шкафове според ширината, конфигурацията и свободното място в дневната. Проверете детайлите и съвместимите модули от същата серия.',
    filter: {
      kind: 'tag',
      productType: 'tv-units',
      subtype: 'tv-cabinet',
    },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'секции-за-дневна',
    path: '/готови-мебели/секции-за-дневна/',
    kind: 'product-type',
    tier: 1,
    title: 'Готови секции за дневна | Dom Expert Мебел',
    h1: 'Готови секции за дневна',
    metaDescription: 'Готови секции за дневна с ТВ зона, шкафове, витрини и полици. Разгледайте конфигурации, снимки, актуални цени и наличности.',
    intro: 'Готовата секция обединява основните модули за дневната в съгласувана композиция. Сравнете размери и включени елементи спрямо свободната стена.',
    filter: {
      kind: 'tag',
      productType: 'tv-units',
      subtype: 'living-wall-unit',
    },
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    slug: 'мебели-за-детска-стая',
    path: '/готови-мебели/мебели-за-детска-стая/',
    kind: 'room',
    tier: 2,
    title: 'Готови мебели за детска стая | Dom Expert Мебел',
    h1: 'Готови мебели за детска стая',
    metaDescription: 'Готови мебели за детска стая: легла, гардероби, бюра, етажерки и комплекти. Сравнете размери, снимки, цени и наличности.',
    intro: 'Подредете детската стая с готови мебели за сън, учене и съхранение. Изберете модели спрямо възрастта, размера на помещението и нужната функционалност.',
    filter: { kind: 'room', room: 'children' },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'мебели-за-дневна',
    path: '/готови-мебели/мебели-за-дневна/',
    kind: 'room',
    tier: 2,
    title: 'Готови мебели за дневна | Dom Expert Мебел',
    h1: 'Готови мебели за дневна',
    metaDescription: 'Готови мебели за дневна: секции, ТВ шкафове, витрини, етажерки и маси. Разгледайте снимки, актуални цени и наличности.',
    intro: 'Комбинирайте готови мебели за телевизионната зона, съхранението и зоната за почивка. Сравнете отделни модули и серии за цялостна дневна.',
    filter: { kind: 'room', room: 'living' },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'етажерки-и-полици',
    path: '/готови-мебели/етажерки-и-полици/',
    kind: 'product-type',
    tier: 2,
    title: 'Готови етажерки и полици | Dom Expert Мебел',
    h1: 'Готови етажерки и полици',
    metaDescription: 'Готови етажерки, полици и стелажи за дневна, детска стая или офис. Сравнете размери, цветове, цени и актуална наличност.',
    intro: 'Етажерките и полиците използват свободните стени и добавят място за книги, декорация и ежедневни вещи. Проверете размерите и начина на комбиниране.',
    filter: { kind: 'type', productType: 'shelving' },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'легла-с-чекмеджета',
    path: '/готови-мебели/легла-с-чекмеджета/',
    kind: 'attribute',
    tier: 2,
    title: 'Готови легла с чекмеджета | Dom Expert Мебел',
    h1: 'Готови легла с чекмеджета',
    metaDescription: 'Готови легла с чекмеджета и практично място за съхранение. Разгледайте размери, конфигурации, актуални цени и наличности.',
    intro: 'Леглата с чекмеджета използват пространството под матрака за спално бельо, дрехи или играчки. Сравнете броя и разположението на чекмеджетата.',
    filter: {
      kind: 'tag',
      productType: 'beds',
      subtype: 'bed-with-storage',
    },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'детски-легла-160x80',
    path: '/готови-мебели/детски-легла-160x80/',
    kind: 'attribute',
    tier: 2,
    title: 'Детски легла 160x80 с цени | Dom Expert Мебел',
    h1: 'Готови детски легла 160x80',
    metaDescription: 'Готови детски легла 160x80 см с практични конфигурации и варианти за съхранение. Вижте снимки, цени и актуална наличност.',
    intro: 'Размерът 160x80 см е компактен избор за детска стая и оставя повече свободно място за игра. Проверете външните размери на всеки модел преди избор.',
    filter: {
      kind: 'tag',
      room: 'children',
      productType: 'beds',
      subtype: 'bed-size-160x80',
    },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'детски-легла-140x70',
    path: '/готови-мебели/детски-легла-140x70/',
    kind: 'attribute',
    tier: 2,
    title: 'Детски легла 140x70 с цени | Dom Expert Мебел',
    h1: 'Готови детски легла 140x70',
    metaDescription: 'Готови детски легла 140x70 см за компактни детски стаи. Сравнете модели, конфигурации, актуални цени и наличности.',
    intro: 'Детските легла 140x70 см са подходящи, когато компактният размер е водещ. Сверете размера на матрака и пълните външни размери в продуктовите данни.',
    filter: {
      kind: 'tag',
      room: 'children',
      productType: 'beds',
      subtype: 'bed-size-140x70',
    },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'легла-160x200',
    path: '/готови-мебели/легла-160x200/',
    kind: 'attribute',
    tier: 2,
    title: 'Готови легла 160x200 с цени | Dom Expert Мебел',
    h1: 'Готови легла 160x200',
    metaDescription: 'Готови двойни легла 160x200 см за спалнята. Разгледайте различни конструкции, снимки, актуални цени и наличности.',
    intro: 'Леглото 160x200 см предлага комфортен размер за двама и се вписва в много стандартни спални. Проверете рамката, основата и пълните външни размери.',
    filter: {
      kind: 'tag',
      productType: 'beds',
      subtype: 'bed-size-160x200',
    },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'холни-маси',
    path: '/готови-мебели/холни-маси/',
    kind: 'product-type',
    tier: 2,
    title: 'Готови холни маси с цени | Dom Expert Мебел',
    h1: 'Готови холни маси',
    metaDescription: 'Готови холни маси за дневната в различни размери, форми и цветове. Сравнете снимки, актуални цени и наличности.',
    intro: 'Изберете холна маса според зоната за сядане и свободното пространство около нея. Сравнете височина, форма и възможности за съхранение.',
    filter: {
      kind: 'tag',
      productType: 'tables',
      subtype: 'coffee-table',
    },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'мебели-за-антре',
    path: '/готови-мебели/мебели-за-антре/',
    kind: 'room',
    tier: 2,
    title: 'Готови мебели за антре | Dom Expert Мебел',
    h1: 'Готови мебели за антре',
    metaDescription: 'Готови мебели за антре: портманта, шкафове за обувки, закачалки, огледала и модули. Вижте актуални цени и наличности.',
    intro: 'Организирайте входното пространство с готови мебели за обувки, връхни дрехи и ежедневни принадлежности. Сравнете компактни модули и комбинирани портманта.',
    filter: { kind: 'room', room: 'hallway' },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'колекции',
    path: '/готови-мебели/колекции/',
    kind: 'collection-hub',
    tier: 1,
    title: 'Колекции готови мебели | Dom Expert Мебел',
    h1: 'Колекции готови мебели',
    metaDescription: 'Разгледайте колекции готови мебели с координирани цветове и модули за различни помещения. Сравнете елементи, цени и наличности.',
    intro: 'Колекциите улесняват съчетаването на няколко мебели в обща визия. Отворете избрана серия, за да сравните включените модули и продуктовите им данни.',
    filter: { kind: 'collections' },
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    slug: 'колекции/line',
    path: '/готови-мебели/колекции/line/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Line – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Line',
    metaDescription: 'Разгледайте готовите мебели от колекция Line. Сравнете наличните модули, размери, цветови варианти, актуални цени и наличности.',
    intro: 'Колекция Line включва съвместими мебели, които могат да се комбинират според помещението и нуждите. Проверете всеки модул поотделно преди избор.',
    filter: { kind: 'collection', collection: 'line', aliases: ['Line', 'Колекция Line'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/sentinel',
    path: '/готови-мебели/колекции/sentinel/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Sentinel – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Sentinel',
    metaDescription: 'Разгледайте готовите мебели от колекция Sentinel. Сравнете модули, размери, цветови варианти, актуални цени и наличности.',
    intro: 'Серия Sentinel позволява да подберете координирани мебели от една продуктова линия. Разгледайте размерите и предназначението на отделните модули.',
    filter: { kind: 'collection', collection: 'sentinel', aliases: ['Sentinel', 'Колекция Sentinel'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/modern',
    path: '/готови-мебели/колекции/modern/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Modern – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Modern',
    metaDescription: 'Разгледайте готовите мебели от колекция Modern. Сравнете наличните елементи, размери, варианти, актуални цени и наличности.',
    intro: 'Колекция Modern събира мебели с обща продуктова линия за по-лесно комбиниране. Проверете кои модули са подходящи за вашето помещение.',
    filter: { kind: 'collection', collection: 'modern', aliases: ['Modern', 'Колекция Modern'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/linero',
    path: '/готови-мебели/колекции/linero/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Linero – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Linero',
    metaDescription: 'Разгледайте готовите мебели от колекция Linero. Сравнете елементи, конфигурации, размери, актуални цени и наличности.',
    intro: 'Мебелите Linero могат да бъдат разглеждани като комплект или като отделни елементи от серията. Сверете състава и размерите на всеки модел.',
    filter: { kind: 'collection', collection: 'linero', aliases: ['Linero', 'Колекция Linero'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/kiara',
    path: '/готови-мебели/колекции/kiara/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Kiara – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Kiara',
    metaDescription: 'Разгледайте готовите мебели от колекция Kiara. Сравнете наличните модули, размери, цветове, актуални цени и наличности.',
    intro: 'Колекция Kiara предлага група съвместими мебели за последователно обзавеждане. Разгледайте продуктовите варианти и избирайте по размер и функция.',
    filter: { kind: 'collection', collection: 'kiara', aliases: ['Kiara', 'Колекция Kiara'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/zanardi',
    path: '/готови-мебели/колекции/zanardi/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Zanardi – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Zanardi',
    metaDescription: 'Разгледайте готовите мебели от колекция Zanardi. Сравнете комплекти и отделни модули, размери, актуални цени и наличности.',
    intro: 'Серия Zanardi включва мебели, които могат да се подбират като общо решение или поотделно. Проверете състава, размерите и наличните варианти.',
    filter: { kind: 'collection', collection: 'zanardi', aliases: ['Zanardi', 'Колекция Zanardi'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/brooklyn',
    path: '/готови-мебели/колекции/brooklyn/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Brooklyn – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Brooklyn',
    metaDescription: 'Разгледайте готовите мебели от колекция Brooklyn. Сравнете наличните елементи, размери, варианти, актуални цени и наличности.',
    intro: 'Колекция Brooklyn обединява съвместими елементи в една продуктова серия. Сравнете отделните мебели и планирайте комбинацията според помещението.',
    filter: { kind: 'collection', collection: 'brooklyn', aliases: ['Brooklyn', 'Колекция Brooklyn'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/integra',
    path: '/готови-мебели/колекции/integra/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Integra – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Integra',
    metaDescription: 'Разгледайте готовите мебели от колекция Integra. Сравнете модули, конфигурации, размери, актуални цени и наличности.',
    intro: 'Модулите Integra могат да се комбинират в последователно обзавеждане. Проверете функциите, размерите и продуктовите варианти на всеки елемент.',
    filter: { kind: 'collection', collection: 'integra', aliases: ['Integra', 'Колекция Integra'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/bronx',
    path: '/готови-мебели/колекции/bronx/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Bronx – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Bronx',
    metaDescription: 'Разгледайте готовите мебели от колекция Bronx. Сравнете различни модули, размери, актуални цени, снимки и наличности.',
    intro: 'Колекция Bronx включва множество модули за комбиниране в обща мебелна линия. Сравнете елементите според помещението и нужната функция.',
    filter: { kind: 'collection', collection: 'bronx', aliases: ['Bronx', 'Колекция Bronx'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    slug: 'колекции/arson',
    path: '/готови-мебели/колекции/arson/',
    kind: 'collection',
    tier: 2,
    title: 'Колекция Arson – готови мебели | Dom Expert Мебел',
    h1: 'Готови мебели от колекция Arson',
    metaDescription: 'Разгледайте готовите мебели от колекция Arson. Сравнете наличните модули, размери, варианти, актуални цени и наличности.',
    intro: 'Серия Arson предлага съвместими мебели, които могат да се разглеждат и избират поотделно. Проверете размерите и предназначението на всеки модул.',
    filter: { kind: 'collection', collection: 'arson', aliases: ['Arson', 'Колекция Arson'] },
    priority: 0.7,
    changeFrequency: 'monthly',
  },
] as const satisfies readonly CatalogLandingConfig[]

export type CatalogLanding = (typeof CATALOG_LANDINGS)[number]
export type CatalogLandingSlug = CatalogLanding['slug']

export const CATALOG_LANDING_BY_SLUG = Object.freeze(
  Object.fromEntries(CATALOG_LANDINGS.map((landing) => [landing.slug, landing])),
) as Readonly<Record<CatalogLandingSlug, CatalogLanding>>

export const CATALOG_LANDING_PARENT_SLUGS = {
  'мебели-за-спалня': '',
  'гардероби': '',
  'легла': '',
  'детски-легла': 'мебели-за-детска-стая',
  'спални-комплекти': 'мебели-за-спалня',
  'скринове-и-ракли': 'мебели-за-спалня',
  'нощни-шкафчета': 'мебели-за-спалня',
  'тв-шкафове': 'мебели-за-дневна',
  'секции-за-дневна': 'мебели-за-дневна',
  'мебели-за-детска-стая': '',
  'мебели-за-дневна': '',
  'етажерки-и-полици': '',
  'легла-с-чекмеджета': 'легла',
  'детски-легла-160x80': 'детски-легла',
  'детски-легла-140x70': 'детски-легла',
  'легла-160x200': 'легла',
  'холни-маси': 'мебели-за-дневна',
  'мебели-за-антре': '',
  'колекции': '',
  'колекции/line': 'колекции',
  'колекции/sentinel': 'колекции',
  'колекции/modern': 'колекции',
  'колекции/linero': 'колекции',
  'колекции/kiara': 'колекции',
  'колекции/zanardi': 'колекции',
  'колекции/brooklyn': 'колекции',
  'колекции/integra': 'колекции',
  'колекции/bronx': 'колекции',
  'колекции/arson': 'колекции',
} as const satisfies Readonly<Partial<Record<CatalogLandingSlug, CatalogLandingSlug>>>

export type ParsedCatalogLandingRoute = Readonly<{
  landing: CatalogLanding
  page: number
  pagePath: string
  canonicalUrl: string
}>

function requireCatalogLanding(
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
): CatalogLanding {
  if (typeof landingOrSlug !== 'string') return landingOrSlug

  const landing = CATALOG_LANDING_BY_SLUG[landingOrSlug]
  if (!landing) {
    throw new RangeError('Unknown catalog landing slug: ' + landingOrSlug)
  }
  return landing
}

function assertCatalogPage(page: number) {
  if (!Number.isSafeInteger(page) || page < 1) {
    throw new RangeError('Catalog page must be a positive safe integer.')
  }
}

export function resolveCatalogLandingBySlug(slug: string) {
  return CATALOG_LANDING_BY_SLUG[slug as CatalogLandingSlug]
}

export function resolveCatalogLandingParent(
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
): CatalogLanding | null {
  const landing = requireCatalogLanding(landingOrSlug)
  if (landing.slug === '') return null

  const parentSlug =
    CATALOG_LANDING_PARENT_SLUGS[
      landing.slug as keyof typeof CATALOG_LANDING_PARENT_SLUGS
    ] ?? ''

  return CATALOG_LANDING_BY_SLUG[parentSlug]
}

export function buildCatalogLandingPagePath(
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
  page = 1,
) {
  assertCatalogPage(page)
  const landing = requireCatalogLanding(landingOrSlug)
  if (page === 1) return landing.path
  return landing.path + CATALOG_PAGE_SEGMENT + '/' + String(page) + '/'
}

export function buildCatalogLandingPageUrl(
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
  page = 1,
  origin = CATALOG_SITE_ORIGIN,
) {
  const normalizedOrigin = origin.replace(/\/+$/, '')
  return normalizedOrigin + buildCatalogLandingPagePath(landingOrSlug, page)
}

/**
 * Pagination uses a self-referencing canonical. Page one omits the pagination
 * segment, while later pages keep their own page URL.
 */
export function buildCatalogLandingCanonicalUrl(
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
  page = 1,
  origin = CATALOG_SITE_ORIGIN,
) {
  return buildCatalogLandingPageUrl(landingOrSlug, page, origin)
}

/**
 * A pagination token is canonical only from page 2 onward. Page one is always
 * represented by the landing path without a pagination segment.
 */
export function parseCatalogPaginationToken(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null

  const page = Number(value)
  if (!Number.isSafeInteger(page) || page < 2) return null
  return page
}

function createParsedCatalogLandingRoute(
  landing: CatalogLanding,
  page: number,
): ParsedCatalogLandingRoute {
  const pagePath = buildCatalogLandingPagePath(landing, page)
  return {
    landing,
    page,
    pagePath,
    canonicalUrl: buildCatalogLandingCanonicalUrl(landing, page),
  }
}

/**
 * Produces ASCII-only route segments for the internal Next.js route. Public
 * URLs remain Bulgarian; this avoids Windows route matching problems during
 * local QA without changing canonicals or user-facing links.
 */
export function buildCatalogLandingInternalSegments(
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
  page = 1,
): string[] {
  assertCatalogPage(page)
  const landing = requireCatalogLanding(landingOrSlug)
  if (landing.slug === '' && page === 1) return []

  const landingIndex = CATALOG_LANDINGS.indexOf(landing)
  if (landingIndex < 0) throw new RangeError('Catalog landing is not registered.')

  const segments = ['l', String(landingIndex)]
  if (page > 1) segments.push('p', String(page))
  return segments
}

export function buildCatalogLandingInternalPath(
  routePrefix: string,
  landingOrSlug: CatalogLanding | CatalogLandingSlug,
  page = 1,
) {
  const prefix = '/' + routePrefix.replace(/^\/+|\/+$/g, '')
  const segments = buildCatalogLandingInternalSegments(landingOrSlug, page)
  return segments.length ? `${prefix}/${segments.join('/')}/` : `${prefix}/`
}

export function parseCatalogLandingInternalSegments(
  segments: readonly string[] = [],
): ParsedCatalogLandingRoute | null {
  if (segments.length === 0) {
    return createParsedCatalogLandingRoute(CATALOG_LANDINGS[0], 1)
  }
  if (segments.length !== 2 && segments.length !== 4) return null
  if (segments[0] !== 'l' || !/^\d+$/.test(segments[1])) return null

  const landingIndex = Number(segments[1])
  const landing = CATALOG_LANDINGS[landingIndex]
  if (!landing) return null

  let page = 1
  if (segments.length === 4) {
    if (segments[2] !== 'p') return null
    const parsedPage = parseCatalogPaginationToken(segments[3])
    if (parsedPage === null) return null
    page = parsedPage
  }

  return createParsedCatalogLandingRoute(landing, page)
}

/**
 * Strict parser for the future Bulgarian ready-furniture catch-all route.
 * Unknown slugs, extra facets, duplicate pagination and page-one segments are
 * invalid rather than silently normalized.
 */
export function parseCatalogLandingSegments(
  segments: readonly string[] = [],
): ParsedCatalogLandingRoute | null {
  if (segments.some((segment) => !segment || segment.includes('/'))) return null

  let landingSegments = segments
  let page = 1
  const paginationIndex = segments.indexOf(CATALOG_PAGE_SEGMENT)

  if (paginationIndex >= 0) {
    if (
      paginationIndex !== segments.length - 2
      || segments.lastIndexOf(CATALOG_PAGE_SEGMENT) !== paginationIndex
    ) {
      return null
    }

    const parsedPage = parseCatalogPaginationToken(segments[paginationIndex + 1])
    if (parsedPage === null) return null

    page = parsedPage
    landingSegments = segments.slice(0, paginationIndex)
  }

  const slug = landingSegments.join('/')
  const landing = resolveCatalogLandingBySlug(slug)
  if (!landing) return null

  return createParsedCatalogLandingRoute(landing, page)
}

/**
 * Finds the longest curated prefix for navigation, breadcrumbs or an empty
 * state. This helper must not be used as a redirect allow-list: arbitrary
 * mixed facets are intentionally handled only by the exact legacy map below.
 */
export function resolveNearestCatalogLandingParent(
  segments: readonly string[] = [],
): CatalogLanding {
  const exact = parseCatalogLandingSegments(segments)
  if (exact) return exact.landing

  for (let length = segments.length; length > 0; length -= 1) {
    const candidate = resolveCatalogLandingBySlug(segments.slice(0, length).join('/'))
    if (candidate) return candidate
  }

  return CATALOG_LANDING_BY_SLUG['']
}

export type LegacyCatalogRoomId =
  | 'bedroom'
  | 'children'
  | 'living'
  | 'office'
  | 'hallway'
  | 'collections'
  | 'bathroom'
  | 'other'

export type LegacyCatalogTypeId =
  | CatalogProductTypeFilterId
  | 'cabinets'
  | 'desks'
  | 'mirrors'
  | 'accessories'
  | 'other'

const LEGACY_CATALOG_ROOM_IDS: readonly LegacyCatalogRoomId[] = [
  'bedroom',
  'children',
  'living',
  'office',
  'hallway',
  'collections',
  'bathroom',
  'other',
]

const LEGACY_CATALOG_TYPE_IDS: readonly LegacyCatalogTypeId[] = [
  'wardrobes',
  'beds',
  'bedroom-sets',
  'nightstands',
  'dressers',
  'cabinets',
  'shelving',
  'tv-units',
  'desks',
  'tables',
  'hallway-furniture',
  'mirrors',
  'accessories',
  'other',
]

function isLegacyCatalogRoomId(value: string): value is LegacyCatalogRoomId {
  return (LEGACY_CATALOG_ROOM_IDS as readonly string[]).includes(value)
}

function isLegacyCatalogTypeId(value: string): value is LegacyCatalogTypeId {
  return (LEGACY_CATALOG_TYPE_IDS as readonly string[]).includes(value)
}

/**
 * Exact allow-list for old room/type states. Missing combinations deliberately
 * have no redirect, even when either facet has a broader curated parent.
 */
export const LEGACY_CATALOG_FACET_REDIRECTS = {
  '': '',
  'room:bedroom': 'мебели-за-спалня',
  'room:children': 'мебели-за-детска-стая',
  'room:living': 'мебели-за-дневна',
  'room:hallway': 'мебели-за-антре',
  'room:collections': 'колекции',
  'type:wardrobes': 'гардероби',
  'type:beds': 'легла',
  'type:bedroom-sets': 'спални-комплекти',
  'type:nightstands': 'нощни-шкафчета',
  'type:dressers': 'скринове-и-ракли',
  'type:shelving': 'етажерки-и-полици',
  'type:tv-units': 'тв-шкафове',
  'type:hallway-furniture': 'мебели-за-антре',
  'room:bedroom|type:wardrobes': 'гардероби',
  'room:bedroom|type:beds': 'легла',
  'room:bedroom|type:bedroom-sets': 'спални-комплекти',
  'room:bedroom|type:nightstands': 'нощни-шкафчета',
  'room:bedroom|type:dressers': 'скринове-и-ракли',
  'room:children|type:beds': 'детски-легла',
  'room:living|type:tv-units': 'секции-за-дневна',
  'room:living|type:tables': 'холни-маси',
  'room:hallway|type:hallway-furniture': 'мебели-за-антре',
} as const satisfies Readonly<Record<string, CatalogLandingSlug>>

type ParsedLegacyCatalogFacets = Readonly<{
  room?: LegacyCatalogRoomId
  type?: LegacyCatalogTypeId
  page: number
}>

function parseLegacyCatalogFacets(
  segments: readonly string[],
): ParsedLegacyCatalogFacets | null {
  if (segments.length % 2 !== 0) return null

  let room: LegacyCatalogRoomId | undefined
  let type: LegacyCatalogTypeId | undefined
  let page = 1

  for (let index = 0; index < segments.length; index += 2) {
    const key = segments[index]
    const value = segments[index + 1]
    if (!value) return null

    if (key === 'стая' || key === 'room') {
      if (room || !isLegacyCatalogRoomId(value)) return null
      room = value
      continue
    }

    if (key === 'вид' || key === 'type') {
      if (type || !isLegacyCatalogTypeId(value)) return null
      type = value
      continue
    }

    if (key === 'страница' || key === 'page') {
      if (page !== 1 || index !== segments.length - 2) return null
      const parsedPage = parseCatalogPaginationToken(value)
      if (parsedPage === null) return null
      page = parsedPage
      continue
    }

    return null
  }

  return { room, type, page }
}

function buildLegacyFacetKey(
  room?: LegacyCatalogRoomId,
  type?: LegacyCatalogTypeId,
) {
  const parts: string[] = []
  if (room) parts.push('room:' + room)
  if (type) parts.push('type:' + type)
  return parts.join('|')
}

/**
 * Resolves only an exact approved legacy room, type or room+type state.
 * Sorts, unknown facets and unapproved mixtures return null and must not
 * redirect to a broader landing.
 */
export function resolveLegacyCatalogFacetRedirect(
  segments: readonly string[],
): string | null {
  const parsed = parseLegacyCatalogFacets(segments)
  if (!parsed) return null

  const facetKey = buildLegacyFacetKey(parsed.room, parsed.type)
  const landingSlug =
    LEGACY_CATALOG_FACET_REDIRECTS[
      facetKey as keyof typeof LEGACY_CATALOG_FACET_REDIRECTS
    ]

  if (landingSlug === undefined) return null
  return buildCatalogLandingPagePath(landingSlug, parsed.page)
}

/**
 * Pathname adapter for middleware. It accepts the current public Bulgarian
 * facet URLs and the old internal English aliases, but no query, hash, sort
 * or arbitrary facet combinations.
 */
export function resolveLegacyCatalogPathRedirect(pathname: string): string | null {
  if (!pathname || pathname.includes('?') || pathname.includes('#')) return null

  let decodedPathname: string
  try {
    decodedPathname = decodeURIComponent(pathname)
  } catch {
    return null
  }

  let suffix: string
  if (decodedPathname === '/каталог' || decodedPathname === '/каталог/') {
    suffix = ''
  } else if (decodedPathname.startsWith('/каталог/')) {
    suffix = decodedPathname.slice('/каталог/'.length)
  } else if (
    decodedPathname === '/catalog/browse'
    || decodedPathname === '/catalog/browse/'
  ) {
    suffix = ''
  } else if (decodedPathname.startsWith('/catalog/browse/')) {
    suffix = decodedPathname.slice('/catalog/browse/'.length)
  } else {
    return null
  }

  const trimmedSuffix = suffix.replace(/^\/+|\/+$/g, '')
  if (!trimmedSuffix) return resolveLegacyCatalogFacetRedirect([])

  const segments = trimmedSuffix.split('/')
  if (segments.some((segment) => !segment)) return null
  return resolveLegacyCatalogFacetRedirect(segments)
}
