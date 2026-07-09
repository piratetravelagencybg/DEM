// TODO: Replace mailto with Resend API — uncomment when API key is available

export interface FormData {
  name: string
  phone: string
  email: string
  city: string
  service: string
  message: string
}

// Current implementation: mailto fallback
export function buildMailtoLink(data: FormData): string {
  const subject = encodeURIComponent(`Запитване от ${data.name} — ${data.service}`)
  const body = encodeURIComponent(
    `Ime: ${data.name}\nTelefon: ${data.phone}\nEmail: ${data.email || '—'}\nGrad: ${data.city}\nUsluga: ${data.service}\n\n${data.message}`
  )
  return `mailto:office@domexpertmebel.com?subject=${subject}&body=${body}`
}

// Future: Resend API implementation
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)
//
// export async function sendEmail(data: FormData) {
//   return resend.emails.send({
//     from: 'noreply@domexpertmebel.com',
//     to: 'office@domexpertmebel.com',
//     subject: `Запитване от ${data.name}`,
//     html: `<p>Ime: ${data.name}</p><p>Tel: ${data.phone}</p><p>${data.message}</p>`,
//   })
// }
