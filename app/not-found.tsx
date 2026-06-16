import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-24">
      <div className="container-main text-center max-w-lg">
        <div className="font-display text-8xl font-bold text-walnut/20 mb-4">404</div>
        <h1 className="font-display font-semibold text-charcoal text-3xl mb-4">
          Страницата не е намерена
        </h1>
        <p className="font-body text-warm-gray mb-8 leading-relaxed">
          Страницата, която търсите, не съществува или е преместена. Върнете се на началната страница.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Начална страница
          </Link>
          <Link href="/контакти/" className="btn-outline">
            <ArrowLeft size={16} /> Контакти
          </Link>
        </div>
      </div>
    </div>
  )
}
