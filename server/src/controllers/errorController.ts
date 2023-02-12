import { Request, Response, NextFunction } from "express"
import { saveError } from "../model/Errors.js"
import { AppError } from "../utils/AppError.js"

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