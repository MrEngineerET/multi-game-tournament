import { openMongooseConnection, closeMongooseConnection } from "../db"
import { MyDB } from "../utils/MyDB"
import { Tournament } from "../model/tournament"
import { BracketsManager, helpers } from "brackets-manager"
;(async () => {
  try {
    const DB_URI = "mongodb://localhost:27017/multi-game-tournament"
    await openMongooseConnection(DB_URI)
    // add your code here
    const tournamentId = 1680085671415
    const myDB = await MyDB.build(tournamentId)
    const manager = new BracketsManager(myDB)

    const res = await manager.export()
    // get the participant
    const participants = res.participant.map((p) => p.name)
    console.log("-------<> ", participants)
    participants.push("e", "f", "g", "h")
    // add participant
    // code here to add a participant
    const stage = res.stage[0]
    delete stage.settings.size
    console.log("----<> ", "stage", stage)
    // get the settings
    const inputStage = {
      tournamentId,
      name: stage.name,
      type: stage.type,
      seeding: participants,
      settings: stage.settings,
    }
    // delete stage related data
    await Tournament.updateOne(
      { _id: tournamentId },
      {
        $unset: {
          stage: "",
          round: "",
          group: "",
          match: "",
          match_game: "",
          participant: "",
          participantGameMatrix: "",
        },
      },
    )
    console.log("-------> ", "stage created")
    const myDB2 = await MyDB.build(tournamentId)
    const manager2 = new BracketsManager(myDB2)
    await manager2.create(inputStage)
    console.log("-------> ", "stage created")
  } catch (error) {
    console.log("ERROR happen in script ", error)
  } finally {
    await closeMongooseConnection()
  }
})()
