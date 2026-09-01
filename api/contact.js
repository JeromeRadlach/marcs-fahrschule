import nodemailer from 'nodemailer'
import { getRateLimitConfig, getClientIp, checkRateLimit } from '../lib/rateLimit.js'

// Security: HTML sanitization - prevents XSS in emails
function escapeHtml(str) {
  if (!str) return 'Nicht angegeben'
  const map = {
    '&': '\u0026\u0061\u006d\u0070\u003b',
    '<': '\u0026\u006c\u0074\u003b',
    '>': '\u0026\u0067\u0074\u003b',
    '"': '\u0026\u0071\u0075\u006f\u0074\u003b',
    "'": '\u0026\u0023\u0030\u0033\u0039\u003b'
  }
  return String(str).replace(/[&<>'"]/g, m => map[m])
}

// Create a transporter - no hardcoded credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const recipientEmail = process.env.RECIPIENT_EMAIL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' })
  }

  // Security: Rate limiting per client IP
  const rateLimitConfig = getRateLimitConfig()
  const clientIp = getClientIp(req)
  const rateLimitResult = checkRateLimit(clientIp, rateLimitConfig)

  res.setHeader('RateLimit-Limit', rateLimitConfig.max)
  res.setHeader('RateLimit-Remaining', rateLimitResult.remaining)

  console.log('[AUDIT] Contact form request from ' + clientIp + ' at ' + new Date().toISOString())

  if (!rateLimitResult.allowed) {
    res.setHeader('Retry-After', rateLimitResult.retryAfterSeconds)
    console.warn('[AUDIT] Rate limit exceeded for ' + clientIp)
    return res.status(429).json({ message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' })
  }

  const { name, email, phone, message, licenseClass } = req.body

  // Security: Input length validation
  const maxLength = 500
  if (name && name.length > maxLength) return res.status(400).json({ message: 'Der Name ist zu lang' })
  if (email && email.length > maxLength) return res.status(400).json({ message: 'Die E-Mail-Adresse ist zu lang' })
  if (phone && phone.length > maxLength) return res.status(400).json({ message: 'Die Telefonnummer ist zu lang' })
  if (message && message.length > maxLength) return res.status(400).json({ message: 'Die Nachricht ist zu lang' })
  if (licenseClass && licenseClass.length > maxLength) return res.status(400).json({ message: 'Die gewünschte Klasse ist zu lang' })

  const mailOptions = {
    from: email,
    to: recipientEmail,
    subject: 'Neue Kontaktanfrage von ' + escapeHtml(name) + ' - Marc\'s Fahrschule',
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Gewünschte Klasse:</strong> ${escapeHtml(licenseClass)}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${escapeHtml(message)}</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'E-Mail erfolgreich gesendet' })
  } catch (error) {
    console.error('[ERROR] Email sending failed:', error?.message ?? error)
    res.status(500).json({ message: 'Fehler beim Senden der E-Mail' })
  }
}