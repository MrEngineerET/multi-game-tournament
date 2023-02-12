import express from "express"
import tournamentRouter from "./routes/tournamentRoutes.js"
import { errorHandler } from "./controllers/errorController.js"
import gameRouter from "./routes/gameRoutes.js"
import morgan from "morgan"
import cors from "cors"

const app = express()
app.use(cors())

app.use(express.static("public"))

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(morgan("tiny"))
const appRouter = express.Router()
appRouter.use("/tournament", tournamentRouter)
appRouter.use("/game", gameRouter)

app.use("/api/v1", appRouter)

// error handler middleware should be the last midleware
app.use(errorHandler)

export { app }
