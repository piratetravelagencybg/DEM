'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, AlertCircle, Image as ImageIcon, X } from 'lucide-react'

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

// Helper function to compress image
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      const maxDimension = 1600
      let { width, height } = img

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension
          width = maxDimension
        } else {
          width = (width / height) * maxDimension
          height = maxDimension
        }
      }

      canvas.width = width
      canvas.height = height
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Failed to compress image'))
          }
        },
        'image/jpeg',
        0.8
      )
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

export default function QuoteForm({ defaultService = '' }: { defaultService?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [photos, setPhotos] = useState<File[]>([])
  const [photoError, setPhotoError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService, honeypot: '' },
  })

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPhotoError('')

    if (photos.length + files.length > 5) {
      setPhotoError('Максимум 5 снимки')
      return
    }

    // Check for HEIC files (not supported by canvas)
    const hasHeic = files.some(f => f.name.toLowerCase().endsWith('.heic'))
    if (hasHeic) {
      setPhotoError('Моля, изпратете JPG/PNG вместо HEIC формат')
      return
    }

    try {
      // Compress all images
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          if (file.type.startsWith('image/')) {
            return await compressImage(file)
          }
          return file
        })
      )

      // Check total size
      const totalSize = [...photos, ...compressedFiles].reduce((sum, f) => sum + f.size, 0)
      if (totalSize > 4 * 1024 * 1024) {
        setPhotoError('Общият размер на снимките надвишава 4 MB. Моля, изберете по-малко или по-малки снимки.')
        return
      }

      setPhotos(prev => [...prev, ...compressedFiles])
    } catch (error) {
      console.error('Error compressing images:', error)
      setPhotoError('Грешка при обработка на снимките')
    }

    // Clear input value so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoError('')
  }

  const onSubmit = async (data: FormData) => {
    setStatus('loading')

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('phone', data.phone)
      formData.append('email', data.email)
      formData.append('city', data.city)
      formData.append('service', data.service)
      formData.append('message', data.message)
      formData.append('honeypot', data.honeypot)
      formData.append('source_page', typeof window !== 'undefined' ? window.location.pathname : '')

      // Attach photos
      photos.forEach((photo, index) => {
        formData.append('photos', photo, `snimka-${index + 1}.jpg`)
      })

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to send inquiry')
      }

      setStatus('success')
      reset()
      setPhotos([])
      setPhotoError('')

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
            {['Благоевград', 'София', 'Дупница', 'Сандански', 'Петрич', 'Банско', 'Разлог', 'Гоце Делчев', 'Друг'].map(c => (
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

      {/* Photos Upload */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          Снимки на помещението (по желание)
        </label>
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            onChange={handlePhotoChange}
            disabled={status === 'loading' || photos.length >= 5}
            className="w-full px-4 py-3 border border-light-tan rounded-btn bg-white text-charcoal text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cream file:text-walnut hover:file:bg-light-tan disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-warm-gray">
            До 5 снимки. Помагат ни да дадем по-точна оценка преди огледа.
          </p>
          {photoError && <p className="text-red-500 text-xs">{photoError}</p>}

          {/* Photo Previews */}
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group w-20 h-20 rounded-lg overflow-hidden border border-light-tan"
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Снимка ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Премахни снимка"
                  >
                    <X size={12} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-0.5">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        {status === 'loading' ? (photos.length > 0 ? 'Изпращане на снимките...' : 'Изпраща се...') : 'Изпрати запитване'}
      </button>
      <p className="text-xs text-warm-gray text-center">Безплатна консултация и оферта. Отговаряме до 24 часа.</p>
    </form>
  )
}
