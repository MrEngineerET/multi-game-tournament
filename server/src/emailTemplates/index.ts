import fs from "fs/promises"
import mjml2html from "mjml"
import Handlebars from "handlebars"
import { Error } from "../model/Errors"

async function readMjmlFile(fileLocation: string): Promise<string> {
  try {
    const res = await fs.readFile(fileLocation, {
      encoding: "utf-8",
    })
    return res
  } catch (err) {
    console.error("An error occurred:=----->", err)
    const error = new Error({
      message: `Error while reading mjml file ${fileLocation}`,
      stackTrace: "emailTemplates/index.ts",
    })
    error.save().catch(() => {
      console.log("----> ", "error while saving an error")
    })
  }
}

const constants = {
  danaName: process.env.DANA_NAME,
  logo: `${process.env.CLIENT_URL}/icons/tournament.png`,
}

const resetPasswordMjmlLocation = `${__dirname}/resetPassword.mjml`
let resetPasswordMjml = ""
readMjmlFile(resetPasswordMjmlLocation).then(
  (mjml) => (resetPasswordMjml = mjml),
)

/**
 * @param {string} resetURL
 */
export function getResetPassWordHtml(resetURL) {
  if (!resetPasswordMjml) throw new Error("Reset Password Mjml is not found")
  const resetPassWordHtml = mjml2html(resetPasswordMjml).html
  const resetPassWordTemplate = Handlebars.compile(resetPassWordHtml)
  return resetPassWordTemplate({ resetURL, constants })
}
