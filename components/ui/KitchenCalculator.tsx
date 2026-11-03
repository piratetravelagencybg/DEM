'use client'

import { useState } from 'react'
import QuoteForm from '@/components/ui/QuoteForm'
import { calculatorConfig, estimateKitchen } from '@/lib/kitchen-calculator'

const MIN_METERS = 1
const MAX_METERS = 12

export default function KitchenCalculator() {
  const [meters, setMeters] = useState(3)
  const [materialId, setMaterialId] = useState(calculatorConfig.materials[0].id)
  const [shapeId, setShapeId] = useState(calculatorConfig.shapes[0].id)
  const [quoteMessage, setQuoteMessage] = useState<string | null>(null)

  const material = calculatorConfig.materials.find((item) => item.id === materialId)!
  const shape = calculatorConfig.shapes.find((item) => item.id === shapeId)!
  const estimate = estimateKitchen(meters, materialId, shapeId)
  const { currency } = calculatorConfig

  const summary = `Калкулатор: ${shape.label.toLowerCase()} кухня, ${meters} линейни метра, фронтове ${material.label}.`
    + (estimate ? ` Ориентировъчно ${estimate.min}–${estimate.max} ${currency}.` : '')
    + ' Искам точна оферта.'

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-2xl bg-white p-6 md:p-8 space-y-7" style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
        <div>
          <label htmlFor="calc-meters" className="flex items-baseline justify-between font-body font-semibold text-charcoal">
            Дължина на кухнята
            <span className="font-display text-walnut" style={{ fontSize: '1.4rem' }}>{meters} м</span>
          </label>
          <input
            id="calc-meters"
            type="range"
            min={MIN_METERS}
            max={MAX_METERS}
            step={0.5}
            value={meters}
            onChange={(event) => setMeters(Number(event.target.value))}
            className="mt-3 w-full accent-[#8B6F47]"
          />
          <p className="font-body text-xs text-warm-gray mt-1">Сборът от дължините на всички стени с шкафове, в линейни метри.</p>
        </div>

        <fieldset>
          <legend className="font-body font-semibold text-charcoal mb-3">Форма</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {calculatorConfig.shapes.map((item) => (
              <label
                key={item.id}
                className="cursor-pointer rounded-xl px-4 py-3 text-center font-body text-sm font-medium transition-colors"
                style={{
                  border: `1px solid ${item.id === shapeId ? '#8B6F47' : '#E7DDCF'}`,
                  background: item.id === shapeId ? 'rgba(139,111,71,0.08)' : 'white',
                  color: item.id === shapeId ? '#8B6F47' : '#2C2C2C',
                }}
              >
                <input type="radio" name="shape" value={item.id} checked={item.id === shapeId} onChange={() => setShapeId(item.id)} className="sr-only" />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-body font-semibold text-charcoal mb-3">Фронтове</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {calculatorConfig.materials.map((item) => (
              <label
                key={item.id}
                className="cursor-pointer rounded-xl px-4 py-3 text-center font-body text-sm font-medium transition-colors"
                style={{
                  border: `1px solid ${item.id === materialId ? '#8B6F47' : '#E7DDCF'}`,
                  background: item.id === materialId ? 'rgba(139,111,71,0.08)' : 'white',
                  color: item.id === materialId ? '#8B6F47' : '#2C2C2C',
                }}
              >
                <input type="radio" name="material" value={item.id} checked={item.id === materialId} onChange={() => setMaterialId(item.id)} className="sr-only" />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl p-6 md:p-8" style={{ background: '#241D17', color: 'white' }} aria-live="polite">
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {shape.label} кухня · {meters} м · {material.label}
          </p>
          {estimate ? (
            <>
              <p className="font-display font-bold mt-2" style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)' }}>
                {estimate.min.toLocaleString('bg-BG')} – {estimate.max.toLocaleString('bg-BG')} {currency}
              </p>
              <p className="font-body text-sm mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Ориентировъчен диапазон без плот, уреди и монтаж. Точната цена зависи от модулите, механизмите и плота.
              </p>
            </>
          ) : (
            <p className="font-body mt-3" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
              Ориентировъчните цени се въвеждат. Изпратете параметрите и ще получите точна оферта.
            </p>
          )}
          <button
            type="button"
            onClick={() => setQuoteMessage(summary)}
            className="btn-primary mt-6 w-full justify-center"
          >
            Искам точна оферта
          </button>
        </div>

        {quoteMessage && (
          <div className="rounded-2xl bg-white p-6 md:p-8" style={{ border: '1px solid #EDE5DA' }}>
            <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Запитване за точна оферта</h2>
            <p className="font-body text-warm-gray text-sm mb-6">Параметрите от калкулатора са попълнени в съобщението. Прикачете снимки и размери, ако имате.</p>
            <QuoteForm key={quoteMessage} defaultService="Кухня по поръчка" defaultMessage={quoteMessage} />
          </div>
        )}
      </div>
    </div>
  )
}
