import raw from '@/data/kitchen-calculator.json'

export type CalculatorMaterial = { id: string; label: string; min: number | null; max: number | null }
export type CalculatorShape = { id: string; label: string; factor: number | null }

export const calculatorConfig = raw as {
  materials: CalculatorMaterial[]
  shapes: CalculatorShape[]
  currency: string
}

/** True only when every price and factor has been filled in by Дом Експерт. */
export const calculatorReady =
  calculatorConfig.materials.every((material) => material.min !== null && material.max !== null) &&
  calculatorConfig.shapes.every((shape) => shape.factor !== null)

/** Indicative price range, or null while the prices are not set. */
export function estimateKitchen(meters: number, materialId: string, shapeId: string) {
  const material = calculatorConfig.materials.find((item) => item.id === materialId)
  const shape = calculatorConfig.shapes.find((item) => item.id === shapeId)
  if (!material || !shape || material.min === null || material.max === null || shape.factor === null) return null
  const round = (value: number) => Math.round(value / 50) * 50
  return {
    min: round(meters * material.min * shape.factor),
    max: round(meters * material.max * shape.factor),
  }
}
