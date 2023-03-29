import express from "express"
import tournamentRouter from "./routes/tournamentRoutes"
import { errorHandler } from "./controllers/errorController"
import gameRouter from "./routes/gameRoutes"
import errorRouter from "./routes/errorRoutes"
import morgan from "morgan"
import cors from "cors"

const app = express()
//TODO: handle cors properly
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
appRouter.use("/error", errorRouter)

app.use("/api/v1", appRouter)

// error handler middleware should be the last midleware
app.use(errorHandler)

export { app }
