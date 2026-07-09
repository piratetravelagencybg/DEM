import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

const services = [
  { label: 'Кухни по поръчка', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби по поръчка', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални по поръчка', href: '/услуги/спални-по-поръчка/' },
  { label: 'Дневни по поръчка', href: '/услуги/дневни-по-поръчка/' },
  { label: 'Офис мебели', href: '/услуги/офис-мебели/' },
  { label: 'Монтаж', href: '/услуги/монтаж/' },
]

const company = [
  { label: 'За нас', href: '/за-нас/' },
  { label: 'Проекти', href: '/проекти/' },
  { label: 'Каталог', href: '/каталог/' },
  { label: 'Блог', href: '/блог/' },
  { label: 'Контакти', href: '/контакти/' },
]

const locations = [
  { label: 'Мебели Благоевград', href: '/благоевград/' },
  { label: 'Мебели София', href: '/софия/' },
  { label: 'Мебели Дупница', href: '/дупница/' },
  { label: 'Мебели Сандански', href: '/сандански/' },
]

function FooterLogo() {
  return (
    <Image
      src="/images/logo-icon.png"
      alt="ДомЕксперт лого"
      width={1024}
      height={559}
      style={{
        width: 'auto',
        height: '34px',
        flexShrink: 0,
        filter: 'invert(1) sepia(0.3) saturate(1.4) brightness(0.88)',
      }}
    />
  )
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A1714' }} className="text-white/70 pb-20 md:pb-0">

      {/* Walnut top accent */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #8B6F47 30%, #C4A882 50%, #8B6F47 70%, transparent)' }} />

      <div className="container-main py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <FooterLogo />
              <div>
                <div className="font-display font-semibold text-white text-lg leading-tight">ДомЕксперт</div>
                <div className="font-body text-[0.62rem] tracking-widest uppercase" style={{ color: '#8B6F47' }}>Мебел</div>
              </div>
            </Link>

            <p className="font-body leading-relaxed mb-6" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
              Семейна фирма за мебели по поръчка в Благоевград и София. Проектираме, изработваме и монтираме с грижа за всеки детайл.
            </p>

            <div className="flex gap-2.5">
              {[
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-walnut hover:text-sand"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-body font-semibold text-white uppercase mb-5" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-body transition-colors duration-200 hover:text-sand"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Locations */}
          <div>
            <h3 className="font-body font-semibold text-white uppercase mb-5" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
              Компания
            </h3>
            <ul className="space-y-2.5 mb-7">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="font-body transition-colors duration-200 hover:text-sand"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-body font-semibold text-white uppercase mb-5" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
              Локации
            </h3>
            <ul className="space-y-2.5">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body transition-colors duration-200 hover:text-sand"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body font-semibold text-white uppercase mb-5" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
              Контакти
            </h3>
            <ul className="space-y-4 mb-7">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-walnut flex-shrink-0 mt-0.5" />
                <a href="tel:+359876081199" className="font-body hover:text-sand transition-colors" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
                  0876 081 199
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-walnut flex-shrink-0 mt-0.5" />
                <a href="mailto:office@domexpertmebel.com" className="font-body hover:text-sand transition-colors break-all" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
                  office@domexpertmebel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-walnut flex-shrink-0 mt-0.5" />
                <span className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>Благоевград, България</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-walnut flex-shrink-0 mt-0.5" />
                <span className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>Пон–Пет: 09:00–18:00</span>
              </li>
            </ul>

            <Link
              href="/контакти/"
              className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: '#8B6F47', fontSize: '0.85rem', boxShadow: '0 4px 16px rgba(139,111,71,0.35)' }}
            >
              Заяви консултация →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}>
            © {new Date().getFullYear()} ДомЕксперт Мебел. Всички права запазени.
          </span>
          <Link
            href="/политика-за-поверителност/"
            className="font-body hover:text-walnut transition-colors"
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}
          >
            Политика за поверителност
          </Link>
        </div>
      </div>
    </footer>
  )
}
