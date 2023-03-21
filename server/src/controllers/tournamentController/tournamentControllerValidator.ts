import mongoose from "mongoose"
import { Tournament, TournamentStatus } from "../../model/tournament.js"

export const tournamentControllerValidator = {
  createTournament(req, res, next) {
    const { name, stageType, description, participants, games } = req.body
    if (!name || !stageType || !description || !participants)
      throw { statusCode: 422, message: "insufficient data" }
    if (!Array.isArray(participants) || (games && !Array.isArray(games)))
      throw {
        statusCode: 422,
        message: "participants and games should be of type array",
      }
    if (games) {
      for (let i = 0; i < games.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(games[i].gameId))
          throw {
            statusCode: 422,
            message: "invalid gameId",
          }
      }
    }
    next()
  },
  getTournament(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 422, message: "tournament id is required" }
    next()
  },
  updateTournament(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 422, message: "tournament id is required" }
    next()
  },
  deleteTournament(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 422, message: "tournament id is required" }
    next()
  },
  async updateTournamentMatch(req, res, next) {
    try {
      const match = req.body
      const tournamentId = Number(req.params.id)
      const { status } = await Tournament.findById(tournamentId, {
        status: 1,
      })
      if (status === TournamentStatus.pending) {
        throw {
          statusCode: 404,
          message:
            "can not update a tournament while it is in a pending, arhived, and completed state",
        }
      }
      if (!match) throw { statusCode: 422, message: "no match object found" }
      next()
    } catch (error) {
      next(error)
    }
  },
  updateTournamentGame(req, res, next) {
    const count = req.body.count
    if (!count) throw { statusCode: 422, message: "insufficient data" }
    next()
  },
  addTournamentGame(req, res, next) {
    const tournamentId = req.params.tournamentId
    const gameId = req.body.gameId
    if (!tournamentId || !gameId)
      throw { statusCode: 422, message: "insufficient data" }
    if (!mongoose.Types.ObjectId.isValid(gameId))
      throw { statusCode: 422, message: "invalid gameId" }
    next()
  },
}
