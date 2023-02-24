import { Game } from "../../model/game.js"
import { Request, Response, NextFunction } from "express"

export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allGames = await Game.find()
    res.status(200).send({ status: "success", data: allGames })
  } catch (error) {
    next(error)
  }
}

export const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!game) {
      return res.status(404).send({ status: "success", data: game })
    }
    res.status(200).send({ status: "success", data: game })
  } catch (error) {
    next(error)
  }
}

export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, images } = req.body
    const game = await Game.create({ name, description, images })

    res.status(200).send({
      status: "success",
      data: game,
    })
  } catch (error) {
    next(error)
  }
}

export const getGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) throw { statusCode: 404, message: "game not found" }
    res.status(200).send({ status: "success", data: game })
  } catch (error) {
    next(error)
  }
}

export const deleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await Game.deleteOne({ _id: req.params.id })
    if (result.deletedCount === 0) {
      throw { statusCode: 404, message: "Game not found" }
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export default {
  getAllGames,
  updateGame,
  createGame,
  getGame,
  deleteGame,
}
