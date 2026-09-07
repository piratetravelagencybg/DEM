import type { Metadata } from 'next'
import Link from 'next/link'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Политика за поверителност | Dom Expert Мебел',
  description: 'Политика за поверителност и защита на личните данни на Dom Expert Мебел съгласно GDPR. Научете как събираме, използваме и защитаваме информацията.',
  path: '/политика-за-поверителност/',
  index: false,
})

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="container-main max-w-3xl">

        <nav className="flex items-center gap-2 font-body mb-8" style={{ fontSize: '0.85rem', color: '#9B9490' }}>
          <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
          <span>/</span>
          <span style={{ color: '#5A5450' }}>Политика за поверителност</span>
        </nav>

        <h1 className="font-display font-bold text-charcoal mb-8" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          Политика за поверителност
        </h1>

        <div className="prose max-w-none font-body text-warm-gray space-y-6" style={{ lineHeight: 1.75 }}>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">1. Администратор на лични данни</h2>
            <p>
              <strong className="text-charcoal">Dom Expert Мебел</strong> (ДомЕксперт Мебел) е администратор на личните данни, събирани чрез уебсайта <strong>domexpertmebel.com</strong>.
            </p>
            <p>За въпроси, свързани с личните данни, можете да се свържете с нас на:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Имейл: <a href="mailto:domexpertmebel@gmail.com" className="text-walnut hover:underline">domexpertmebel@gmail.com</a></li>
              <li>Телефон: <a href="tel:+359876081199" className="text-walnut hover:underline">0876 081 199</a></li>
              <li>Адрес: Благоевград, България</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">2. Какви данни събираме</h2>
            <p>Събираме следните лични данни, когато попълвате формата за запитване:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Име (задължително)</li>
              <li>Телефонен номер (задължително)</li>
              <li>Имейл адрес (по избор)</li>
              <li>Град и вид на търсената услуга (задължително)</li>
              <li>Описание на проекта (задължително)</li>
              <li>Страницата, от която е изпратено запитването, и технически номер на заявката</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">3. Цел на обработката</h2>
            <p>Данните се обработват с цел:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Отговор на вашето запитване за мебели по поръчка</li>
              <li>Изготвяне на оферта и 3D проект</li>
              <li>Комуникация относно вашата поръчка</li>
            </ul>
            <p>Правното основание за обработката е вашето изрично съгласие при изпращане на формата (чл. 6, ал. 1, б. „а&quot; от GDPR).</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">4. Технически доставчици</h2>
            <p>
              За хостинг, защитено съхранение и доставяне на известията от формата можем да използваме
              Vercel, Supabase и Resend. Те обработват единствено данните, необходими за техническото
              изпълнение на услугата, при приложими договорни и организационни мерки за защита.
            </p>
            <p>
              Данните от формата не се продават и не се използват за маркетингови съобщения без
              отделно изрично съгласие.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">5. Срок на съхранение</h2>
            <p>
              Ако след запитването не се сключи договор, личните данни се изтриват не по-късно от 3 години след изпращането му. При сключен договор данните се съхраняват за сроковете, необходими за изпълнението му и за спазване на приложимите законови изисквания.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">6. Вашите права</h2>
            <p>Имате право на:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-charcoal">Достъп</strong> — да получите копие от личните данни, с които разполагаме</li>
              <li><strong className="text-charcoal">Коригиране</strong> — да коригирате неточни данни</li>
              <li><strong className="text-charcoal">Изтриване</strong> — да поискате изтриване на данните („право да бъдеш забравен&quot;)</li>
              <li><strong className="text-charcoal">Ограничаване</strong> — да ограничите обработката</li>
              <li><strong className="text-charcoal">Оттегляне на съгласие</strong> — по всяко време, без да засяга законосъобразността на обработката преди оттеглянето</li>
              <li><strong className="text-charcoal">Жалба</strong> — до Комисията за защита на личните данни (КЗЛД) на адрес <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-walnut hover:underline">www.cpdp.bg</a></li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">7. Бисквитки (Cookies)</h2>
            <p>
              Уебсайтът може да използва технически бисквитки, необходими за правилното му функциониране. Не използваме проследяващи или маркетингови бисквитки без вашето изрично съгласие.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-3">8. Промени в политиката</h2>
            <p>
              Можем да актуализираме тази политика. При съществени промени ще ви уведомим по имейл или чрез съобщение на сайта. Текущата версия е от <strong className="text-charcoal">август 2026 г.</strong>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-light-tan">
          <Link href="/" className="btn-primary inline-flex">
            ← Обратно към началото
          </Link>
        </div>

      </div>
    </div>
  )
}
