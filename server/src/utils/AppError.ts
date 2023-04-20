export class AppError extends Error {
  public requestURL: string
  public requestPayload: object
  public userID: string
  public statusCode: number
  public status: string
  public isOperational: boolean

  constructor(message: string, statusCode?: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
