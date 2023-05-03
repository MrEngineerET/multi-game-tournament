import express from "express"
import tournamentController from "../controllers/tournamentController/tournamentControllers"
import { tournamentControllerValidator as validator } from "../controllers/tournamentController/tournamentControllerValidator"
import authController from "../controllers/userController/authController"

const tournamentRouter = express.Router()
tournamentRouter.get(
  "/:id",
  validator.getTournament,
  tournamentController.getTournament,
)

tournamentRouter.use(authController.protect)

tournamentRouter.get("/", tournamentController.getAllTournaments)
tournamentRouter.post(
  "/",
  validator.createTournament,
  tournamentController.createTournament,
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

tournamentRouter.post(
  "/:tournamentId/participant",
  validator.addParticipant,
  tournamentController.addParticipant,
)
tournamentRouter.patch(
  "/:tournamentId/participant/:participantId",
  tournamentController.updateParticipant,
)
tournamentRouter.delete(
  "/:tournamentId/participant/:participantId",
  tournamentController.deleteParticipant,
)
export default tournamentRouter
