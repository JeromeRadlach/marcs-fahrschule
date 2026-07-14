import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Security: Configure CORS with origin whitelist
const corsOptions = {
  origin: [
    'https://marcsfahr.schule',
    'https://www.marcsfahr.schule',
    'http://localhost:5173',
    'http://localhost:3001'
  ],
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}
app.use(cors(corsOptions))
app.use(express.json())

// Security: Rate limiting - 5 requests per minute per IP
const contactRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
})

// Security: Request logging
app.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/contact') {
    console.log('[AUDIT] Contact form request from ' + req.ip + ' at ' + new Date().toISOString())
  }
  next()
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

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

app.post('/api/contact', contactRateLimit, async (req, res) => {
  const { name, email, phone, message, licenseClass } = req.body

  // Security: Input length validation
  const maxLength = 500
  if (name && name.length > maxLength) return res.status(400).json({ message: 'Name too long' })
  if (email && email.length > maxLength) return res.status(400).json({ message: 'Email too long' })
  if (phone && phone.length > maxLength) return res.status(400).json({ message: 'Phone too long' })
  if (message && message.length > maxLength) return res.status(400).json({ message: 'Message too long' })
  if (licenseClass && licenseClass.length > maxLength) return res.status(400).json({ message: 'License class too long' })

  const recipientEmail = process.env.RECIPIENT_EMAIL

  // Security: All user input is escaped to prevent HTML injection
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeLicenseClass = escapeHtml(licenseClass)
  const safeMessage = escapeHtml(message)

  const mailOptions = {
    from: email,
    to: recipientEmail,
    subject: 'Neue Kontaktanfrage von ' + safeName + ' - Marc\'s Fahrschule',
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>E-Mail:</strong> ${safeEmail}</p>
      <p><strong>Telefon:</strong> ${safePhone}</p>
      <p><strong>Gewünschte Klasse:</strong> ${safeLicenseClass}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${safeMessage}</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('[AUDIT] Email sent successfully to ' + recipientEmail)
    res.status(200).json({ message: 'E-Mail erfolgreich gesendet' })
  } catch (error) {
    console.log('[ERROR] Email sending failed - check logs for details')
    res.status(500).json({ message: 'Fehler beim Senden der E-Mail' })
  }
})

app.listen(port, () => {
  console.log('Server running on port ' + port)
})