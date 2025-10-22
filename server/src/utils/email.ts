import nodemailer from 'nodemailer'

interface MailOptions {
  subject: string
  text: string
  html?: string
}

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 465),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export default async function sendNotification(opts: MailOptions) {
  if (!process.env.NOTIFICATION_EMAILS) {
    console.warn('No notification emails configured; skipping email')
    return
  }

  const to = process.env.NOTIFICATION_EMAILS

  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  })
}
