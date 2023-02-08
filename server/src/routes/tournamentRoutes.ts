import express from "express"
import {
  createTournament,
  getAllTournaments,
  getTournament,
  updateTournamenMatch,
} from "../controllers/tournamentControllers.js"

const tournamentRouter = express.Router()

tournamentRouter.get("/", getAllTournaments)
tournamentRouter.post("/", createTournament)
tournamentRouter.get("/:id", getTournament)
tournamentRouter.patch("/:id/update-match", updateTournamenMatch)

export default tournamentRouter
