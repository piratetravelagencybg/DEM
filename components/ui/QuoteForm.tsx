'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle } from 'lucide-react'

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
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService, honeypot: '' },
  })

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Запитване от ${data.name} — ${data.service}`)
    const body = encodeURIComponent(
      `Ime: ${data.name}\nTelefon: ${data.phone}\nEmail: ${data.email || '—'}\nGrad: ${data.city}\nUsluga: ${data.service}\n\n${data.message}`
    )
    window.location.href = `mailto:office@domexpertmebel.bg?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={48} className="text-success" />
        <h3 className="font-display text-2xl font-semibold text-charcoal">Благодарим ви!</h3>
        <p className="text-warm-gray">Ще се свържем с вас до 24 часа.</p>
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
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Телефон *</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="0888 123 456"
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm"
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
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Град *</label>
          <select
            {...register('city')}
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal focus:outline-none focus:border-walnut transition-colors text-sm"
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
          className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal focus:outline-none focus:border-walnut transition-colors text-sm"
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
          className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-walnut transition-colors text-sm resize-none"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        Изпрати запитване
      </button>
      <p className="text-xs text-warm-gray text-center">Безплатна консултация и оферта. Отговаряме до 24 часа.</p>
    </form>
  )
}
