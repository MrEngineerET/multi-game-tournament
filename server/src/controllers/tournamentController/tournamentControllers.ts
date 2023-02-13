import { BracketsManager } from "brackets-manager"
import { Request, Response, NextFunction } from "express"
import { Tournament } from "../../model/tournament.js"
import { MyDB } from "../../utils/MyDB.js"

const getAllTournaments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allTournaments = await Tournament.find()
    res.status(200).send({ status: "success", data: allTournaments })
  } catch (error) {
    next(error)
  }
}

const updateTournamenMatch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const match = req.body
    const tournamentId = Number(req.params.id)

    const myDB = await MyDB.build(tournamentId)

    const manager = new BracketsManager(myDB)

    await manager.update.match(match)
    const updatedTournament = await Tournament.findById(tournamentId)

    res.status(200).send({ status: "success", data: updatedTournament })
  } catch (error) {
    next(error)
  }
}

const createTournament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      stageType,
      description,
      participants,
      consolationFinal = false,
      games = [],
    } = req.body

    const tournament = new Tournament({
      _id: Date.now(),
      name,
      description,
      game: games,
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
    next(error)
  }
}

const getTournament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tournamentId = req.params.id
    const tournament = await Tournament.findById(tournamentId).populate({
      path: "game.gameId",
      options: { name: "games" },
    })
    if (!tournament)
      return res.send({ status: "Failed", message: "Invalid tournament id" })

    res.status(200).send({ status: "success", data: tournament })
  } catch (error) {
    next(error)
  }
}

const deleteTournament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Tournament.deleteOne({ id: req.params.id })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export default {
  getAllTournaments,
  getTournament,
  createTournament,
  updateTournamenMatch,
  deleteTournament,
}
