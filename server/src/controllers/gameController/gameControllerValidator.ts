import { Types } from "mongoose"

export const gameControllerValidator = {
  createGame(req, res, next) {
    const { name, description, images } = req.body
    if (!name || !description)
      throw { statusCode: 422, message: "insufficient data" }
    if (!Array.isArray(images))
      throw {
        statusCode: 333,
        message: "images should be an array",
      }
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
