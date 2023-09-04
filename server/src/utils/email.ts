import nodemailer from "nodemailer"
import { htmlToText } from "html-to-text"
import { getResetPassWordHtml } from "../emailTemplates/index"

export class Email {
  private to: string

  constructor(email: string) {
    this.to = email
  }

  newTransport() {
    if (!(process.env.SENDGRID_USERNAME && process.env.SENDGRID_PASSWORD))
      throw new Error("SendGrid username and password is required")

    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    })
  }

  // Send the actual email
  async send(html, subject) {
    const from = `${process.env.DANA_NAME} <${process.env.EMAIL_FROM}>`
    const mailOptions = {
      from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText(html),
    }

    // 3) Create a transport and send email
    const transport = this.newTransport()
    await transport.sendMail(mailOptions)
  }

  /**
   * @param {string} resetURL
   */
  async sendResetPassword(resetURL) {
    const subject = "Reset password 'rewrite this subject'"
    const html = getResetPassWordHtml(resetURL)
    await this.send(html, subject)
  }

  async test() {
    const subject = "Testing email"
    const html = "<h1>Testing email</h1>"
    await this.send(html, subject)
  }
}
