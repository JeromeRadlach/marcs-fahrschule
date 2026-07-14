import nodemailer from 'nodemailer'

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
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, phone, message, licenseClass } = req.body

  // Security: Input length validation
  const maxLength = 500
  if (name && name.length > maxLength) return res.status(400).json({ message: 'Name too long' })
  if (email && email.length > maxLength) return res.status(400).json({ message: 'Email too long' })
  if (phone && phone.length > maxLength) return res.status(400).json({ message: 'Phone too long' })
  if (message && message.length > maxLength) return res.status(400).json({ message: 'Message too long' })
  if (licenseClass && licenseClass.length > maxLength) return res.status(400).json({ message: 'License class too long' })

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
    console.log('[ERROR] Email sending failed - check logs for details')
    res.status(500).json({ message: 'Fehler beim Senden der E-Mail' })
  }
}