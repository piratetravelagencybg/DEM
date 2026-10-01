import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

let resend: Resend | null = null

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

const inquirySchema = z.object({
  name: z.string().min(2, 'Името трябва да е поне 2 символа'),
  phone: z.string().min(6, 'Телефонът трябва да е поне 6 символа'),
  email: z.string().email('Невалиден имейл').or(z.literal('')),
  city: z.string().min(1, 'Градът е задължителен'),
  service: z.string().min(1, 'Услугата е задължителна'),
  message: z.string().min(10, 'Съобщението трябва да е поне 10 символа'),
  honeypot: z.string().max(0, 'Невалидна форма'),
  source_page: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = inquirySchema.parse(body)

    // Check honeypot
    if (validatedData.honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    // Check if Resend is configured
    const resendClient = getResend()
    if (!resendClient || !process.env.RESEND_API_KEY) {
      console.error('Resend API key is missing')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const recipientEmail = process.env.INQUIRY_TO_EMAIL || 'domexpertmebel@gmail.com'

    // Send email via Resend
    const emailSubject = `Ново запитване: ${validatedData.service} – ${validatedData.city}`
    const emailBody = `
Име: ${validatedData.name}
Телефон: ${validatedData.phone}
Имейл: ${validatedData.email || '—'}
Град: ${validatedData.city}
Услуга: ${validatedData.service}

Съобщение:
${validatedData.message}

${validatedData.source_page ? `Източник: ${validatedData.source_page}` : ''}
`.trim()

    await resendClient.emails.send({
      from: 'Dom Expert Мебел <noreply@domexpertmebel.com>',
      to: recipientEmail,
      subject: emailSubject,
      text: emailBody,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Невалидни данни', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error sending inquiry email:', error)
    return NextResponse.json(
      { error: 'Грешка при изпращане на запитването' },
      { status: 500 }
    )
  }
}
