import { BracketsManager } from "brackets-manager"
import { Request, Response, NextFunction } from "express"
import { Tournament } from "../../model/tournament.js"
import { Game } from "../../model/game.js"
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
const updateTournament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = req.body
    const data = { name, description }
    const id = req.params.id
    const updatedTournament = await Tournament.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
    res.status(200).send({
      status: "success",
      data: updatedTournament,
    })
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
    res.status(201).send({
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

const updateTournamentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tournamentId, gameId } = req.params
    const tournament = await Tournament.findById(tournamentId)
    const game = tournament.game.find((game) => game._id.toString() === gameId)
    if (!game) throw { statusCode: 404, message: "game not found" }
    game.count = req.body.count
    await tournament.save()

    const updatedGames = (
      await Tournament.findById(tournamentId)
        .select("game")
        .populate("game.gameId")
    ).game
    const updatedGame = updatedGames.find((g) => g._id.toString() === gameId)

    res.status(200).send({ status: "success", data: updatedGame })
  } catch (error) {
    next(error)
  }
}

const addTournamentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tournamentId } = req.params
    const { count, gameId } = req.body
    const game = await Game.findById(gameId)
    if (!game) throw { statusCode: 400, message: "game not found" }
    const tournament = await Tournament.findByIdAndUpdate(
      tournamentId,
      {
        $push: {
          game: { gameId, count },
        },
      },
      { new: true, runValidators: true },
    )
    const newGame = tournament.game.find((g) => g.gameId.toString() === gameId)

    res.status(201).send({ status: "success", data: newGame })
  } catch (error) {
    next()
  }
}

// const deleteTournamentGame = async () => {}

export default {
  getAllTournaments,
  getTournament,
  createTournament,
  updateTournamenMatch,
  deleteTournament,
  updateTournament,
  updateTournamentGame,
  addTournamentGame,
}
