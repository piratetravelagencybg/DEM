'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Menu, Phone, ShoppingBag, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false })

type NavLink = { label: string; href: string }

// Shown in the desktop bar from 1440px up; below that they live in the
// „Услуги“ and „Градове“ dropdowns so nothing wraps or touches.
const wideLinks: NavLink[] = [
  { label: 'Интериорен дизайн', href: '/услуги/интериорен-дизайн/' },
  { label: 'София', href: '/софия/' },
]
const trailLinks: NavLink[] = [
  { label: 'За нас', href: '/за-нас/' },
  { label: 'Контакти', href: '/контакти/' },
]

const servicesLinks: NavLink[] = [
  { label: 'Всички услуги', href: '/услуги/' },
  { label: 'Кухни по поръчка', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби по поръчка', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални по поръчка', href: '/услуги/спални-по-поръчка/' },
  { label: 'Дневни по поръчка', href: '/услуги/дневни-по-поръчка/' },
  { label: 'Офис мебели', href: '/услуги/офис-мебели/' },
  { label: 'Мебели за баня', href: '/услуги/мебели-за-баня/' },
  { label: '3D проект', href: '/услуги/3d-визуализация/' },
  { label: 'Интериорен дизайн', href: '/услуги/интериорен-дизайн/' },
]
// The mobile menu keeps every page, including the blog.
const mobileLinks: NavLink[] = [
  { label: 'Услуги', href: '/услуги/' },
  ...wideLinks,
  { label: 'Блог', href: '/блог/' },
  ...trailLinks,
]

const projectsLinks: NavLink[] = [
  { label: 'Проектни казуси', href: '/проекти/' },
  { label: '3D проекти', href: '/3d-проекти/' },
]

const cities: NavLink[] = [
  { label: 'Благоевград', href: '/благоевград/' },
  { label: 'София', href: '/софия/' },
  { label: 'Дупница', href: '/дупница/' },
  { label: 'Сандански', href: '/сандански/' },
  { label: 'Петрич', href: '/петрич/' },
]

function NavDropdown({
  label,
  href,
  items,
  scrolled,
}: {
  label: string
  href: string
  items: NavLink[]
  scrolled: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <Link
        href={href}
        className="font-body text-sm whitespace-nowrap transition-colors duration-200 relative group flex items-center gap-1"
        style={{ color: scrolled ? '#2C2C2C' : 'rgba(255,255,255,0.85)' }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        <span
          className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
          style={{ background: scrolled ? '#8B6F47' : 'white' }}
        />
      </Link>

      {/* Always in the HTML, hidden with CSS */}
      <div
        className="absolute top-full left-0 pt-2"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div
          className="min-w-[180px] rounded-2xl overflow-hidden transition-all duration-200"
          style={{
            background: scrolled ? '#FFFFFF' : 'rgba(31,25,20,0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${scrolled ? '#E8DDD0' : 'rgba(255,255,255,0.12)'}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className="block px-4 py-2.5 font-body text-sm whitespace-nowrap transition-colors duration-150"
              style={{
                color: scrolled ? '#2C2C2C' : 'rgba(255,255,255,0.85)',
                borderBottom: index < items.length - 1 ? `1px solid ${scrolled ? '#F0EBE3' : 'rgba(255,255,255,0.08)'}` : 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = scrolled ? '#F7F3ED' : 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? '#2C2C2C' : 'white'
  const subtitleColor = scrolled ? '#6B6560' : 'rgba(255,255,255,0.6)'
  const linkColor = scrolled ? '#2C2C2C' : 'rgba(255,255,255,0.85)'

  const navLink = (link: NavLink, className = '') => (
    <Link
      key={link.href}
      href={link.href}
      className={`font-body text-sm whitespace-nowrap transition-colors duration-200 relative group ${className}`}
      style={{ color: linkColor }}
    >
      {link.label}
      <span
        className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
        style={{ background: scrolled ? '#8B6F47' : 'white' }}
      />
    </Link>
  )

  // „Готови мебели“ and „Консултация“ share one size and shape.
  const pillButton = 'inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 font-body text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,248,244,0.96)' : 'rgba(31,25,20,0.94)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(232,221,208,0.9)' : 'rgba(255,255,255,0.09)'}`,
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between gap-8 h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <Image
                src="/images/logo-icon.webp"
                alt="ДомЕксперт лого"
                width={64}
                height={35}
                sizes="64px"
                style={{
                  flexShrink: 0,
                  filter: scrolled ? 'brightness(0)' : 'invert(1)',
                  transition: 'filter 0.3s',
                }}
                className="h-[30px] w-auto sm:h-[34px]"
              />
              <div>
                <div
                  className="font-display font-semibold text-[1.02rem] sm:text-lg leading-tight whitespace-nowrap transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  ДомЕксперт
                </div>
                <div
                  className="font-body text-[0.62rem] tracking-widest uppercase transition-colors duration-300"
                  style={{ color: subtitleColor }}
                >
                  Мебел
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-5 xl:gap-6" aria-label="Основна навигация">
              <NavDropdown label="Услуги" href="/услуги/" items={servicesLinks} scrolled={scrolled} />
              {wideLinks.map((link) => navLink(link, 'hidden min-[1440px]:inline-block'))}
              <NavDropdown label="Проекти" href="/проекти/" items={projectsLinks} scrolled={scrolled} />
              <NavDropdown label="Градове" href="/благоевград/" items={cities} scrolled={scrolled} />
              {trailLinks.map((link) => navLink(link))}
            </nav>

            {/* Right side */}
            <div className="flex flex-shrink-0 items-center gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneInternational}`}
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors"
                style={{ color: linkColor }}
                aria-label={`Обадете се на ${SITE_CONFIG.phone}`}
              >
                <Phone size={16} style={{ color: scrolled ? '#8B6F47' : 'rgba(255,255,255,0.7)' }} aria-hidden="true" />
                <span className="hidden xl:inline">{SITE_CONFIG.phone}</span>
              </a>
              <Link
                href="/готови-мебели/"
                className={`hidden lg:inline-flex ${pillButton}`}
                style={{
                  background: scrolled ? 'rgba(139,111,71,0.08)' : 'rgba(255,255,255,0.12)',
                  color: scrolled ? '#6B5236' : 'white',
                  border: `1px solid ${scrolled ? 'rgba(139,111,71,0.35)' : 'rgba(255,255,255,0.35)'}`,
                }}
              >
                <ShoppingBag size={14} aria-hidden="true" />
                Готови мебели
              </Link>
              <Link
                href="/контакти/"
                className={`hidden lg:inline-flex ${pillButton} text-white`}
                style={{
                  background: '#8B6F47',
                  border: '1px solid #8B6F47',
                  boxShadow: '0 4px 16px rgba(139,111,71,0.35)',
                }}
              >
                Консултация
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300"
                style={scrolled
                  ? { background: '#FFFFFF', border: '1px solid #E8DDD0', boxShadow: '0 4px 14px rgba(33,25,18,0.08)', color: '#2C2C2C' }
                  : { background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', color: 'white' }
                }
                aria-label="Отвори менюто"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <Menu size={21} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && <MobileMenu open onClose={() => setMenuOpen(false)} navLinks={mobileLinks} projectsLinks={projectsLinks} cities={cities} />}
    </>
  )
}
