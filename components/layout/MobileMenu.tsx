'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronRight, Phone, ShoppingBag, X } from 'lucide-react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  navLinks: { label: string; href: string }[]
}

export default function MobileMenu({ open, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname()
  const links = [{ label: 'Начало', href: '/' }, ...navLinks]

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  if (!open) return null

  return (
    <>
          <button
            type="button"
            aria-label="Затвори менюто"
            className="fixed inset-0 z-[250] bg-[#17120E]/60 backdrop-blur-[3px] lg:hidden"
            onClick={onClose}
          />

          <aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Основна навигация"
            className="fixed bottom-2 right-2 top-2 z-[300] flex flex-col overflow-hidden animate-[slideInMenu_0.28s_ease-out] lg:hidden"
            style={{
              width: 'min(calc(100vw - 16px), 390px)',
              borderRadius: 24,
              background: 'linear-gradient(160deg, #FBF9F5 0%, #F4EEE5 100%)',
              border: '1px solid rgba(255,255,255,0.72)',
              boxShadow: '-20px 20px 70px rgba(18,13,9,0.28)',
            }}
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E8DDD0]/80">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <Image
                  src="/images/logo-icon.webp"
                  alt="ДомЕксперт"
                  width={64}
                  height={35}
                  sizes="64px"
                  className="h-8 w-auto"
                  style={{ filter: 'brightness(0)' }}
                />
                <div>
                  <div className="font-display text-lg font-semibold leading-none text-charcoal">ДомЕксперт</div>
                  <div className="mt-1 font-body text-[0.55rem] uppercase tracking-[0.18em] text-warm-gray">Мебел</div>
                </div>
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3D8CB] bg-white text-charcoal shadow-sm transition-colors hover:text-walnut"
                aria-label="Затвори"
              >
                <X size={19} strokeWidth={1.8} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3.5 pb-4 pt-3">
              <div>
                <Link
                  href="/готови-мебели/"
                  onClick={onClose}
                  className="group mb-4 flex items-center justify-between rounded-[20px] bg-[#272019] p-4 text-white"
                  style={{ boxShadow: '0 10px 28px rgba(45,34,25,0.2)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                      <ShoppingBag size={19} strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#CDBA9D]">Готови мебели</span>
                      <span className="mt-0.5 block font-body text-base font-semibold">Цени и наличности</span>
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-[#CDBA9D] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="mb-1.5 px-2 font-body text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#9A8F85]">Навигация</p>
              <div className="overflow-hidden rounded-[18px] border border-[#E8DDD0] bg-white/75">
                {links.map((link, index) => {
                  const active = isActive(link.href)
                  return (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex min-h-[52px] items-center gap-3 border-b border-[#EEE6DC] px-3.5 last:border-0"
                        style={{ background: active ? '#F1E8DC' : 'transparent' }}
                      >
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full font-body text-[0.62rem] font-bold"
                          style={{ background: active ? '#8B6F47' : '#F3EEE7', color: active ? '#FFFFFF' : '#8A7F75' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-body text-[0.95rem] font-semibold text-charcoal">{link.label}</span>
                        <ChevronRight size={16} className="text-[#B7A99A] transition-transform group-hover:translate-x-0.5 group-hover:text-walnut" />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </nav>

            <div className="border-t border-[#E8DDD0] bg-white/90 p-3.5">
              <div className="flex gap-2.5">
                <a
                  href="tel:+359876081199"
                  className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F2] px-3 py-2.5"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#EEE5D9] text-walnut">
                    <Phone size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-body text-[0.78rem] font-bold text-charcoal">0876 081 199</span>
                    <span className="block font-body text-[0.58rem] text-warm-gray">Обади се сега</span>
                  </span>
                </a>
                <Link
                  href="/контакти/"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-walnut px-4 font-body text-[0.8rem] font-semibold text-white shadow-[0_6px_18px_rgba(139,111,71,0.3)]"
                >
                  Запитване <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>
    </>
  )
}
