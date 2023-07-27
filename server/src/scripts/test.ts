import { openMongooseConnection, closeMongooseConnection } from "../db"
import { MyDB } from "../utils/MyDB"
import { Tournament } from "../model/tournament"
import { BracketsManager, helpers } from "brackets-manager"
import { Status } from "brackets-model"
;(async () => {
  try {
    const DB_URI = "mongodb://127.0.0.1:27017/multi_game_tournament"
    await openMongooseConnection(DB_URI)
    // add your code here
    const tournament = await Tournament.find({})
    console.log(
      "tournament",
      tournament.map((t) => t?.progress),
    )
  } catch (error) {
    console.log("ERROR happen in script ", error)
  } finally {
    await closeMongooseConnection()
  }
})()
