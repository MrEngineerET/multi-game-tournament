import express from "express"
import tournamentRouter from "./routes/tournamentRoutes"
import { globalErrorHandler } from "./controllers/errorController"
import gameRouter from "./routes/gameRoutes"
import errorRouter from "./routes/errorRoutes"
import userRouter from "./routes/userRoutes"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
//TODO: handle cors properly
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cookieParser())

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
appRouter.use("/user", userRouter)
app.use("/api/v1", appRouter)

// error handler middleware should be the last midleware
app.use(globalErrorHandler)

export { app }
