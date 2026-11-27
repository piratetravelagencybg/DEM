import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BedDouble, CookingPot, DoorClosed, DoorOpen, Laptop, Shirt, Tv } from 'lucide-react'

// Секция на началната страница: 3D калкулаторът за мебели по поръчка (/3d-калкулатор/).
// Всяка карта отваря калкулатора направо на своята мебел (#t=…).
const HREF = '/3d-калкулатор/'

const furniture = [
  { label: 'Кухни', type: 'kitchen', Icon: CookingPot },
  { label: 'Гардероби', type: 'wardrobe', Icon: Shirt },
  { label: 'Гардеробни', type: 'walkin', Icon: DoorOpen },
  { label: 'Спални', type: 'bedroom', Icon: BedDouble },
  { label: 'ТВ стени', type: 'tv', Icon: Tv },
  { label: 'Антрета', type: 'entry', Icon: DoorClosed },
  { label: 'Домашен офис', type: 'office', Icon: Laptop },
]

const steps = ['Модел', 'Стил', 'Цветове', 'Цена']

export default function Kalkulator3D() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #1C1713 0%, #261F19 55%, #33281F 100%)' }}
      aria-labelledby="kalkulator-3d-title"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,160,99,0.16) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="container-main relative grid items-center gap-12 pb-12 pt-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14 lg:pb-16 lg:pt-24">
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em]"
            style={{ background: 'rgba(201,160,99,0.14)', color: '#D9B57E', border: '1px solid rgba(201,160,99,0.3)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#D9B57E' }} aria-hidden="true" />
            Ново · безплатно
          </span>
          <h2
            id="kalkulator-3d-title"
            className="mt-5 font-display font-bold leading-[1.02]"
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4rem)', color: '#F6EFE4' }}
          >
            3D калкулатор
            <br />
            <span style={{ color: '#D9B57E' }}>за мебели по поръчка</span>
          </h2>
          <p className="mt-6 max-w-[44ch] font-body leading-relaxed" style={{ fontSize: '1.05rem', color: 'rgba(246,239,228,0.72)' }}>
            Изберете модел, стил и цветове и вижте мебелта си в 3D. Ориентировъчната цена се смята веднага, а проектът стига до нас с едно натискане.
          </p>

          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Как работи">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full font-body text-[0.78rem] font-bold"
                  style={{ background: index === steps.length - 1 ? '#C9A063' : 'rgba(246,239,228,0.1)', color: index === steps.length - 1 ? '#1C1713' : '#F6EFE4' }}
                >
                  {index + 1}
                </span>
                <span className="font-body text-[0.92rem] font-medium" style={{ color: '#F6EFE4' }}>{step}</span>
                {index < steps.length - 1 && <span className="mx-1 h-px w-5" style={{ background: 'rgba(246,239,228,0.25)' }} aria-hidden="true" />}
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Link
              href={HREF}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 font-body text-[1rem] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: '#C9A063', color: '#1C1713', boxShadow: '0 12px 32px rgba(201,160,99,0.3)' }}
            >
              Отворете 3D калкулатора
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <span className="font-body text-[0.85rem]" style={{ color: 'rgba(246,239,228,0.55)' }}>
              Без регистрация · на телефон и компютър
            </span>
          </div>
        </div>

        <div className="relative pb-6 sm:pb-10 lg:pb-0">
          <Link
            href={HREF}
            className="group block overflow-hidden rounded-[16px]"
            style={{ background: '#0F0C0A', border: '1px solid rgba(246,239,228,0.1)', boxShadow: '0 40px 90px rgba(0,0,0,0.45)' }}
            aria-label="Отворете 3D калкулатора за мебели по поръчка"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E0675B' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E4B84F' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#5FB55F' }} />
              <span className="ml-3 truncate rounded-full px-3 py-0.5 font-body text-[0.7rem]" style={{ background: 'rgba(246,239,228,0.08)', color: 'rgba(246,239,228,0.6)' }}>
                domexpertmebel.com/3d-калкулатор
              </span>
            </div>
            <Image
              src="/images/konfigurator/3d-kalkulator-desktop.webp"
              alt="3D калкулатор за мебели по поръчка на компютър: кухня с остров, избор на модел и ориентировъчна цена"
              width={1800}
              height={1125}
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
              sizes="(max-width: 1023px) calc(100vw - 40px), 60vw"
            />
          </Link>
          <Link
            href={`${HREF}#t=bedroom`}
            className="absolute -bottom-2 left-3 hidden w-[27%] max-w-[190px] overflow-hidden rounded-[26px] sm:block lg:-bottom-10 lg:-left-10"
            style={{ border: '6px solid #0F0C0A', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
            aria-label="3D калкулаторът на телефон: спалня"
          >
            <Image
              src="/images/konfigurator/3d-kalkulator-telefon.webp"
              alt="3D калкулатор за мебели на телефон: спалня с шкафове над леглото"
              width={600}
              height={1298}
              className="h-auto w-full"
              sizes="190px"
            />
          </Link>
        </div>
      </div>

      <div className="container-main relative pb-16 lg:pb-24">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7" aria-label="Мебели в 3D калкулатора">
          {furniture.map(({ label, type, Icon }, index) => (
            <li key={type} className={index === furniture.length - 1 ? 'col-span-2 sm:col-span-1' : ''}>
              <Link
                href={`${HREF}#t=${type}`}
                className="group flex h-full items-center gap-3 rounded-[14px] bg-white/[0.05] px-4 py-4 transition-colors duration-200 hover:bg-white/[0.1] lg:flex-col lg:items-start lg:gap-4 lg:py-5"
                style={{ border: '1px solid rgba(246,239,228,0.1)' }}
              >
                <Icon size={22} strokeWidth={1.6} style={{ color: '#D9B57E' }} aria-hidden="true" />
                <span className="flex flex-1 items-center justify-between gap-2 font-body text-[0.95rem] font-medium lg:w-full" style={{ color: '#F6EFE4' }}>
                  {label}
                  <ArrowRight size={15} className="opacity-50 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
