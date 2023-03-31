import { Request, Response, NextFunction } from "express"
import { BracketsManager, helpers } from "brackets-manager"
import { InputStage } from "brackets-model"
import { MyDB } from "../../utils/MyDB"
import { Tournament } from "../../model/tournament"

async function addParticipant(req: Request, res: Response, next: NextFunction) {
  try {
    //TODO: add a validator to this controller(participant should be array, no duplication of participants)
    const { participants: newParticipants } = req.body
    const { tournamentId } = req.params

    let myDB = await MyDB.build(Number(tournamentId))
    let manager = new BracketsManager(myDB)
    // get current participants list
    const tournamentData = await manager.export()
    const currentParticipants = tournamentData.participant.map((p) => p.name)
    // add the new participants
    let updatedParticipants = [...currentParticipants, ...newParticipants]
    updatedParticipants = helpers.balanceByes(updatedParticipants)
    helpers.ensureNoDuplicates(updatedParticipants)
    // delete the stage
    await Tournament.updateOne(
      { _id: tournamentId },
      {
        $unset: {
          stage: "",
          round: "",
          group: "",
          match: "",
          match_game: " ",
          participant: "",
          participantGameMatrix: "",
        },
      },
    )
    // create a new stage
    const stage = tournamentData.stage[0]
    delete stage.settings.size
    const inputStage: InputStage = {
      tournamentId: Number(tournamentId),
      name: stage.name,
      type: stage.type,
      seeding: updatedParticipants,
      settings: stage.settings,
    }
    // create a new Storage interface and Bracket manager since I used the Tournament model directly to update the tournament
    myDB = await MyDB.build(Number(tournamentId))
    manager = await new BracketsManager(myDB)
    await manager.create(inputStage)
    const updatedTournament = await Tournament.findById(tournamentId)
    res.status(200).send(updatedTournament)
  } catch (error) {
    next(error)
  }
}
async function updateParticipant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.send("update participant")
  } catch (error) {
    next(error)
  }
}

async function deleteParticipant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.send("delete participant")
  } catch (error) {
    next(error)
  }
}

export default {
  addParticipant,
  updateParticipant,
  deleteParticipant,
}
