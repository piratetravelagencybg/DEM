'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Phone, Mail, ArrowRight, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  navLinks: { label: string; href: string }[]
}

export default function MobileMenu({ open, onClose, navLinks }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[250] bg-charcoal/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Fullscreen overlay */}
          <motion.div
            key="menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[300] lg:hidden flex flex-col"
            style={{ background: '#F5F0E8' }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <span className="font-display font-bold text-charcoal text-xl">Меню</span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-[10px] border border-light-tan text-charcoal hover:text-walnut transition-colors"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                aria-label="Затвори"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links — big Cormorant */}
            <nav className="flex flex-col px-6 pt-4 flex-1 overflow-y-auto">
              {/* Shop CTA at top */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.3 }}
                className="mb-3"
              >
                <Link
                  href="/каталог/"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2.5 font-body font-bold text-white rounded-2xl py-4"
                  style={{ background: '#8B6F47', boxShadow: '0 6px 20px rgba(139,111,71,0.38)', fontSize: '1rem' }}
                >
                  <ShoppingBag size={18} />
                  Онлайн магазин
                </Link>
              </motion.div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 border-b border-light-tan group"
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      className="font-display font-bold text-charcoal group-hover:text-walnut transition-colors"
                      style={{ fontSize: '2rem', lineHeight: 1.1 }}
                    >
                      {link.label}
                    </span>
                    <ArrowRight size={18} className="text-light-tan group-hover:text-walnut transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.35 }}
              className="px-6 py-6 bg-white"
              style={{ borderTop: '1px solid #E8DDD0' }}
            >
              <div className="flex gap-3 mb-4">
                <a
                  href="tel:+359876081199"
                  className="flex-1 flex items-center gap-2 bg-cream rounded-[10px] px-4 py-3 border border-light-tan"
                >
                  <Phone size={16} className="text-walnut flex-shrink-0" />
                  <div>
                    <div className="font-body font-bold text-charcoal text-sm">0876 081 199</div>
                    <div className="font-body text-warm-gray text-[0.65rem]">Обади се сега</div>
                  </div>
                </a>
                <a
                  href="mailto:office@domexpertmebel.com"
                  className="w-12 h-12 flex items-center justify-center bg-cream rounded-[10px] border border-light-tan flex-shrink-0"
                >
                  <Mail size={18} className="text-walnut" />
                </a>
              </div>
              <Link
                href="/контакти/"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-walnut text-white font-body font-semibold rounded-[10px] py-4 text-base"
                style={{ boxShadow: '0 4px 16px rgba(139,111,71,0.35)' }}
              >
                Заявка за консултация <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
