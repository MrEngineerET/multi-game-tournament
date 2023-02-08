import { BracketsManager } from "brackets-manager"
import { Tournament } from "../model/tournament.js"
import { nanoid } from "nanoid"

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
    const { name, type, consolationFinal = false } = req.body
    const participants = req.body.participants.split(",")

    const tournament = new Tournament({
      _id: Date.now(),
      name,
    })
    await tournament.save()

    const myDB = await MyDB.build(tournament._id)

    const manager = new BracketsManager(myDB)

    const stage = await manager.create({
      tournamentId: tournament._id,
      name,
      type,
      seeding: participants,
      settings: {
        consolationFinal,
        seedOrdering: ["natural"],
      },
    })
    res.status(200).send({
      status: "success",
      data: { ...stage, id: nanoid() },
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

    res.statu(200).send(tournament)
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: error.message,
    })
  }
}
