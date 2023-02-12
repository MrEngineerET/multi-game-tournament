interface IError {
  message: string
  statusCode?: number
  requestURL?: string
  requestPayload?: object
  userID?: string
}

export class AppError extends Error {
  public requestURL: string
  public requestPayload: object
  public userID: string
  public statusCode: number

  constructor(error: IError) {
    super(error.message)
    this.requestURL = error.requestURL
    this.requestPayload = error.requestPayload
    this.userID = error.userID
    this.statusCode = error.statusCode
  }
}
