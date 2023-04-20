import nodemailer from "nodemailer"
import { htmlToText } from "html-to-text"
import fs from "fs"

export class Email {
  private to: string
  private firstName: string
  private url: string
  private from: string

  constructor(user, url) {
    this.to = user.email
    this.firstName = user.firstName
    this.url = url
    this.from = `Dana Snel <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      })
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = `First Name${this.firstName} \n url: ${this.url} \n subject: ${subject}`
    //TODO: prepare email template

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    }
    if (process.env.NODE_ENV === "development") {
      fs.writeFileSync("email.html", html)
    }
    // 3) Create a transport and send email
    // await this.newTransport().sendMail(mailOptions)
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Tourney Family!")
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)",
    )
  }
}
