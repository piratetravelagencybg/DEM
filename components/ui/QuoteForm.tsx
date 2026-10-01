'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Въведете вашето име'),
  phone: z.string().min(6, 'Въведете телефон'),
  email: z.string().email('Невалиден имейл').or(z.literal('')),
  city: z.string().min(1, 'Изберете град'),
  service: z.string().min(1, 'Изберете услуга'),
  message: z.string().min(10, 'Минимум 10 символа'),
  honeypot: z.string().max(0),
})

type FormData = z.infer<typeof schema>

export default function QuoteForm({ defaultService = '' }: { defaultService?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService, honeypot: '' },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source_page: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send inquiry')
      }

      setStatus('success')
      reset()

      // GTM event tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          form_location: window.location.pathname,
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={48} className="text-success" />
        <h3 className="font-display text-2xl font-semibold text-charcoal">Благодарим ви!</h3>
        <p className="text-warm-gray">Ще се свържем с вас до 24 часа.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-walnut hover:underline"
        >
          Изпрати ново запитване
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <AlertCircle size={48} className="text-red-500" />
        <h3 className="font-display text-2xl font-semibold text-charcoal">Нещо се обърка</h3>
        <p className="text-warm-gray">
          Моля, опитайте отново или се свържете директно на{' '}
          <a href="tel:+359876081199" className="text-walnut hover:underline">
            0876 081 199
          </a>
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline"
        >
          Опитай отново
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot */}
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Вашето Име *</label>
          <input
            {...register('name')}
            placeholder="Иван Иванов"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Телефон *</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="0876 081 199"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Имейл</label>
          <input
            {...register('email')}
            type="email"
            placeholder="ivan@example.com"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Град *</label>
          <select
            {...register('city')}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal focus:outline-none focus:border-walnut transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Изберете град</option>
            {['Благоевград', 'София', 'Дупница', 'Сандански', 'Банско', 'Разлог', 'Гоце Делчев', 'Друг'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">Какви мебели търсите *</label>
        <select
          {...register('service')}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal focus:outline-none focus:border-walnut transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Изберете услуга</option>
          {['Кухня по поръчка', 'Гардероб по поръчка', 'Спалня по поръчка', 'Дневна по поръчка', 'Офис мебели', 'Монтаж', 'Друго'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">Разкажете ни повече *</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Опишете накратко вашия проект — размери, стил, материали..."
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        {status === 'loading' ? 'Изпраща се...' : 'Изпрати запитване'}
      </button>
      <p className="text-xs text-warm-gray text-center">Безплатна консултация и оферта. Отговаряме до 24 часа.</p>
    </form>
  )
}
