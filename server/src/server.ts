import mongoose from "mongoose"
import { app } from "./app.js"

import { config } from "dotenv"
config()

const PORT = process.env.PORT || 9090

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Mongodb connected successfully")
  })
  .catch((err) => {
    console.log("mongodb connection error ===> ", err)
  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
