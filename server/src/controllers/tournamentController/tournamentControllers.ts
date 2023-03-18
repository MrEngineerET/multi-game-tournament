import { BracketsManager } from "brackets-manager"
import { Request, Response, NextFunction } from "express"
import { Tournament } from "../../model/tournament.js"
import { Game } from "../../model/game.js"
import { MyDB } from "../../utils/MyDB.js"
import { GameManagement } from "../../utils/GameManagement.js"

const getAllTournaments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allTournaments = await Tournament.find().sort({ _id: -1 })
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
    const gameManagement = new GameManagement(updatedTournament)
    await gameManagement.addGameToMatches()

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
      consolationFinal = true,
      grandFinal = "double",
      seedOrdering = ["natural"],
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
        seedOrdering,
        grandFinal,
      },
    })
    const tournamentData = await Tournament.findById(tournament._id)
    const gameManagement = new GameManagement(tournamentData)
    await gameManagement.addGameToMatches()
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
    const result = await Tournament.findByIdAndDelete(req.params.id)
    if (!result) throw { status: 404, message: "tournament not found" }
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

const deleteTournamentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tournamentId, gameId } = req.params
    const tournament = await Tournament.findById(tournamentId)
    if (!tournament) {
      throw { statusCode: 404, message: "Tournament not found" }
    }
    const gameIndex = tournament.game.findIndex(
      (game) => game._id.toString() === gameId,
    )
    if (gameIndex === -1) {
      throw { statusCode: 404, message: "Game not found" }
    }
    tournament.game.splice(gameIndex, 1)
    await tournament.save()
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
  updateTournament,
  updateTournamentGame,
  addTournamentGame,
  deleteTournamentGame,
}
