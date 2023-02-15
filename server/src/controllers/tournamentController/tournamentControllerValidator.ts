import mongoose from "mongoose"

export const tournamentControllerValidator = {
  createTournament(req, res, next) {
    const { name, stageType, description, participants, games } = req.body
    if (!name || !stageType || !description || !participants)
      throw { statusCode: 400, message: "insufficient data" }
    if (!Array.isArray(participants) || !Array.isArray(games))
      throw {
        statusCode: 400,
        message: "participants and games should be of type array",
      }
    for (let i = 0; i < games.length; i++) {
      if (!mongoose.Types.ObjectId.isValid(games[i].gameId))
        throw {
          statusCode: 400,
          message: "invalid gameId",
        }
    }
    next()
  },
  getTournament(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 400, message: "tournament id is required" }
    next()
  },
  updateTournament(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 400, message: "tournament id is required" }
    next()
  },
  deleteTournament(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 400, message: "tournament id is required" }
    next()
  },
  updateTournamentMatch(req, res, next) {
    const match = req.body
    if (!match) throw { statusCode: 400, message: "no match object found" }
    next()
  },
  updateTournamentGame(req, res, next) {
    const count = req.body.count
    if (!count) throw { statusCode: 400, message: "insufficient data" }
    next()
  },
  addTournamentGame(req, res, next) {
    const tournamentId = req.params.tournamentId
    const gameId = req.body.gameId
    if (!tournamentId || !gameId)
      throw { statusCode: 400, message: "insufficient data" }
    if (!mongoose.Types.ObjectId.isValid(gameId))
      throw { statusCode: 400, message: "invalid gameId" }
    next()
  },
}
