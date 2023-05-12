import express from "express"
import gameController from "../controllers/gameController/gameControllers"
import { gameControllerValidator as validator } from "../controllers/gameController/gameControllerValidator"
import authController from "../controllers/userController/authController"

const gameRouter = express.Router()
gameRouter.get("/:id", validator.getGame, gameController.getGame)
gameRouter.get("/", gameController.getAllGames)
gameRouter.use(authController.protect)

gameRouter.use(authController.restrictTo("admin"))
gameRouter.post("/", validator.createGame, gameController.createGame)
gameRouter.patch("/:id", validator.updateGame, gameController.updateGame)
gameRouter.delete("/:id", validator.deleteGame, gameController.deleteGame)

export default gameRouter
