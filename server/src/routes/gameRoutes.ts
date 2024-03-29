import express from "express"
import gameController from "../controllers/gameController/gameControllers"
import { gameControllerValidator as validator } from "../controllers/gameController/gameControllerValidator"
import authController from "../controllers/userController/authController"

const gameRouter = express.Router()
gameRouter.get("/:id", validator.getGame, gameController.getGame)
gameRouter.get("/", gameController.getAllGames)
gameRouter.use(authController.protect)

gameRouter.use(authController.restrictTo("admin"))
gameRouter.post(
  "/",
  gameController.uploadPhoto,
  gameController.resizePhoto,
  validator.createGame,
  gameController.createGame,
)
gameRouter.patch(
  "/:id",
  gameController.uploadPhoto,
  gameController.resizePhoto,
  validator.updateGame,
  gameController.updateGame,
)
gameRouter.delete("/:id", validator.deleteGame, gameController.deleteGame)

export default gameRouter
