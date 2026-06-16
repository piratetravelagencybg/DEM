'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ShoppingBag } from 'lucide-react'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Услуги', href: '/услуги/' },
  { label: 'Проекти', href: '/проекти/' },
  { label: 'Блог', href: '/блог/' },
  { label: 'За нас', href: '/за-нас/' },
  { label: 'Контакти', href: '/контакти/' },
]

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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,240,232,0.96)' : 'rgba(26,18,8,0.84)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(232,221,208,0.9)' : 'rgba(255,255,255,0.09)'}`,
        }}
      >
        <div className="px-5 md:px-6 lg:px-8 max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <Image
                src="/images/logo-icon.png"
                alt="ДомЕксперт лого"
                width={1024}
                height={559}
                style={{
                  width: 'auto',
                  height: '34px',
                  flexShrink: 0,
                  filter: scrolled ? 'brightness(0)' : 'invert(1)',
                  transition: 'filter 0.3s',
                }}
              />
              <div>
                <div
                  className="font-display font-semibold text-lg leading-tight transition-colors duration-300"
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
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm transition-colors duration-200 relative group"
                  style={{ color: scrolled ? '#2C2C2C' : 'rgba(255,255,255,0.85)' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
                    style={{ background: scrolled ? '#8B6F47' : 'white' }}
                  />
                </Link>
              ))}
              {/* Shop button in nav */}
              <Link
                href="/каталог/"
                className="inline-flex items-center gap-1.5 font-body font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: scrolled ? '#8B6F47' : 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: `1px solid ${scrolled ? 'transparent' : 'rgba(255,255,255,0.35)'}`,
                  backdropFilter: scrolled ? 'none' : 'blur(8px)',
                  boxShadow: scrolled ? '0 4px 16px rgba(139,111,71,0.35)' : 'none',
                }}
              >
                <ShoppingBag size={13} />
                Онлайн магазин
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+359888123456"
                className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: scrolled ? '#2C2C2C' : 'rgba(255,255,255,0.85)' }}
              >
                <Phone size={15} style={{ color: scrolled ? '#8B6F47' : 'rgba(255,255,255,0.7)' }} />
                0888 123 456
              </a>
              <Link href="/контакти/" className="hidden lg:block btn-primary text-sm py-2.5">
                Консултация
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-[10px] transition-all duration-300"
                style={scrolled
                  ? { background: 'white', border: '1px solid #E8DDD0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }
                  : { background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }
                }
                aria-label="Отвори менюто"
              >
                <span className="w-[18px] h-[1.5px] rounded-full block" style={{ background: scrolled ? '#2C2C2C' : 'white' }} />
                <span className="w-[14px] h-[1.5px] rounded-full block self-start ml-[4px]" style={{ background: scrolled ? '#2C2C2C' : 'white' }} />
                <span className="w-[18px] h-[1.5px] rounded-full block" style={{ background: scrolled ? '#2C2C2C' : 'white' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks} />
    </>
  )
}
