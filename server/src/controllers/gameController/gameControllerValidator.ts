import { Types } from "mongoose"

export const gameControllerValidator = {
  createGame(req, res, next) {
    const { name, description } = req.body
    const image = req.file
    if (!name || !description || !image)
      throw { statusCode: 422, message: "insufficient data" }
    next()
  },
  getGame(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 422, message: "game id is required" }
    const status = Types.ObjectId.isValid(id)
    if (!status) throw { statusCode: 422, message: "invalid game id" }
    next()
  },
  deleteGame(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 422, message: "game id is required" }
    const status = Types.ObjectId.isValid(id)
    if (!status) throw { statusCode: 422, message: "invalid game id" }
    next()
  },
  updateGame(req, res, next) {
    const id = req.params.id
    if (!id) throw { statusCode: 422, message: "game id is required" }
    const status = Types.ObjectId.isValid(id)
    if (!status) throw { statusCode: 422, message: "invalid game id" }
    next()
  },
}
