import { BracketsManager } from "brackets-manager"
import { Tournament } from "../model/tournament.js"

import { MyDB } from "../utils/MyDB.js"

export const getAllTournaments = async (req, res) => {
  try {
    const allTournaments = await Tournament.find()
    res.status(200).send({ status: "success", data: allTournaments })
  } catch (error) {
    res.status(500).send({ status: "failed", message: error.message })
  }
}

export const updateTournamenMatch = async (req, res) => {
  try {
    const match = req.body
    const tournamentId = req.params.id

    const myDB = await MyDB.build(tournamentId)

    const manager = new BracketsManager(myDB)

    await manager.update.match(match)
    const updatedTournament = await Tournament.findById(tournamentId)

    res.status(200).send({ status: "success", data: updatedTournament })
  } catch (error) {
    res.status(500).send({ status: "failed", message: error.message })
  }
}

export const createTournament = async (req, res) => {
  try {
    const {
      name,
      stageType,
      description,
      participants,
      consolationFinal = false,
    } = req.body

    const tournament = new Tournament({
      _id: Date.now(),
      name,
      description,
    })
    await tournament.save()

    const myDB = await MyDB.build(tournament._id)

    const manager = new BracketsManager(myDB)

    await manager.create({
      tournamentId: tournament._id,
      name,
      type: stageType,
      seeding: participants,
      settings: {
        consolationFinal,
        seedOrdering: ["natural"],
      },
    })
    const tournamentData = await Tournament.findById(tournament._id)
    res.status(200).send({
      status: "success",
      data: tournamentData,
    })
  } catch (error) {
    res.status(500).send({ status: "failed", message: error.message })
  }
}

export const getTournament = async (req, res) => {
  try {
    const tournamentId = req.params.id
    const tournament = await Tournament.findById(tournamentId)
    if (!tournament)
      return res.send({ status: "Failed", message: "Invalid tournament id" })

    res.status(200).send({ status: "success", data: tournament })
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: error.message,
    })
  }
}
