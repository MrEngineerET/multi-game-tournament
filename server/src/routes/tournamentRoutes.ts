import express from "express"
import tournamentController from "../controllers/tournamentController/tournamentControllers.js"
import { tournamentControllerValidator as validator } from "../controllers/tournamentController/tournamentControllerValidator.js"

const tournamentRouter = express.Router()

tournamentRouter.get("/", tournamentController.getAllTournaments)
tournamentRouter.post(
  "/",
  validator.createTournament,
  tournamentController.createTournament,
)
tournamentRouter.get(
  "/:id",
  validator.getTournament,
  tournamentController.getTournament,
)
tournamentRouter.patch(
  "/:id",
  validator.updateTournament,
  tournamentController.updateTournament,
)
tournamentRouter.delete(
  "/:id",
  validator.deleteTournament,
  tournamentController.deleteTournament,
)

tournamentRouter.post(
  "/:tournamentId/game",
  validator.addTournamentGame,
  tournamentController.addTournamentGame,
)

tournamentRouter.patch(
  "/:tournamentId/game/:gameId",
  validator.updateTournamentGame,
  tournamentController.updateTournamentGame,
)

tournamentRouter.delete(
  "/:tournamentId/game/:gameId",
  tournamentController.deleteTournamentGame,
)
export default tournamentRouter
