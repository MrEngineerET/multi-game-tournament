const express = require("express")
const { getAllTournaments } = require("../controllers/tournamentControllers")

const tournamentRouter = express.Router()

tournamentRouter.get("/", getAllTournaments)

module.exports = tournamentRouter
