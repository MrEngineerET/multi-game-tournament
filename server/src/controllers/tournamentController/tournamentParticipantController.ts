import { Request, Response, NextFunction } from "express"
import { BracketsManager, helpers } from "brackets-manager"
import { InputStage, Seeding } from "brackets-model"
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
    const newName = req.body.name
    const { tournamentId, participantId } = req.params
    const tournament = await Tournament.findById(tournamentId)
    const participants = tournament.participant
    const participant = participants.find((p) => p.id == Number(participantId))
    if (!participant) {
      throw {
        statusCode: 400,
        message: "Participant not found",
      }
    }
    const otherParticipant = participants.find(
      (p) => p.id !== Number(participantId) && p.name === newName,
    )
    if (otherParticipant) {
      throw {
        statusCode: 400,
        message: "Participant name already exists",
      }
    }
    await Tournament.findByIdAndUpdate(tournamentId, {
      $set: {
        [`participant.${participantId}.name`]: newName,
      },
    })
    res.status(200).send()
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
    //TODO: add a validator to this controller(participant should be array, no duplication of participants)
    const { tournamentId, participantId } = req.params
    if (!participantId || !tournamentId) {
      throw {
        statusCode: 400,
        message: "Participant or tournament id is missing",
      }
    }
    let myDB = await MyDB.build(Number(tournamentId))
    let manager = new BracketsManager(myDB)
    // get current participants list
    const tournamentData = await manager.export()
    const currentParticipants = tournamentData.participant
    // add the new participants
    const updatedParticipants = currentParticipants.filter(
      (p) => p.id !== Number(participantId),
    )
    let updatedParticipantsNames: Seeding = updatedParticipants.map(
      (p) => p.name,
    )
    updatedParticipantsNames = helpers.balanceByes(updatedParticipantsNames)
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
      seeding: updatedParticipantsNames,
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

export default {
  addParticipant,
  updateParticipant,
  deleteParticipant,
}
