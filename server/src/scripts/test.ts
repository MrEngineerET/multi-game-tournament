import { Email } from "../utils/email"
import { config } from "dotenv"
config({ path: "../../.env" })
;(async () => {
  try {
    const email = new Email("meetbirukberhanu@gmail.com")
    await email.test()
    console.log("I guess the email is sent successfully")
  } catch (error) {
    console.log("error", error)
  }
})()
