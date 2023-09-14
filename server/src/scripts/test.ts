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
    const cleanId = "1693824505002"
    const tournament = await Tournament.findById(cleanId)
    const storage = new MyDB(tournament)
    const manager = new BracketsManager(storage)
    await manager.update.match({
      id: 0,
      opponent2: { score: 2 },
    })
    const updatedMatch = await manager.find.match(0, 1, 1)
    console.log("----> ", "updatedMatch", updatedMatch)
  } catch (error) {
    console.log("ERROR happen in script ", error)
  } finally {
    await closeMongooseConnection()
  }
})()
