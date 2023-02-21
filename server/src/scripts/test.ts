import { openMongooseConnection, closeMongooseConnection } from "../db.js"
;(async () => {
  try {
    const DB_URI = "mongodb://localhost:27017/multi-game-tournament"
    await openMongooseConnection(DB_URI)
    // add your code here
    await closeMongooseConnection()
  } catch (error) {
    console.log("ERROR happen in script ", error)
  }
})()
