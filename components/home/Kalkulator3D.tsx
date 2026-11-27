import Image from 'next/image'
import Link from 'next/link'

// Секция на началната страница: 3D калкулаторът за мебели по поръчка (/3d-калкулатор/).
const HREF = '/3d-калкулатор/'

const furniture = ['Кухни', 'Гардероби', 'Гардеробни', 'Спални', 'ТВ стени', 'Антрета', 'Домашен офис']

const points = [
  'По 6 модела за всяка мебел и 7 стила – от модерен до класически',
  'Реални материали: МДФ, супермат, декори EGGER, кварц и мрамор',
  'Ориентировъчна цена веднага, а проектът стига директно до нас',
]

export default function Kalkulator3D() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }} aria-labelledby="kalkulator-3d-title">
      <div className="container-main grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <span className="eyebrow-pill">Ново</span>
          <h2
            id="kalkulator-3d-title"
            className="mt-2 font-display font-bold leading-[1.05] heading-gradient"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)' }}
          >
            3D калкулатор за мебели по поръчка
          </h2>
          <p className="mt-5 max-w-[46ch] font-body leading-relaxed text-warm-gray" style={{ fontSize: '1.02rem' }}>
            Изберете мебел, модел, стил и цветове и я вижте в 3D още сега. Калкулаторът показва ориентировъчна цена, а с едно натискане изпращате проекта на нас.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Мебели в калкулатора">
            {furniture.map((item) => (
              <li
                key={item}
                className="rounded-full px-3 py-1.5 font-body text-[0.82rem] font-medium"
                style={{ background: 'rgba(139,111,71,0.1)', color: '#6B5236' }}
              >
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-7 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-body text-[0.6rem] font-bold text-white"
                  style={{ background: '#8B6F47' }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="font-body text-[0.93rem] leading-snug text-charcoal">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link href={HREF} className="btn-primary w-full justify-center whitespace-nowrap sm:w-auto">
              Отворете 3D калкулатора →
            </Link>
            <span className="font-body text-[0.85rem] text-warm-gray">Работи на телефон и компютър, без регистрация.</span>
          </div>
        </div>

        <Link
          href={HREF}
          className="group relative block overflow-hidden rounded-[20px]"
          style={{ boxShadow: '0 24px 60px rgba(60,45,30,0.16)' }}
          aria-label="Отворете 3D калкулатора за мебели по поръчка"
        >
          <Image
            src="/images/konfigurator/3d-kalkulator-kuhnya.webp"
            alt="3D калкулатор за мебели по поръчка: кухня с остров, избор на стил и цветова гама"
            width={1100}
            height={764}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1023px) calc(100vw - 40px), 55vw"
          />
          <span
            className="absolute bottom-4 right-4 rounded-full px-4 py-2 font-body text-[0.85rem] font-semibold text-white"
            style={{ background: '#8B6F47', boxShadow: '0 6px 18px rgba(139,111,71,0.35)' }}
          >
            Опитайте в 3D →
          </span>
        </Link>
      </div>
    </section>
  )
}
