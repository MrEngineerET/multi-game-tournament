import { openMongooseConnection, closeMongooseConnection } from "../db"
import { MyDB } from "../utils/MyDB"
import { BracketsManager } from "brackets-manager"
;(async () => {
  try {
    const DB_URI = "mongodb://localhost:27017/multi-game-tournament"
    await openMongooseConnection(DB_URI)
    // add your code here

    const myDB = await MyDB.build(1679665240343)
    const manager = new BracketsManager(myDB)
    const res = await manager.get.currentMatches(0)
    console.log("res", res)

    await closeMongooseConnection()
  } catch (error) {
    console.log("ERROR happen in script ", error)
  }
})()
