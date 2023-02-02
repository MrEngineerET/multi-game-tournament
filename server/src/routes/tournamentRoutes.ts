import express from "express"
import {
  createTournament,
  getAllTournaments,
  getTournament,
} from "../controllers/tournamentControllers.js"

const tournamentRouter = express.Router()

tournamentRouter.get("/", getAllTournaments)
tournamentRouter.post("/", createTournament)
tournamentRouter.get("/:id", getTournament)

export default tournamentRouter
