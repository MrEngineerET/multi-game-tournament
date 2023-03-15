import { Request, Response, NextFunction } from "express"
import { saveError } from "../model/Errors.js"
import { AppError } from "../utils/AppError.js"
import { Error } from "../model/Errors.js"

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  saveError(error)
  if (error.statusCode)
    res
      .status(error.statusCode)
      .send({ status: "failed", data: { message: error.message } })
  else
    res.status(500).send({
      error: error ? error.message : null,
      request: req ? req.url : null,
      message: "Something went wrong",
    })
}

export const getAllErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allErrors = await Error.find({}).sort({ _id: -1 })
    res.status(200).send({ status: "success", data: allErrors })
    res.send
  } catch (error) {
    next(error)
  }
}
