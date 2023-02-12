export const tournamentControllerValidator = {
  createTournament(req, res, next) {
    const { name, stageType, description, participants } = req.body
    if (!name || !stageType || !description || !participants)
      throw { statusCode: 400, message: "insufficient data" }
    if (!Array.isArray(participants))
      throw { statusCode: 400, message: "participants should be an array" }
    next()
  },
  getTournament(req, res, next) {
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
}
