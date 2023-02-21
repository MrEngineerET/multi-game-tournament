import { config } from "dotenv"
import { openMongooseConnection, PORT } from "./db.js"
config()
import { app } from "./app.js"

openMongooseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  })
  .catch((error) => console.log("Error opening Mongoose connection", error))
