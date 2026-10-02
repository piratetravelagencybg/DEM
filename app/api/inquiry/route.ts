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
    // Parse FormData
    const formData = await request.formData()

    const body = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      city: formData.get('city') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string,
      source_page: formData.get('source_page') as string,
    }

    const validatedData = inquirySchema.parse(body)

    // Check honeypot
    if (validatedData.honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    // Get photos from FormData
    const photoFiles = formData.getAll('photos') as File[]

    // Validate photos
    if (photoFiles.length > 5) {
      return NextResponse.json({ error: 'Максимум 5 снимки' }, { status: 400 })
    }

    let totalSize = 0
    const attachments: { filename: string; content: string }[] = []

    for (const file of photoFiles) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Само изображения са разрешени' }, { status: 400 })
      }

      if (file.size > 1.5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Всяка снимка трябва да е под 1.5 MB' }, { status: 400 })
      }

      totalSize += file.size
    }

    if (totalSize > 4 * 1024 * 1024) {
      return NextResponse.json({ error: 'Общият размер на снимките не може да надвишава 4 MB' }, { status: 400 })
    }

    // Convert photos to base64 for email attachments
    for (let i = 0; i < photoFiles.length; i++) {
      const file = photoFiles[i]
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')

      attachments.push({
        filename: `snimka-${i + 1}.jpg`,
        content: base64,
      })
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

${photoFiles.length > 0 ? `Прикачени снимки: ${photoFiles.length}` : ''}
${validatedData.source_page ? `Източник: ${validatedData.source_page}` : ''}
`.trim()

    await resendClient.emails.send({
      from: 'Dom Expert Мебел <noreply@domexpertmebel.com>',
      to: recipientEmail,
      subject: emailSubject,
      text: emailBody,
      attachments: attachments.length > 0 ? attachments : undefined,
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
