import { config } from "dotenv"
import { openMongooseConnection, PORT } from "./db"
config()
import { app } from "./app"

openMongooseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  })
  .catch((error) => console.log("Error opening Mongoose connection", error))
