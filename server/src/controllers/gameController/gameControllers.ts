import { Game } from "../../model/game"
import { Request, Response, NextFunction } from "express"
import { RequestWithUser } from "../userController/authController"
import multer from "multer"
import { AppError } from "../../utils/AppError"
import sharp from "sharp"
import fs from "fs/promises"
import path from "path"

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false)
  }
}
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
})

const uploadPhoto = upload.single("image")

const resizePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next()

    req.file.filename = `game-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/imgs/uploads/games/${req.file.filename}`)

    next()
  } catch (error) {
    next(error)
  }
}

export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allGames = await Game.find(req.query).sort({ _id: -1 })
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
      return res
        .status(404)
        .send({ status: "error", message: "Game not found" })
    }
    res.status(200).send({ status: "success", data: game })
  } catch (error) {
    next(error)
  }
}
export const createGame = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = req.body
    const game = await Game.create({
      name,
      description,
      images: [getFullImageUrl(req.file.filename)],
      createdBy: req.user._id,
    })

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
    const force = req.query.force === "true"
    if (force) {
      const game = await Game.findById(req.params.id)
      // delete the game image
      Promise.all(
        game.images.map((image) => fs.unlink(getImageAbsoluteLocation(image))),
      )
      await Game.findByIdAndDelete(req.params.id)
    } else
      await Game.findByIdAndUpdate(req.params.id, {
        active: false,
      })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

function getFullImageUrl(url: string) {
  return `${process.env.SERVER_URL}/imgs/uploads/games/${url}`
}

function getImageAbsoluteLocation(fullImageUrl: string) {
  const imgLocationInPublic = fullImageUrl.replace(
    `${process.env.SERVER_URL}`,
    "public/",
  )
  return path.resolve(imgLocationInPublic)
}

export default {
  getAllGames,
  updateGame,
  createGame,
  getGame,
  deleteGame,
  uploadPhoto,
  resizePhoto,
}
